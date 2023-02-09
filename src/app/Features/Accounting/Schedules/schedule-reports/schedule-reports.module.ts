import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleReportsRoutingModule } from './schedule-reports-routing.module';
import { ScheduleReportsComponent } from './schedule-reports.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { 	IgxCalendarModule,	IgxSelectModule,	IgxCardModule,	IgxInputGroupModule } from "igniteui-angular";
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  declarations: [ScheduleReportsComponent],
  imports: [
    CommonModule,
    ScheduleReportsRoutingModule,
    FormsModule,
    ReactiveFormsModule,BsDatepickerModule.forRoot(),
    NgbModule,
    IgxCalendarModule,
    IgxSelectModule,
    IgxCardModule,
    IgxInputGroupModule,
  NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class ScheduleReportsModule { }
