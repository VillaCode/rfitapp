import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';




@Component({
  selector: 'reto',
  templateUrl:'retoComponente.html'
})
export class RetoComponente {

  public retoTitulo = "La carrera del millón";
  public retoDescripcion = "Participa y corre 200km para demostrar que eres lo mejor del mundo."
  public tiempoRestante = "20 días";
  public usuariosInscritos = "2123";

  constructor(public navCtrl: NavController) {

  }


}