import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesconvDetailsComponent } from './salesconv-details.component';

const routes: Routes = [{ path: '', component: SalesconvDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesconvDetailsRoutingModule { }
