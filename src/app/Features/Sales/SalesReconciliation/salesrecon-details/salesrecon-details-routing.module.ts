import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesreconDetailsComponent } from './salesrecon-details.component';

const routes: Routes = [{ path: '', component: SalesreconDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesreconDetailsRoutingModule { }
