import { Component, Injectable } from '@angular/core';
import axios from 'axios';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import 'rxjs/add/operator/map'
import { registroPage } from '../registro/registro';
import { TabsPage } from '../tabs/tabs';




@Component({
    selector: "Perfil",
    template: "login.html",
    
})


export class Perfil {

    public id:string;
    public perfilData:any;
    public email:string;
    public password:string;

    constructor(
        public alertCtrl: AlertController, 
        public loadingCtrl: LoadingController,
        public navCtrlL: NavController,
    ) {};






    
    //LOGIN//////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async login(email:string, password:string){
        //Si los datos son correctos, te envía al componente principal
        //encontrar forma de que no te saque al salir de la app

       // return this.loginConfirmado();

       this.email = email;
       this.password = password;

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

       return axios({
           
           method: 'post',
           url: "https://thawing-mountain-76893.herokuapp.com/auth/user_login",
           data: {
               json
           }
       })
       .then(async (data) => {
           
           
           // getDataPromise().then(res => console.log(res))
           //CASO EXITO
           if(data.data.split('?')[0] == "exito"){
               //Guarda ID
               this.id = data.data.split('?')[1];
               console.log(this.id);
               console.log(this);
               //Ejecuta funciones basicas del login
               await this.guarda(this.id);
               // sharedPerfil = this.guarda(id);
               // console.log(this.sharedPerfil)
            //    this.retoActual(this.generaRetos());
               // console.log(this.retos);

               //Termina loader y avanza a la app
               loader.dismiss();
               this.loginConfirmado();
               console.log(Object.keys(this));
              
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

       let usuario = {
           id_usuario: id,
       }
       var json = JSON.stringify(usuario);
    
   
       return axios({
           method: 'post',
           url: "https://thawing-mountain-76893.herokuapp.com/profile/darInfoUsuario",
           data: {
               json
           }
       })
       .then((data) => {
           this.perfilData = data.data;
           console.log(this.perfilData);
           return data.data;
           
       } )
       .catch(err => { 
           console.log("--------------------------------" + err)
       });
   };


   //GENERAR RETOS
//    generaRetos(){

//        axios({
//            method: 'get',
//            url: "https://thawing-mountain-76893.herokuapp.com/retos",
           
//        })
//        .then((data) => {
           
//            this.retos = data.data;
//            console.log(this.retos);
//            //console.log(JSON.stringify(this.retos) + "!!!!!!!!!!!!!!!!!!!\n");
//            for(let i of this.retos){
//                i.tiempo = this.redondea(i.tiempo);
//            }
//            console.log(this.retos);
//            return this.retos;
        
//        } )
//        .catch(err => { 
//            console.log("--------------------------------" + err)
//        });
//    }







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

   

}


