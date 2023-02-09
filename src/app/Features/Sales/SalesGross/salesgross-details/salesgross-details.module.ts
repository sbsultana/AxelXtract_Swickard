import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesgrossDetailsRoutingModule } from './salesgross-details-routing.module';
import { SalesgrossDetailsComponent } from './salesgross-details.component';

import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [SalesgrossDetailsComponent],
  imports: [CommonModule, SalesgrossDetailsRoutingModule, NgxSpinnerModule],
})
export class SalesgrossDetailsModule {}
