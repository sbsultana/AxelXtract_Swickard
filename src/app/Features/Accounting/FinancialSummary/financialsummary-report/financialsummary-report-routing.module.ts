import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinancialsummaryReportComponent } from './financialsummary-report.component';

const routes: Routes = [{ path: '', component: FinancialsummaryReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialsummaryReportRoutingModule { }
