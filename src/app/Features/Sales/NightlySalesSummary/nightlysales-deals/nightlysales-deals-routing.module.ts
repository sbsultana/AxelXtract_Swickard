import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NightlysalesDealsComponent } from './nightlysales-deals.component';

const routes: Routes = [{ path: '', component: NightlysalesDealsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NightlysalesDealsRoutingModule { }
