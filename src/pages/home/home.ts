import { Component, Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map'
import { Usuario } from '../Login/ServiciosLogin/Usuario';
import { servicioUsuario } from '../Login/ServiciosLogin/Usuario.servicioUsuario';
import { loginModal } from '../Login/login';
import { TabsPage } from '../tabs/tabs';




@Component({
  selector: 'page-perfil',
  template: '',
})


export class Home {
    
    private user: Usuario;
  
    constructor(private userService: servicioUsuario, public navCtrl: NavController) {
      console.log("Constructor home inicializado");      
      this.getAuthUser();
    }
  
    private getAuthUser() {
      this.userService.getOnStorage().then(
        (user) => {
          console.log(user);
          if (!user) {
            console.log("NO hay usuario");
            this.navCtrl.push(loginModal);
          }else{
            console.log("si hay usuario");
            this.user = user;
            console.log(this.user);
            this.navCtrl.push(TabsPage);
          }
        }
      );
    }
  }