import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoyaltyReportComponent } from './loyalty-report.component';

const routes: Routes = [{ path: '', component: LoyaltyReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoyaltyReportRoutingModule { }
