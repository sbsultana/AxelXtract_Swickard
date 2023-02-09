import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalespersonDetailsComponent } from './salesperson-details.component';

const routes: Routes = [{ path: '', component: SalespersonDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalespersonDetailsRoutingModule { }
