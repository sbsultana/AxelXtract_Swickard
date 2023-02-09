import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NightlysalesReportComponent } from './nightlysales-report.component';

const routes: Routes = [{ path: '', component: NightlysalesReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NightlysalesReportRoutingModule { }
