import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRolesRoutingModule } from './job-roles-routing.module';
import { JobRolesComponent } from './job-roles.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  declarations: [JobRolesComponent],
  imports: [
    CommonModule,
    JobRolesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ]
})
export class JobRolesModule { }
