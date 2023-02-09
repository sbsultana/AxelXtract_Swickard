import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobRolesComponent } from './job-roles.component';

const routes: Routes = [{ path: '', component: JobRolesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRolesRoutingModule { }
