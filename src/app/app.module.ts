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
import { RetoComponente } from '../pages/retos/retoComp/retoComponente';
import { loginModal } from "../pages/Login/login";
import { registroPage } from '../pages/registro/registro';
import { HttpModule } from '@angular/http';
import { HTTP } from '@ionic-native/http/ngx';


@NgModule({
  declarations: [
    MyApp,
    CorreTab,
    PerfilTab,
    RetosTab,
    TabsPage,
    configuracionTab,
    infoChangeModal,
    RetoComponente,
    loginModal,
    registroPage,
    
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
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
    RetoComponente,
    loginModal,
    registroPage,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NativePageTransitions,
    loginModal,
    PerfilTab,HTTP
    
  ]
})
export class AppModule {}
