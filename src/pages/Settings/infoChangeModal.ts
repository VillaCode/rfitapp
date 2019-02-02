import { Component } from '@angular/core';

import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';


@Component({
  template: `
<ion-header>
  <ion-toolbar>
    <ion-title>
      Cambio de información
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios">Cerrar</span>
        <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content>
  <ion-card>
    <ion-card-content>
    Hola runner! Por ahora para poder cambiar información de tu perfil es necesario que nos envíes un correo a: "agustin.aguilart98@gmail.com" o de igual forma comunicarse por teléfono para platicarnos de la situación (+52 667 163 2777). Lo sentimos mucho por el inconveniente y muchas gracias por usar nuestra app.
    </ion-card-content>
  </ion-card> 
</ion-content>
`
})
export class infoChangeModal {
  character;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ){} 
    

  dismiss() {
    this.viewCtrl.dismiss();
  }
}