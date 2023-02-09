import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartsgrossReportsComponent } from './partsgross-reports.component';

const routes: Routes = [{ path: '', component: PartsgrossReportsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartsgrossReportsRoutingModule { }
