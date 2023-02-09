import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../../Core/Providers/ApiService/api.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { Title } from '@angular/platform-browser';
import { SchedulesviewDetailsComponent } from '../schedulesview-details/schedulesview-details.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  StoreVal: any = 0;
  schedule: any = '1';
  scheduleviewdata: any = [];
  Comscheduleviewdata: any = [];
  NoData: boolean = false;
  comment: any = '';
  constructor(
    public apiSrvc: ApiService,
    private ngbmodal: NgbModal,
    private spinner: NgxSpinnerService,
    private ngbmodalActive: NgbActiveModal,
    private title: Title
  ) {
    this.title.setTitle('Xtract-Schedules View');
    const data = {
      title: 'Schedules View',
      path1: '',
      path2: '',
      path3: '',
      stores: this.StoreVal.toString(),
      schedule: this.schedule,
      storecode: 0,
      schedulename: 'CIT',
    };
    this.apiSrvc.SetHeaderData({
      obj: data,
    });
  }

  ngOnInit(): void {
    this.Getscheduleviewdata();
  }

  settingkeys: any = [];
  Getscheduleviewdata() {
    this.scheduleviewdata = [];
    this.Comscheduleviewdata = [];
    this.searchQuery = '';
    console.log(this.settingkeys.length);
    this.spinner.show();
    const obj = {
      ASID: this.StoreVal,
      // ASID: 15,

      // ASID: this.StoreVal,
      SCHID: parseInt(this.schedule),
    };
    this.apiSrvc.postmethod('xtract/GetScheduleView', obj).subscribe(
      (res) => {
        if (res.status == 200) {
          if (res.response != undefined && res.response.length > 0) {
            this.NoData = false;
            this.spinner.hide();
            this.settingkeys = Object.keys(res.response[0]);

            this.scheduleviewdata = res.response;
            this.Comscheduleviewdata = res.response;
            console.log(this.scheduleviewdata);

            console.log(this.scheduleviewdata);
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

  searchQuery: string = '';
  searchFilter(value) {
    // console.log(value.target.value);
    let searchValue = value.target.value;
    if (searchValue != undefined) {
      if (searchValue == '') {
        this.scheduleviewdata = this.Comscheduleviewdata;
      } else {
        this.scheduleviewdata = this.Comscheduleviewdata.filter((item) => {
          if (searchValue == '') {
            this.scheduleviewdata = this.Comscheduleviewdata;
          } else {
            if (item['Stock Number'] != null && item['Stock Number'] != '') {
              //  console.log('ACD...............',this.cancellationData);
              return item['Stock Number']
                .toUpperCase()
                .includes(searchValue.trim().toUpperCase());
            }
          }
        });
      }
    }
    if (this.scheduleviewdata.length == 0) {
      this.NoData = true;
    } else {
      this.NoData = false;
    }
  }
  ngAfterViewInit(): void {
    this.apiSrvc.GetReports().subscribe((data) => {
      if (data.obj.Reference == 'SV') {
        // this.date = data.obj.month
        // this.Month = data.obj.month
        // this.StoreValues = data.obj.storeValues
        // this.StoreName = data.obj.Sname
        this.StoreVal = data.obj.storeValues;
        this.schedule = data.obj.schedule;
        this.Getscheduleviewdata();
        const headerdata = {
          title: 'Schedules View',
          path1: data.obj.storecode + '-' + data.obj.schedulename,
          path2: '',
          path3: '',
          stores: this.StoreVal,
          schedule: this.schedule,
          storecode: data.obj.storecode,
          schedulename: data.obj.schedulename,
        };
        // // console.log(headerdata)
        this.apiSrvc.SetHeaderData({
          obj: headerdata,
        });
      }
    });
  }

  onclose() {
    this.ngbmodalActive.close();
  }

  isDesc: boolean = false;
  column: string = 'CategoryName';

  sort(property) {
    console.log(property);
    this.isDesc = !this.isDesc; //change the direction
    this.column = property;
    let direction = this.isDesc ? 1 : -1;
    // // console.log(property)
    this.scheduleviewdata.sort(function (a, b) {
      if (a[property] < b[property]) {
        return -1 * direction;
      } else if (a[property] > b[property]) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
  }
  selectedstock: any = [];
  getitem(item) {
    console.log(item);
    this.selectedstock = item;
    this.comment = '';
  }
  savecomment() {
    if (this.comment == '') {
      alert('Please enter Comment');
    } else {
      const obj = {
        SC_STOCKNO: this.selectedstock['Stock Number'],
        SC_STORE: this.selectedstock.Store,
        SC_USER: 'Prasad Chavali',
        SC_COMMENTS: this.comment,
      };
      console.log(obj);
      this.apiSrvc.postmethod('schedulecomments', obj).subscribe(
        (res) => {
          if (res.status == 200) {
            document.getElementById('closecommment').click();

            alert('Comment saved Successfully');
          } else {
            alert('Invalid Details');
          }
        },
        (error) => {
          // // console.log(error);
        }
      );
    }
  }
  spinnerLoader: boolean = false;
  commentslist: any = [];
  getcomments(e) {
    this.commentslist = [];
    this.spinnerLoader = true;
    const obj = {
      SC_STOCKNO: e['Stock Number'],
      SC_STORE: e.Store,
    };
    console.log(obj);
    this.apiSrvc.postmethod('schedulecomments/get', obj).subscribe(
      (res) => {
        if (res.status == 200) {
          this.spinnerLoader = false;
          this.commentslist = res.response;
        } else {
          alert('Invalid Details');
        }
      },
      (error) => {
        // // console.log(error);
      }
    );
  }
  // openMenu(Object){
  //   console.log(Object);

  //   const DetailsSalesPeron = this.ngbmodal.open(FpDetailsComponent,{
  //     size:'xl',
  //     backdrop: "static",
  //   });
  //   DetailsSalesPeron.componentInstance.Fpdetails = {
  //     "STORECODE":Object.storeid,
  //     "Stock":Object.StockNumner,
  //     "ACCOUNT":Object.Account,
  //     "NAME":Object.CustomerName
  //   };

  // }
  opendetails(header, value, item) {
    if (value != 0 && value != '') {
      const DetailsScheduleview = this.ngbmodal.open(
        SchedulesviewDetailsComponent,
        {
          size: 'xl',
          backdrop: 'static',
        }
      );
      DetailsScheduleview.componentInstance.svdetails = {
        header: header,
        value: value,
        store: item.Store,
        date: item.Date,
      };
    }
  }
}
