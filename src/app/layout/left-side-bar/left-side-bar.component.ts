import { Component } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.scss']
})
export class LeftSideBarComponent {

  ngOnInit() {
    $('.menu-item').on('click', (event) => {
      let active = $('.menu-item.active');
      if (active) {
        active.removeClass('active');
      }

      $(event.target.parentNode).addClass('active');
      $(event.target.parentNode.parentNode).addClass('active');
    })

    let hash = window.location.hash;
    let link = hash.split('/').splice(1, 2).join('/');
    let element = $(`a[routerLink="/${link}"]`);
    if (element && element[0] && link.includes('dashboard')) {
      $(element[0].parentNode).addClass('active');
    }
  }

}
