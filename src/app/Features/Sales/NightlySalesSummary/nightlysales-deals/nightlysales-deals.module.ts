import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NightlysalesDealsRoutingModule } from './nightlysales-deals-routing.module';
import { NightlysalesDealsComponent } from './nightlysales-deals.component';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [NightlysalesDealsComponent],
  imports: [
    CommonModule,
    NightlysalesDealsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NightlysalesDealsModule { }
