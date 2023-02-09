import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulesTransactionsComponent } from './schedules-transactions.component';

const routes: Routes = [{ path: '', component: SchedulesTransactionsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulesTransactionsRoutingModule { }
