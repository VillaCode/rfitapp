import { Component } from '@angular/core';
import { NavController, ViewController, } from 'ionic-angular';
import { configuracionTab } from '../Settings/configuracion'
import { loginModal } from '../Login/login';



@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilTab{

  public usuario = "Jose Felipe Ibarra";
  public pais = "México.";
  public fechaInicio = "Miembro desde: "+"abril de 2018"+".";
  public DistanciaRecorridaTotal:Number = 9;

  constructor(public navCtrl: NavController) {
    
  }

  openSettingsPage(){
    this.navCtrl.push(configuracionTab);
  }

  cerrarSesion(){
    document.location.href = 'index.html';
  }

}
