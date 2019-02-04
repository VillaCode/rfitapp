import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { loginModal } from '../pages/Login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = loginModal;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public modalCtrl: ModalController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
