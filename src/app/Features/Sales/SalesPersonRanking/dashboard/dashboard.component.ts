import { ApiService } from '../../../../Core/Providers/ApiService/api.service';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { SalespersonDetailsComponent } from '../salesperson-details/salesperson-details.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  SalesPersonsData: any = [];
  IndividualSalesPersonsData: any = [];
  TotalSalesPersonsData: any = [];
  FromDate: any;
  ToDate: any;
  NoData: boolean = false;
  path1: any = '';
  path2: any = '';
  path3: any = '';
  TotalReport: any = 'T';
  storeIds: any = '0';
  CompleteComponentState: boolean = true;
  dateType: any = 'MTD';

  constructor(
    public apiSrvc: ApiService,
    private ngbmodal: NgbModal,
    private ngbmodalActive: NgbActiveModal,
    private spinner: NgxSpinnerService
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
    const data = {
      title: 'SalesPerson Ranking',
      path1: '',
      path2: '',
      path3: '',
      stores: '',
      toporbottom: this.TotalReport,
      datetype: '',
      fromdate: this.FromDate,
      todate: this.ToDate,
    };
    this.apiSrvc.SetHeaderData({
      obj: data,
    });
  }

  ngOnInit(): void {
    this.GetData();
  }

  GetData() {
    this.IndividualSalesPersonsData = [];
    this.spinner.show();
    const obj = {
      AU_ID: '69',
      AS_ID: this.storeIds,
      StartDate: this.FromDate,
      EndDate: this.ToDate,
      OrderBy: 'TR',
      type: 'D',
    };
    this.apiSrvc
      .postmethod('xtract/GetNightlySalesPersonRanking', obj)
      .subscribe(
        (res) => {
          if (res.status == 200) {
            this.IndividualSalesPersonsData = res.response;
            this.IndividualSalesPersonsData.some(function (x: any) {
              x.Data2 = JSON.parse(x.Data2);
              x.Dealerx = '+';
              return false;
            });
            this.GetTotalData();
          } else {
            alert('Invalid Details');
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  GetTotalData() {
    this.TotalSalesPersonsData = [];
    const obj = {
      AU_ID: '69',
      AS_ID: this.storeIds,
      StartDate: this.FromDate,
      EndDate: this.ToDate,
      OrderBy: 'TR',
      type: 'T',
    };
    this.apiSrvc
      .postmethod('xtract/GetNightlySalesPersonRanking', obj)
      .subscribe(
        (totalres) => {
          if (totalres.status == 200) {
            this.TotalSalesPersonsData = totalres.response.map((v) => ({
              ...v,
              Data2: [],
            }));
            this.spinner.hide();
            if (this.TotalSalesPersonsData.length > 0) {
              this.TotalSalesPersonsData.some(function (x: any) {
                x.data1 = 'Reports Total';
              });
              if (this.TotalReport == 'B') {
                this.IndividualSalesPersonsData.push(
                  this.TotalSalesPersonsData[0]
                );
              } else {
                this.IndividualSalesPersonsData.unshift(
                  this.TotalSalesPersonsData[0]
                );
              }
            }

            this.SalesPersonsData = [];

            this.SalesPersonsData = this.IndividualSalesPersonsData;
            // console.log(this.SalesData)
            // this.spinner.hide()
            //   if(this.SalesPersonsData.length>0){
            //      this.SalesPersonsData.some(function(x:any){
            //        if(x.data1 != 'Reports Total'){
            //      if(x.Data2 != undefined){
            //       x.Data2=JSON.parse(x.Data2);
            //       x.Data2=x.Data2.map(v => ({ ...v, SubData:[],data2sign:'-' }))

            //                    }

            //                    if(x.Data3 != undefined){
            //                     x.Data3=JSON.parse(x.Data3);

            //                     x.Data2.forEach(val=>{

            //                       x.Data3.forEach(ele=>{
            //                         if(val.data2==ele.data2){
            //                           val.SubData.push(ele)
            //                         }
            //                       })
            //                     })
            //                    }
            //        }
            //     x.Dealer ='+';
            //     return false;
            //   });
            // }
            if (this.SalesPersonsData.length == 0) {
              this.NoData = true;
            } else {
              this.NoData = false;
            }
          } else {
            alert('Invalid Details');
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  public inTheGreen(value: number): boolean {
    if (value >= 0) {
      return true;
    }
    return false;
  }
  expandorcollapse(ind, e, ref, Item) {
    let id = (e.target as Element).id;
    if (id == 'D_' + ind) {
      if (ref == '-') {
        Item.Dealerx = '+';
      }
      if (ref == '+') {
        Item.Dealerx = '-';
      }
    }
  }

  isDesc: boolean = false;
  column: string = 'CategoryName';
  sort(property) {
    this.isDesc = !this.isDesc; //change the direction
    this.column = property;
    let direction = this.isDesc ? 1 : -1;
    this.IndividualSalesPersonsData.sort(function (a, b) {
      if (a[property] < b[property]) {
        return -1 * direction;
      } else if (a[property] > b[property]) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
  }

  ngAfterViewInit(): void {
    this.apiSrvc.GetReports().subscribe((data) => {
      if (data.obj.Reference == 'SPR') {
        this.TotalReport = data.obj.TotalReport;
        if (data.obj.FromDate != undefined && data.obj.ToDate != undefined) {
          this.FromDate = data.obj.FromDate;
          this.ToDate = data.obj.ToDate;
          this.storeIds = data.obj.storeValues;
          this.dateType = data.obj.dateType;
          this.GetData();
        } else {
          this.FromDate = data.obj.FromDate;
          this.ToDate = data.obj.ToDate;
          this.storeIds = data.obj.storeValues;
          this.dateType = data.obj.dateType;
          this.GetData();
        }
        const headerdata = {
          title: 'SalesPerson Ranking',
          path1: '',
          path2: '',
          path3: '',
          stores: data.obj.storeValues,
          toporbottom: data.obj.TotalReport,
          datetype: data.obj.dateType,
          fromdate: data.obj.FromDate,
          todate: data.obj.ToDate,
        };
        this.apiSrvc.SetHeaderData({
          obj: headerdata,
        });
      }
    });
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

  openDetails(Item) {
    this.CompleteComponentState = false;
    const DetailsSalesPeron = this.ngbmodal.open(SalespersonDetailsComponent, {
      // size:'xl',
      backdrop: 'static',
    });
    DetailsSalesPeron.componentInstance.Dealdetails = Item;
    DetailsSalesPeron.result.then(
      (data) => {},
      (reason) => {
        // on dismiss
        this.CompleteComponentState = true;
      }
    );
  }
}
