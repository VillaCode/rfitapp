import { Component, Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';
import { retosComp } from '../retos/retosComp'




@Component({
  selector: 'page-retos',
  templateUrl: 'retos.html'
})

export class RetosTab {

  public tiempo: any;
  public retoActual: any;
  public retoActivo:any;


  constructor(public navCtrl: NavController, public retos: retosComp) {
    
    this.tiempo = retos.tiempo;
    this.retoActual = retos.retoActual;
    
  }
  


}
