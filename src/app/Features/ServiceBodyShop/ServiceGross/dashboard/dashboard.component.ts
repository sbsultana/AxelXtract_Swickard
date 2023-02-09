import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { DetailsComponent } from '../details/details.component'
import { ApiService } from '../../../../Core/Providers/ApiService/api.service';
// import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Title } from '@angular/platform-browser';
import { ServicegrossDetailsComponent } from '../servicegross-details/servicegross-details.component';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  FromDate: any;
  ToDate: any;
  ServiceData: any = [];
  type: any = 'A';
  store: any = 0;
  IndividualServiceGross: any = [];
  TotalServiceGross: any = [];
  TotalReport: string = 'T';
  NoData: boolean = false;
  ROType: any = 'Open,Closed';
  Department: any = 'Service,Parts,Body';
  Paytype: any = 'Warranty,Internal';
  Grosstype: any = ['Labour_0', '', 'Misc_2', 'Sublet_3'];

  Target: any = 'F';

  path1: any = 'Store_Name';
  path2: any = 'ServiceAdvisor_Name';
  path3: any = '';
  CurrentDate = new Date();
  pipe: any;

  constructor(
    public apiSrvc: ApiService,
    private ngbmodal: NgbModal,
    private title: Title,
    private ngbmodalActive: NgbActiveModal,
    private spinner: NgxSpinnerService
  ) {
    // common.flagvalue = '';

    this.title.setTitle('Xtract- Service Gross');
    // this.store = localStorage.getItem('Stores');

    // this.pipe = new DatePipe('en-US');
    // this.CurrentDate.setDate(this.CurrentDate.getDate()-1);
    // let startdate = new Date(this.CurrentDate.getFullYear(), this.CurrentDate.getMonth(), 2);
    //  console.log(startdate)
    // this.ToDate=startdate.toISOString().slice(0,10);

    // this.FromDate = this.pipe.transform(this.ToDate, 'MM-dd-yyyy');
    // this.ToDate = this.pipe.transform(this.CurrentDate, 'MM-dd-yyyy');

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
    console.log(this.FromDate);
    console.log(this.ToDate);

    const data = {
      title: 'Service Gross',
      path1: 'All Dealerships',
      path2: 'All Advisor ',
      path3: '',
      // Open - Closed
      path1id: 40,
      path2id: 26,
      path3id: '',
      stores: '',

      ROType: this.ROType,
      Department: this.Department,
      Paytype: this.Paytype,
      Target: this.Target,
      ToporBottom: this.TotalReport,
      fromdate: this.FromDate,
      todate: this.ToDate,
      grosstype: this.Grosstype,
    };
    this.apiSrvc.SetHeaderData({
      obj: data,
    });
  }

  ngOnInit() {
    localStorage.setItem('time', 'MTD');

    this.GetData();
    this.GetTotalData();
  }

  // GetData() {
  //   this.ServiceData = [];

  //   this.spinner.show();
  //   const obj = {
  //     "store_id":this.store,
  //     "startdate":this.FromDate,
  //     "enddate":this.ToDate,
  //     "type":this.type
  // }

  //   this.apiSrvc.postmethod('xtract/GetServiceSummary', obj).subscribe(
  //     res => {
  //       if (res.status == 200) {
  //         this.ServiceData = res.response

  //         this.ServiceData.some(function(x:any){
  //           x.Storelevel=JSON.parse(x.Storelevel);
  //           x.advisorlevel = JSON.parse(x.advisorlevel);
  //           x.Dealer ='+';
  //            return false;
  //         });
  //         // console.log(this.ServiceData)
  //        this.spinner.hide()
  //       }
  //       else {
  //         alert('Invalid Details');
  //       }
  //     },
  //     (error) => {
  //       // console.log(error);
  //     })
  // }

  GetData() {
    this.ServiceData = [];
    this.IndividualServiceGross = [];
    this.spinner.show();
    // const obj = {
    //   "startdate": this.FromDate,
    //   "enddate": this.ToDate,
    //   "StoreID": "",
    //   "AdvisorNumber": "",
    //   "AdvisorName": "",
    //   "Department": "",
    //   "vehicle_Year": "",
    //   "vehicle_Make": "",
    //   "Vehicle_Model": "",
    //   "Vehicle_Odometer": "",
    //   "CName": "",
    //   "CZip": "",
    //   "CState": "",
    //   "RO_CloseDate": "",
    //   "var1": this.path1,
    //   "var2": this.path2,
    //   "var3": "",
    //   "type": "D"
    //   // "store_id":this.store,
    //   // "startdate":this.FromDate,
    //   // "enddate":this.ToDate,
    //   // "type":this.type
    // }
    const obj = {
      startdate: this.FromDate,
      enddate: this.ToDate,
      StoreID: this.store == 0 ? '' : this.store,
      // "StoreID": "7",
      AdvisorNumber: '',
      AdvisorName: '',
      // "ROSTATUS": this.ROType,
      // "PaytypeCP": this.Paytype,
      ROSTATUS: '',
      PaytypeCP: '',
      PaytypeWarranty: '',
      PaytypeInternal: '',
      // "Department": this.Department,
      Department: '',
      GrossTypeLabor: this.Grosstype[0] == 'Labour_0' ? 'Y' : '',
      GrossTypeParts: this.Grosstype[1] == 'Parts_1' ? 'Y' : '',
      GrossTypeMisc: this.Grosstype[2] == 'Misc_2' ? 'Y' : '',
      GrossTypeSublet: this.Grosstype[3] == 'Sublet_3' ? 'Y' : '',
      vehicle_Year: '',
      vehicle_Make: '',
      Vehicle_Model: '',
      Vehicle_Odometer: '',
      CName: '',
      CZip: '',
      CState: '',
      RO_CloseDate: '',
      var1: this.path1,
      var2: this.path2,
      var3: '',
      type: 'D',
    };
    this.apiSrvc.postmethod('xtract/GetServiceSummaryBeta', obj).subscribe(
      (res) => {
        if (res.status == 200) {
          this.IndividualServiceGross = res.response;
          this.IndividualServiceGross.some(function (x: any) {
            if (x.Data2 != undefined) {
              x.Data2 = JSON.parse(x.Data2);
            }

            // x.advisorlevel = JSON.parse(x.advisorlevel);
            x.Dealer = '+';
            return false;
          });
          // this.ServiceData = this.IndividualServiceGross
          if (
            this.IndividualServiceGross.length > 0 &&
            this.TotalServiceGross.length > 0
          ) {
            if (this.TotalReport == 'B') {
              this.IndividualServiceGross.push(this.TotalServiceGross[0]);
            } else {
              this.IndividualServiceGross.unshift(this.TotalServiceGross[0]);
            }
            // // console.log(this.IndividualServiceGross)
            this.ServiceData = [];
            this.ServiceData = this.IndividualServiceGross;
            this.spinner.hide();
          }
          if (
            this.IndividualServiceGross.length == 0 &&
            this.TotalServiceGross.length == 0
          ) {
            this.NoData = true;
          } else {
            this.NoData = false;
          }

          // if (this.ServiceData.length == 0) {
          //   this.NoData = true;
          // }
          // else {
          //   this.NoData = false
          // }
          console.log(this.ServiceData);

          // this.spinner.hide();
        } else {
          alert('Invalid Details');
        }
      },
      (error) => {
        // console.log(error);
      }
    );
  }
  GetTotalData() {
    this.TotalServiceGross = [];
    const obj = {
      startdate: this.FromDate,
      enddate: this.ToDate,
      StoreID: this.store == 0 ? '' : this.store,
      // StoreID: '',
      AdvisorNumber: '',
      AdvisorName: '',
      // "ROSTATUS": this.ROType,
      // "PaytypeCP": this.Paytype,
      ROSTATUS: '',
      PaytypeCP: '',
      PaytypeWarranty: '',
      PaytypeInternal: '',
      // "Department": this.Department,
      Department: '',
      GrossTypeLabor: this.Grosstype[0] == 'Labour_0' ? 'Y' : '',
      GrossTypeParts: this.Grosstype[1] == 'Parts_1' ? 'Y' : '',
      GrossTypeMisc: this.Grosstype[2] == 'Misc_2' ? 'Y' : '',
      GrossTypeSublet: this.Grosstype[3] == 'Sublet_3' ? 'Y' : '',
      vehicle_Year: '',
      vehicle_Make: '',
      Vehicle_Model: '',
      Vehicle_Odometer: '',
      CName: '',
      CZip: '',
      CState: '',
      RO_CloseDate: '',
      // var1: this.path1,
      // var2: this.path2,
      var1: '',
      var2: '',
      var3: '',
      type: 'T',
    };
    this.apiSrvc.postmethod('xtract/GetServiceSummaryBeta', obj).subscribe(
      (totalres) => {
        if (totalres.status == 200) {
          if (totalres.response.length > 0) {
            // console.log(this.TotalServiceGross, totalres.response);
            // this.TotalServiceGross.push({
            //   Storelevel: JSON.parse(totalres.response[0].totals),
            // });
            // this.TotalServiceGross[0].Storelevel[0]['Store_Name'] =
            //   'Reports Total';
            this.TotalServiceGross = totalres.response.map((v) => ({
              ...v,
              data1: 'REPORTS TOTAL',
              Dealer: '+',
              Data2: [],
            }));
            // console.log(this.TotalServiceGross, totalres.response);
            // // console.log(this.TotalServiceGross,totalres.response )
            if (
              this.IndividualServiceGross.length > 0 &&
              this.TotalServiceGross.length > 0
            ) {
              if (this.TotalReport == 'B') {
                this.IndividualServiceGross.push(this.TotalServiceGross[0]);
              } else {
                this.IndividualServiceGross.unshift(this.TotalServiceGross[0]);
              }
              // // console.log(this.IndividualServiceGross)
              this.ServiceData = [];
              this.ServiceData = this.IndividualServiceGross;
              this.spinner.hide();
            }
            if (
              this.IndividualServiceGross.length == 0 &&
              this.TotalServiceGross.length == 0
            ) {
              this.NoData = true;
            } else {
              this.NoData = false;
            }

            console.log(this.ServiceData);
          }
          // if (this.ServiceData.length == 0) {
          //   this.NoData = true;
          // } else {
          //   this.NoData = false;
          // }
        } else {
          alert('Invalid Details');
        }
      },
      (error) => {
        // console.log(error);
      }
    );
  }
  expandorcollapse(ind, e, ref, Item, parentData) {
    let id = (e.target as Element).id;
    if (id == 'D_' + ind) {
      if (this.path2 == '') {
        console.log(this.path2);
        this.openDetails(Item, parentData, '1');
      } else {
        if (ref == '-') {
          Item.Dealer = '+';
        }
        if (ref == '+') {
          Item.Dealer = '-';
        }
      }
    }
    //  if (id == 'DN_' + ind) {
    //    if(ref=='-'){
    //   Item.NewDealer='+'
    //    }
    //    if(ref == '+'){
    //   Item.NewDealer='-'
    //      }
    //   }
    //   if (id == 'DU_' + ind) {
    //    if(ref=='-'){
    //   Item.UsedDealer='+'
    //    }
    //    if(ref == '+'){
    //     Item.UsedDealer='-'
    //    }
    //   }
  }

  //

  ngAfterViewInit(): void {
    this.apiSrvc.GetReports().subscribe((data) => {
      if (data.obj.Reference == 'SrvcG') {
        this.TotalReport = data.obj.TotalReport;

        const headerdata = {
          title: 'Service Gross',
          path1:
            data.obj.dataGroupingvalues[0] == undefined
              ? ''
              : data.obj.dataGroupingvalues[0].ARG_LABEL,
          path2:
            data.obj.dataGroupingvalues[1] == undefined
              ? ''
              : data.obj.dataGroupingvalues[1].ARG_LABEL,
          path3:
            data.obj.dataGroupingvalues[2] == undefined
              ? ''
              : data.obj.dataGroupingvalues[2].ARG_LABEL,
          path1id:
            data.obj.dataGroupingvalues[0] == undefined
              ? ''
              : data.obj.dataGroupingvalues[0].ARG_ID,
          path2id:
            data.obj.dataGroupingvalues[1] == undefined
              ? ''
              : data.obj.dataGroupingvalues[1].ARG_ID,
          path3id:
            data.obj.dataGroupingvalues[2] == undefined
              ? ''
              : data.obj.dataGroupingvalues[2].ARG_ID,
          stores: data.obj.storeValues,
          ROType: data.obj.ROType,
          Department: data.obj.Departments,
          Paytype: data.obj.PayType,
          Target: data.obj.Target,
          ToporBottom: data.obj.TotalReport,
          fromdate: data.obj.FromDate,
          todate: data.obj.ToDate,
          grosstype: data.obj.GrossType,
        };
        // console.log(headerdata)
        this.apiSrvc.SetHeaderData({
          obj: headerdata,
        });
        if (data.obj.FromDate != undefined && data.obj.ToDate != undefined) {
          this.FromDate = data.obj.FromDate;
          this.ToDate = data.obj.ToDate;
          this.store = data.obj.storeValues;
          (this.ROType = data.obj.ROType),
            (this.Department = data.obj.Departments),
            (this.Paytype = data.obj.PayType),
            (this.path1 =
              data.obj.dataGroupingvalues[0] == undefined
                ? ''
                : data.obj.dataGroupingvalues[0].columnName);
          this.path2 =
            data.obj.dataGroupingvalues[1] == undefined
              ? ''
              : data.obj.dataGroupingvalues[1].columnName;
          // this.path3 = data.obj.dataGroupingvalues[2] == undefined ? '' : data.obj.dataGroupingvalues[2].columnName;
          this.Grosstype = data.obj.GrossType;
          this.GetData();
          this.GetTotalData();
        } else {
          this.FromDate = this.FromDate;
          this.ToDate = this.ToDate;
          this.store = data.obj.storeValues;
          (this.ROType = data.obj.ROType),
            (this.Department = data.obj.Departments),
            (this.Paytype = data.obj.PayType),
            (this.path1 =
              data.obj.dataGroupingvalues[0] == undefined
                ? ''
                : data.obj.dataGroupingvalues[0].columnName);
          this.path2 =
            data.obj.dataGroupingvalues[1] == undefined
              ? ''
              : data.obj.dataGroupingvalues[1].columnName;
          // this.path3 = data.obj.dataGroupingvalues[2] == undefined ? '' : data.obj.dataGroupingvalues[2].columnName;
          this.Grosstype = data.obj.GrossType;
          this.GetData();
          this.GetTotalData();
        }
      }
    });
  }
  public inTheGreen(value: number): boolean {
    if (value >= 0) {
      return true;
    }
    return false;
  }

  openDetails(Item, ParentItem, ref) {
    console.log(Item, ParentItem);
    if (ref == '1') {
      if (Item.data1 != undefined && Item.data1 != 'Reports Total') {
        const DetailsServicePerson = this.ngbmodal.open(
          ServicegrossDetailsComponent,
          {
            // size:'xl',
            backdrop: 'static',
          }
        );
        DetailsServicePerson.componentInstance.Servicedetails = [
          {
            // "storeId": Item.data1,
            // "SrvcName": Item.ServiceAdvisor_Name,
            StartDate: this.FromDate,
            EndDate: this.ToDate,
            var1: this.path1,
            var2: this.path2,
            var3: '',
            var1Value: Item.data1,
            var2Value: Item.data2 == undefined ? '' : Item.data2,
            var3Value: '',
            userName: Item.data1,
            Grosstype: this.Grosstype,
          },
        ];
      }
    }
    // console.log(Item)
    if (ref == '2') {
      if (Item.data2 != undefined) {
        const DetailsServicePerson = this.ngbmodal.open(
          ServicegrossDetailsComponent,
          {
            // size:'xl',
            backdrop: 'static',
          }
        );
        DetailsServicePerson.componentInstance.Servicedetails = [
          {
            // "storeId": ParentItem.Store,
            //  "SrvcName": Item.ServiceAdvisor_Name,
            StartDate: this.FromDate,
            EndDate: this.ToDate,
            var1: this.path1,
            var2: this.path2,
            var3: this.path3,
            var1Value: ParentItem.data1,
            var2Value: Item.data2,
            var3Value: '',
            userName: Item.data2,
            Grosstype: this.Grosstype,
          },
        ];
      }
    }
  }
  Open() {
    const DetailsServicePerson = this.ngbmodal.open(
      ServicegrossDetailsComponent,
      {
        // size:'xl',
        backdrop: 'static',
      }
    );
    DetailsServicePerson.componentInstance.Servicedetails = [
      {
        StartDate: this.FromDate,
        EndDate: this.ToDate,
        var1: this.path1,
        var2: this.path2,
        var3: this.path3,
      },
    ];
  }
  openMenu() {
    // const modalRef = this.ngbmodal.open(ServiceReportLatestComponent, {
    //   size: 'xl',
    //   backdrop: 'static',
    // });
    // modalRef.componentInstance.Parentcomponent = 'SrvcG';
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
  isDesc: boolean = false;
  column: string = 'CategoryName';

  sort(property) {
    this.isDesc = !this.isDesc; //change the direction
    this.column = property;
    let direction = this.isDesc ? 1 : -1;
    // console.log(property)
    this.ServiceData.sort(function (a, b) {
      if (a[property] < b[property]) {
        return -1 * direction;
      } else if (a[property] > b[property]) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
  }
}
