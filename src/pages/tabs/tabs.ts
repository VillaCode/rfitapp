import { Component } from '@angular/core';

import { CorreTab } from '../corre/corre';
import { PerfilTab } from '../perfil/perfil';
import { RetosTab } from '../retos/retos';
import { NavController, ModalController } from 'ionic-angular';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = RetosTab;
  tab2Root = CorreTab;
  tab3Root = PerfilTab;
  

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    
  }




  

}
