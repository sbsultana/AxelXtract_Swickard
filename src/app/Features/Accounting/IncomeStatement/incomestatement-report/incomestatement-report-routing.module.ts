import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncomestatementReportComponent } from './incomestatement-report.component';

const routes: Routes = [{ path: '', component: IncomestatementReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomestatementReportRoutingModule { }
