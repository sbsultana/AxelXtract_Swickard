import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoresRoutingModule } from './stores-routing.module';
import { StoresComponent } from './stores.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [StoresComponent],
  imports: [
    CommonModule,
    StoresRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxSpinnerModule
  ]
})
export class StoresModule { }
