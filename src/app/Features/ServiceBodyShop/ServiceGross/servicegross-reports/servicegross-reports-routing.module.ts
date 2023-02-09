import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicegrossReportsComponent } from './servicegross-reports.component';

const routes: Routes = [{ path: '', component: ServicegrossReportsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicegrossReportsRoutingModule { }
