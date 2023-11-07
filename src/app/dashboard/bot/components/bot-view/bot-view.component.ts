import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/http.service';

export interface voice {
  voice_id:string;
  preview_url:any;
}
@Component({
  selector: 'app-bot-view',
  templateUrl: './bot-view.component.html',
  styleUrls: ['./bot-view.component.scss']
})
export class BotViewComponent implements OnInit, AfterViewInit {
  constructor(private route: ActivatedRoute, private httpService: HttpService) {}
  data:any = [];
  public voicesList: any = [];
  public audioTrack: any = null;
  voiceTrack:voice;
  audioPlayer = '';
  public showLoader = true;
  spicyImageList:any = [];
  noSpicyImage = true;
  teligramLink:string = 'https://t.me/';

  items = [
    { title: 'Item 1', content: 'Content for Item 1' },
    { title: 'Item 2', content: 'Content for Item 2' },
    // Add more items as needed
  ];

  ngOnInit() {
    this.httpService.getVoices().subscribe(response => {
      this.voicesList = response;
      this.getbotData(this.route.snapshot.queryParams['botUsername']);
    });
    
  }

  ngAfterViewInit(): void {

  }

  getbotData(botName) {
    this.httpService.getBotByUsername(botName).subscribe(response => {
      this.data = response;
      this.showLoader = false;
      this.getVoice(this.data.personal_details.voice);
      if (this.data.bot_type == 'spicy') {
        this.getSpicyImageList();
      } else {
        this.showLoader = false;
      }
    });
  }

  getVoice(voice_id) {
    const voice = this.voicesList.filter(v => v.voice_id == voice_id)[0];
    this.audioTrack = {
      url: voice.preview_url,
      title: voice.name,
      cover: ''
    };
     this.audioPlayer = `<audio class="w-100" id="myAudio" controls style="background: #052c65 !important;"><source src="${this.audioTrack.url}" type="audio/mpeg">Your browser does not support the audio element.</audio>`;
  }

  getSpicyImageList() {
    this.showLoader = true;
    this.httpService.getAllSpicyImage(this.route.snapshot.queryParams['botUsername']).subscribe(response => {
      this.spicyImageList = response;
      this.showLoader = false;
      this.noSpicyImage = false;
    }, error => {
      this.noSpicyImage = true;
      this.showLoader = false;
    });
  }
}
