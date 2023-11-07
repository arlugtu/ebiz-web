import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'product-bot-admin';
  loader = true;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
      this.loadScreen();
  }

  loadScreen() {
      let load_screen = document.getElementById("load_screen");
      if(load_screen) {
          this.loader = false
      }

      var equationThemeObject = null;

      var layoutName = 'Vertical Dark Menu';

      var settingsObject = {
          admin: 'Equation Admin Template',
          settings: {
              layout: {
                  name: layoutName,
                  toggle: true,
                  darkMode: true,
                  boxed: false,
                  logo: {
                      darkLogo: './../assets/img/logo.svg',
                      lightLogo: './../assets/img/logo-3.svg'
                  }
              }
          },
          reset: false
      }


      if (settingsObject.reset) {
          localStorage.clear()
      }

      if (localStorage.length === 0) {
          equationThemeObject = settingsObject;
      } else {

          let getequationThemeObject = localStorage.getItem("theme");
          let getParseObject = JSON.parse(getequationThemeObject)
          let ParsedObject = getParseObject;

          if (getequationThemeObject !== null) {

              if (ParsedObject.admin === 'Equation Admin Template') {

                  if (ParsedObject.settings.layout.name === layoutName) {

                      equationThemeObject = ParsedObject;
                  } else {
                      equationThemeObject = settingsObject;
                  }

              } else {
                  if (ParsedObject.admin === undefined) {
                      equationThemeObject = settingsObject;
                  }
              }

          } else {
              equationThemeObject = settingsObject;
          }
      }

      // Get Dark Mode Information i.e darkMode: true or false

      if (equationThemeObject.settings.layout.darkMode) {
          localStorage.setItem("theme", JSON.stringify(equationThemeObject));
          let getequationThemeObject = localStorage.getItem("theme");
          let getParseObject = JSON.parse(getequationThemeObject)

          if (getParseObject.settings.layout.darkMode) {
              let ifStarterKit = document.body.getAttribute('page') === 'starter-pack' ? true : false;
              document.body.classList.add('dark');
              if (ifStarterKit) {
                  if (document.querySelector('.navbar-logo')) {
                      document.querySelector('.navbar-logo').setAttribute('src', './../assets/img/logo.svg')
                  }
              } else {
                  if (document.querySelector('.navbar-logo')) {
                      document.querySelector('.navbar-logo').setAttribute('src', getParseObject.settings.layout.logo.darkLogo)
                  }
              }
          }
      } else {
          localStorage.setItem("theme", JSON.stringify(equationThemeObject));
          let getequationThemeObject = localStorage.getItem("theme");
          let getParseObject = JSON.parse(getequationThemeObject)

          if (!getParseObject.settings.layout.darkMode) {
              let ifStarterKit = document.body.getAttribute('page') === 'starter-pack' ? true : false;
              document.body.classList.remove('dark');
              if (ifStarterKit) {
                  if (document.querySelector('.navbar-logo')) {
                      document.querySelector('.navbar-logo').setAttribute('src', './../assets/img/logo2.svg')
                  }
              } else {
                  if (document.querySelector('.navbar-logo')) {
                      document.querySelector('.navbar-logo').setAttribute('src', getParseObject.settings.layout.logo.lightLogo)
                  }
              }

          }
      }

      // Get Layout Information i.e boxed: true or false

      if (equationThemeObject.settings.layout.boxed) {

          localStorage.setItem("theme", JSON.stringify(equationThemeObject));
          let getequationThemeObject = localStorage.getItem("theme");
          let getParseObject = JSON.parse(getequationThemeObject)

          if (getParseObject.settings.layout.boxed) {

              if (document.body.getAttribute('layout') !== 'full-width') {
                  document.body.classList.add('layout-boxed');
                  if (document.querySelector('.header-container')) {
                      // document.querySelector('.header-container').classList.add('container-xxl');
                  }
                  if (document.querySelector('.middle-content')) {
                      document.querySelector('.middle-content').classList.add('container-xxl');
                  }
              } else {
                  document.body.classList.remove('layout-boxed');
                  if (document.querySelector('.header-container')) {
                      document.querySelector('.header-container').classList.remove('container-xxl');
                  }
                  if (document.querySelector('.middle-content')) {
                      document.querySelector('.middle-content').classList.remove('container-xxl');
                  }
              }

          }

      } else {

          localStorage.setItem("theme", JSON.stringify(equationThemeObject));
          let getequationThemeObject = localStorage.getItem("theme");
          let getParseObject = JSON.parse(getequationThemeObject)

          if (!getParseObject.settings.layout.boxed) {

              if (document.body.getAttribute('layout') !== 'boxed') {
                  document.body.classList.remove('layout-boxed');
                  if (document.querySelector('.header-container')) {
                      document.querySelector('.header-container').classList.remove('container-xxl');
                  }
                  if (document.querySelector('.middle-content')) {
                      document.querySelector('.middle-content').classList.remove('container-xxl');
                  }
              } else {
                  document.body.classList.add('layout-boxed');
                  if (document.querySelector('.header-container')) {
                      // document.querySelector('.header-container').classList.add('container-xxl');
                  }
                  if (document.querySelector('.middle-content')) {
                      document.querySelector('.middle-content').classList.add('container-xxl');
                  }
              }
          }
      }

  }
}
