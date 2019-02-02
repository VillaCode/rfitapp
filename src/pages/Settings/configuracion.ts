import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { infoChangeModal } from '../Settings/infoChangeModal'

@Component({
  selector: 'page-config',
  templateUrl: 'configuracion.html'
})
export class configuracionTab {

  public currentNombre = "Jose Felipe Ibarra";
  public currentUsername = "Jose123";
  public currentPassword = "12345";
  public currentPais = "Mexico";
  public currentCorreo = "josefelo@gmail.com";
  public currentTel = "+52 6672027476";

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }

  openChangeInfo(){
    let infoModal = this.modalCtrl.create(infoChangeModal);
    infoModal.present();
  }
  
}
