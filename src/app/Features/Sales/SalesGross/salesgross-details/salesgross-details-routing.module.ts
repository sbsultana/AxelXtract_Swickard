import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesgrossDetailsComponent } from './salesgross-details.component';

const routes: Routes = [{ path: '', component: SalesgrossDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesgrossDetailsRoutingModule { }
