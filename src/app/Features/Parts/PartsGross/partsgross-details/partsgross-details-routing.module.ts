import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartsgrossDetailsComponent } from './partsgross-details.component';

const routes: Routes = [{ path: '', component: PartsgrossDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartsgrossDetailsRoutingModule { }
