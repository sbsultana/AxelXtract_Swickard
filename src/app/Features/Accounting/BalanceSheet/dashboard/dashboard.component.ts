import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../../Core/Providers/ApiService/api.service';
// import { BalanceSheetReportsComponent } from '../balance-sheet-reports/balance-sheet-reports.component';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  showhide: any = [];
  isOpen = false;
  date: any;
  Filter: any = 'Store';
  Current_Date: any;
  CurrentDate: Date;
  constructor(
    public apiSrvc: ApiService,
    private ngbmodal: NgbModal,
    private ngbmodalActive: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private datepipe: DatePipe,
    private title: Title
  ) {
    let newdate = new Date();
    this.date = new Date(newdate.setMonth(newdate.getMonth() - 1));
    this.title.setTitle('Xtract-Balance Sheet');
    const data = {
      title: 'Balance Sheet',
      path1: '',
      path2: '',
      path3: '',
      Month: this.date,
      stores: 0,
      filter: this.Filter,
      fromdate: new Date(newdate.getFullYear(), newdate.getMonth() - 1, 1),
      todate: new Date(newdate.getFullYear(), newdate.getMonth(), 1),
    };
    this.apiSrvc.SetHeaderData({
      obj: data,
    });
    console.log(data);
  }

  ngOnInit(): void {
    this.GetBsAssetsData();
    this.GetBsLiabilitiesData();
    this.GetBsEquityData();
  }

  ETDealerData: any = [];
  XpenseTrendByStoreKeysMonth: any = [];
  AllDatakeys: any = [];
  ExpenseTrendByStoreKeysMonth: any;
  AllDatakeysMonth: any;
  ExpenseTrendByStoreMonth: any;
  ExpenseTrendByStoreKeys: any = [];
  GetBsAssetsData() {
    this.ExpenseTrendByStoreKeysMonth = [];
    this.AllDatakeysMonth = [];
    // console.log(this.date.toString().substr(4, 3), this.date.toString().substr(8, 2), this.date.toString().substr(11, 4));
    this.Month = this.Month = this.datepipe.transform(this.date, 'yyyy-MM-dd');
    console.log(this.Month);
    this.CurrentDate = new Date(this.Month);
    console.log(this.CurrentDate);
    this.ETDealerData = [];
    this.spinner.show();
    let Obj = {
      AcctType: 'A',
      dateString: this.Month,
      stores: this.StoreValues,
    };
    console.log(Obj);

    this.apiSrvc.postmethod('xtract/GetBalancesheetReport', Obj).subscribe(
      (res) => {
        if (res.status == 200) {
          console.log('Overall Response', res.response);
          this.ETDealerData = res.response.map(
            ({ SNo, LABLE1Val, NgClass, ...rest }) => ({ ...rest })
          );
          this.XpenseTrendByStoreKeysMonth = Object.keys(res.response[0]);
          console.log(
            'XpenseTrendByStoreKeysMonth',
            this.XpenseTrendByStoreKeysMonth
          );
          let ETByStoreKeys_sortedMonth =
            this.XpenseTrendByStoreKeysMonth.filter((x) => {
              return (
                x != 'BSM_Lable' &&
                x != 'BSM_SubLableDetail' &&
                x != 'BSM_AccountTypeDetail' &&
                x != 'EBITDA_Symbol' &&
                x != 'BSM_SubLable'
              );
            }).sort((a, b) => a.localeCompare(b));
          ETByStoreKeys_sortedMonth = ETByStoreKeys_sortedMonth;
          for (var i = 0; i < ETByStoreKeys_sortedMonth.length; i++) {
            this.ExpenseTrendByStoreKeysMonth.push(
              ETByStoreKeys_sortedMonth[i]
            );
            this.AllDatakeysMonth.push(ETByStoreKeys_sortedMonth[i]);
          }
          let XpenseTrendByStoreDataMonth = res.response;
          let ETByStoreData_sorted = XpenseTrendByStoreDataMonth;
          console.log('ETByStoreData_sorted', ETByStoreData_sorted);
          this.ExpenseTrendByStoreMonth = res.response;
          console.log(
            'ExpenseTrendByStoreMonth',
            this.ExpenseTrendByStoreMonth
          );
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
  BSLData: any = [];
  BSLByStoreKeysMonth: any = [];
  BSLAllDataKeys: any = [];
  BSL_StoreKeysMonth: any;
  BSL_AllDataKeysMonth: any;
  BSL_LblyByStoreMonth: any;
  BslByStoreKeys: any = [];
  GetBsLiabilitiesData() {
    this.BSL_StoreKeysMonth = [];
    this.BSL_AllDataKeysMonth = [];
    console.log(
      this.date.toString().substr(4, 3),
      this.date.toString().substr(8, 2),
      this.date.toString().substr(11, 4)
    );
    this.Month =
      this.date.toString().substr(8, 2) +
      '-' +
      this.date.toString().substr(4, 3) +
      '-' +
      this.date.toString().substr(11, 4);
    this.BSLData = [];
    this.spinner.show();
    this.Month = this.Month = this.datepipe.transform(this.date, 'yyyy-MM-dd');
    console.log(this.Month);
    let Obj = {
      AcctType: 'L',
      dateString: this.Month,
      stores: this.StoreValues,
    };
    this.apiSrvc.postmethod('xtract/GetBalancesheetReport', Obj).subscribe(
      (res) => {
        if (res.status == 200) {
          console.log('Overall Response', res.response);
          this.BSLData = res.response.map(
            ({ SNo, LABLE1Val, NgClass, ...rest }) => ({ ...rest })
          );

          this.BSLByStoreKeysMonth = Object.keys(res.response[0]);

          console.log('BSLByStoreKeysMonth', this.BSLByStoreKeysMonth);

          let ETByStoreKeys_sortedMonth = this.BSLByStoreKeysMonth.filter(
            (x) => {
              return (
                x != 'BSM_Lable' &&
                x != 'BSM_SubLableDetail' &&
                x != 'BSM_AccountTypeDetail' &&
                x != 'EBITDA_Symbol' &&
                x != 'BSM_SubLable'
              );
            }
          ).sort((a, b) => a.localeCompare(b));
          ETByStoreKeys_sortedMonth = ETByStoreKeys_sortedMonth;
          for (var i = 0; i < ETByStoreKeys_sortedMonth.length; i++) {
            this.BSL_StoreKeysMonth.push(ETByStoreKeys_sortedMonth[i]);
            this.BSL_AllDataKeysMonth.push(ETByStoreKeys_sortedMonth[i]);
          }
          let XpenseTrendByStoreDataMonth = res.response;
          let ETByStoreData_sorted = XpenseTrendByStoreDataMonth;
          console.log('ETByStoreData_sorted', ETByStoreData_sorted);

          this.BSL_LblyByStoreMonth = res.response;
          console.log('BSL_LblyByStoreMonth', this.BSL_LblyByStoreMonth);
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

  BSEData: any = [];
  BSEByStoreKeysMonth: any = [];
  BSEAllDataKeys: any = [];
  BSE_StoreKeysMonth: any;
  BSE_AllDataKeysMonth: any;
  BSE_EqtyByStoreMonth: any;
  BseByStoreKeys: any = [];
  GetBsEquityData() {
    this.BSE_StoreKeysMonth = [];
    this.BSE_AllDataKeysMonth = [];
    console.log(
      this.date.toString().substr(4, 3),
      this.date.toString().substr(8, 2),
      this.date.toString().substr(11, 4)
    );
    this.Month =
      this.date.toString().substr(8, 2) +
      '-' +
      this.date.toString().substr(4, 3) +
      '-' +
      this.date.toString().substr(11, 4);
    this.BSEData = [];
    this.spinner.show();
    this.Month = this.Month = this.datepipe.transform(this.date, 'yyyy-MM-dd');
    console.log(this.Month);
    let Obj = {
      AcctType: 'E',
      dateString: this.Month,
      stores: this.StoreValues,
    };
    this.apiSrvc.postmethod('xtract/GetBalancesheetReport', Obj).subscribe(
      (res) => {
        if (res.status == 200) {
          console.log('Overall Response', res.response);
          this.BSEData = res.response.map(
            ({ SNo, LABLE1Val, NgClass, ...rest }) => ({ ...rest })
          );
          this.BSEByStoreKeysMonth = Object.keys(res.response[0]);
          console.log('BSEByStoreKeysMonth', this.BSEByStoreKeysMonth);
          let ETByStoreKeys_sortedMonth = this.BSEByStoreKeysMonth.filter(
            (x) => {
              return (
                x != 'BSM_Lable' &&
                x != 'BSM_SubLableDetail' &&
                x != 'BSM_AccountTypeDetail' &&
                x != 'EBITDA_Symbol' &&
                x != 'BSM_SubLable'
              );
            }
          ).sort((a, b) => a.localeCompare(b));
          ETByStoreKeys_sortedMonth = ETByStoreKeys_sortedMonth;
          for (var i = 0; i < ETByStoreKeys_sortedMonth.length; i++) {
            this.BSE_StoreKeysMonth.push(ETByStoreKeys_sortedMonth[i]);
            this.BSE_AllDataKeysMonth.push(ETByStoreKeys_sortedMonth[i]);
          }
          let XpenseTrendByStoreDataMonth = res.response;
          let ETByStoreData_sorted = XpenseTrendByStoreDataMonth;
          console.log('ETByStoreData_sorted', ETByStoreData_sorted);

          this.BSE_EqtyByStoreMonth = res.response;
          console.log('BSE_EqtyByStoreMonth', this.BSE_EqtyByStoreMonth);
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

  public inTheGreen(value: number): boolean {
    if (value >= 0) {
      return true;
    }
    return false;
  }

  Month: any = '';
  StoreValues: any = 0;
  ngAfterViewInit(): void {
    this.apiSrvc.GetReports().subscribe((data) => {
      if (data.obj.Reference == 'BS') {
        this.date = data.obj.month;
        this.Month = data.obj.month;
        this.StoreValues = data.obj.storeValues;
        this.GetBsAssetsData();
        this.GetBsLiabilitiesData();
        this.GetBsEquityData();
        const headerdata = {
          title: 'Balance Sheet',
          path1: '',
          path2: '',
          path3: '',
          filter: this.Filter,
          Month: data.obj.month,
          stores: this.StoreValues,
          fromdate: data.obj.FromDate,
          todate: data.obj.ToDate,
        };
        this.apiSrvc.SetHeaderData({
          obj: headerdata,
        });
        console.log(headerdata);
      }
    });
  }

  // openMenu(){
  //   const modalRef = this.ngbmodal.open(BalanceSheetReportsComponent,{
  //     size:'xl',
  //     backdrop: "static",
  //   });
  //   modalRef.componentInstance.Parentcomponent = 'BS';

  // }
}
