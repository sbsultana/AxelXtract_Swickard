import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicegrossDetailsComponent } from './servicegross-details.component';

const routes: Routes = [{ path: '', component: ServicegrossDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicegrossDetailsRoutingModule { }
