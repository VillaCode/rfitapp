import { Component, OnInit } from '@angular/core';
import { NavController, ViewController, } from 'ionic-angular';
import { configuracionTab } from '../Settings/configuracion'
import { loginModal } from '../Login/login';
import { AuthService } from '../Login/ServiciosLogin/auth.service';
import { servicioUsuario } from '../Login/ServiciosLogin/Usuario.servicioUsuario';
import { Usuario } from '../Login/ServiciosLogin/Usuario';
import { ApiService } from '../Login/ServiciosLogin/APIservice';



@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilTab implements OnInit{

  public perfil:Usuario;
  public comentario:string;
  public distanciaKM:string;

  constructor(public navCtrl: NavController, public authservice:AuthService, public servicioUsuario:servicioUsuario, public apiService:ApiService) {
    
  }

  async ngOnInit() {
    
    let perfil = await this.servicioUsuario.getOnStorage();
    if(!perfil._email){  
      this.perfil = JSON.parse(perfil);
    }else{
      this.perfil = Usuario.ParseFromObjectStoraged(perfil);
    }
    console.log(Object.keys(this.perfil));
    let res = await this.apiService.obtenerDistanciaMax(this.perfil._id);
    console.log(res);
    if(res.split('?')[0] == "exito"){
      if(res.split('?')[1] == 'null'){
        this.distanciaKM = '0';
      }else{
        this.distanciaKM = res.split('?')[1];
      }
    }else{
      this.distanciaKM = "error";
    }
  }

  openSettingsPage(){
    this.navCtrl.push(configuracionTab);
  }

  cerrarSesion(){
    this.authservice.logout();
  }

  enviarFeedback(){
    console.log(this.comentario);
    return this.apiService.postFeedback(this.comentario, this.perfil._id);
  }

}
