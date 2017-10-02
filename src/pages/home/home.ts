import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { CitasPage } from '../citas/citas';
import { HistorialPage } from '../historial/historial';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	// tab1Root: any;

	constructor(
  		public navCtrl: NavController,
  		public menu: MenuController
  	) {
			this.menu.enable(true);
  	}
    tab1Root = CitasPage;
    tab2Root = HistorialPage;

}
