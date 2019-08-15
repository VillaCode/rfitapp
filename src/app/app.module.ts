import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Usuario } from '../pages/Login/ServiciosLogin/Usuario';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { CorreTab } from '../pages/corre/corre';
import { PerfilTab } from '../pages/perfil/perfil';
import { RetosTab } from '../pages/retos/retos';
import { bienvenida } from '../pages/retos/bienvenida';
import { configuracionTab } from '../pages/Settings/configuracion';
import { infoChangeModal } from '../pages/Settings/infoChangeModal';
import { loginModal } from "../pages/Login/login";
import { registroPage } from '../pages/registro/registro';
import { HttpModule } from '@angular/http';
import { HTTP } from '@ionic-native/http/ngx';
import { GoogleMaps } from '@ionic-native/google-maps';
import { ApiService } from '../pages/Login/ServiciosLogin/APIservice';
import { AuthService } from '../pages/Login/ServiciosLogin/auth.service';
import { servicioUsuario } from '../pages/Login/ServiciosLogin/Usuario.servicioUsuario';
import { Home } from '../pages/home/home';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';




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
    bienvenida
    
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
    bienvenida
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geolocation,
    BackgroundGeolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NativePageTransitions,
    PerfilTab,
    HTTP,
    Usuario,
    ApiService,
    AuthService,
    servicioUsuario,
    Storage,
  ]
})
export class AppModule {}
