import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountmappingReportComponent } from './accountmapping-report.component';

const routes: Routes = [{ path: '', component: AccountmappingReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountmappingReportRoutingModule { }
