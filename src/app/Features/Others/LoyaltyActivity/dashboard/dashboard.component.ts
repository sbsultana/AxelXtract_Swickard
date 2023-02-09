import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDatepickerConfig,
  NgbModal,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import { CalendarCellViewModel } from 'ngx-bootstrap/datepicker/models';
import { ApiService } from '../../../../Core/Providers/ApiService/api.service';

import { NgxSpinnerService } from 'ngx-spinner';
// import { LoyalityactivityDetailsComponent } from '../loyalityactivity-details/loyalityactivity-details.component';
import { Title } from '@angular/platform-browser';
import { LoyaltyactivityDetailsComponent } from '../loyaltyactivity-details/loyaltyactivity-details.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  NoData: boolean = false;
  LoyalityData: any = [];
  CurrentDate = new Date();
  FromDate: any;
  ToDate: any;
  loyality: any = [{ Employee: '', StoreData: [] }];
  constructor(
    public apiSrvc: ApiService,
    private ngbmodal: NgbModal,
    private ngbmodalActive: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private title: Title
  ) {
    let today = new Date();
    let enddate = new Date(today.setDate(today.getDate() - 1));
    this.FromDate =
      ('0' + (enddate.getMonth() + 1)).slice(-2) +
      '-01' +
      '-' +
      enddate.getFullYear();
    this.ToDate =
      ('0' + (enddate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + enddate.getDate()).slice(-2) +
      '-' +
      enddate.getFullYear();

    this.FromDate = this.FromDate.replace(/-/g, '/');
    this.ToDate = this.ToDate.replace(/-/g, '/');
    this.title.setTitle('Xtract - Loyalty Activity Report');
    const data = {
      title: 'Loyalty Activity Report',
      path1: '',
      path2: '',
      path3: '',
      fromdate: this.FromDate,
      todate: this.ToDate,
    };
    this.apiSrvc.SetHeaderData({
      obj: data,
    });
    // this.spinner.show();
  }

  ngOnInit(): void {
    this.NoData = false;
    this.GetData();
    // this.spinner.hide();
  }
  GetData() {
    this.spinner.show();
    let SubStoreArr: any = [];
    const Obj = {
      StartDate: this.FromDate,
      EndDate: this.ToDate,
      // StartDate: '2023-11-01',
      // EndDate: '2023-11-09',
    };
    this.apiSrvc
      .postmethod('xtract/GetLoyaltyActivity', Obj)
      .subscribe((res) => {
        if (res.status == 200) {
          this.spinner.hide();
          // this.LoyalityData = res.response;
          this.LoyalityData = res.response.reduce((r, { Employee }) => {
            if (!r.some((o) => o.Employee == Employee)) {
              r.push({
                Employee,
                Stores: res.response.filter((v) => v.Employee == Employee),
              });
            }
            return r;
          }, []);
          this.LoyalityData.forEach((e, i) => {
            SubStoreArr.push(
              e.Stores.reduce((r, { Store }) => {
                // r.Employee = e.Employee;
                if (!r.some((o) => o.Store == Store)) {
                  r.push({
                    Store,
                    StoreData: e.Stores.filter((v) => v.Store == Store),
                  });
                }
                return r;
              }, [])
            );
            e.Stores = SubStoreArr[i];
          });
          console.log(this.LoyalityData);
          if (this.LoyalityData.length > 0) {
            this.NoData = false;
          } else {
            this.NoData = true;
          }
        } else {
          this.spinner.hide();
          this.NoData = true;
        }
      });
  }
  ngAfterViewInit(): void {
    this.apiSrvc.GetReports().subscribe((data) => {
      if (data.obj.Reference == 'LAR') {
        this.FromDate = data.obj.FromDate;
        this.ToDate = data.obj.ToDate;

        this.GetData();
        const headerdata = {
          title: 'Loyalty Activity Report',
          path1: '',
          path2: '',
          path3: '',
          fromdate: this.FromDate,
          todate: this.ToDate,
        };

        // // console.log(headerdata)
        this.apiSrvc.SetHeaderData({
          obj: headerdata,
        });
      }
    });
  }

  openDetails(e, list) {
    console.log(e, list);
    // const obj={
    //   colName:e,
    //   cust_id:"",
    //   store_id:list.Day == 'Total By Store' || list.Store == "All Stores Total" ?  0 : list.Store,
    //   from:list.Day == 'Total By Store' || list.Store == "All Stores Total" ? this.FromDate : list.Day,
    //   To:list.Day == 'Total By Store' || list.Store == "All Stores Total" ? this.FromDate : list.Day,
    // }

    const DetailsLoyalty = this.ngbmodal.open(LoyaltyactivityDetailsComponent, {
      // size:'xl',
      backdrop: 'static',
    });
    DetailsLoyalty.componentInstance.Loyaltydetails = [
      {
        empName: list.Employee,
        colName: e,
        cust_id: list.EmpID,
        store_id: list.Store == 'All Stores Total' ? 0 : list.StoreCode,
        from:
          list.Day == 'Total By Store' || list.Store == 'All Stores Total'
            ? this.FromDate
            : list.Day,
        to:
          list.Day == 'Total By Store' || list.Store == 'All Stores Total'
            ? this.ToDate
            : list.Day,
      },
    ];
  }
}
