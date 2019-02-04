import { Component } from '@angular/core';
import { NavParams, ViewController, NavController, LoadingController, Header } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { registroPage } from '../registro/registro';
import axios from 'axios';
import { AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import querystring from 'querystring';
import { HTTP } from '@ionic-native/http/ngx';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: "login",
    templateUrl: "login.html",
    
})
export class loginModal {
    
    email:any;
    password:any;
    emailMal:any;
    correcto:any;
    passwordMal:any;
    public id: String;

    constructor(
        public navCtrlL: NavController, 
        public alertCtrl: AlertController, 
        public loadingCtrl: LoadingController,
        private http: HTTP,
        public httpClient: Http
        
        ) {
        
     }

     login(){
         //Si los datos son correctos, te envía al componente principal
         //encontrar forma de que no te saque al salir de la app

        // //prueba
        // return this.loginConfirmado();
        
        
        const loader = this.loadingCtrl.create({
            content: "Por favor espere...",
        });

        if(this.email == null || this.password == null){
            return this.alertaCampoFaltante();
        }

        loader.present();


        let usuarioLogin = {
            email_login: this.email,
            password_login: this.password,
        }
        var json = JSON.stringify(usuarioLogin);
        
        console.log(json);

        axios({
            
            method: 'post',
            url: "https://thawing-mountain-76893.herokuapp.com/auth/user_login",
            data: {
                json
            }
        })
        .then((data) => {

            //CORREGIR LOS IFS CON LOS VALORES QUE ARROJA DATA
            
            console.log(data.data);

            loader.dismiss();
            if(data.data.split('?')[0] == "exito"){
                this.id = data.data.split('?')[1];
                console.log(this.id);
                return this.loginConfirmado();
            }
            else if(data.data == "email_inexistente"){
                return this.alertaEmailIncorrecto();
            }
            else if(data.data == "password_incorrecta"){
                return this.alertaPasswordIncorrecta();
            }
            else{
                console.log("Funciono pero no");
                return this.alertaServidor();
            }
        } )
        .catch(err => { 
            console.log("--------------------------------" + err)
            loader.dismiss();
            this.alertaServidor();
        });

        // // let headers = new Headers();
        // // headers.append('Content-Type', 'application/json');

        // // this.http.post('https://thawing-mountain-76893.herokuapp.com/auth/user_login', JSON.stringify(usuarioLogin), {headers: headers})
        // //     .map(res => res.json())
        // //     .subscribe(data => {
        // //         console.log(data);
        // //     });

        

        
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
