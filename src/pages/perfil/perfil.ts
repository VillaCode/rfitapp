import { Component } from '@angular/core';
import { NavController, } from 'ionic-angular';
import { configuracionTab } from '../Settings/configuracion'



@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilTab {

  public usuario = "Jose Felipe Ibarra";
  public pais = "México.";
  public fechaInicio = "Miembro desde: "+"abril de 2018"+".";
  public DistanciaRecorridaTotal:Number = 9;

  constructor(public navCtrl: NavController) {

  }

  openSettingsPage(){
    this.navCtrl.push(configuracionTab);
  }

}
