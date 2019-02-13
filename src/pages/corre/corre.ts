import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, Environment, ILatLng } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import axios from 'axios';
import { servicioUsuario } from '../Login/ServiciosLogin/Usuario.servicioUsuario';
import { Usuario } from '../Login/ServiciosLogin/Usuario';
import { Observable } from "rxjs/Rx";


interface OnInit {
  ngOnInit(): void
};
declare var google;
// let pathLocal = [], runPath;
let  startTime, endTime;
const options = {
  enableHighAccuracy: true, timeout: 30000,
};


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
  
  
  
  
  constructor(
    public navCtrl: NavController, 
    public googleMaps: GoogleMaps, 
    public geolocation: Geolocation, 
    public servicioUsuario:servicioUsuario,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,

    ) 
    {
      this.isTracking = false;
    };

  async ngOnInit() {
    
    this.loadMap();
    let perfil = await this.servicioUsuario.getOnStorage();
    if(!perfil._email){  
      this.perfil = JSON.parse(perfil);
    }else{
      this.perfil = Usuario.ParseFromObjectStoraged(perfil);
    }
    console.log(this.perfil);
    
    
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
      // console.log("---------------hola------------\n\n\n");
      this.geolocation.getCurrentPosition(options).then((resp) => {
        // const location = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        let mapOptions: GoogleMapOptions = {
          camera: {
            target: {
              lat: resp.coords.latitude,
              lng: resp.coords.longitude
            },
            zoom: 21,
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
    startTime = new Date();
    this.isTracking = true;
    this.geolocation.getCurrentPosition(options).then((resp) => {
      //console.log(resp);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    window.setInterval(() => {
      if (!this.isTracking) {
        return
      }
      this.geolocation.getCurrentPosition(options).then((resp) => {
        this.storePosition(resp);
        console.log(resp.coords.accuracy);
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    }, 5000);
  }








//DETIENE TRACKING. SUBE Y GUARDA STATS.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async stopTracking() {
    const loader = this.loadingCtrl.create();
    if(this.isTracking){
    loader.present();
    this.isTracking = false;
    let distanciaTotal = 0;
    endTime = new Date();
    let timeDiff = endTime - startTime;
    timeDiff /= 1000;
    let seconds = Math.round(timeDiff);
    for (let i = 0; i < this.pathLocal.length - 1; i++) {
      console.log(this.getDistanceFromLatLonInKm(this.pathLocal[i].lat, this.pathLocal[i].lng, this.pathLocal[i + 1]
        .lat, this.pathLocal[i + 1].lng));
      distanciaTotal += this.getDistanceFromLatLonInKm(this.pathLocal[i].lat, this.pathLocal[i].lng, this.pathLocal[
        i + 1].lat, this.pathLocal[i + 1].lng)
    }
    
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
        if(data.data.split('?')[0] == "finalizado"){
          this.perfil.codigoFinalizado = data.data.split('?')[1];
          await this.servicioUsuario.setOnStorage(this.perfil);
          loader.dismiss();
          return this.alertaFinalizado();
        }
        else if(data.data.split('?')[0] == "corrio"){
          this.perfil.reto_actual_distancia += distanciaTotal;
          this.perfil.reto_actual_segundos += seconds;
          await this.servicioUsuario.setOnStorage(this.perfil);
          loader.dismiss();
          return this.alertaCorrio(distanciaTotal, seconds);  
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
  
  storePosition(position) {
    if (position.coords.accuracy < 80) {
      let latlng: ILatLng;
      latlng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      this.pathLocal.push(latlng);
      if (this.pathLocal.length > 1) {
        let polylineOptions = {
          points: this.pathLocal,
        }
        this.map.addPolyline(polylineOptions).then((polyline) => {
          console.log("---------SE AÑADIO UN PUNTO---------");
        });
      }

      // runPath.getPath().push(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    }
    console.log(position.coords.accuracy);
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
    return d;
  }


  alertaFinalizado(){
    const alertFin = this.alertCtrl.create({
        title: '¡Felicidades!',
        subTitle: 'Has terminado exitosamente el reto. Ahora te invitamos a continuar a la sección de Retos para poder utilizar tu código. ',
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
        subTitle: 'Las estadísticas de tu reto han sido actualizadas. <br/> ' + "Distancia recorrida: " + distanciaTotal/1000 + ' km<br/>' + "Tiempo transcurrido: " + Math.round((seconds/3600)* 100) / 100 + ' horas',
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

}