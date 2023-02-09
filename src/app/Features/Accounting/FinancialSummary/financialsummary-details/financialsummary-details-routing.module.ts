import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinancialsummaryDetailsComponent } from './financialsummary-details.component';

const routes: Routes = [{ path: '', component: FinancialsummaryDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialsummaryDetailsRoutingModule { }
