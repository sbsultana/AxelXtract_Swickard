import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoyaltyactivityDetailsRoutingModule } from './loyaltyactivity-details-routing.module';
import { LoyaltyactivityDetailsComponent } from './loyaltyactivity-details.component';


@NgModule({
  declarations: [LoyaltyactivityDetailsComponent],
  imports: [
    CommonModule,
    LoyaltyactivityDetailsRoutingModule
  ]
})
export class LoyaltyactivityDetailsModule { }
