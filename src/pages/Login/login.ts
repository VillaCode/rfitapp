import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { registroPage } from '../registro/registro';
import { AlertController } from 'ionic-angular';
import { Usuario } from './ServiciosLogin/Usuario';
import 'rxjs/add/operator/map'
import { servicioUsuario } from './ServiciosLogin/Usuario.servicioUsuario';
import { AuthService } from './ServiciosLogin/auth.service';
import { ApiService } from './ServiciosLogin/APIservice';



@Component({
    selector: "login",
    templateUrl: "login.html",
    
})


export class loginModal {
    

    email:any;
    password:any;
    retos: any;
    id: any;
    usuario:any;

    constructor(
        public navCtrlL: NavController,
        public alertCtrl: AlertController, 
        public loadingCtrl: LoadingController,
        public authservice:AuthService,
        public servicioUsuario:servicioUsuario,
        public apiService: ApiService,
        ) {
            console.log('Constructor login inicializado');
        }
        

     async login(){
        
        //crea loader
        const loader = this.loadingCtrl.create({
            content: "Iniciando sesión...",
        });
        
        //caso de campovacio
        if(this.email == null || this.password == null){
            return this.alertaCampoFaltante();
        }
        
        //presenta loader
        loader.present();

        //Request para ver si credenciales son correctas
        let res:any = await this.authservice.login(this.email, this.password);
        console.log(res);
        


        ////////////////////////////////////////////////////////
        //Casos de posible respuestas del request

        //caso Exito.
        if(res.split('?')[0] == "exito"){
        
        //Se guarda id
        this.id = res.split('?')[1];
        console.log(this.id);
        //la id se utiliza para hacer otro request en el que se pasa el usuario como un objeto mediante la id.
        let usuarioParseado = Usuario.ParseFromObjectAxios(await this.servicioUsuario.guardaUsuario(this.id));

        //se verifica si existe codigo y si es el caso se le agrega al usuario
        let ultimoCodigo = await this.apiService.obtenerUltimoCodigo(this.id)
        usuarioParseado.codigoFinalizado = ultimoCodigo;

        usuarioParseado.primeraVez = true;
        console.log(usuarioParseado);

        //se guarda usuario en storage    
        await this.servicioUsuario.createOnStorage(usuarioParseado);

        //Termina loader y avanza a la app
        console.log("EXITO");
        loader.dismiss();
        return this.navCtrlL.push(TabsPage);
        
        }



        //CASO EMAIL INCORRECTO
        else if(res == "email_inexistente"){
            loader.dismiss();
            return this.alertaEmailIncorrecto();
        }



        //CASO CONTRASEÑA
        else if(res == "password_incorrecta"){
            loader.dismiss();
            return this.alertaPasswordIncorrecta();
        }



        //CASO ERROR RANDOM
        else{
            console.log("Funciono pero no");
            console.log(res);
            loader.dismiss();
            return this.alertaServidor();
        }

        
     }

     


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

     redondea(num:any){
        Math.round(num * 100) / 100
      }
 
      abrirRegistro(){
        this.navCtrlL.push(registroPage);
    }
 
    loginConfirmado(){
       this.navCtrlL.push(TabsPage);
    }
 
    alertaEmailIncorrecto(){
       const alertEmail = this.alertCtrl.create({
           title: 'Correo no válido',
           subTitle: 'Has ingresado un correo no existente o incorrecto.',
           buttons: ['De acuerdo']
         });
         alertEmail.present();
    }
 
    alertaPasswordIncorrecta(){
       const alertPassword = this.alertCtrl.create({
           title: 'Contraseña Incorrecta',
           subTitle: 'Has ingresado una contraseña incorrecta.',
           buttons: ['De acuerdo']
         });
         alertPassword.present();
    }
 
    alertaServidor(){
       const alertError = this.alertCtrl.create({
           title: 'Error de servidor',
           subTitle: 'Lo sentimos, en este momento nuestros servidores estan teniendo problemas',
           buttons: ['De acuerdo']
         });
         alertError.present();
    }
 
    alertaCampoFaltante(){
       const alertError = this.alertCtrl.create({
           title: 'Campo faltante',
           subTitle: 'Rellena todos los campos para continuar',
           buttons: ['De acuerdo']
         });
         alertError.present();
       }

    
    }



     




     


