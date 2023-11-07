import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexGrid,
  ChartComponent,
} from "ng-apexcharts";
import { ChartService } from '../../services/chart.service';
import { DatePipe } from '@angular/common';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
};

export type ChartHtml = {
  userCount: number;
  botUsername: string;
  botName: string;
  chartData: any;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class HomeChartComponent implements OnInit, AfterViewInit {
  @ViewChild("barChart") barChart: ChartComponent;
  formModal: any;
  time: string = '';
  public chartOptions: Partial<ChartOptions> = {
    series: [],
    chart: {
      type: "area",
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 8,
        rangeBarOverlap: false,
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      curve: "smooth",
      colors: ["transparent"]
    },
    xaxis: {
      type: 'category',
      categories: [],
      labels: {
        show: true
      }
    },
    yaxis: {
      title: {
        text: "$ (USD)"
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val;
        }
      }
    }
  };
  public botChartOptions: Partial<ChartOptions> = {
    series: [],
    chart: {
      height: '160',
      width: '100%',
      type: "line",
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: false
    },
    stroke: {
      curve: "smooth"
    },
    xaxis: { type: 'datetime', categories: [], labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    legend: {
      show: false
    },
    yaxis: {
      labels: {
        show: true
      },
    },
    tooltip: {
      enabled: true,
      x: {
        format: "yyyy-MM-dd"
      }
    }
  };
  chartData: any = [];
  public chartHtml: ChartHtml[] = [];
  public totalBotsCount = 0;
  public monthlyRevenue = 0;
  public monthlyPercentage = 0;
  public monthlyPercentageHtml = '';
  public totalRevenue = 0;
  public isIncrease = true;
  public increasedPercentage = 0;
  public totalUserCount = 0;

  constructor(
    private chartService: ChartService
  ) { }

  ngOnInit(): void {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
    this.getRevenue();
  }

  ngAfterViewInit(): void {
    this.getChartData();
  }

  private updateTime(): void {
    const now = new Date();
    const hours = now.getHours();
    const isPM = hours >= 12;
    const amPm = isPM ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
    this.time = `${this.formatDigit(formattedHours)}:${this.formatDigit(now.getMinutes())}:${this.formatDigit(now.getSeconds())} ${amPm}`;
  }

  private formatDigit(digit: number): string {
    return digit < 10 ? `0${digit}` : `${digit}`;
  }

  getChartData() {
    this.chartService.getChartData().subscribe(response => {
      this.chartData = response;
      this.userChart(response);
    });
  }

  userChart(chartData: any) {
    const userX = [];
    const userY = [];
    let revenue = 0;
    let userCountObj = {};
    chartData.forEach(element => {
      this.totalBotsCount = this.totalBotsCount + 1;
      Object.keys(element).forEach(function (key) {
        let value = element[key];
        if (value instanceof Array) {
          let yAmmount = 0;
          let yName = "";
          value.forEach(creditObj => {
            yName = creditObj.client_username;
            yAmmount = creditObj.amount + yAmmount;
          });
          let index = userY.findIndex(y => y.name === yName);
          revenue = revenue + yAmmount;
          if (index != -1) {
            const existingY = userY[index];
            existingY.data.push(yAmmount);
            userY[index] = existingY;
          } else {
            userY.push({
              name: yName,
              data: [yAmmount]
            });
          }
        }
      });
      userX.push(element.bot_username);
      userCountObj[element.bot_username] = element.user_count;
    });
    this.chartOptions.series = userY;
    this.chartOptions.xaxis.categories = userX;
    this.barChart.updateOptions(this.chartOptions);
    this.botChart(userCountObj);
  }

  botChart(userCountObj) {
    var datePipe = new DatePipe("en-US");
    let today = new Date();
    let endDate = today.setDate(today.getDate() - 30);
    this.chartService.getTimeRevenue(datePipe.transform(endDate, 'yyyy-MM-dd'), datePipe.transform(new Date(), 'yyyy-MM-dd')).subscribe(response => {
      let botChartArry: any = [];
      Object.keys(response).forEach(function (key) {
        let bot = response[key];
        let botChart = {
          userCount: userCountObj[key] ? userCountObj[key] : 0,
          botUsername: key,
          botName: bot.name,
          chartData: {
            userX: { type: 'datetime', categories: bot.data['x-axis'], labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
            userY: [
              {
                name: bot.name,
                data: bot.data['y-axis']
              }
            ]
          }
        };
        botChartArry.push(botChart);
      });
      this.chartHtml = this.chartHtml.concat(botChartArry);
      console.log(this.chartHtml);
    }, error => {

    });
  }

  getRevenue() {
    var datePipe = new DatePipe("en-US");
    let today = new Date();
    let endDate = today.setDate(today.getDate() - 30);
    this.chartService.getRevenue(datePipe.transform(endDate, 'yyyy-MM-dd'), datePipe.transform(new Date(), 'yyyy-MM-dd')).subscribe(response => {
      let data: any = response;
      this.monthlyRevenue = data.first_month_earning;
      let percentage = Math.ceil((data.first_month_earning / 5000) * 100);
      this.monthlyPercentage = percentage;
      this.monthlyPercentageHtml = `<div class="progress-bar bg-gradient-secondary" role="progressbar" [style.width]="width: ${percentage}%" aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="100"></div>`;
      this.totalRevenue = data.total_earning;
      this.totalUserCount = data.user_count;
      this.calculateRevenue(data.first_month_earning, data.second_month_earning);
    }, error => {

    });
  }

  calculateRevenue(first_month_earning, second_month_earning) {
    this.isIncrease = (first_month_earning - second_month_earning) > 0 ? true : false;
    this.increasedPercentage = ((first_month_earning - second_month_earning) / (second_month_earning != 0 ? second_month_earning : 5000)) * 100;
  }
}
