import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { FinanceService } from '../../services/finance.service';

@Component({
  selector: 'app-price-page',
  templateUrl: './price-page.component.html',
  styleUrls: ['./price-page.component.scss']
})
export class PricePageComponent implements OnInit {
  categoryList:any;
  constructor(
    private financeService: FinanceService,
  ) { }
  ngOnInit(): void {
    this.GetAllUserCategories();
  }

  GetAllUserCategories() {
    this.financeService.GetAllUserCategories().subscribe(response => {
      this.categoryList = response;
    }, error => {
    });
  }
  updatePrice(category) {
    let amount = {
      minutes_per_dollar:category.minutes_per_dollar
    }
    this.financeService.updatePrice(category.category,amount).subscribe(response => {
      Swal.fire({
        title: 'Updated!',
        text: 'Price updated successfully :)',
        icon: 'success',
        background: '#0e1726',
      });
    }, error => {
      Swal.fire({
        title: 'Faild!',
        text: 'Unable to update price :(',
        icon: 'error',
        background: '#0e1726',
      });
    });
  }
  
}
