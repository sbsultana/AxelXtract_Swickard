import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashflowReportsComponent } from './cashflow-reports.component';

const routes: Routes = [{ path: '', component: CashflowReportsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashflowReportsRoutingModule { }
