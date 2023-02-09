import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicegrossDetailsRoutingModule } from './servicegross-details-routing.module';
import { ServicegrossDetailsComponent } from './servicegross-details.component';

import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [ServicegrossDetailsComponent],
  imports: [
    CommonModule,
    ServicegrossDetailsRoutingModule,
    NgxSpinnerModule

  ]
})
export class ServicegrossDetailsModule { }
