import { IonicModule } from '@ionic/angular';
import { CardItemComponent } from './card-item/card-item.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    CardItemComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CardItemComponent
  ]
})
export class ComponentsModule { }
