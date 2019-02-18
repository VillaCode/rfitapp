import { Injectable } from "@angular/core";

//INFORMACIÓN DEL USUARIO QUE SE GUARDARÁ. REPRESENTADA COMO USUARIO YA AUTENTIFICADO.


@Injectable()
export class Usuario {
    public _email: string;
    public _id: string;
    public reto_actual: string;
    public reto_actual_distancia: string;
    public reto_actual_segundos: string;
    public codigoFinalizado: string;
    public usuario: string;
  

    //INSTANCÍA LA VARIABLE EN CASO DE SER REQUERIDA
    public static GetNewInstance(): Usuario {
      return new Usuario(null, null, null, null, null, null, null);
    }
  

    //REGRESA UN USUARIOIDENTIFICADO DE UN OBJETO AXIOS
    public static ParseFromObjectAxios(object): Usuario {
      console.log(object);
      const model = Usuario.GetNewInstance();
  
      if (object) {
        model._email = object.email;
        model.usuario = object.usuario;
        model._id = object.id;
        model.reto_actual = object.reto_actual;
        model.reto_actual_distancia = object.reto_actual_distancia;
        model.reto_actual_segundos = object.reto_actual_segundos;
        console.log(model);   
      }else{
        console.log("Objeto no existe");
      }
  
      return model;
    }


    //REGRESA UN USUARIOIDENTIFICADO DE UN OBJETO STORAGE
    public static ParseFromObjectStoraged(object:any): Usuario {
      console.log(object);
      const model = Usuario.GetNewInstance();
  
      if (object) {
        model._email = object._email;
        model._id = object._id;
        model.usuario = object.usuario;
        model.reto_actual = object.reto_actual;
        model.reto_actual_distancia = object.reto_actual_distancia;
        model.reto_actual_segundos = object.reto_actual_segundos;
        model.codigoFinalizado = object.codigoFinalizado;
        console.log(model);
      }else{
        console.log("Objeto no existe");
      }
  
      return model;
    }
  
    constructor(
        _email: string, 
        _id: string, 
        reto_actual: string, 
        reto_actual_distancia: string, 
        reto_actual_segundos: string,
        usuario: string,
        codigoFinalizado: string,
      ) 
      {

      this._email = _email;
      this._id = _id;
      this.reto_actual = reto_actual;
      this.reto_actual_distancia = reto_actual_distancia;
      this.reto_actual_segundos = reto_actual_segundos;
      this.usuario = usuario;
      this.codigoFinalizado = codigoFinalizado;
    }
  
  }