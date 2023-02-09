import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BalancesheetReportRoutingModule } from './balancesheet-report-routing.module';
import { BalancesheetReportComponent } from './balancesheet-report.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  IgxCalendarModule,
  IgxCardModule,
  IgxInputGroupModule,
  IgxSelectModule,
} from 'igniteui-angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  declarations: [BalancesheetReportComponent],
  imports: [
    CommonModule,
    BalancesheetReportRoutingModule,
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
  providers: [NgbActiveModal],
})
export class BalancesheetReportModule {}
