import { Component, Injectable } from '@angular/core';
import axios from 'axios';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map'




@Component({
    selector: "Perfil",
    template: "login.html",
    
})

@Injectable()
export class Perfil {

    public sharedPerfil:any;

    constructor() {
        
     }

guardarPerfil(id:String): void{

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
        this.sharedPerfil = data.data;
        
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
                id_usuario: this.sharedPerfil.id,
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


    getData(){
        return this.sharedPerfil;
    }

}