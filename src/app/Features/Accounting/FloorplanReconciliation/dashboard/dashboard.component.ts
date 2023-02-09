import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../../Core/Providers/ApiService/api.service';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';

import { FloorplanreconDetailsComponent } from '../floorplanrecon-details/floorplanrecon-details.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  FromDate: any;
  ToDate: any;
  CurrentDate = new Date();
  StoreVal: any = 0;

  FloorPlanData: any = [];
  FloorPlanTotalData: any = [];
  TotalFloorPlanData: any = [];
  NoData: boolean = false;
  date: any;
  startDate: any;
  endDate: any;

  today: any;
  days: any = [];
  constructor(
    public apiSrvc: ApiService,
    private ngbmodal: NgbModal,
    private spinner: NgxSpinnerService,
    private ngbmodalActive: NgbActiveModal,
    private title: Title
  ) {
    this.today = new Date();
    this.startDate = new Date();
    this.endDate = new Date(this.startDate);
    this.endDate = new Date(this.endDate.setDate(this.endDate.getDate() + 4));
    for (
      let q = this.startDate;
      q <= this.endDate;
      q.setDate(q.getDate() + 1)
    ) {
      this.days.push({ day: q.toString() });
      console.log(this.days);
    }

    this.title.setTitle('Xtract-CIT Report');
    this.CurrentDate.setDate(this.CurrentDate.getDate() - 1);
    this.ToDate = new Date(
      this.CurrentDate.getFullYear(),
      this.CurrentDate.getMonth(),
      2
    );
    this.FromDate = this.ToDate.toISOString().slice(0, 10);
    this.ToDate = this.CurrentDate.toISOString().slice(0, 10);

    const data = {
      title: 'CIT Report',
      path1: '',
      path2: '',
      path3: '',
      stores: this.StoreVal,
    };
    this.apiSrvc.SetHeaderData({
      obj: data,
    });
  }

  ngOnInit(): void {
    this.Getfloorplansdata();
  }

  Getfloorplansdata() {
    this.FloorPlanData = [];
    this.FloorPlanTotalData = [];
    this.spinner.show();
    const obj = {
      AS_ID: this.StoreVal,
    };
    this.apiSrvc.postmethod('xtract/GetCITFloorPlanData', obj).subscribe(
      (res) => {
        if (res.status == 200) {
          if (res.response != undefined) {
            this.spinner.hide();
            this.FloorPlanData = res.response.filter((e) => e.store != 'TOTAL');
            console.log(this.FloorPlanData);
            this.FloorPlanTotalData = res.response.filter(
              (e) => e.store == 'TOTAL'
            );
            console.log(this.FloorPlanTotalData);
            //this.FloorPlanData[0].AgeData=JSON.parse(res.response[0].AgeData)

            this.FloorPlanData.some(function (x: any) {
              x.AgeData = JSON.parse(x.AgeData);

              return false;
            });

            console.log(this.FloorPlanData);
          } else {
            this.spinner.hide();
            this.NoData = true;
          }
        } else {
          alert('Invalid Details');
        }
      },
      (error) => {
        // // console.log(error);
      }
    );
  }

  public inTheGreen(value: number): boolean {
    if (value >= 0) {
      return true;
    }
    return false;
  }

  Gettotalfloorplans() {
    this.TotalFloorPlanData = [];
    this.spinner.show();
    const obj = {
      // "startdealdate": this.FromDate,
      // "enddealdate": this.ToDate,
      // "StoreID": this.storeIds,
      // "SalesPerson": this.salesPersonId,
      // "SalesManager": this.salesManagerId,
      // "FinanceManager": this.financeManagerId,
      // "dealtype": this.dealType,
      // "saletype": "",
      // "dealstatus": this.dealStatus,
      // "var1": this.path1,
      // "var2": this.path2,
      // "var3": this.path3,
      // "Rowtype": "D"
    };
    this.apiSrvc.postmethod('xtract/Get', obj).subscribe(
      (totalres) => {
        if (totalres.status == 200) {
          if (totalres.response != undefined) {
            this.TotalFloorPlanData = totalres.response;
          } else {
            this.spinner.hide();
            this.NoData = true;
          }
        } else {
          alert('Invalid Details');
        }
      },
      (error) => {
        // // console.log(error);
      }
    );
  }

  ngAfterViewInit(): void {
    this.apiSrvc.GetReports().subscribe((data) => {
      if (data.obj.Reference == 'CFR') {
        // this.date = data.obj.month
        // this.Month = data.obj.month
        // this.StoreValues = data.obj.storeValues
        // this.StoreName = data.obj.Sname
        this.StoreVal = data.obj.storeValues;
        this.Getfloorplansdata();
        const headerdata = {
          title: 'CIT Report',
          path1: '',
          path2: '',
          path3: '',
          Month: data.obj.month,
          stores: data.obj.storeValues,
          filter: data.obj.filters,
          subfilter: data.obj.subfilters,
        };
        // // console.log(headerdata)
        this.apiSrvc.SetHeaderData({
          obj: headerdata,
        });
      }
    });
  }
  avgdays(template) {
    this.ngbmodalActive = this.ngbmodal.open(template, {
      size: 'sm',
      backdrop: 'static',
    });
  }

  onclose() {
    this.ngbmodalActive.close();
  }

  isDesc: boolean = false;
  column: string = 'CategoryName';

  sort(property) {
    this.isDesc = !this.isDesc; //change the direction
    this.column = property;
    let direction = this.isDesc ? 1 : -1;
    // // console.log(property)
    this.FloorPlanData.sort(function (a, b) {
      if (a[property] < b[property]) {
        return -1 * direction;
      } else if (a[property] > b[property]) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
  }

  openMenu(Object) {
    console.log(Object);

    const DetailsSalesPeron = this.ngbmodal.open(
      FloorplanreconDetailsComponent,
      {
        size: 'xl',
        backdrop: 'static',
      }
    );
    DetailsSalesPeron.componentInstance.Fpdetails = {
      STORECODE: Object.storeid,
      Stock: Object.StockNumner,
      ACCOUNT: Object.Account,
      NAME: Object.CustomerName,
    };
  }
}
