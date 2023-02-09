import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitReportsComponent } from './cit-reports.component';

const routes: Routes = [{ path: '', component: CitReportsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitReportsRoutingModule { }
