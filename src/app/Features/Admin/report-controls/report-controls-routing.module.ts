import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportControlsComponent } from './report-controls.component';

const routes: Routes = [{ path: '', component: ReportControlsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportControlsRoutingModule { }
