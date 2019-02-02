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

@NgModule({
  declarations: [
    MyApp,
    CorreTab,
    PerfilTab,
    RetosTab,
    TabsPage,
    configuracionTab,
    infoChangeModal,
    RetoComponente
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
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
    RetoComponente
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NativePageTransitions
  ]
})
export class AppModule {}
