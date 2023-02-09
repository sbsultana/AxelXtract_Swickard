import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoyaltyactivityDetailsComponent } from './loyaltyactivity-details.component';

const routes: Routes = [{ path: '', component: LoyaltyactivityDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoyaltyactivityDetailsRoutingModule { }
