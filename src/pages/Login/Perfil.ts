import { Component } from '@angular/core';
import axios from 'axios';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map'
export var perfil : any;



@Component({
    selector: "Perfil",
    template: "login.html",
    
})
export class Perfil {


    constructor(id:String) {

        this.guardarPerfil(id);

     }

guardarPerfil(id:String): void{

    let usuario = {
        id_usuario: id,
    }
    var json = JSON.stringify(usuario);
    
    console.log(json);

    axios({
        method: 'post',
        url: "https://thawing-mountain-76893.herokuapp.com/profile/darInfoUsuario",
        data: {
            json
        }
    })
    .then((data) => {
        perfil = data.data;
        console.log(perfil);
    } )
    .catch(err => { 
        console.log("--------------------------------" + err)
    });
    }

    inscribirUsuario(item:any){
    
        axios({
            method: 'post',
            url: "https://thawing-mountain-76893.herokuapp.com/profile/inscribirUsuario",
            data: {
                id_usuario: perfil.id,
                reto_actual: item.id,
            }
        })
        .then((data) => {
            
          //alertadeinscripcioncorrecta
         // ejecuta funcion reto actual

        } )
        .catch(err => { 
            console.log("--------------------------------" + err)
            //alertaError
        });
        }

}