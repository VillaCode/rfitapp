import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {GoogleMaps,GoogleMap,GoogleMapsEvent,GoogleMapOptions,Environment} from '@ionic-native/google-maps'

interface OnInit {
  ngOnInit(): void
}
@Component({
  selector: 'page-corre',
  templateUrl: 'corre.html'
})
export class CorreTab implements OnInit {
  map : GoogleMap;
  mapElement: HTMLElement;
  constructor(public navCtrl: NavController, public googleMaps : GoogleMaps) {

  }

  ngOnInit(){
    this.loadMap();
  }

  loadMap(){


    try {
      Environment.setEnv({
        'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyADpe3tsTbjXVhsnGiu2TKzxqA1XH185to',
        'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyADpe3tsTbjXVhsnGiu2TKzxqA1XH185to'
      });
      let mapOptions: GoogleMapOptions = {
        camera: {
           target: {
             lat: 43.0741904,
             lng: -89.3809802
           },
           zoom: 10,
         }
      };
      this.map = GoogleMaps.create('map', mapOptions);

    } catch (error) {
      alert('error de : '+ error);
      
    }
  }

}
