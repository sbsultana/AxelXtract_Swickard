import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulesviewDetailsComponent } from './schedulesview-details.component';

const routes: Routes = [{ path: '', component: SchedulesviewDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulesviewDetailsRoutingModule { }
