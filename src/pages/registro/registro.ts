import { Component } from '@angular/core';
import { Platform, NavParams, ViewController, NavController, AlertController, LoadingController } from 'ionic-angular';
import axios from 'axios';




@Component({
    selector: "registro",
    templateUrl: "registro.html"
})
export class registroPage {
   
    // nombre:String;
    email:string;
    username:string;
    password:string;
    cPassword:string;
    tallaCamisa: string;
    aceptatos: boolean;
    

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
        
        if(this.email == null || this.password == null || this.cPassword == null || this.username == null || this.tallaCamisa == null){
            return this.alertaCampoVacio();
        }

        if(this.cPassword != this.password){
            return this.alertaPasswordIncorrecta();
        }

        if(!this.aceptatos){
            return this.alertaNoAcepto();
        }

        loader.present();

        let usuarioInfo = {
            username_signup: this.username,
            password_signup: this.password,
            email_signup: this.email,
            tallaCamisa: this.tallaCamisa,
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
            subTitle: 'Lo sentimos, en este momento nuestros servidores estan teniendo problemas y no hemos podido registrar su cuenta. Le sugerimos esperar o intentar con otro correo electrónico',
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

    alertaNoAcepto(){
        const alertNoAcepto = this.alertCtrl.create({
            title: 'Debes aceptar nuestros términos y condiciones',
            buttons: ['Continuar']
            });
            alertNoAcepto.present();
        }

}

     