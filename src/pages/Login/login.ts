import { Component, Self } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { registroPage } from '../registro/registro';
import axios from 'axios';
import { AlertController } from 'ionic-angular';

import 'rxjs/add/operator/map'



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
    id: string;
    sharedPerfil: any;
    retos: any;

    constructor(
        public navCtrlL: NavController, 
        public alertCtrl: AlertController, 
        public loadingCtrl: LoadingController,
        // id: string,
        // sharedPerfil: any,
        // retos: any,
        ) {
            // this.id = id;
            // this.sharedPerfil = sharedPerfil;
            // this.retos = retos;
     }


    




     




     //LOGIN//////////////////////////////////////////////////////////////////////////////////////////////////////////////
     login(){
         //Si los datos son correctos, te envía al componente principal
         //encontrar forma de que no te saque al salir de la app

        // return this.loginConfirmado();
        let self = this;

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

        axios({
            
            method: 'post',
            url: "https://thawing-mountain-76893.herokuapp.com/auth/user_login",
            data: {
                json
            }
        })
        .then((data) => {
            
            
            // getDataPromise().then(res => console.log(res))
            //CASO EXITO
            if(data.data.split('?')[0] == "exito"){
                //Guarda ID
                self.id = data.data.split('?')[1];
                console.log(self.id);
                console.log(self);
                //Ejecuta funciones basicas del login

                self.guarda(self.id);

                // sharedPerfil = this.guarda(id);
                // console.log(this.sharedPerfil)
                this.retoActual(this.generaRetos());
                // console.log(this.retos);

                //Termina loader y avanza a la app
                loader.dismiss();
                this.loginConfirmado();
                console.log(Object.keys(self));
                return self.imprimeTodo(self);
            }



            //CASO NO EMAIL
            else if(data.data == "email_inexistente"){
                loader.dismiss();
                return this.alertaEmailIncorrecto();
            }



            //CASO CONTRASEÑA
            else if(data.data == "password_incorrecta"){
                loader.dismiss();
                return this.alertaPasswordIncorrecta();
            }



            //CASO ERROR RANDOM
            else{
                console.log("Funciono pero no");
                loader.dismiss();
                return this.alertaServidor();
            }
        } )


        //CASO ERROR DE SERVIDOR
        .catch(err => { 
            console.log("--------------------------------" + err)
            this.alertaServidor();
        });
    }





















//FUNCIONES BASE PARA LOGIN////////////////////////////////////////////////////////////////////////////////////////////////////







    //GUARDAR PERFIL
    async guarda(id:String){
        let self = this;

        let usuario = {
            id_usuario: id,
        }
        var json = JSON.stringify(usuario);
     
    
        axios({
            method: 'post',
            url: "https://thawing-mountain-76893.herokuapp.com/profile/darInfoUsuario",
            data: {
                json
            }
        })
        .then((data) => {
            self.sharedPerfil = data.data;
            console.log((data.data));
            console.log(self.sharedPerfil);
            return data.data;
            
        } )
        .catch(err => { 
            console.log("--------------------------------" + err)
        });
    };


    //GENERAR RETOS
    async generaRetos(){

        let self = this;


        axios({
            method: 'get',
            url: "https://thawing-mountain-76893.herokuapp.com/retos",
            
        })
        .then((data) => {
            
            self.retos = data.data;
            console.log(self.retos);
            //console.log(JSON.stringify(this.retos) + "!!!!!!!!!!!!!!!!!!!\n");
            for(let i of self.retos){
                i.tiempo = self.redondea(i.tiempo);
            }
            console.log(self.retos);
            return self.retos;
         
        } )
        .catch(err => { 
            console.log("--------------------------------" + err)
        });
    }







    //ASIGNAR RETO ACTUAL
    async retoActual(retos){
        // console.log(Object.keys(this.retos));
        // console.log(retos);
    //   for(let i of this.retos){       
    //     if(i.id == this.sharedPerfil.reto_actual){
    //       console.log("flaggg");
    //       this.sharedPerfil.reto_actual = i;
    //       console.log(this.sharedPerfil.reto_actual);
    //     }
    //   }
    }


   
    
















/////UTILIDADES Y ALERTAS//////////////////////////////////////////////////////////////////////////////////////////////////////////


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

    imprimeTodo(self1:loginModal){
        let retos1:any = self1;
        console.log(retos1);
        console.log(Object.keys(self1))
        
    }

}
