import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleReportsComponent } from './schedule-reports.component';

const routes: Routes = [{ path: '', component: ScheduleReportsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleReportsRoutingModule { }
