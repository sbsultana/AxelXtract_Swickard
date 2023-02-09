import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncomestatementReportRoutingModule } from './incomestatement-report-routing.module';
import { IncomestatementReportComponent } from './incomestatement-report.component';

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
  declarations: [IncomestatementReportComponent],
  imports: [
    CommonModule,
    IncomestatementReportRoutingModule,
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
export class IncomestatementReportModule {}
