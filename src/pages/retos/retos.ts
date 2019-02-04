import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Perfil, perfil } from '../Login/Perfil'
import axios from 'axios';




@Component({
  selector: 'page-retos',
  templateUrl: 'retos.html'
})
export class RetosTab {


  public retos: any;
  public retoTitulo = "La carrera del millón";
  public retoDescripcion = "Participa y corre 200km para demostrar que eres lo mejor del mundo."
  public tiempoRestante = "20 días";
  public usuariosInscritos = "2123";
  public tiempo;
  public retoActual;

  constructor(public navCtrl: NavController) {
    this.generaRetos();
  }

  generaRetos(){
    
    let usuario = {
        
    }
    var json = JSON.stringify(usuario);
    
    console.log(json);

    axios({
        method: 'get',
        url: "https://thawing-mountain-76893.herokuapp.com/retos",
        
    })
    .then((data) => {
        
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

    inscribirUsuario(item:any){
      this.retoActual = item.id;  
      
      let usuario = {
        id_usuario: perfil.id,
        id_reto: this.retoActual,
    }
    var json = JSON.stringify(usuario);
    
    console.log(json);
    
        axios({
            method: 'post',
            url: "https://thawing-mountain-76893.herokuapp.com/profile/inscribirUsuario",
            data: {
                json
            }
        })
        .then((data) => {
            
          //alertadeinscripcioncorrecta
         // ejecuta funcion reto actual
         console.log("CORRECTO")
         console.log(data);

        } )
        .catch(err => { 
            console.log("--------------------------------" + err)
            //alertaError
            console.log("error");
        });

      console.log(this.retoActual);
      console.log(perfil.id);
    }



    redondea(num:any){
      Math.round(num * 100) / 100
    }

}
