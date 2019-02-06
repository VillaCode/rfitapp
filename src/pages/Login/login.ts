import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { registroPage } from '../registro/registro';
import axios from 'axios';
import { AlertController } from 'ionic-angular';

import 'rxjs/add/operator/map'
import { Perfil } from './Perfil';



@Component({
    selector: "login",
    templateUrl: "login.html",
    
})


export class loginModal {
    

    email:any;
    password:any;
    perfilData: Perfil;
    retos: any;

    constructor(
        public navCtrlL: NavController,
        public alertCtrl: AlertController, 
        public loadingCtrl: LoadingController,
      
        ) {
            this.perfilData = new Perfil(this.alertCtrl, this.loadingCtrl, this.navCtrlL);
     }


     async login(){
       
       await this.perfilData.login(this.email, this.password);
        console.log(Object.keys(this.perfilData));

        
     }

     

    
    }



     




     


