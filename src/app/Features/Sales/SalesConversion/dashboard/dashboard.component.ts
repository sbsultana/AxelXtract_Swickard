import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../../Core/Providers/ApiService/api.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import {ScDetailsComponent} from '../../SalesConversions/sc-details/sc-details.component'
import { Title } from '@angular/platform-browser';
import { SalesconvDetailsComponent } from '../salesconv-details/salesconv-details.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  showhide: any = [];
  constructor(
    public apiSrvc: ApiService,
    private ngbmodal: NgbModal,
    private ngbmodalActive: NgbActiveModal,
    private title: Title
  ) {
    this.title.setTitle('Xtract-Sales Conversion');

    const data = {
      title: 'Sales Conversion',
      path1: 'Store',
      path2: 'Lead Type',
      path3: 'Person',
      path1id: '',
      path2id: '',
      path3id: '',
    };
    this.apiSrvc.SetHeaderData({ obj: data });
  }

  ngOnInit(): void {}
  expandandCollapse(e) {
    const index = this.showhide.findIndex((i) => i == e);
    if (index >= 0) {
      if (e == 'M') {
        this.showhide = [];
      } else {
        this.showhide.splice(index, 1);
      }
    } else {
      this.showhide.push(e);
    }
  }
  openDetails(val) {
    const DetailsSalesConPeron = this.ngbmodal.open(SalesconvDetailsComponent, {
      // size:'xl',
      backdrop: 'static',
    });
    DetailsSalesConPeron.componentInstance.SalesCondetails = [
      {
        userName: val,
      },
    ];
  }

  currentElement: string;

  @ViewChild('scrollOne') scrollOne: ElementRef;
  @ViewChild('scrollTwo') scrollTwo: ElementRef;

  updateVerticalScroll(event): void {
    if (this.currentElement === 'scrollTwo') {
      this.scrollOne.nativeElement.scrollTop = event.target.scrollTop;
    } else if (this.currentElement === 'scrollOne') {
      this.scrollTwo.nativeElement.scrollTop = event.target.scrollTop;
    }
  }

  updateCurrentElement(element: 'scrollOne' | 'scrollTwo') {
    this.currentElement = element;
  }
}
