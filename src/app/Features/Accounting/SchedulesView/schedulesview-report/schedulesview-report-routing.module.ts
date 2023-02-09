import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulesviewReportComponent } from './schedulesview-report.component';

const routes: Routes = [{ path: '', component: SchedulesviewReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulesviewReportRoutingModule { }
