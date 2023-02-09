import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountmappingReportRoutingModule } from './accountmapping-report-routing.module';
import { AccountmappingReportComponent } from './accountmapping-report.component';


@NgModule({
  declarations: [AccountmappingReportComponent],
  imports: [
    CommonModule,
    AccountmappingReportRoutingModule
  ]
})
export class AccountmappingReportModule { }
