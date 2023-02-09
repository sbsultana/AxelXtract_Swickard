import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesconvDetailsRoutingModule } from './salesconv-details-routing.module';
import { SalesconvDetailsComponent } from './salesconv-details.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [SalesconvDetailsComponent],
  imports: [
    CommonModule,
    SalesconvDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
})
export class SalesconvDetailsModule {}
