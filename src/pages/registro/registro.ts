import { Component } from '@angular/core';
import { Platform, NavParams, ViewController, NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import axios from 'axios';
import { CachedResourceLoader } from '@angular/platform-browser-dynamic/src/resource_loader/resource_loader_cache';

@Component({
    selector: "registro",
    templateUrl: "registro.html"
})
export class registroPage {
   
    // nombre:String;
    email:String;
    username:String;
    password:String;
    cPassword:String;

    

    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController,
        public navCtrl: NavController,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController
      ){
        
      } 
        
    
      dismiss() {
        this.viewCtrl.dismiss();
      }

      registraFuncion(){
        
        const loader = this.loadingCtrl.create({
            content: "Por favor espere...",
        });
        
        if(this.email == null || this.password == null || this.cPassword == null || this.username == null){
            return this.alertaCampoVacio();
        }

        if(!this.validateEmail(this.email)) {
            return this.alertaEmailIncorrecto();
        }

        if(this.cPassword != this.password){
            return this.alertaPasswordIncorrecta();
        }

        loader.present();

        let usuarioInfo = {
            username_signup: this.username,
            password_signup: this.password,
            email_signup: this.email,
        }

        var json = JSON.stringify(usuarioInfo);
        console.log(usuarioInfo);

        axios({
            url: "https://thawing-mountain-76893.herokuapp.com/auth/user_create",
            method: 'post',
            data: {
                json
            }
        })
        .then((data) => {
            
            console.log(data);
            loader.dismiss();
            this.alertaExito(); 
        
        })
        .catch(err => {
            console.log("--------------------------------" + err);
            loader.dismiss();
            this.alertaServidor(err);
        });
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
            title: 'Contraseñas no coinciden',
            subTitle: 'Has ingresado una contraseña incorrecta.',
            buttons: ['De acuerdo']
          });
          alertPassword.present();
     }

     alertaServidor(error:any){
        const alertError = this.alertCtrl.create({
            title: 'Error de servidor',
            subTitle: 'Lo sentimos, en este momento nuestros servidores estan teniendo problemas y no hemos podido registrar su cuenta',
            buttons: ['De acuerdo']
          });
          alertError.present();
     }

     alertaCampoVacio(){
        const alertError = this.alertCtrl.create({
            title: 'Campo faltante',
            subTitle: 'Rellena todos los campos para continuar',
            buttons: ['De acuerdo']
          });
          alertError.present();
        }

    alertaExito(){
        const alertError = this.alertCtrl.create({
            title: 'Su cuenta se ha creado con éxito',
            subTitle: 'Gracias por formar parte de la comunidad fundadora de R-Fit!',
            buttons: [{
                text: 'Iniciar Sesión',
                handler: () => {
                    this.navCtrl.pop();
                }
            }]
            });
            alertError.present();
        }

     validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}

     