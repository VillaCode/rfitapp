import { Component, Injectable } from '@angular/core';
import axios from 'axios';




@Component({
  selector: 'retoComponent',
})

@Injectable()
export class retosComp {


  public retos: any;
  public tiempo: any;
  public retoActual: any;
  

  constructor() {

  }
  


  // generaRetos(retosLejanos: retosComp): void{
    
  //   // console.log(this.perfilLocal);
  //   // console.log(typeof(this.perfilLocal))
  //   // // console.log(JSON.parse(this.perfilLocal));
  //   // console.log(JSON.stringify(this.perfilLocal));
  //   // console.log(JSON.stringify(this.perfilLocal.sharedPerfil));

  //   axios({
  //       method: 'get',
  //       url: "https://thawing-mountain-76893.herokuapp.com/retos",
        
  //   })
  //   .then((data) => {
        
  //     retosLejanos.retos = data.data;
  //     console.log(Object.keys(retosLejanos.retos));
  //     //console.log(JSON.stringify(this.retos) + "!!!!!!!!!!!!!!!!!!!\n");
  //     for(let i of retosLejanos.retos){
  //       i.tiempo = this.redondea(i.tiempo);
  //     }

     
  //   } )
  //   .catch(err => { 
  //       console.log("--------------------------------" + err)
  //   });
  //   }

  //   inscribirUsuario(item:any): void{
  //     this.retoActual = item.id;  
  //     console.log(this.perfil)
  //     let usuario = {
  //       id_usuario: this.perfil.sharedPerfil.id,
  //       id_reto: this.retoActual,
  //   }
  //   var json = JSON.stringify(usuario);
    
  //   console.log(json);
    
  //       axios({
  //           method: 'post',
  //           url: "https://thawing-mountain-76893.herokuapp.com/profile/inscribirUsuario",
  //           data: {
  //               json
  //           }
  //       })
  //       .then((data) => {
            
  //         //alertadeinscripcioncorrecta
  //        // ejecuta funcion reto actual
  //        console.log("CORRECTO")
  //        console.log(data);

  //       } )
  //       .catch(err => { 
  //           console.log("--------------------------------" + err)
  //           //alertaError
  //           console.log("error");
  //       });

  //     console.log(this.retoActual);
  //     console.log(this.perfil.sharedPerfil);
  //   }


  //   redondea(num:any){
  //     Math.round(num * 100) / 100
  //   }

  //   activaReto(retosGenerados: any, perfil: Perfil){
  //       let retosLibre = retosGenerados;
  //       console.log(Object.keys(retosGenerados));
  //       console.log(Object.keys(retosLibre));
  //       console.log(retosLibre.id);
  //     for(let i of retosLibre){       
  //       if(i.id == perfil.sharedPerfil.reto_actual){
  //         console.log("flaggg");
  //         perfil.sharedPerfil.reto_actual = i;
  //         console.log(perfil.sharedPerfil);
  //       }
  //     }
  //   }

}