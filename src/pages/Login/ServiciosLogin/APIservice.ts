import { Injectable } from "@angular/core";
import { Http, RequestOptions } from "@angular/http";
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


    async postFeedback(comentario:string, id:string){
        let feedback = {
            id_usuario: id,
            comentario: comentario,
        }
        var json = JSON.stringify(feedback);
    
        return axios({
            
            method: 'post',
            url: "https://thawing-mountain-76893.herokuapp.com/comentario",
            data: {
                json
            }
        })
        .then(async (data) => {return console.log(data.data);})
                .catch((err: any) => { 
                    console.log("--------------------------------" + err)
                });
    }

    async obtenerDistanciaMax(id:string){
        let feedback = {
            id_usuario: id,
        }

        var json = JSON.stringify(feedback);
    
        return await axios({
            
            method: 'post',
            url: "https://thawing-mountain-76893.herokuapp.com/distanciaTotal",
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

    async obtenerUltimoCodigo(id: string){
        let feedback = {
            usuario_id: id,
        }

        var json = JSON.stringify(feedback);
    
        return await axios({
            
            method: 'post',
            url: "https://thawing-mountain-76893.herokuapp.com/ultimoCodigo",
            data: {
                json
            }
        })
        .then(async (data) => {
            
            console.log(data.data);
            return data.data;})
                .catch((err: any) => { 
                    console.log("--------------------------------" + err);
                });
    }
    
    
}


