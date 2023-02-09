import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesreconDetailsRoutingModule } from './salesrecon-details-routing.module';
import { SalesreconDetailsComponent } from './salesrecon-details.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [SalesreconDetailsComponent],
  imports: [
    CommonModule,
    SalesreconDetailsRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SalesreconDetailsModule {}
