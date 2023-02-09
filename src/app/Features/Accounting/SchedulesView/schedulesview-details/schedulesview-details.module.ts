import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchedulesviewDetailsRoutingModule } from './schedulesview-details-routing.module';
import { SchedulesviewDetailsComponent } from './schedulesview-details.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SchedulesviewDetailsComponent],
  imports: [
    CommonModule,
    SchedulesviewDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SchedulesviewDetailsModule {}
