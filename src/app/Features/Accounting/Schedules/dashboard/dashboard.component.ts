import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../../Core/Providers/ApiService/api.service';
import { SchedulesTransactionsComponent } from '../schedules-transactions/schedules-transactions.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  componentDetails: any;
  constructor(
    public apiSrvc: ApiService,
    private ngbmodal: NgbModal,
    private ngbmodalActive: NgbActiveModal,
    private title: Title
  ) {
    this.title.setTitle('Xtract-Schedules');

    const data = {
      title: 'Schedules / Managed Accounts',
      path1: '',
      path2: '',
      path3: '',
    };
    this.apiSrvc.SetHeaderData({
      obj: data,
    });
    this.apiSrvc
      .GetHeaderData()
      .subscribe((res) => (this.componentDetails = res.obj));
    if (this.componentDetails.path1 == '') {
    }
  }

  ngOnInit(): void {}

  openMenu() {
    const modalRef = this.ngbmodal.open(SchedulesTransactionsComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.Parentcomponent = 'SMA';
  }
}
