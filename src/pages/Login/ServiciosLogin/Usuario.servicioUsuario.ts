import { Usuario } from "./Usuario";
import { Subject } from "rxjs/Subject";
import axios from 'axios';
import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';



@Injectable()
export class servicioUsuario {

    private _user: Subject<Usuario> = new Subject<Usuario>();
  
    constructor(private storage: Storage) {}
  
    /* ---------------------------------------------------------------------------------------------------------------- */
    /* Observable                                                                               */
  
    public subscribeToUserService(callback) {
      return this._user.subscribe(callback);
    }
  
    public updateUserService(user: Usuario) {
      this._user.next(user);
    }
  
    /* ---------------------------------------------------------------------------------------------------------------- */
    /* ALMACENAMIENTO DEL USUARIO LOGGEADO                                                                                    */
  
    /**
     * GUARDAR
     *
     * @param user
     * @returns {Promise<Usuario>}
     */
    async createOnStorage(user: Usuario){
      console.log("Inicio creatOnStorage");
      console.log(user);
      // return new Promise((resolve) => {
      //   this.getOnStorage().then(async (res) => {
      //     if (res) {
      //       this.deleteOnStorage().then( async() => {
  
      //       });
      //     }
      //   }).then(async () => {
      //     console.log("fin promesa creatOnStorage");
      //     this.updateUserService(user);
      await this.storage.set('user', JSON.stringify(user));
      console.log(this.storage.get('user'));
        
      //   });
      // });
    }
  
    /**
     * GET
     *
     * 
     */
    async getOnStorage() {
        return await this.storage.get('user');
      };
    
  
    /**
     * GET SYNC
     *
     * @returns {Promise<Usuario>}
     */
    // getOnStorageSync() {
    //   this.updateUserService(JSON.parse(this.storage.get('user')));
    //   return this.storage.get('user');
    // }
  
    /**
     * SET
     *
     */
    async setOnStorage(user: Usuario){
      return await this.storage.set('user', user);
    }
  
    /**
     * ELIMINAR
     *
     * @returns {Promise<Usuario>}
     */
    deleteOnStorage(): Promise<Usuario> {
      return new Promise((resolve) => {
        this.storage.clear();
        resolve();
      });
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