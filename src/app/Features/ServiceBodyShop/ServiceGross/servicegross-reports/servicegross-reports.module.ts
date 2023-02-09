import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicegrossReportsRoutingModule } from './servicegross-reports-routing.module';
import { ServicegrossReportsComponent } from './servicegross-reports.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { 	IgxCalendarModule,	IgxSelectModule,	IgxCardModule,	IgxInputGroupModule } from "igniteui-angular";
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [ServicegrossReportsComponent],
  imports: [
    CommonModule,
    ServicegrossReportsRoutingModule,
    FormsModule,
    ReactiveFormsModule,BsDatepickerModule.forRoot(),
    NgbModule,
    IgxCalendarModule,
    IgxSelectModule,
    IgxCardModule,
    IgxInputGroupModule,
  NgMultiSelectDropDownModule.forRoot(),
  ],
  providers:[NgbActiveModal]
})
export class ServicegrossReportsModule { }
