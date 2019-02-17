import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { CorreTab } from '../pages/corre/corre';
import { PerfilTab } from '../pages/perfil/perfil';
import { RetosTab } from '../pages/retos/retos';
import { configuracionTab } from '../pages/Settings/configuracion';
import { infoChangeModal } from '../pages/Settings/infoChangeModal';
import { loginModal } from "../pages/Login/login";
import { registroPage } from '../pages/registro/registro';
import { HttpModule } from '@angular/http';
import { HTTP } from '@ionic-native/http/ngx';
import { GoogleMap, GoogleMaps, GoogleMapsEvent } from '@ionic-native/google-maps';
import { ApiService } from '../pages/Login/ServiciosLogin/APIservice';
import { AuthService } from '../pages/Login/ServiciosLogin/auth.service';
import { servicioUsuario } from '../pages/Login/ServiciosLogin/Usuario.servicioUsuario';
import { Home } from '../pages/home/home';
import { Usuario } from '../pages/Login/ServiciosLogin/Usuario';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/';
import {RoundProgressModule} from 'angular-svg-round-progressbar';


@NgModule({
  declarations: [
    MyApp,
    CorreTab,
    PerfilTab,
    RetosTab,
    TabsPage,
    configuracionTab,
    infoChangeModal,
    loginModal,
    registroPage,
    Home,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    RoundProgressModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CorreTab,
    PerfilTab,
    RetosTab,
    TabsPage,
    configuracionTab,
    infoChangeModal,
    loginModal,
    registroPage,
    Home,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NativePageTransitions,
    PerfilTab,
    HTTP,
    ApiService,
    AuthService,
    servicioUsuario,
    Usuario,
    Storage,
  ]
})
export class AppModule {}
