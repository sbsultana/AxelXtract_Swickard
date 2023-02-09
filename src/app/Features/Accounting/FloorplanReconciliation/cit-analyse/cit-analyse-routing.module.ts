import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitAnalyseComponent } from './cit-analyse.component';

const routes: Routes = [{ path: '', component: CitAnalyseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitAnalyseRoutingModule { }
