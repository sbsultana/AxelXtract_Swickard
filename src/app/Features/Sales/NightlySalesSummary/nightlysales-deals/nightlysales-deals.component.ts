import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../../Core/Providers/ApiService/api.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-nightlysales-deals',
  templateUrl: './nightlysales-deals.component.html',
  styleUrls: ['./nightlysales-deals.component.scss'],
})
export class NightlysalesDealsComponent implements OnInit {
  @Input() Dealsdetails: any = [];
  DealesDetailedData: any = [];
  Tradediv: boolean = false;
  Trade1: boolean = false;
  Trade2: boolean = false;
  ServiceContract: boolean = false;
  Exec: boolean = false;
  GapGross: boolean = false;
  NoData: boolean = false;
  constructor(
    private ngbmodel: NgbModal,
    private renderer: Renderer2,
    private apiSrvc: ApiService,
    private spinner: NgxSpinnerService,
    private title: Title
  ) {
    this.title.setTitle('Xtract-Nightly Sales Summary');

    this.renderer.listen('window', 'click', (e: Event) => {
      const TagName = e.target as HTMLButtonElement;
      if (TagName.className === 'd-block modal fade show modal-static') {
        this.close();
      }
    });
  }

  ngOnInit(): void {
    this.DealesDetailed(this.Dealsdetails[0].id);
  }

  close() {
    this.ngbmodel.dismissAll();
  }

  DealesDetailed(id) {
    const obj = {
      ID: id,
    };
    this.spinner.show();
    this.apiSrvc.postmethod('xtract/GetNightlyDealsDetailed', obj).subscribe(
      (x) => {
        debugger;
        if (x !== '') {
          this.DealesDetailedData = x.response;

          if (this.DealesDetailedData[0].Trade1VIN == '-') {
            this.Trade1 = false;
          } else {
            this.Trade1 = true;
          }
          if (this.DealesDetailedData[0].Trade2VIN == '-') {
            this.Trade2 = false;
          } else {
            this.Trade2 = true;
          }
          if (this.DealesDetailedData[0].VSC == '-') {
            this.ServiceContract = false;
          } else {
            this.ServiceContract = true;
          }
          if (this.DealesDetailedData[0]['EXEC Gross'] == '-') {
            this.Exec = false;
          } else {
            this.Exec = true;
          }
          if (this.DealesDetailedData[0]['Gap Gross'] == '-') {
            this.GapGross = false;
          } else {
            this.GapGross = true;
          }
          if (this.DealesDetailedData.length == 0) {
            this.NoData = true;
          } else {
            this.NoData = false;
          }
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        setTimeout(() => {
          this.spinner.hide();
        }, 3000);
      }
    );
  }
}
