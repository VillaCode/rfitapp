import { Component, OnInit } from '@angular/core';
import { Usuario } from '../Login/ServiciosLogin/Usuario';
import { NavController, ModalController } from 'ionic-angular';
import { infoChangeModal } from '../Settings/infoChangeModal'
import { AuthService } from '../Login/ServiciosLogin/auth.service';
import { servicioUsuario } from '../Login/ServiciosLogin/Usuario.servicioUsuario';


@Component({
  selector: 'page-config',
  templateUrl: 'configuracion.html'
})
export class configuracionTab implements OnInit{

  public perfil: Usuario;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public authservice:AuthService, public servicioUsuario:servicioUsuario) {

  }

  async ngOnInit() {
    
    let perfil = await this.servicioUsuario.getOnStorage();
    if(!perfil._email){  
      this.perfil = JSON.parse(perfil);
    }else{
      this.perfil = Usuario.ParseFromObjectStoraged(perfil);
    }
  }

  openChangeInfo(){
    let infoModal = this.modalCtrl.create(infoChangeModal);
    infoModal.present();
  }
  
}
