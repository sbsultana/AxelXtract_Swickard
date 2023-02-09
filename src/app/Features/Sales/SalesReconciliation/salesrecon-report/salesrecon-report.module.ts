import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesreconReportRoutingModule } from './salesrecon-report-routing.module';
import { SalesreconReportComponent } from './salesrecon-report.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  IgxCalendarModule,
  IgxCardModule,
  IgxInputGroupModule,
  IgxSelectModule,
} from 'igniteui-angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  declarations: [SalesreconReportComponent],
  imports: [
    CommonModule,
    SalesreconReportRoutingModule,
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
export class SalesreconReportModule {}
