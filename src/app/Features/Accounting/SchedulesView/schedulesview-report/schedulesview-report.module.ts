import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchedulesviewReportRoutingModule } from './schedulesview-report-routing.module';
import { SchedulesviewReportComponent } from './schedulesview-report.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  IgxCalendarModule,
  IgxSelectModule,
  IgxCardModule,
  IgxInputGroupModule,
} from 'igniteui-angular';
import {
  BsDatepickerModule,
  BsDatepickerConfig,
} from 'ngx-bootstrap/datepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  declarations: [SchedulesviewReportComponent],
  imports: [
    CommonModule,
    SchedulesviewReportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    NgbModule,
    IgxCalendarModule,
    IgxSelectModule,
    IgxCardModule,
    IgxInputGroupModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
})
export class SchedulesviewReportModule {}
