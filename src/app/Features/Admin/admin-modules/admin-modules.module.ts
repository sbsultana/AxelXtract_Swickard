import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminModulesRoutingModule } from './admin-modules-routing.module';
import { AdminModulesComponent } from './admin-modules.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [AdminModulesComponent],
  imports: [
    CommonModule,
    AdminModulesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxSpinnerModule
  ]
})
export class AdminModulesModule { }
