import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgbModule,
    NgxSpinnerModule
  ],
  providers:[NgbActiveModal]
})
export class DashboardModule { }
