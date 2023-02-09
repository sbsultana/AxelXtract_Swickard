import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogReportsComponent } from './log-reports.component';

const routes: Routes = [{ path: '', component: LogReportsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogReportsRoutingModule { }
