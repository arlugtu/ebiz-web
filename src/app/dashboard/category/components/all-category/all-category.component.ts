import { AfterViewInit, Component, OnInit, Inject, ElementRef, AfterViewChecked } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CommonService } from 'src/app/common/services/common.service';
import { NotifService } from 'src/app/common/services/notif.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

export interface CATEGORY {
  category_id: string;
  category_name: string;
}

@Component({
  selector: 'app-all-category',
  templateUrl: './all-category.component.html',
  styleUrls: [
    './all-category.component.scss',
    '../../../../common/styles/common.scss'
  ],
  providers: [CommonService, NotifService]
})
export class AllCategoryComponent implements OnInit, AfterViewInit, AfterViewChecked {

  public showLoader = false;
  public currentPage = 1;
  public pageSize = 10;
  public totalPageCount = 0;
  public totalRecordCount = 0;
  public hasNext = false;
  public hasPrevious = false;
  public allData: any = [];

  constructor(
    private router: Router,
    private service: CategoryService,
    public common: CommonService,
    private notif: NotifService,
    @Inject(DOCUMENT) document: Document,
    private sanitizer: DomSanitizer,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.showLoader = true;
    this.getData();
  }

  ngAfterViewInit(): void {

  }

  ngAfterViewChecked() {

  }

  getData() {
    this.showLoader = false;
    this.common.getData('category').subscribe(
      response => {
        this.showLoader = false;
        this.allData = response['result'] || [];
        if (this.allData.length == 0) {
          let element = document.getElementById('allDataHeader');
          if (element) {
            element.textContent = 'No available data';
          }
        }
      },
      error => {
        this.showLoader = false;
        this.notif.error('Unable to get category.');
      }
    );
  }

  deleteData(id) {
    this.common.deleteData('category', id).subscribe(
      response => {
        this.getData();
      },
      error => {
        this.notif.error('Failed to delete category.');
      }
    )
  }

  addSubcategory(data) {
    let subcategory = document.getElementById(`subcategory-${data.category_id}`);
    let _data = {
      category_id: data.category_id,
      subcategory_name: (subcategory['value'] || '').trim()
    };

    if (_data.subcategory_name) {
      this.common.createData('subcategory', _data).subscribe(
        response => {
          this.showLoader = false;
          _data['subcategory_id'] = response['id'];
          data['subcategory'] = data.subcategory || [];
          data['subcategory'].push(_data);
          subcategory['value'] = '';
          this.notif.success();
        },
        error => {
          this.showLoader = false;
          this.notif.error('Unable to create subcategory.');
        }
      );
    } else {
      this.notif.error('Please enter a subcategory name.');
    }
  }

  deleteSubcategory(data, id) {
    this.common.deleteData('subcategory', id).subscribe(
      response => {
        data['subcategory'] = data.subcategory.filter((object) => {
          return object.subcategory_id != id;
        })
      },
      error => {
        this.notif.error('Failed to delete subcategory.');
      }
    )
  }

}
