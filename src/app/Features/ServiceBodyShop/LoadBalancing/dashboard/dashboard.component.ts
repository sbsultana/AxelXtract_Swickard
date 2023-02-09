import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../Core/Providers/ApiService/api.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isOpen = false;
  constructor(
    public apiSrvc: ApiService,
    private ngbmodal: NgbModal,
    private ngbmodalActive: NgbActiveModal
  ) {
    const data = {
      title: 'Load Balancing',
      path1: '',
      path2: '',
      path3: '',
    };
    this.apiSrvc.SetHeaderData({
      obj: data,
    });
  }

  ngOnInit(): void {}
}
