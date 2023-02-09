import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesreconReportComponent } from './salesrecon-report.component';

const routes: Routes = [{ path: '', component: SalesreconReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesreconReportRoutingModule { }
