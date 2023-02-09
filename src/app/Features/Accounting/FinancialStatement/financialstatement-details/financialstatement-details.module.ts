import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancialstatementDetailsRoutingModule } from './financialstatement-details-routing.module';
import { FinancialstatementDetailsComponent } from './financialstatement-details.component';


@NgModule({
  declarations: [FinancialstatementDetailsComponent],
  imports: [
    CommonModule,
    FinancialstatementDetailsRoutingModule
  ]
})
export class FinancialstatementDetailsModule { }
