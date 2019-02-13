import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { registroPage } from '../registro/registro';
import { AlertController } from 'ionic-angular';

import 'rxjs/add/operator/map'

import { AuthService } from './ServiciosLogin/auth.service';
import { Usuario } from './ServiciosLogin/Usuario';
import { servicioUsuario } from './ServiciosLogin/Usuario.servicioUsuario';



@Component({
    selector: "login",
    templateUrl: "login.html",
    
})


export class loginModal {
    

    email:any;
    password:any;
    retos: any;
    id: any;
    usuario:any;

    constructor(
        public navCtrlL: NavController,
        public alertCtrl: AlertController, 
        public loadingCtrl: LoadingController,
        public authservice:AuthService,
        public servicioUsuario:servicioUsuario,
        ) {
            console.log('Constructor login inicializado');
        }
        

     async login(){

        const loader = this.loadingCtrl.create({
            content: "Iniciando sesión...",
        });
 
        if(this.email == null || this.password == null){
            return this.alertaCampoFaltante();
        }
        
        loader.present();

        let res:any = await this.authservice.login(this.email, this.password);
        console.log(res);
        
        if(res.split('?')[0] == "exito"){
        this.id = res.split('?')[1];
        //Termina loader y avanza a la app
        
        
        let usuarioParseado = Usuario.ParseFromObjectAxios(await this.servicioUsuario.guardaUsuario(this.id));
        console.log(usuarioParseado);
            
        await this.servicioUsuario.createOnStorage(usuarioParseado);

        console.log("EXITO");
        loader.dismiss();
        return this.navCtrlL.push(TabsPage);
        
        }



        //CASO EMAIL INCORRECTO
        else if(res == "email_inexistente"){
            loader.dismiss();
            return this.alertaEmailIncorrecto();
        }



        //CASO CONTRASEÑA
        else if(res == "password_incorrecta"){
            loader.dismiss();
            return this.alertaPasswordIncorrecta();
        }



        //CASO ERROR RANDOM
        else{
            console.log("Funciono pero no");
            console.log(res);
            loader.dismiss();
            return this.alertaServidor();
        }

        
     }

     


































     redondea(num:any){
        Math.round(num * 100) / 100
      }
 
      abrirRegistro(){
        this.navCtrlL.push(registroPage);
    }
 
    loginConfirmado(){
       this.navCtrlL.push(TabsPage);
    }
 
    alertaEmailIncorrecto(){
       const alertEmail = this.alertCtrl.create({
           title: 'Correo no válido',
           subTitle: 'Has ingresado un correo no existente o incorrecto.',
           buttons: ['De acuerdo']
         });
         alertEmail.present();
    }
 
    alertaPasswordIncorrecta(){
       const alertPassword = this.alertCtrl.create({
           title: 'Contraseña Incorrecta',
           subTitle: 'Has ingresado una contraseña incorrecta.',
           buttons: ['De acuerdo']
         });
         alertPassword.present();
    }
 
    alertaServidor(){
       const alertError = this.alertCtrl.create({
           title: 'Error de servidor',
           subTitle: 'Lo sentimos, en este momento nuestros servidores estan teniendo problemas',
           buttons: ['De acuerdo']
         });
         alertError.present();
    }
 
    alertaCampoFaltante(){
       const alertError = this.alertCtrl.create({
           title: 'Campo faltante',
           subTitle: 'Rellena todos los campos para continuar',
           buttons: ['De acuerdo']
         });
         alertError.present();
       }

    
    }



     




     


