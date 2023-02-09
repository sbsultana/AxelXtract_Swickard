import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinancialstatementDetailsComponent } from './financialstatement-details.component';

const routes: Routes = [{ path: '', component: FinancialstatementDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialstatementDetailsRoutingModule { }
