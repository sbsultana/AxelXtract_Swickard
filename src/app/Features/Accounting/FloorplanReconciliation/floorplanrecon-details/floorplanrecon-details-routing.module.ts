import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FloorplanreconDetailsComponent } from './floorplanrecon-details.component';

const routes: Routes = [{ path: '', component: FloorplanreconDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FloorplanreconDetailsRoutingModule { }
