import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, Environment, ILatLng } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import axios from 'axios';
import { servicioUsuario } from '../Login/ServiciosLogin/Usuario.servicioUsuario';
import { Usuario } from '../Login/ServiciosLogin/Usuario';
import { BackgroundGeolocation, BackgroundGeolocationResponse, BackgroundGeolocationConfig } from '@ionic-native/background-geolocation';
import 'rxjs/add/operator/filter';
import { stringify } from '@angular/compiler/src/util';


declare var google;

const opcionesGeolocation = {
  enableHighAccuracy: true, 
  timeout: 30000, 
  desiredAccuracy: 0,
  startForeground: true,
  stopOnTerminate: true,
};
let options = {

  timeout: 5000,
  maximumAge: 30000,
  enableHighAccuracy: true,
  desiredAccuracy: 0,
  stationaryRadius: 1,
  distanceFilter: 1,
  startForeground: true,
  stopOnTerminate: true,

}

//NO CRASHEES PLS
@Component({
  selector: 'page-corre',
  templateUrl: 'corre.html'
})
export class CorreTab implements OnInit {
  isTracking : boolean;
  pathLocal: ILatLng[];
  map: GoogleMap;
  perfil: Usuario;
  codigo: any;
  public latitud: any;
  public longitud: any; 
  public startTime: any; 
  public endTime: any;
   
  
  constructor(
    public navCtrl: NavController, 
    public googleMaps: GoogleMaps, 
    public geolocation: Geolocation, 
    public servicioUsuario:servicioUsuario,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public backgroundGeolocation: BackgroundGeolocation,
    ) 
    {
      this.isTracking = false;
      this.loadMap();
      this.startBackgroundConfig();
    };

  async ngOnInit() {
    
    let perfil = await this.servicioUsuario.getOnStorage();
    if(!perfil._email){  
      this.perfil = JSON.parse(perfil);
    }else{
      this.perfil = Usuario.ParseFromObjectStoraged(perfil);
    }
    console.log(this.perfil);
    //this.backgroundGeolocation.start();
    //this.startBackground();
  }








//CARGA EL MAPA
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  loadMap() {


    try {
      this.pathLocal = [];
      Environment.setEnv({
        'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyADpe3tsTbjXVhsnGiu2TKzxqA1XH185to',
        'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyADpe3tsTbjXVhsnGiu2TKzxqA1XH185to'
      });
     
      this.geolocation.getCurrentPosition(opcionesGeolocation).then((location) => {
       
        let mapOptions: GoogleMapOptions = {
          camera: {
            target: {
              lat: location.coords.latitude,
              lng: location.coords.longitude
            },
            zoom: 20,
          }
        };
        this.map = GoogleMaps.create('map', mapOptions);
      }).catch((error) => {
        console.log('Error getting location', error);
      });


    } catch (error) {
      alert('error de : ' + error);
    }
  }








//COMIENZA A HACER TRACKING
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  startTracking() {

    //Verifica que este inscrito a un reto
    if(this.perfil.reto_actual){

      //inicializa fecha de corrida
      this.startTime = new Date();

      //Cambia el estado de isTracking
      this.isTracking = true;
      

      //DOWAIL
      this.backgroundGeolocation.getCurrentLocation(options).then((resp) => {
        this.storePosition(resp);
      }).catch((error) => {
        console.log('Error getting location', error);
      });


      window.setInterval(() => {
        if (!this.isTracking) {
          return
        }
        console.log(this.backgroundGeolocation.getConfig());

        //Promesa de captura de posicion, 
        this.backgroundGeolocation.getCurrentLocation(options).then((resp) => {

          //Guarda posicion
          this.storePosition(resp);

        }).catch((error) => {
          console.log('Error getting location', error);
        });


      }, 5000);
    }else{
      this.alertaNoReto();
    }
  }




  





//DETIENE TRACKING. SUBE Y GUARDA STATS.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async stopTracking() {
    const loader = this.loadingCtrl.create();
    if(this.isTracking){
    loader.present();
    this.isTracking = false;
    let distanciaTotal = 0;
    this.endTime = new Date();
    let timeDiff = this.endTime - this.startTime;
    timeDiff /= 1000;
    let seconds = Math.round(timeDiff);
    for (let i = 0; i < this.pathLocal.length - 1; i++) {
      console.log(this.getDistanceFromLatLonInKm(this.pathLocal[i].lat, this.pathLocal[i].lng, this.pathLocal[i + 1]
        .lat, this.pathLocal[i + 1].lng));
      distanciaTotal += this.getDistanceFromLatLonInKm(this.pathLocal[i].lat, this.pathLocal[i].lng, this.pathLocal[
        i + 1].lat, this.pathLocal[i + 1].lng)
    }

    this.backgroundGeolocation.finish();
    
    const Url = 'https://thawing-mountain-76893.herokuapp.com/profile/recibirDistancia';
    let informacionDeRun = {
      usuario_id: this.perfil._id,
      distancia: distanciaTotal,
      fecha: new Date(),
      tiempo: seconds
    };
    let json = JSON.stringify(informacionDeRun);
    console.log(informacionDeRun);
    return await axios({
      method: 'post',
      url: Url,
      data: {
        json
      }
    })
      .then(async (data) => {
        this.pathLocal = [];
        console.log(data.data);
        if(data.data.split('?')[0] == "finalizado"){
          this.perfil.codigoFinalizado = data.data.split('?')[1];
          this.perfil.reto_actual_distancia += distanciaTotal;
          this.perfil.reto_actual_segundos += seconds;
          await this.servicioUsuario.setOnStorage(this.perfil);
          loader.dismiss();
          return this.alertaFinalizado();
        }
        else if(data.data == "corrio"){
          this.perfil.reto_actual_distancia += distanciaTotal;
          this.perfil.reto_actual_segundos += seconds;
          await this.servicioUsuario.setOnStorage(this.perfil);
          loader.dismiss();
          return this.alertaCorrio(distanciaTotal, seconds);  
        }else{
          loader.dismiss();
          console.log("no inscrito?");
        }
      })
      .catch(err => {
        loader.dismiss();
        console.log("--------------------------------\n" + err + "\n-----------------");
        return this.alertaServidor();
        });
      }
    }












//Utilidades
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    //Guarda y pinta la posicion
  storePosition(position:any) {
    if (position.accuracy < 40) {
      let latlng: ILatLng;
      latlng = {
        lat: position.latitude,
        lng: position.longitude
      }
      this.pathLocal.push(latlng);
      if (this.pathLocal.length > 1) {
        let polylineOptions = {
          points: this.pathLocal,
          color: '#7c16b8',
        }
        this.map.addPolyline(polylineOptions).then((polyline) => {
          console.log("---------SE AÑADIO UN PUNTO---------");
          console.log(position.accuracy);
        });
      }
    }
    console.log("Accuracy muy alta");
  }




  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }




  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d*1000;
  }














///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////ALERTAS
  alertaFinalizado(){
    const alertFin = this.alertCtrl.create({
        title: '¡Felicidades!',
        subTitle: 'Has terminado exitosamente el reto. Ahora te invitamos a continuar a la sección de Retos para poder utilizar tu código. Guardalo antes de que expire!',
        buttons: [{
          text: 'De acuerdo',
          role: 'De acuerdo',
          handler: () => {
            document.location.href = 'index.html';
          }
        }]
      });
      alertFin.present();
  }

  alertaCorrio(distanciaTotal:number, seconds: number){

    const alertCor = this.alertCtrl.create({
        title: 'Buen trabajo.',
        subTitle: 'Las estadísticas de tu reto han sido actualizadas. <br/> ' + "Distancia recorrida: " + Math.round(distanciaTotal/1000 * 100) / 100 + ' km<br/>' + "Tiempo transcurrido: " + Math.round((seconds/3600)* 100) / 100 + ' horas',
        buttons: [{
          text: 'De acuerdo',
          role: 'De acuerdo',
          handler: () => {
            document.location.href = 'index.html';
          } 
        }]
      });
      alertCor.present();
  }

  alertaServidor(){
    const alertError = this.alertCtrl.create({
        title: 'Error de servidor',
        subTitle: 'Lo sentimos, en este momento nuestros servidores estan teniendo problemas',
        buttons: [{
          text: 'De acuerdo',
          role: 'De acuerdo',
          handler: () => {
            document.location.href = 'index.html';
          }
        }]
      });
      alertError.present();
  }

  alertaNoReto(){
    const alertError = this.alertCtrl.create({
        title: 'No estas inscrito a ningún reto',
        subTitle: 'Para poder empezar a correr, es necesario que estes inscrito a un reto.',
        buttons: [{
          text: 'De acuerdo',
        }]
      });
      alertError.present();
  }



















  startBackgroundConfig() {


    const config: BackgroundGeolocationConfig = {
      
      desiredAccuracy: 0,
      stationaryRadius: 10,
      debug: false, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: true, // enable this to clear background location settings when the app terminates
      startForeground: true,
    };
    
    this.backgroundGeolocation.configure(config)
    .then((location) => {

    console.log(location);
    console.log('HOLA------------------------------------------------------');

    // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
    // and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
    // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
    //this.backgroundGeolocation.finish(); // FOR IOS ONLY

    });
  }

}