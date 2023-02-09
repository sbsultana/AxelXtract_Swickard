import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancialstatementReportRoutingModule } from './financialstatement-report-routing.module';
import { FinancialstatementReportComponent } from './financialstatement-report.component';

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
  declarations: [FinancialstatementReportComponent],
  imports: [
    CommonModule,
    FinancialstatementReportRoutingModule,
    BsDatepickerModule.forRoot(),
    NgbModule,
    IgxCalendarModule,
    IgxSelectModule,
    IgxCardModule,
    IgxInputGroupModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
})
export class FinancialstatementReportModule {}
