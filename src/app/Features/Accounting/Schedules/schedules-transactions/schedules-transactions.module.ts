import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchedulesTransactionsRoutingModule } from './schedules-transactions-routing.module';
import { SchedulesTransactionsComponent } from './schedules-transactions.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [SchedulesTransactionsComponent],
  imports: [
    CommonModule,
    SchedulesTransactionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class SchedulesTransactionsModule { }
