import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesconvReportComponent } from './salesconv-report.component';

const routes: Routes = [{ path: '', component: SalesconvReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesconvReportRoutingModule { }
