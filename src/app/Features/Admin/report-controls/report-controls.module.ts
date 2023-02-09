import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportControlsRoutingModule } from './report-controls-routing.module';
import { ReportControlsComponent } from './report-controls.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  declarations: [ReportControlsComponent],
  imports: [
    CommonModule,
    ReportControlsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    Ng2SearchPipeModule,
  ],
})
export class ReportControlsModule {}
