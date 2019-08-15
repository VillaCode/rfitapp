import { Component, OnInit } from '@angular/core';
import { Usuario } from '../Login/ServiciosLogin/Usuario';
import { NavController, LoadingController, } from 'ionic-angular';
import { configuracionTab } from '../Settings/configuracion';
import { AuthService } from '../Login/ServiciosLogin/auth.service';
import { servicioUsuario } from '../Login/ServiciosLogin/Usuario.servicioUsuario';
import { ApiService } from '../Login/ServiciosLogin/APIservice';



@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilTab implements OnInit{

  public perfil:Usuario;
  public comentario:string;
  public distanciaKM: any;
  public feedStatus: string;
  public botonInfo: string = 'Enviar  ';

  constructor(public navCtrl: NavController, public authservice:AuthService, public servicioUsuario:servicioUsuario, public apiService:ApiService, public loadingCtrl: LoadingController) {
    
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
      if(res.split('?')[1] == 'null' || res.split('?')[1] == '0'){
        this.distanciaKM = 0;
      }else{
        this.distanciaKM = Math.round(parseFloat(res.split('?')[1])/1000 * 10) / 10;
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

  async enviarFeedback(){
    
    console.log(this.comentario);
    this.botonInfo = '';
    this.feedStatus = 'cargando';
    await this.apiService.postFeedback(this.comentario, this.perfil._id).then(() => {
      this.feedStatus = 'correcto';
      this.botonInfo = 'Enviar'
      
    }).catch((error) => {
      console.log('error');
      this.feedStatus = 'error';
      this.botonInfo = 'Enviar'
    });
  }

}
