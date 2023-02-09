import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoyaltyReportRoutingModule } from './loyalty-report-routing.module';
import { LoyaltyReportComponent } from './loyalty-report.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  IgxCalendarModule,
  IgxCardModule,
  IgxInputGroupModule,
  IgxSelectModule,
} from 'igniteui-angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  declarations: [LoyaltyReportComponent],
  imports: [
    CommonModule,
    LoyaltyReportRoutingModule,
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
export class LoyaltyReportModule {}
