import { Component } from '@angular/core';

import { Platform, NavParams, ViewController } from 'ionic-angular';


@Component({
  template: `

  <ion-content no-padding	>
  <ion-card no-margin	style="height: 99.5%; width: 99%; box-shadow: none !important;">

    <ion-slides pager>
  <ion-slide padding *ngFor="let slide of slides">
    
    <h2 class="slide-title" [innerHTML]="slide.title"></h2>
    <p [innerHTML]="slide.description"></p>
    </ion-slide>
      <ion-slide>
       <h2 class="slide-title">¿Listo para correr?</h2>
        <button ion-button large clear icon-end color="primary" (click)="dismiss()">
           Continuar
         <ion-icon name="arrow-forward"></ion-icon>
        </button>
      </ion-slide>
    </ion-slides>
  </ion-card>
  </ion-content> 

`
})
export class bienvenida {
  character;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ){} 
    

  dismiss() {
    this.viewCtrl.dismiss();
  }

  slides = [
    {
      title: "¡Bienvenido a R-Fit!",
      description: "Primero que nada, queremos darte las gracias por ayudarnos a empezar este proyecto. Sabemos que la espera ha sido larga, pero valdrá la pena. Hoy empiezas tu travesía con nosotros y estamos muy orgullosos y agradecidos de tenerte. Todavía nos queda mucho por mejorar pero poco a poco creceremos gracias a ti. Bienvenido.",
      
    }
  ];
}