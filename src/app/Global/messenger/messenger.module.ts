import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessengerRoutingModule } from './messenger-routing.module';
import { MessengerComponent } from './messenger.component';


@NgModule({
  declarations: [MessengerComponent],
  imports: [
    CommonModule,
    MessengerRoutingModule
  ]
})
export class MessengerModule { }
