import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController, ModalController } from 'ionic-angular';
import axios from 'axios';
import { Usuario } from '../Login/ServiciosLogin/Usuario';
import { servicioUsuario } from '../Login/ServiciosLogin/Usuario.servicioUsuario';
import { bienvenida } from '../retos/bienvenida';



@Component({
  selector: 'page-retos',
  templateUrl: 'retos.html'
})

export class RetosTab implements OnInit {

  public retosActivos: any[];
  public retoActual: any;
  public perfil:Usuario;
  public retos: any;
  public completo: boolean;
  public distanciaActual: number;
  public distanciaTotalReto: number;
  public caducidad: string;
  public retosCargados: boolean = false;
  public noHayRetos: boolean = false;
  
  constructor(
    public navCtrl: NavController, 
    public servicioUsuario:servicioUsuario,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    ) 
    {
    console.log('Constructor retosTab inicializado');
  }


  //PRIMERA ACCION DE PAGINA TABS
  async ngOnInit() {

    //Toma perfil de storage
    let perfil = await this.servicioUsuario.getOnStorage();
    console.log(perfil);

    //Parse info de storage a objeto Usuario
    if(!perfil._email){  
      this.perfil = JSON.parse(perfil);
    }else{
      this.perfil = Usuario.ParseFromObjectStoraged(perfil);
    }

    console.log(this.perfil)

    if(this.perfil.primeraVez){
      this.perfil.primeraVez = false;        
      this.servicioUsuario.setOnStorage(this.perfil);
      this.openWelcome();
    }

    //Carga retos
    await this.generaRetos();

    //Busca y activa las variables del reto actual
    await this.activaRetoActual();

    //Muestra boton si ya terminó el reto
    console.log(this.perfil.codigoFinalizado);
    if(this.perfil.codigoFinalizado && this.perfil.codigoFinalizado.reto_id == this.retoActual.id){
      this.distanciaActual = this.distanciaTotalReto;
      this.completo = true;
    }

    console.log(this.perfil);

  };
 
  
  
  
  
  
  
  
  
  
  
  
  
  
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////CARGA RETOS NO CADUCOS
  
  async generaRetos(){

    

    return axios({
        method: 'get',
        url: "https://thawing-mountain-76893.herokuapp.com/retos",

    })
    .then(async (data) => {
      
      this.retos = data.data;
      this.retosActivos = [];
      console.log(data.data);


      for(let i of data.data){

        i.tiempo = Math.round((i.tiempo/3600) * 100) / 100;
        i.distancia = Math.round(i.distancia/1000 * 100) / 100;

        if(!this.expirado(i.caducidad)){
          this.retosActivos.push(i);
        }
        else{
          console.log(i.nombre + "expirado");
        }
      }
      
      if(this.retosActivos.length == 0){
        this.noHayRetos = true;
        console.log('no hay retos')
      }
      this.retosCargados = true;
      console.log(this.retos);
      console.log(this.retosActivos);
      console.log(this.retosActivos.length);  

    } )
    .catch(err => {   
        console.log("--------------------------------" + err);
        this.noHayRetos = true;
    });
    };










//////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////INSCRIBE UN USUARIO EN NUEVO RETO, ACTUALIZA SERVIDOR, STORAGE Y REINICIA APP

    async inscribirUsuario(item:any){
      const loader = this.loadingCtrl.create();
      loader.present();
      let retoError = this.retoActual;
      let usuario = {
        id_usuario: this.perfil._id,
        id_reto: item.id,
    }
    var json = JSON.stringify(usuario);
        return axios({
            method: 'post',
            url: "https://thawing-mountain-76893.herokuapp.com/profile/inscribirUsuario",
            data: {
                json
            }
        })
        .then(async () => {
         console.log("CORRECTO");
         this.perfil.reto_actual = item.id;
         this.perfil.reto_actual_distancia = '0';
         this.completo = false;
         await this.servicioUsuario.setOnStorage(this.perfil);
         let perfil = await this.servicioUsuario.getOnStorage();
         console.log(perfil);
         this.perfil = Usuario.ParseFromObjectStoraged(perfil);
         console.log(this.perfil);
         this.retoActual = item;
         loader.dismiss();
         document.location.href = 'index.html';
        })
        .catch(err => {
            loader.dismiss(); 
            console.log("--------------------------------" + err)
            this.retoActual = retoError;
            this.alertaServidor();
        });
    };













//////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////BUSCA Y ACTIVA LAS DISTANCIAS Y OBJETIVOS DEL RETO ACTUAL


    activaRetoActual(){
      console.log(this.perfil.reto_actual); 
      console.log(this.retos);  
      if(this.perfil.reto_actual && this.retos){   
        for(let i of this.retos){  
          if(i.id == this.perfil.reto_actual){
            
            console.log("encontrado retoActual:" + i.id);
            this.retoActual = i;
            console.log(this.retoActual);
            this.retoActual.caducidad = this.retoActual.caducidad.split('T')[0];
            this.distanciaActual = Math.round(parseFloat(this.perfil.reto_actual_distancia)/1000 * 100) / 100;
            this.distanciaTotalReto = parseFloat(this.retoActual.distancia);
            
            console.log(this.retoActual.caducidad);
            console.log(this.distanciaActual);
            console.log(this.distanciaTotalReto);

            if(this.expirado(this.retoActual.caducidad)){
              this.retoActual = false;
              this.perfil.codigoFinalizado = undefined;
              this.alertaRetoExperiado();
            }
            
            break;
          }
        }
      }else{
        console.log("error retos o perfil");
      }
    };

    
    
    
    
 








    
    
    
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////UTILIDADES  
    
    redondea(num:any){
      Math.round(num * 100) / 100
    }

    
    
    alertaInscripcion(item:any){
      const alertFin = this.alertCtrl.create({
        title: '¿Estás seguro?',
        subTitle: 'Perderás todo progreso acumulado. Empezarás el siguiente reto desde cero.',
        buttons: [
          
          {
            text: 'Cancelar',
            role: 'cancela'
          },
          
          {
          text: 'Comfirmar inscripción',
          role: 'Inscribir',
          handler: () => {
            this.inscribirUsuario(item);
          }
        }]
      });
      alertFin.present();
    }


    alertaServidor(){
      const alertError = this.alertCtrl.create({
          title: 'Error de servidor',
          subTitle: 'Lo sentimos, en este momento nuestros servidores estan teniendo problemas',
          buttons: ['De acuerdo']
        });
        alertError.present();
    }

    alertaRetoExperiado(){
      const alertError = this.alertCtrl.create({
        title: 'Reto expirado',
        subTitle: 'Sentimos decirte que tu reto actual ha expirado. Te invitamos a inscribirte a un reto nuevo.',
        buttons: ['De acuerdo']
      });
      alertError.present();
    }

    expirado(caduca: string): boolean{
      let caducidad = new Date(caduca);
      let hoy = new Date();
      if(hoy < caducidad){
        return false;
      }
      return true;
    }

    muestraCodigo(){
      const alertError = this.alertCtrl.create({
        title: '¡Felicidades!',
        subTitle: 'GUARDA y utiliza este código para canjear tu premio en la tienda de tu respectivo patrocinador: <br/><br/>' + this.perfil.codigoFinalizado + ' <br/><br/>' + 'Recuerda usarlo antes de la fecha de expiración',
        buttons: ['Perfecto']
      });
      alertError.present();
    }
  
    
    botonInscribir(item:any){
      if(!this.retoActual){
        this.inscribirUsuario(item)
      }else{
        this.alertaInscripcion(item);
      }
    }



    //////////////////////SLIDES

    openWelcome(){
      let infoModal = this.modalCtrl.create(bienvenida);
      infoModal.present();
    }
  

}
