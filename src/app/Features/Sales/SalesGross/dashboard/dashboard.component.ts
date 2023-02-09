import {
  Component,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ApiService } from '../../../../Core/Providers/ApiService/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { SalesReportsComponent } from '../sales-reports/sales-reports.component'
// import { DetailsComponent } from '../details/details.component';
// import { SalesReportsNewComponent } from '../../sales-reports-new/sales-reports-new.component'
import { Title } from '@angular/platform-browser';
import { SalesgrossDetailsComponent } from '../salesgross-details/salesgross-details.component';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @Input() Parentcomponent: any;
  @Input() Salesdetails: any = [];

  SalesData: any = [];
  IndividualSalesGross: any = [];
  TotalSalesGross: any = [];

  FromDate: any;
  ToDate: any;
  TotalReport: any = 'T';

  NoData: boolean = false;
  store: any = 0;

  type = '1';

  Favreports: any = [];

  CompleteComponentState: boolean = true;
  storeIds: any = '0';
  salesPersonId: any = '0';
  salesManagerId: any = '0';
  financeManagerId: any = '0';
  dealType: any = 'New,Used';
  saleType: any = 'Retail,Lease,Misc,Demo,Rental,Special Order,Fleet';
  dealStatus: any = 'Delivered,Capped,Finalized';
  target: any = [];
  source: any = [];
  includecharge: any = [];
  pack: any = [];
  path1: any = 'store';
  path2: any = '';
  path3: any = '';
  updateDate: string = '';
  CurrentDate = new Date();
  solutionurl: any = environment.apiUrl;

  constructor(
    public apiSrvc: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private ngbmodal: NgbModal,
    private ngbmodalActive: NgbActiveModal,
    private title: Title
  ) {
    // alert('Calling')
    this.title.setTitle('Xtract-Sales Gross');

    // this.CurrentDate.setDate(this.CurrentDate.getDate()-1);
    // this.ToDate = new Date(this.CurrentDate.getFullYear(), this.CurrentDate.getMonth(), 2);
    // this.FromDate=this.ToDate.toISOString().slice(0,10);
    // this.ToDate=this.CurrentDate.toISOString().slice(0,10);

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

    if (localStorage.getItem('Fav') != 'Y') {
      const data = {
        title: 'Sales Gross',
        path1: 'All Dealerships',
        path2: '',
        path3: '',
        path1id: 1,
        path2id: '',
        path3id: '',
        stores: '',
        salespresons: '',
        salesmanagers: '',
        financemanagers: '',
        dealType: this.dealType.toString(),
        saleType: this.saleType.toString(),
        dealStatus: this.dealStatus.toString(),
        target: this.target,
        source: this.source,
        includecharge: this.includecharge,
        pack: this.pack,
        toporbottom: this.TotalReport,
        regions: [],
        fistores: [],
        smstores: [],
        spstores: [],
        fromdate: this.FromDate,
        todate: this.ToDate,
      };
      console.log(
        localStorage.getItem('Fav'),
        this.FromDate,
        this.ToDate,
        data
      );

      this.apiSrvc.SetHeaderData({ obj: data });
      this.GetData();
    } else {
      this.getFavReports();
    }
  }

  ngOnInit(): void {
    localStorage.setItem('time', 'MTD');
    // let today=  new Date();
    // var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() +1, 0);
    // this.FromDate=today.getFullYear()+'-'+("0" + (today.getMonth() +1 )).slice(-2)+'-01'
    // this.ToDate=today.getFullYear()+'-'+("0" + (today.getMonth() +1 )).slice(-2)+'-'+  ("0" + (today.getDate()-1)).slice(-2)  //'31'   //

    this.updateDate = localStorage.getItem('date');
    // // console.log(this.Parentcomponent);
    localStorage.setItem('Fav', '');
  }
  getFavReports() {
    const obj = {
      Id: localStorage.getItem('Fav_id'),
      expression: '',
    };
    this.apiSrvc.postmethod('favouritereports/get', obj).subscribe((res) => {
      if (res.status == 200) {
        if (res.response.length > 0) {
          this.Favreports = res.response;

          let dates = this.Favreports[1].Fav_Report_Value.split(',');
          this.FromDate = dates[0];
          this.ToDate = dates[1];
          let grptxt = this.Favreports[15].Fav_Report_Value.split(',');

          this.storeIds = this.Favreports[10].Fav_Report_Value;
          this.salesPersonId = this.Favreports[11].Fav_Report_Value;
          this.salesManagerId = this.Favreports[12].Fav_Report_Value;
          this.financeManagerId = this.Favreports[13].Fav_Report_Value;
          this.dealType = this.Favreports[2].Fav_Report_Value;
          this.saleType = this.Favreports[3].Fav_Report_Value;
          this.dealStatus = this.Favreports[4].Fav_Report_Value;
          this.target = this.Favreports[5].Fav_Report_Value;
          this.source = this.Favreports[6].Fav_Report_Value;
          this.includecharge = this.Favreports[7].Fav_Report_Value;
          this.pack = this.Favreports[8].Fav_Report_Value;
          this.TotalReport = this.Favreports[9].Fav_Report_Value;
          this.path1 = grptxt[0] == undefined ? '' : grptxt[0];
          this.path2 = grptxt[1] == undefined ? '' : grptxt[1];
          this.path3 = grptxt[2] == undefined ? '' : grptxt[2];

          this.GetData();
          localStorage.setItem('Fav', 'N');

          let grppath = this.Favreports[14].Fav_Report_Value.split(',');

          let grparr = this.Favreports[0].Fav_Report_Value.split(',');
          const data = {
            title: 'Sales Gross',
            path1: grppath[0] == undefined ? '' : grppath[0],
            path2: grppath[1] == undefined ? '' : grppath[1],
            path3: grppath[2] == undefined ? '' : grppath[2],
            path1id: grparr[0] == undefined ? '' : grparr[0],
            path2id: grparr[1] == undefined ? '' : grparr[1],
            path3id: grparr[2] == undefined ? '' : grparr[2],
            stores: this.Favreports[10].Fav_Report_Value,
            salespresons: this.Favreports[11].Fav_Report_Value,
            salesmanagers: this.Favreports[12].Fav_Report_Value,
            financemanagers: this.Favreports[13].Fav_Report_Value,
            dealType: this.Favreports[2].Fav_Report_Value,
            saleType: this.Favreports[3].Fav_Report_Value,
            dealStatus: this.Favreports[4].Fav_Report_Value,
            target: this.Favreports[5].Fav_Report_Value,
            source: this.Favreports[6].Fav_Report_Value,
            includecharge: this.Favreports[7].Fav_Report_Value,
            pack: this.Favreports[8].Fav_Report_Value,
            toporbottom: this.Favreports[9].Fav_Report_Value,
            regions: [],
            fistores: [],
            smstores: [],
            spstores: [],
          };
          // // console.log(data)
          this.apiSrvc.SetHeaderData({ obj: data });
          // const modalRef = this.ngbmodal.open(SalesReportsNewComponent,{
          //   size:'xl',
          //   backdrop: "static",
          // });
          // modalRef.componentInstance.Parentcomponent = 'SG';
        }
      }
    });
  }
  GetData() {
    this.IndividualSalesGross = [];
    this.spinner.show();
    const obj = {
      startdealdate: this.FromDate,
      enddealdate: this.ToDate,
      StoreID: this.storeIds,
      SalesPerson: this.salesPersonId,
      SalesManager: this.salesManagerId,
      FinanceManager: this.financeManagerId,
      dealtype: this.dealType,
      saletype: this.saleType,
      dealstatus: this.dealStatus,
      var1: this.path1,
      var2: this.path2,
      var3: this.path3,
      Rowtype: 'D',
    };
    let startFrom = new Date().getTime();
    this.apiSrvc.postmethod('xtract/GetSalesGrossSummaryData', obj).subscribe(
      (res) => {
        if (res.status == 200) {
          if (res.response != undefined) {
            this.IndividualSalesGross = [];
            this.IndividualSalesGross = res.response;
            this.GetTotalData();

            let resTime = (new Date().getTime() - startFrom) / 1000;
            // this.GetTotalData();
            this.logSaving(
              this.solutionurl + 'xtract/GetSalesGrossSummaryData',
              obj,
              resTime,
              'Success'
            );
            //   this.SalesData.some(function(x:any){
            //     x.New_User=JSON.parse(x.New_User);
            //     x.Used_User = JSON.parse(x.Used_User);
            //     x.Dealer ='+';
            //     x.NewDealer ='-';
            //     x.UsedDealer = '-';
            //     return false;
            //   });
            // // console.log(this.IndividualSalesGross)
            //  this.spinner.hide()
          } else {
            this.spinner.hide();
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
  GetTotalData() {
    this.TotalSalesGross = [];
    const obj = {
      startdealdate: this.FromDate,
      enddealdate: this.ToDate,
      StoreID: this.storeIds,
      SalesPerson: this.salesPersonId,
      SalesManager: this.salesManagerId,
      FinanceManager: this.financeManagerId,
      dealtype: this.dealType,
      saletype: this.saleType,
      dealstatus: this.dealStatus.toString(),
      var1: this.path1,
      var2: this.path2,
      var3: this.path3,
      Rowtype: 'T',
    };
    this.apiSrvc.postmethod('xtract/GetSalesGrossSummaryData', obj).subscribe(
      (totalres) => {
        if (totalres.status == 200) {
          if (totalres.response != undefined) {
            this.TotalSalesGross = totalres.response.map((v) => ({
              ...v,
              Data2: [],
            }));
            // // console.log(this.TotalSalesGross)
            this.spinner.hide();

            // this.TotalSalesGross.forEach(val => {
            //   val.DealerName = "Reports Total"
            // })
            if (this.TotalSalesGross.length > 0) {
              if (this.TotalReport == 'B') {
                this.IndividualSalesGross.push(this.TotalSalesGross[0]);
              } else {
                this.IndividualSalesGross.unshift(this.TotalSalesGross[0]);
              }
            }

            this.SalesData = [];

            this.SalesData = this.IndividualSalesGross;
            // // console.log(this.SalesData)
            // this.spinner.hide()
            if (this.SalesData.length > 0) {
              let length = this.SalesData.length;
              let path2 = this.path2;
              let path3 = this.path3;

              this.SalesData.some(function (x: any) {
                if (x.data1 != 'Reports Total') {
                  if (x.Data2 != undefined) {
                    x.Data2 = JSON.parse(x.Data2);
                    x.Data2 = x.Data2.map((v) => ({
                      ...v,
                      SubData: [],
                      data2sign: '-',
                    }));
                  }

                  if (x.Data3 != undefined) {
                    x.Data3 = JSON.parse(x.Data3);

                    x.Data2.forEach((val) => {
                      x.Data3.forEach((ele) => {
                        if (val.data2 == ele.data2) {
                          val.SubData.push(ele);
                        }
                      });
                    });
                  }

                  // x.Data2.subData=x.Data3.filter(val=>val.data2==x.Data2.data2)
                }
                //  else{
                //    x  = x.map(v => ({ ...v, Data2:'' }))
                //  }

                if (length == 2 || (path2 != '' && path3 == '')) {
                  x.Dealer = '-';
                } else {
                  x.Dealer = '+';
                }

                return false;
              });
              // this.SalesData.forEach(e=>{
              //   if(e.data1 !='Reports Total'){
              //  e.Data2=e.Data2.map(v => ({ ...v, SubData:[] }))
              //     e.Data2.forEach(val=>{
              //       e.Data3.forEach(ele=>{
              //         if(val.data2==ele.data2){
              //           val.SubData.push(ele)
              //         }
              //       })
              //     })
              //   }

              // })
            }
            // // console.log(this.SalesData)
            // this.IndividualSalesGross.forEach((val,i) => {
            //   if(val.DealerName== "Reports Total") {
            //     // val.Newbysalesperson = ""
            //     val.New = JSON.parse(val.New)
            //     val.Used = JSON.parse(val.Used)
            //     // val.Usedbysalesperson = ""
            //     val.Dealer ='+';
            //     val.NewDealer ='-';
            //     val.UsedDealer = '-';
            //    // val.DealerName=val.DealerName.toLowerCase()
            //     val.Name=val.DealerName
            //     this.SalesData.push(val)

            //   }
            //   else{

            //     val.Newbysalesperson = JSON.parse(val.Newbysalesperson)
            //     val.New = JSON.parse(val.New)
            //     val.Used = JSON.parse(val.Used)
            //     val.Usedbysalesperson = JSON.parse(val.Usedbysalesperson)
            //     val.Dealer ='+';
            //     val.NewDealer ='-';
            //     val.UsedDealer = '-';
            //    // val.DealerName=val.DealerName.toLowerCase()
            //     val.Name=val.DealerName

            //     this.SalesData.push(val)
            //   }

            // })

            if (this.SalesData.length == 0) {
              this.NoData = true;
            } else {
              this.NoData = false;
            }
            //  // console.log(this.SalesData);
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
    console.log();
    this.apiSrvc.GetReports().subscribe((data) => {
      console.log(data);

      if (data.obj.Reference == 'SG') {
        this.TotalReport = data.obj.TotalReport;

        if (data.obj.FromDate != undefined && data.obj.ToDate != undefined) {
          this.FromDate = data.obj.FromDate;
          this.ToDate = data.obj.ToDate;
          this.storeIds = data.obj.storeValues;
          this.salesPersonId = data.obj.Spvalues;
          this.salesManagerId = data.obj.SMvalues;
          this.financeManagerId = data.obj.FIvalues;
          this.dealType = data.obj.dealType;
          this.saleType = data.obj.saleType;
          this.dealStatus = data.obj.dealStatus;
          this.target = data.obj.target;
          this.source = data.obj.source;
          this.includecharge = data.obj;
          this.pack = data.obj.pack;
          this.path1 =
            data.obj.dataGroupingvalues[0] == undefined
              ? ''
              : data.obj.dataGroupingvalues[0].columnName;
          this.path2 =
            data.obj.dataGroupingvalues[1] == undefined
              ? ''
              : data.obj.dataGroupingvalues[1].columnName;
          this.path3 =
            data.obj.dataGroupingvalues[2] == undefined
              ? ''
              : data.obj.dataGroupingvalues[2].columnName;
          // this.store=data.obj.storeValues;
          // // console.log(this.path1,this.path2,this.path3)
          this.GetData();
        } else {
          this.FromDate = data.obj.FromDate;
          this.ToDate = data.obj.ToDate;
          this.storeIds = data.obj.storeValues;
          this.salesPersonId = data.obj.Spvalues;
          this.salesManagerId = data.obj.SMvalues;
          this.financeManagerId = data.obj.FIvalues;
          this.dealType = data.obj.dealType;
          this.saleType = data.obj.saleType;
          this.dealStatus = data.obj.dealStatus;
          this.target = data.obj.target;
          this.source = data.obj.source;
          this.includecharge = data.obj.includecharges;
          this.pack = data.obj.pack;
          this.path1 =
            data.obj.dataGroupingvalues[0] == undefined
              ? ''
              : data.obj.dataGroupingvalues[0].columnName;
          this.path2 =
            data.obj.dataGroupingvalues[1] == undefined
              ? ''
              : data.obj.dataGroupingvalues[1].columnName;
          this.path3 =
            data.obj.dataGroupingvalues[2] == undefined
              ? ''
              : data.obj.dataGroupingvalues[2].columnName;
          // // console.log(this.path1,this.path2,this.path3)

          this.GetData();
        }
        const headerdata = {
          title: 'Sales Gross',
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
          salespresons: data.obj.Spvalues,
          salesmanagers: data.obj.SMvalues,
          financemanagers: data.obj.FIvalues,
          dealType: data.obj.dealType,
          saleType: data.obj.saleType,
          dealStatus: data.obj.dealStatus,
          target: data.obj.target,
          source: data.obj.source,
          includecharge: data.obj.includecharges,
          pack: data.obj.pack,
          toporbottom: data.obj.TotalReport,
          fistores: data.obj.fistores,
          smstores: data.obj.smstores,
          spstores: data.obj.spstores,
          regions: data.obj.regions,
          fromdate: this.FromDate,
          todate: this.ToDate,
        };

        // // console.log(headerdata)
        this.apiSrvc.SetHeaderData({
          obj: headerdata,
        });
      }
    });

    this.apiSrvc.getBackgroundstate().subscribe((res) => {
      this.CompleteComponentState = res.obj.state;
    });
    // // console.log(this.CompleteComponentState)
  }
  subdataindex: any = 0;
  expandorcollapse(ind, e, ref, Item, parentData) {
    let id = (e.target as Element).id;
    if (id == 'D_' + ind) {
      if (this.path2 == '') {
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
    if (id == 'DN_' + ind) {
      // // console.log(this.path3)
      if (this.path3 == '') {
        this.openDetails(Item, parentData, '2');
      } else {
        if (ref == '-') {
          Item.data2sign = '+';
        }
        if (ref == '+') {
          Item.data2sign = '-';
          Item.Dealer = '-';
        }
      }
    }
    // if (id == 'DU_' + ind) {
    //  if(ref=='-'){
    // Item.UsedDealer='+'
    //  }
    //  if(ref == '+'){
    //   Item.UsedDealer='-'
    //  }
    // }
    // // console.log(this.SalesData);
  }
  public inTheGreen(value: number): boolean {
    if (value >= 0) {
      return true;
    }
    return false;
  }
  openMenu() {
    // const modalRef = this.ngbmodal.open(SalesReportLatestComponent, {
    //   size: 'xl',
    //   backdrop: "static",
    // });
    // modalRef.componentInstance.Parentcomponent = 'SG';
  }
  openDetails(Item, ParentItem, cat) {
    // // console.log(Item,ParentItem)
    if (cat == '3') {
      if (Item.data3 != undefined) {
        this.CompleteComponentState = false;
        const DetailsSalesPeron = this.ngbmodal.open(
          SalesgrossDetailsComponent,
          {
            // size:'xl',
            backdrop: 'static',
          }
        );
        DetailsSalesPeron.componentInstance.Salesdetails = [
          {
            StartDate: this.FromDate,
            EndDate: this.ToDate,
            dealtype: this.dealType,
            saletype: this.saleType,
            dealstatus: this.dealStatus,
            var1: this.path1,
            var2: this.path2,
            var3: this.path3,
            var1Value: ParentItem.data1,
            var2Value: Item.data2,
            var3Value: Item.data3,
            userName: Item.data3,
          },
        ];
        DetailsSalesPeron.result.then(
          (data) => {},
          (reason) => {
            // on dismiss
            this.CompleteComponentState = true;
          }
        );
      }
    }
    if (cat == '2') {
      if (Item.data2 != undefined) {
        this.CompleteComponentState = false;
        const DetailsSalesPeron = this.ngbmodal.open(
          SalesgrossDetailsComponent,
          {
            // size:'xl',
            backdrop: 'static',
          }
        );
        DetailsSalesPeron.componentInstance.Salesdetails = [
          {
            StartDate: this.FromDate,
            EndDate: this.ToDate,
            dealtype: this.dealType,
            saletype: this.saleType,
            dealstatus: this.dealStatus,
            var1: this.path1,
            var2: this.path2,
            var3: this.path3,
            var1Value: ParentItem.data1,
            var2Value: Item.data2,
            var3Value: Item.data3,
            userName: Item.data2,
          },
        ];
        DetailsSalesPeron.result.then(
          (data) => {},
          (reason) => {
            // on dismiss
            this.CompleteComponentState = true;
          }
        );
      }
    }
    if (cat == '1') {
      if (Item.data1 != undefined && Item.data1 != 'Reports Total') {
        this.CompleteComponentState = false;
        const DetailsSalesPeron = this.ngbmodal.open(
          SalesgrossDetailsComponent,
          {
            // size:'xl',
            backdrop: 'static',
          }
        );
        DetailsSalesPeron.componentInstance.Salesdetails = [
          {
            StartDate: this.FromDate,
            EndDate: this.ToDate,
            dealtype: this.dealType,
            saletype: this.saleType,
            dealstatus: this.dealStatus,
            var1: this.path1,
            var2: this.path2,
            var3: this.path3,
            var1Value: Item.data1,
            var2Value: Item.data2,
            var3Value: Item.data3,
            userName: Item.data1,
          },
        ];
        DetailsSalesPeron.result.then(
          (data) => {},
          (reason) => {
            // on dismiss
            this.CompleteComponentState = true;
          }
        );
      }
    }
  }

  isDesc: boolean = false;
  column: string = 'CategoryName';

  sort(property) {
    this.isDesc = !this.isDesc; //change the direction
    this.column = property;
    let direction = this.isDesc ? 1 : -1;
    // // console.log(property)
    this.SalesData.sort(function (a, b) {
      if (a[property] < b[property]) {
        return -1 * direction;
      } else if (a[property] > b[property]) {
        return 1 * direction;
      } else {
        return 0;
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

  logSaving(url, object, time, status) {
    let ip = localStorage.getItem('Browser');
    console.log(object);
    const data = JSON.parse(localStorage.getItem('UserDetails'));
    console.log(data);
    if (data != 'None') {
      const obj = {
        UL_DealerId: '1',
        UL_GroupId: data.UL_GroupId,
        UL_UserId: data.UL_UserId,
        UL_IpAddress: ip.split(',')[1],
        UL_Browser: ip.split(',')[0],
        UL_Absolute_URL: window.location.href,
        UL_Api_URL: url,
        UL_Api_Request: JSON.stringify(object),
        UL_PageName: 'SalesGross',
        UL_ResponseTime: time,
        UL_Token: '',
        UL_ResponseStatus: status,
        UL_Groupings: '',
        UL_Timeframe: '',
        UL_Stores: '',
        UL_Filters: '',
        UL_Teams: '',
        UL_Status: 'Y',
      };
      console.log(obj);
      this.apiSrvc.postmethod('useractivitylog', obj).subscribe((val) => {
        console.log(val);
      });
    }
  }
}
