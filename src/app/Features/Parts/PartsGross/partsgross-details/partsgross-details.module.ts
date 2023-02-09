import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartsgrossDetailsRoutingModule } from './partsgross-details-routing.module';
import { PartsgrossDetailsComponent } from './partsgross-details.component';

import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [PartsgrossDetailsComponent],
  imports: [
    CommonModule,
    PartsgrossDetailsRoutingModule,
    NgxSpinnerModule
  ]
})
export class PartsgrossDetailsModule { }
