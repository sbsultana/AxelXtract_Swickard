import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderRoutingModule } from './header-routing.module';
import { HeaderComponent } from './header.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { NgxPrintModule } from 'ngx-print';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    HeaderRoutingModule,
    NgbModule,
    NgxPrintModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[NgbActiveModal],
  exports: [HeaderComponent],
})
export class HeaderModule { }
