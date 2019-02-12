import { Component, OnInit } from '@angular/core';
import { NavController, ViewController, } from 'ionic-angular';
import { configuracionTab } from '../Settings/configuracion'
import { loginModal } from '../Login/login';
import { AuthService } from '../Login/ServiciosLogin/auth.service';
import { servicioUsuario } from '../Login/ServiciosLogin/Usuario.servicioUsuario';
import { Usuario } from '../Login/ServiciosLogin/Usuario';



@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilTab implements OnInit{

  public perfil:Usuario;

  constructor(public navCtrl: NavController, public authservice:AuthService, public servicioUsuario:servicioUsuario) {
    
  }

  async ngOnInit() {
    
    let perfil = await this.servicioUsuario.getOnStorage();
    if(!perfil._email){  
      this.perfil = JSON.parse(perfil);
    }else{
      this.perfil = Usuario.ParseFromObjectStoraged(perfil);
    }
    console.log(this.perfil);
  }

  openSettingsPage(){
    this.navCtrl.push(configuracionTab);
  }

  cerrarSesion(){
    this.authservice.logout();
  }

}
