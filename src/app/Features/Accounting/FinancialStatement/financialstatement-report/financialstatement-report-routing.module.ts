import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinancialstatementReportComponent } from './financialstatement-report.component';

const routes: Routes = [{ path: '', component: FinancialstatementReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialstatementReportRoutingModule { }
