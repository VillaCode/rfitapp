import { Component, Injectable, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import axios from 'axios';
import { servicioUsuario } from '../Login/ServiciosLogin/Usuario.servicioUsuario';
import { Usuario } from '../Login/ServiciosLogin/Usuario';
// import texto from '../Login/Perfil';



@Component({
  selector: 'page-retos',
  templateUrl: 'retos.html'
})

export class RetosTab implements OnInit {

  public retos: any;
  public retoActual;
  public perfil:Usuario;

  constructor(public navCtrl: NavController, public servicioUsuario:servicioUsuario) {
    console.log('Constructor retosTab inicializado');
  }

  async ngOnInit() {
    await this.generaRetos();
    let perfil = await this.servicioUsuario.getOnStorage();
    if(!perfil._email){  
      this.perfil = JSON.parse(perfil);
    }else{
      this.perfil = Usuario.ParseFromObjectStoraged(perfil);
    }
    console.log(this.perfil);
    this.activaRetoActual();
  }
 
  async generaRetos(){

    

    return axios({
        method: 'get',
        url: "https://thawing-mountain-76893.herokuapp.com/retos",

    })
    .then(async (data) => {

      console.log('se arma');
      this.retos = data.data;
      for(let i of this.retos){
        i.tiempo = Math.round((i.tiempo/3600) * 100) / 100
      }
      
      console.log(this.retos);

    } )
    .catch(err => { 
        console.log("--------------------------------" + err)
    });
    }

    async inscribirUsuario(item:any){
      let retoError = this.retoActual;
      this.retoActual = item;
      let usuario = {
        id_usuario: this.perfil._id,
        id_reto: this.retoActual.id,
    }
    var json = JSON.stringify(usuario);
        return axios({
            method: 'post',
            url: "https://thawing-mountain-76893.herokuapp.com/profile/inscribirUsuario",
            data: {
                json
            }
        })
        .then(async () => {
         console.log("CORRECTO")
         this.perfil.reto_actual = item.id;
         await this.servicioUsuario.setOnStorage(this.perfil);
         let perfil = await this.servicioUsuario.getOnStorage();
         console.log(perfil);
         this.perfil = Usuario.ParseFromObjectStoraged(perfil);
         console.log(this.perfil);
         
        } )
        .catch(err => { 
            console.log("--------------------------------" + err)
            this.retoActual = retoError;
        });
    }


    activaRetoActual(){
      console.log(this.perfil.reto_actual); 
      console.log(this.retos);  
      if(this.perfil.reto_actual && this.retos){   
        for(let i of this.retos){  
          console.log(i);     
          if(i.id == this.perfil.reto_actual){
            console.log("encontrado retoActual:" + i.id);
            this.retoActual = i;
            console.log(this.retoActual);
            break;
          }
        }
      }else{
        console.log("error retos o perfil");
      }
    }

    redondea(num:any){
      Math.round(num * 100) / 100
    }

}
