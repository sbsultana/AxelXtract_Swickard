import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FloorplanreconDetailsRoutingModule } from './floorplanrecon-details-routing.module';
import { FloorplanreconDetailsComponent } from './floorplanrecon-details.component';


@NgModule({
  declarations: [FloorplanreconDetailsComponent],
  imports: [
    CommonModule,
    FloorplanreconDetailsRoutingModule
  ]
})
export class FloorplanreconDetailsModule { }
