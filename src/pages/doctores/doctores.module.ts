import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctoresPage } from './doctores';

@NgModule({
  declarations: [
    DoctoresPage,
  ],
  imports: [
    IonicPageModule.forChild(DoctoresPage),
  ],
})
export class DoctoresPageModule {}
