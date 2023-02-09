import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxSpinnerModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
