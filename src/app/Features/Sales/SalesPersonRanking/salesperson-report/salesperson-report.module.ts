import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalespersonReportRoutingModule } from './salesperson-report-routing.module';
import { SalespersonReportComponent } from './salesperson-report.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [SalespersonReportComponent],
  imports: [
    CommonModule,
    SalespersonReportRoutingModule,
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
  exports: [SalespersonReportComponent],
})
export class SalespersonReportModule {}
