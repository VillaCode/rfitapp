import { Usuario } from "./Usuario";
import axios from 'axios';
import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';



@Injectable()
export class servicioUsuario {

    constructor(private storage: Storage) {}
  
    /* ---------------------------------------------------------------------------------------------------------------- */
    /* ALMACENAMIENTO DEL USUARIO LOGGEADO                                                                                    */
  
    async createOnStorage(user: Usuario){
      console.log("Inicio creatOnStorage");
      console.log(user);
     
      await this.storage.set('user', JSON.stringify(user));
      console.log(this.storage.get('user'));
  
    }
  
 
    async getOnStorage() {
        return await this.storage.get('user');
      };
    
  
   
    async setOnStorage(user: Usuario){
      return await this.storage.set('user', user);
    }
  
   
    async deleteOnStorage() {
      return await this.storage.clear();
    }

    //obtener perfil con ID
    async guardaUsuario(id:String){

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
      .then(async (data) => {
          
          console.log(data.data);
          return data.data;
          
      } )
      .catch(err => { 
          console.log("--------------------------------" + err)
      });
  };
  }