import { Injectable } from "@angular/core";
import { Http, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Usuario } from "./Usuario";
import { servicioUsuario } from "./Usuario.servicioUsuario";
import axios from 'axios';


@Injectable()
export class ApiService {

    private baseUrl = "https://thawing-mountain-76893.herokuapp.com/";
    private perfil: any;

    constructor(private userService: servicioUsuario, private http: Http) {
        console.log('Constructor ApiService inicializado');
        this.getAuthUser();
    }


        //AGARRA USUARIO DE ALMACENAMIENTO
    private getAuthUser() {
        let user = this.userService.getOnStorage();
        if(user){
            this.perfil = user;
        };      
    }


    //LOGINPOST
    async loginPost(email:string, password:string){

    let usuarioLogin = {
        email_login: email,
        password_login: password,
    }
    var json = JSON.stringify(usuarioLogin);

    return axios({
        
        method: 'post',
        url: "https://thawing-mountain-76893.herokuapp.com/auth/user_login",
        data: {
            json
        }
    })
    .then(async (data) => {return data.data;})
            .catch((err: any) => { 
                console.log("--------------------------------" + err)
                return "errorservidor"
            });
        }    
}









    //   postRequest(url: string, body: Object, auth: boolean = true): Observable<Object> {
//     let header = null;

//     if (auth) {
//       header = ApiService.formatHeader();
//     }
//     return this.http.post(this.baseUrl + url, body, header)
//       .map(ApiService.handleBody)
//       .catch(ApiService.handleError);
//   }

  /**
   * Perform a GET request.
   *
//    * @param url
//    * @param auth
//    * @returns {Promise<>}
//    */
//   getRequest(url: string, auth: boolean = true): Observable<Object> {
//     let header = null

//     if(auth) {
//       header = ApiService.formatHeader();
//     }

//     return this.http.get(this.BASE_URL + url, header)
//       .map(ApiService.handleBody)
//       .catch(ApiService.handleError);
//   }

// //   /**
//    * Perform a DELETE request.
//    *
//    * @param url
//    * @param auth
//    * @returns {Observable<>}
//    */
//   deleteRequest(url: string, auth: boolean = true): Observable<Object> {
//     let header = null;

//     if (auth) {
//       header = ApiService.formatHeader();
//     }
//     return this.http.delete(this.BASE_URL + url, header)
//       .map(ApiService.handleBody)
//       .catch(ApiService.handleError);

