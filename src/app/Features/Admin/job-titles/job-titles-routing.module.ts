import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobTitlesComponent } from './job-titles.component';

const routes: Routes = [{ path: '', component: JobTitlesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobTitlesRoutingModule { }
