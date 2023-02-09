import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoyaltyactivityReportComponent } from './loyaltyactivity-report.component';

const routes: Routes = [{ path: '', component: LoyaltyactivityReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoyaltyactivityReportRoutingModule { }
