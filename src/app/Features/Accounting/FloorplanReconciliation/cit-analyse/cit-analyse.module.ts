import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitAnalyseRoutingModule } from './cit-analyse-routing.module';
import { CitAnalyseComponent } from './cit-analyse.component';


@NgModule({
  declarations: [CitAnalyseComponent],
  imports: [
    CommonModule,
    CitAnalyseRoutingModule
  ]
})
export class CitAnalyseModule { }
