import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancialsummaryDetailsRoutingModule } from './financialsummary-details-routing.module';
import { FinancialsummaryDetailsComponent } from './financialsummary-details.component';

import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [FinancialsummaryDetailsComponent],
  imports: [
    CommonModule,
    FinancialsummaryDetailsRoutingModule,
    NgxSpinnerModule,
  ],
})
export class FinancialsummaryDetailsModule {}
