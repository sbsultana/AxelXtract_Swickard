import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalespersonDetailsRoutingModule } from './salesperson-details-routing.module';
import { SalespersonDetailsComponent } from './salesperson-details.component';


@NgModule({
  declarations: [SalespersonDetailsComponent],
  imports: [
    CommonModule,
    SalespersonDetailsRoutingModule
  ]
})
export class SalespersonDetailsModule { }
