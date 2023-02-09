import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../../Core/Providers/ApiService/api.service';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { SalesreconDetailsComponent } from '../salesrecon-details/salesrecon-details.component';
// import { SrDetailsComponent } from '../sr-details/sr-details.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  date: any;
  Filter: any = 'Store';
  constructor(
    public apiSrvc: ApiService,
    private ngbmodal: NgbModal,
    private ngbmodalActive: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private title: Title,
    private datepipe: DatePipe
  ) {
    this.title.setTitle('Xtract-Sales Reconciliation');
    let newdate = new Date();
    this.date = new Date(newdate.setMonth(newdate.getMonth() - 1));
    const data = {
      title: 'Sales-Reconciliation',
      path1: '',
      path2: '',
      path3: '',
      Month: this.date,
      stores: 0,
      filter: this.Filter,
    };
    this.apiSrvc.SetHeaderData({
      obj: data,
    });
    console.log(data);
  }
  ngOnInit(): void {
    this.GetSalesReconciliationData();
  }

  SRData: any = [];
  CurrentDate: any;
  GetSalesReconciliationData() {
    this.spinner.show();
    this.Month = this.datepipe.transform(this.date, 'dd-MMM-yyyy');
    console.log(this.Month);
    this.CurrentDate = new Date(this.Month);
    console.log(this.CurrentDate);

    let Obj = {
      as_id: this.StoreValues,
      Date: this.Month,
    };
    console.log(Obj);

    this.apiSrvc.postmethod('xtract/GetSalesReconciliation', Obj).subscribe(
      (res) => {
        if (res.status == 200) {
          this.SRData = res.response;
          console.log('SR Data', res.response);
          const index = this.SRData.findIndex((i) => i.Lable2 == 'NewTotal');
          const index1 = this.SRData.findIndex((i) => i.Lable2 == 'UsedTotal');
          this.SRData.unshift(this.SRData[index]);
          this.SRData[index + 1] = this.SRData[index1 + 1];
          this.SRData.splice(this.SRData.length - 1, 1);
          console.log('SR Data', this.SRData);
          this.spinner.hide();
        } else {
          alert('Invalid Details');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  Month: any = '';
  StoreValues: any = 0;
  StoreName: any = 'All Stores';
  ngAfterViewInit(): void {
    this.apiSrvc.GetReports().subscribe((data) => {
      if (data.obj.Reference == 'SRR') {
        this.date = data.obj.month;
        this.Month = data.obj.month;
        this.StoreValues = data.obj.storeValues;
        this.StoreName = data.obj.Sname;
        this.GetSalesReconciliationData();
        const headerdata = {
          title: 'Sales-Reconciliation',
          path1: '',
          path2: '',
          path3: '',
          filter: this.Filter,
          Month: data.obj.month,
          stores: this.StoreValues,
          Sname: this.StoreName,
        };
        this.apiSrvc.SetHeaderData({
          obj: headerdata,
        });
        console.log(headerdata);
      }
    });
  }

  public inTheGreen(value: number): boolean {
    if (value >= 0) {
      return true;
    }
    return false;
  }

  openMenu(Object) {
    console.log(Object);
    console.log(this.StoreValues);
    console.log(this.Month);
    let FA_NAME;
    if (Object.Lable2 == 'Finalized in Accounting') {
      FA_NAME = 'F';
    } else if (Object.Lable2 == 'Not Finalized in Accounting') {
      FA_NAME = 'P';
    }
    const DetailsSR = this.ngbmodal.open(SalesreconDetailsComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    DetailsSR.componentInstance.SRDetails = {
      AS_ID: this.StoreValues,
      DATE: this.Month,
      SR_LABLE1: Object.Lable1,
      SR_LABLE2: FA_NAME,
      STORE_NAME: this.StoreName,
    };
  }
}
