import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalespersonReportComponent } from './salesperson-report.component';

const routes: Routes = [{ path: '', component: SalespersonReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalespersonReportRoutingModule { }
