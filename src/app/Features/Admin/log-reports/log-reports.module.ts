import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogReportsRoutingModule } from './log-reports-routing.module';
import { LogReportsComponent } from './log-reports.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [LogReportsComponent],
  imports: [
    CommonModule,
    LogReportsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxSpinnerModule,
  ],
})
export class LogReportsModule {}
