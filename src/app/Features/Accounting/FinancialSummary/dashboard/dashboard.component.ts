import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../../Core/Providers/ApiService/api.service';
// import { DetailsComponent } from '../details/details.component';
import { formatDate } from '@angular/common';
import { PdfService } from 'src/app/Core/Providers/PdfService/pdf.service';
import { ExcelService } from 'src/app/Core/Providers/ExcelService/excel.service';
import { getMonth } from 'ngx-bootstrap/chronos';
import { Title } from '@angular/platform-browser';
import { FinancialsummaryDetailsComponent } from '../financialsummary-details/financialsummary-details.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  Current_Date: any;
  LMY_Date: any;
  LM_Date: any;

  LM_Date1: any;
  LM_Date2: any;
  LM_Date3: any;
  LM_Date4: any;
  LM_Date5: any;
  LM_Date6: any;

  FSData: any = [];
  EBITDAdata: any = [];
  ETBudgetData: any = [];
  ETDealerData: any = [];

  SelectedTab: any = ['StoreSummary'];
  Filter: any = 'StoreSummary';
  SubFilter: any = '';
  StoreName: any = 'All Stores';

  NoData: boolean = false;
  date: any;

  constructor(
    public apiSrvc: ApiService,
    private ExcelSrvc: ExcelService,
    private ngbmodal: NgbModal,
    private ngbmodalActive: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private title: Title
  ) {
    const lastMonth = new Date();
    this.date = new Date(lastMonth.setMonth(lastMonth.getMonth() - 1));
    this.title.setTitle('Xtract-Financial Summary');
    const data = {
      title: 'Financial Summary',
      path1: '',
      path2: '',
      path3: '',
      Month: this.date,
      stores: 0,
      filter: this.Filter,
      subfilter: this.SubFilter,
    };
    this.apiSrvc.SetHeaderData({
      obj: data,
    });
    console.log('Today Date', this.date);
  }

  ngOnInit(): void {
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
    this.DataSelection(this.Filter);
  }

  FsData: any = [];
  GetData() {
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

    this.Current_Date =
      this.date.toString().substr(8, 2) +
      '-' +
      this.date.toString().substr(4, 3) +
      '-' +
      this.date.toString().substr(11, 4);

    let LMY_StartDate = new Date();
    let LMYDate = new Date(
      this.date.toString().substr(8, 2) +
        '-' +
        this.date.toString().substr(4, 3) +
        '-' +
        this.date.toString().substr(11, 4)
    );
    LMY_StartDate = new Date(LMYDate.setMonth(LMYDate.getMonth() - 12));
    this.LMY_Date =
      LMY_StartDate.toString().substr(8, 2) +
      '-' +
      LMY_StartDate.toString().substr(4, 3) +
      '-' +
      LMY_StartDate.toString().substr(11, 4);

    let LM_StartDate = new Date();
    let LMDate = new Date(
      this.date.toString().substr(8, 2) +
        '-' +
        this.date.toString().substr(4, 3) +
        '-' +
        this.date.toString().substr(11, 4)
    );
    LM_StartDate = new Date(LMDate.setMonth(LMDate.getMonth() - 1));
    this.LM_Date =
      LM_StartDate.toString().substr(8, 2) +
      '-' +
      LM_StartDate.toString().substr(4, 3) +
      '-' +
      LM_StartDate.toString().substr(11, 4);

    this.FSData = [];
    this.spinner.show();

    let Obj = {
      as_Id: this.StoreValues,
      SalesDate: this.Month,
    };

    this.apiSrvc.postmethod('xtract/GetFinancialSummaryReport', Obj).subscribe(
      (res) => {
        if (res.status == 200) {
          this.FSData = res.response;
          this.FsData = res.response;
          this.FSData = this.FSData.map((v) => ({ ...v, FS_Symbol: '3' }));
          this.FSData.forEach((val, i) => {
            if (
              i == 2 ||
              i == 5 ||
              i == 8 ||
              i == 12 ||
              i == 13 ||
              i == 18 ||
              i == 29 ||
              i == 30 ||
              i == 36 ||
              i == 37
            ) {
              val.FS_Symbol = '2';
            }
          });
          console.log('Fs Data', this.FSData);
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

  GetDataEBITDA() {
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
    this.Current_Date =
      this.date.toString().substr(8, 2) +
      '-' +
      this.date.toString().substr(4, 3) +
      '-' +
      this.date.toString().substr(11, 4);
    let LMY_StartDate = new Date();
    let LMYDate = new Date(
      this.date.toString().substr(8, 2) +
        '-' +
        this.date.toString().substr(4, 3) +
        '-' +
        this.date.toString().substr(11, 4)
    );
    LMY_StartDate = new Date(LMYDate.setMonth(LMYDate.getMonth() - 12));
    this.LMY_Date =
      LMY_StartDate.toString().substr(8, 2) +
      '-' +
      LMY_StartDate.toString().substr(4, 3) +
      '-' +
      LMY_StartDate.toString().substr(11, 4);

    let LM_StartDate = new Date();
    let LMDate = new Date(
      this.date.toString().substr(8, 2) +
        '-' +
        this.date.toString().substr(4, 3) +
        '-' +
        this.date.toString().substr(11, 4)
    );
    LM_StartDate = new Date(LMDate.setMonth(LMDate.getMonth() - 1));
    this.LM_Date =
      LM_StartDate.toString().substr(8, 2) +
      '-' +
      LM_StartDate.toString().substr(4, 3) +
      '-' +
      LM_StartDate.toString().substr(11, 4);
    this.EBITDAdata = [];
    this.spinner.show();

    let Obj = {
      as_Id: this.StoreValues,
      SalesDate: this.Month,
    };
    this.apiSrvc.postmethod('xtract/GetFinancialEBITDAReport', Obj).subscribe(
      (res) => {
        if (res.status == 200) {
          this.EBITDAdata = res.response;
          this.EBITDAdata = this.EBITDAdata.map((v) => ({
            ...v,
            EBITDA_Symbol: '3',
          }));

          this.EBITDAdata.forEach((val, i) => {
            if (
              i == 5 ||
              i == 10 ||
              i == 15 ||
              i == 16 ||
              i == 21 ||
              i == 22 ||
              i == 29 ||
              i == 30
            ) {
              val.EBITDA_Symbol = '2';
            }
          });
          console.log('EBITDA Data', this.EBITDAdata);
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

  LastsixMonths: any;
  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  GetETBudgetData() {
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
    this.Current_Date =
      this.date.toString().substr(8, 2) +
      '-' +
      this.date.toString().substr(4, 3) +
      '-' +
      this.date.toString().substr(11, 4);

    var today = new Date(this.Month);
    var d;
    var month;
    var year;
    this.LastsixMonths = [];
    for (var i = 6; i > 0; i -= 1) {
      d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      month = this.monthNames[d.getMonth()];
      year = d.getFullYear();
      this.LastsixMonths.push(month + ' ' + year);
    }

    // let LMDate1 = new Date(this.Current_Date)
    // LMDate1.setMonth(LMDate1.getMonth());
    // this.LM_Date1 = LMDate1.toISOString().slice(0, 10);
    // let LMDate2 = new Date(this.Current_Date)
    // LMDate2.setMonth(LMDate2.getMonth() - 1);
    // this.LM_Date2 = LMDate2.toISOString().slice(0, 10);
    // let LMDate3 = new Date(this.Current_Date)
    // LMDate3.setMonth(LMDate3.getMonth() - 2);
    // this.LM_Date3 = LMDate3.toISOString().slice(0, 10);
    // let LMDate4 = new Date(this.Current_Date)
    // LMDate4.setMonth(LMDate4.getMonth() - 3);
    // this.LM_Date4 = LMDate4.toISOString().slice(0, 10);
    // let LMDate5 = new Date(this.Current_Date)
    // LMDate5.setMonth(LMDate5.getMonth() - 4);
    // this.LM_Date5 = LMDate5.toISOString().slice(0, 10);
    // let LMDate6 = new Date(this.Current_Date)
    // LMDate6.setMonth(LMDate6.getMonth() - 5);
    // this.LM_Date6 = LMDate6.toISOString().slice(0, 10);

    this.ETBudgetData = [];
    this.spinner.show();
    let Obj = {
      as_Id: this.StoreValues,
      SalesDate: this.Month,
    };
    this.apiSrvc
      .postmethod('xtract/GetFinancialETReportVsBudget', Obj)
      .subscribe(
        (res) => {
          if (res.status == 200) {
            this.ETBudgetData = res.response;
            this.ETBudgetData = this.ETBudgetData.map((v) => ({
              ...v,
              ETB_Symbol: '3',
            }));

            this.ETBudgetData.forEach((val, i) => {
              if (
                i == 5 ||
                i == 10 ||
                i == 15 ||
                i == 26 ||
                i == 53 ||
                i == 69 ||
                i == 71 ||
                i == 30
              ) {
                val.ETB_Symbol = '2';
              }
              if (
                i == 16 ||
                i == 27 ||
                i == 54 ||
                i == 70 ||
                i == 72 ||
                i == 73 ||
                i == 79 ||
                i == 80
              ) {
                val.ETB_Symbol = '4';
              }
            });
            console.log('ETbudget Data', this.ETBudgetData);
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

  XpenseTrendByStoreKeysMonth: any = [];
  AllDatakeys: any = [];
  ExpenseTrendByStoreKeysMonth: any;
  AllDatakeysMonth: any;
  ExpenseTrendByStoreMonth: any;
  ExpenseTrendByStoreKeys: any = [];

  GetETDealerData() {
    this.ExpenseTrendByStoreKeysMonth = [];
    this.AllDatakeysMonth = [];
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
    this.ETDealerData = [];
    this.spinner.show();
    let Obj = {
      as_Id: this.StoreValues,
      SalesDate: this.Month,
    };
    this.apiSrvc
      .postmethod('xtract/GetFinancialETReportVsDealer', Obj)
      .subscribe(
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
                  x != 'SNo' &&
                  x != 'LABLE1' &&
                  x != 'NgClass' &&
                  x != 'LABLE1Val'
                );
              }).sort((a, b) => a.localeCompare(b));
            let AllStore_Label = ETByStoreKeys_sortedMonth.find((x) => {
              if (x.toUpperCase() == 'All Stores'.toUpperCase()) return x;
            });

            ETByStoreKeys_sortedMonth = ETByStoreKeys_sortedMonth.splice(1);

            this.AllDatakeys = ['LABLE1', 'NgClass'];

            for (var i = 0; i < ETByStoreKeys_sortedMonth.length; i++) {
              this.ExpenseTrendByStoreKeysMonth.push(
                ETByStoreKeys_sortedMonth[i]
              );
              // this.ExpenseTrendByStoreKeysMonth.push("");
              this.AllDatakeysMonth.push(ETByStoreKeys_sortedMonth[i]);
              // this.AllDatakeysMonth.push("");
            }

            this.ExpenseTrendByStoreKeysMonth.push(AllStore_Label);

            this.AllDatakeysMonth.push(AllStore_Label);
            let XpenseTrendByStoreDataMonth = res.response;
            let ETByStoreData_sorted = XpenseTrendByStoreDataMonth;
            console.log('ETByStoreData_sorted', ETByStoreData_sorted);

            this.ExpenseTrendByStoreMonth = res.response;
            this.ExpenseTrendByStoreMonth = this.ExpenseTrendByStoreMonth.map(
              (v) => ({ ...v, EBITDA_Symbol: '3' })
            );
            this.ExpenseTrendByStoreMonth.forEach((val, i) => {
              if (i == 4 || i == 14 || i == 39 || i == 54 || i == 55) {
                val.EBITDA_Symbol = '2';
              }
            });
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

  VKBudgetData_NU: any = [];
  GetVKBudgetData_NU() {
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
    this.Current_Date =
      this.date.toString().substr(8, 2) +
      '-' +
      this.date.toString().substr(4, 3) +
      '-' +
      this.date.toString().substr(11, 4);
    let LMY_StartDate = new Date();
    let LMYDate = new Date(
      this.date.toString().substr(8, 2) +
        '-' +
        this.date.toString().substr(4, 3) +
        '-' +
        this.date.toString().substr(11, 4)
    );
    LMY_StartDate = new Date(LMYDate.setMonth(LMYDate.getMonth() - 12));
    this.LMY_Date =
      LMY_StartDate.toString().substr(8, 2) +
      '-' +
      LMY_StartDate.toString().substr(4, 3) +
      '-' +
      LMY_StartDate.toString().substr(11, 4);

    let LM_StartDate = new Date();
    let LMDate = new Date(
      this.date.toString().substr(8, 2) +
        '-' +
        this.date.toString().substr(4, 3) +
        '-' +
        this.date.toString().substr(11, 4)
    );
    LM_StartDate = new Date(LMDate.setMonth(LMDate.getMonth() - 1));
    this.LM_Date =
      LM_StartDate.toString().substr(8, 2) +
      '-' +
      LM_StartDate.toString().substr(4, 3) +
      '-' +
      LM_StartDate.toString().substr(11, 4);
    this.VKBudgetData_NU = [];
    this.spinner.show();
    let Obj = {
      BLOCK: 'NU',
      pack: 'N',
      as_Id: this.StoreValues,
      SalesDate: this.Month,
    };
    this.apiSrvc
      .postmethod('xtract/GetFinancialVariableVsBudget', Obj)
      .subscribe(
        (res) => {
          if (res.status == 200) {
            this.VKBudgetData_NU = res.response;
            this.VKBudgetData_NU = this.VKBudgetData_NU.map((v) => ({
              ...v,
              ETB_Symbol: '3',
            }));

            this.VKBudgetData_NU.forEach((val, i) => {
              if (
                i == 3 ||
                i == 6 ||
                i == 11 ||
                i == 14 ||
                i == 15 ||
                i == 16 ||
                i == 21 ||
                i == 26
              ) {
                val.ETB_Symbol = '4';
              }
            });
            console.log('ETbudget NU Data', this.VKBudgetData_NU);
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

  VKBudgetData_PC: any = [];
  GetVKBudgetData_PC() {
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
    this.Current_Date =
      this.date.toString().substr(8, 2) +
      '-' +
      this.date.toString().substr(4, 3) +
      '-' +
      this.date.toString().substr(11, 4);
    let LMY_StartDate = new Date();
    let LMYDate = new Date(
      this.date.toString().substr(8, 2) +
        '-' +
        this.date.toString().substr(4, 3) +
        '-' +
        this.date.toString().substr(11, 4)
    );
    LMY_StartDate = new Date(LMYDate.setMonth(LMYDate.getMonth() - 12));
    this.LMY_Date =
      LMY_StartDate.toString().substr(8, 2) +
      '-' +
      LMY_StartDate.toString().substr(4, 3) +
      '-' +
      LMY_StartDate.toString().substr(11, 4);

    let LM_StartDate = new Date();
    let LMDate = new Date(
      this.date.toString().substr(8, 2) +
        '-' +
        this.date.toString().substr(4, 3) +
        '-' +
        this.date.toString().substr(11, 4)
    );
    LM_StartDate = new Date(LMDate.setMonth(LMDate.getMonth() - 1));
    this.LM_Date =
      LM_StartDate.toString().substr(8, 2) +
      '-' +
      LM_StartDate.toString().substr(4, 3) +
      '-' +
      LM_StartDate.toString().substr(11, 4);
    this.VKBudgetData_PC = [];
    this.spinner.show();
    let Obj = {
      BLOCK: 'PC',
      pack: 'N',
      as_Id: this.StoreValues,
      SalesDate: this.Month,
    };
    this.apiSrvc
      .postmethod('xtract/GetFinancialVariableVsBudget', Obj)
      .subscribe(
        (res) => {
          if (res.status == 200) {
            this.VKBudgetData_PC = res.response;
            this.VKBudgetData_PC = this.VKBudgetData_PC.map((v) => ({
              ...v,
              ETB_Symbol: '3',
            }));

            this.VKBudgetData_PC.forEach((val, i) => {
              if (
                i == 3 ||
                i == 6 ||
                i == 9 ||
                i == 10 ||
                i == 14 ||
                i == 17 ||
                i == 20
              ) {
                val.ETB_Symbol = '4';
              }
            });
            console.log('ETbudget PC Data', this.VKBudgetData_PC);
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

  VKBudgetData_CV: any = [];
  GetVKBudgetData_CV() {
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
    this.Current_Date =
      this.date.toString().substr(8, 2) +
      '-' +
      this.date.toString().substr(4, 3) +
      '-' +
      this.date.toString().substr(11, 4);
    let LMY_StartDate = new Date();
    let LMYDate = new Date(
      this.date.toString().substr(8, 2) +
        '-' +
        this.date.toString().substr(4, 3) +
        '-' +
        this.date.toString().substr(11, 4)
    );
    LMY_StartDate = new Date(LMYDate.setMonth(LMYDate.getMonth() - 12));
    this.LMY_Date =
      LMY_StartDate.toString().substr(8, 2) +
      '-' +
      LMY_StartDate.toString().substr(4, 3) +
      '-' +
      LMY_StartDate.toString().substr(11, 4);

    let LM_StartDate = new Date();
    let LMDate = new Date(
      this.date.toString().substr(8, 2) +
        '-' +
        this.date.toString().substr(4, 3) +
        '-' +
        this.date.toString().substr(11, 4)
    );
    LM_StartDate = new Date(LMDate.setMonth(LMDate.getMonth() - 1));
    this.LM_Date =
      LM_StartDate.toString().substr(8, 2) +
      '-' +
      LM_StartDate.toString().substr(4, 3) +
      '-' +
      LM_StartDate.toString().substr(11, 4);
    this.VKBudgetData_CV = [];
    this.spinner.show();
    let Obj = {
      BLOCK: 'CV',
      pack: 'N',
      as_Id: this.StoreValues,
      SalesDate: this.Month,
    };
    this.apiSrvc
      .postmethod('xtract/GetFinancialVariableVsBudget', Obj)
      .subscribe(
        (res) => {
          if (res.status == 200) {
            this.VKBudgetData_CV = res.response;
            this.VKBudgetData_CV = this.VKBudgetData_CV.map((v) => ({
              ...v,
              ETB_Symbol: '3',
            }));
            this.VKBudgetData_CV.forEach((val, i) => {
              if (i == 3 || i == 6 || i == 13 || i == 16) {
                val.ETB_Symbol = '4';
              }
            });
            console.log('ETbudget CV Data', this.VKBudgetData_CV);

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

  VKByStoreKeysMonth_NU: any = [];
  VKAllDatakeys_NU: any = [];
  VKByStoreKeysMonth1_NU: any;
  VKAllDatakeysMonth_NU: any;
  VKByStoreKeysData_NU: any;

  VkDealerData_NU: any = [];
  GetVKDealerData_NU() {
    this.VKByStoreKeysMonth1_NU = [];
    this.VKAllDatakeysMonth_NU = [];
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
    this.VkDealerData_NU = [];
    console.log('MONTH Date', this.Month);

    this.spinner.show();
    let Obj = {
      BLOCK: 'NU',
      as_Id: this.StoreValues,
      SalesDate: this.Month,
    };
    console.log('Object', Obj);

    this.apiSrvc
      .postmethod('xtract/GetFinancialVariableVsDealer', Obj)
      .subscribe(
        (res) => {
          if (res.status == 200) {
            this.VkDealerData_NU = res.response;

            this.VKByStoreKeysMonth_NU = Object.keys(res.response[0]);

            console.log('VKByStoreKeysMonth_NU', this.VKByStoreKeysMonth_NU);

            let VkDealerNU_Sorted = this.VKByStoreKeysMonth_NU.filter((x) => {
              return (
                x != 'SNo' &&
                x != 'VariableOperations' &&
                x != 'NgClass' &&
                x != 'LABLE1Val'
              );
            }).sort((a, b) => a.localeCompare(b));
            let AllStoreLabel_NU = VkDealerNU_Sorted.find((x) => {
              if (x.toUpperCase() == 'All Stores'.toUpperCase()) return x;
            });

            VkDealerNU_Sorted = VkDealerNU_Sorted.splice(1);

            this.VKAllDatakeys_NU = ['VariableOperations', 'NgClass'];

            for (var i = 0; i < VkDealerNU_Sorted.length; i++) {
              this.VKByStoreKeysMonth1_NU.push(VkDealerNU_Sorted[i]);
              // this.VKByStoreKeysMonth1_NU.push("");
              this.VKAllDatakeysMonth_NU.push(VkDealerNU_Sorted[i]);
              // this.VKAllDatakeysMonth_NU.push("");
            }

            this.VKByStoreKeysMonth1_NU.push(AllStoreLabel_NU);

            this.VKAllDatakeysMonth_NU.push(AllStoreLabel_NU);
            let VKByStoreDataMonth = res.response;
            let ETByStoreData_sorted = VKByStoreDataMonth;
            console.log('ETByStoreData_sorted', ETByStoreData_sorted);

            this.VKByStoreKeysData_NU = res.response;
            this.VKByStoreKeysData_NU = this.VKByStoreKeysData_NU.map((v) => ({
              ...v,
              EBITDA_Symbol: '3',
            }));
            this.VKByStoreKeysData_NU.forEach((val, i) => {
              if (i == 3 || i == 6 || i == 14 || i == 19) {
                val.EBITDA_Symbol = '4';
              }
            });

            if (this.VKByStoreKeysData_NU.length > 0) {
              for (var i = 0; i < this.VKByStoreKeysData_NU.length; i++) {
                if (
                  this.VKByStoreKeysData_NU[i][
                    'VariableOperations'
                  ].toUpperCase() == 'Incentives PVR'.toUpperCase()
                ) {
                  this.VKByStoreKeysData_NU.splice(i + 1, 0, {
                    VariableOperations: 'VARIABLE EXPENSES - PVR',
                  });
                  i++;
                } else if (
                  this.VKByStoreKeysData_NU[i][
                    'VariableOperations'
                  ].toUpperCase() == 'Total Variable Expenses PVR'.toUpperCase()
                ) {
                  this.VKByStoreKeysData_NU.splice(i + 1, 0, {
                    VariableOperations: 'VARIABLE EXPENSES - TOTAL',
                  });
                  i++;
                }
              }
            }
            console.log('VKByStoreKeysData_NU', this.VKByStoreKeysData_NU);

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
  VKByStoreKeysMonth_PC: any = [];
  VKAllDatakeys_PC: any = [];
  VKByStoreKeysMonth1_PC: any;
  VKAllDatakeysMonth_PC: any;
  VKByStoreKeysData_PC: any;
  VkDealerData_PC: any = [];
  GetVKDealerData_PC() {
    this.VKByStoreKeysMonth1_PC = [];
    this.VKAllDatakeysMonth_PC = [];
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
    this.VkDealerData_PC = [];
    this.spinner.show();
    let Obj = {
      BLOCK: 'PC',
      as_Id: this.StoreValues,
      SalesDate: this.Month,
    };
    this.apiSrvc
      .postmethod('xtract/GetFinancialVariableVsDealer', Obj)
      .subscribe(
        (res) => {
          if (res.status == 200) {
            this.VkDealerData_PC = res.response;
            this.VKByStoreKeysMonth_PC = Object.keys(res.response[0]);

            console.log('VKByStoreKeysMonth_PC', this.VKByStoreKeysMonth_PC);

            let VkDealerPC_Sorted = this.VKByStoreKeysMonth_PC.filter((x) => {
              return (
                x != 'SNo' &&
                x != 'NewPerformance' &&
                x != 'NgClass' &&
                x != 'LABLE1Val'
              );
            }).sort((a, b) => a.localeCompare(b));
            let AllStoreLabel_PC = VkDealerPC_Sorted.find((x) => {
              if (x.toUpperCase() == 'All Stores'.toUpperCase()) return x;
            });

            VkDealerPC_Sorted = VkDealerPC_Sorted.splice(1);

            this.VKAllDatakeys_PC = ['NewPerformance', 'NgClass'];

            for (var i = 0; i < VkDealerPC_Sorted.length; i++) {
              this.VKByStoreKeysMonth1_PC.push(VkDealerPC_Sorted[i]);
              // this.VKByStoreKeysMonth1_NU.push("");
              this.VKAllDatakeysMonth_PC.push(VkDealerPC_Sorted[i]);
              // this.VKAllDatakeysMonth_NU.push("");
            }

            this.VKByStoreKeysMonth1_PC.push(AllStoreLabel_PC);

            this.VKAllDatakeysMonth_PC.push(AllStoreLabel_PC);
            let VKByStoreDataMonth = res.response;
            let ETByStoreData_sorted = VKByStoreDataMonth;
            console.log('ETByStoreData_sorted', ETByStoreData_sorted);

            this.VKByStoreKeysData_PC = res.response;
            this.VKByStoreKeysData_PC = this.VKByStoreKeysData_PC.map((v) => ({
              ...v,
              EBITDA_Symbol: '3',
            }));
            this.VKByStoreKeysData_PC.forEach((val, i) => {
              if (i == 3 || i == 6 || i == 13 || i == 16 || i == 22) {
                val.EBITDA_Symbol = '4';
              }
            });

            if (this.VKByStoreKeysData_PC.length > 0) {
              for (var i = 0; i < this.VKByStoreKeysData_PC.length; i++) {
                if (
                  this.VKByStoreKeysData_PC[i][
                    'NewPerformance'
                  ].toUpperCase() == 'Used Units'.toUpperCase()
                ) {
                  this.VKByStoreKeysData_PC.splice(i - 1, 0, {
                    NewPerformance: 'USED PERFORMANCE',
                  });
                  break;
                }
              }
            }
            console.log('VKByStoreKeysData_PC', this.VKByStoreKeysData_PC);
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
  VKByStoreKeysMonth_CV: any = [];
  VKAllDatakeys_CV: any = [];
  VKByStoreKeysMonth1_CV: any;
  VKAllDatakeysMonth_CV: any;
  VKByStoreKeysData_CV: any;
  VkDealerData_CV: any = [];
  GetVKDealerData_CV() {
    this.VKByStoreKeysMonth1_CV = [];
    this.VKAllDatakeysMonth_CV = [];
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
    this.VkDealerData_CV = [];
    this.spinner.show();
    let Obj = {
      BLOCK: 'CV',
      as_Id: this.StoreValues,
      SalesDate: this.Month,
    };
    this.apiSrvc
      .postmethod('xtract/GetFinancialVariableVsDealer', Obj)
      .subscribe(
        (res) => {
          if (res.status == 200) {
            this.VkDealerData_CV = res.response;
            this.VKByStoreKeysMonth_CV = Object.keys(res.response[0]);

            console.log('VKByStoreKeysMonth_CV', this.VKByStoreKeysMonth_CV);

            let VkDealerCV_Sorted = this.VKByStoreKeysMonth_CV.filter((x) => {
              return (
                x != 'SNo' &&
                x != 'NewPerformance' &&
                x != 'NgClass' &&
                x != 'LABLE1Val'
              );
            }).sort((a, b) => a.localeCompare(b));
            let AllStoreLabel_CV = VkDealerCV_Sorted.find((x) => {
              if (x.toUpperCase() == 'All Stores'.toUpperCase()) return x;
            });

            VkDealerCV_Sorted = VkDealerCV_Sorted.splice(1);

            this.VKAllDatakeys_PC = ['NewPerformance', 'NgClass'];

            for (var i = 0; i < VkDealerCV_Sorted.length; i++) {
              this.VKByStoreKeysMonth1_CV.push(VkDealerCV_Sorted[i]);
              // this.VKByStoreKeysMonth1_NU.push("");
              this.VKAllDatakeysMonth_CV.push(VkDealerCV_Sorted[i]);
              // this.VKAllDatakeysMonth_NU.push("");
            }

            this.VKByStoreKeysMonth1_CV.push(AllStoreLabel_CV);

            this.VKAllDatakeysMonth_CV.push(AllStoreLabel_CV);
            let VKByStoreDataMonth = res.response;
            let ETByStoreData_sorted = VKByStoreDataMonth;
            console.log('ETByStoreData_sorted', ETByStoreData_sorted);

            this.VKByStoreKeysData_CV = res.response;
            this.VKByStoreKeysData_CV = this.VKByStoreKeysData_CV.map((v) => ({
              ...v,
              EBITDA_Symbol: '3',
            }));
            this.VKByStoreKeysData_CV.forEach((val, i) => {
              if (i == 3 || i == 6 || i == 13 || i == 16) {
                val.EBITDA_Symbol = '4';
              }
            });

            if (this.VKByStoreKeysData_CV.length > 0) {
              for (var i = 0; i < this.VKByStoreKeysData_CV.length; i++) {
                if (
                  this.VKByStoreKeysData_CV[i][
                    'NewPerformance'
                  ].toUpperCase() == 'Incentives PVR'.toUpperCase()
                ) {
                  this.VKByStoreKeysData_CV.splice(i + 1, 0, {
                    NewPerformance: 'USED PERFORMANCE',
                  });
                  break;
                }
              }
            }
            console.log('VKByStoreKeysData_CV', this.VKByStoreKeysData_PC);

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
      if (data.obj.Reference == 'FS') {
        this.date = data.obj.month;
        this.Month = data.obj.month;
        this.StoreValues = data.obj.storeValues;
        this.StoreName = data.obj.Sname;
        this.Filter = data.obj.filters;
        this.SubFilter = data.obj.subfilters;
        this.DataSelection(this.Filter);
        // this.DataSelection(this.SubFilter);
        // this.GetData()
        const headerdata = {
          title: 'Financial Summary',
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
  SubSelectedTab1: any = [];
  DataSelection(Val) {
    console.log(this.Filter);
    console.log(this.SubFilter);
    this.SelectedTab = [];
    this.SubSelectedTab1 = [];
    this.SelectedTab.push(this.Filter);
    this.SubSelectedTab1.push(this.SubFilter);
    if (this.Filter == 'StoreSummary') {
      this.GetData();
    }
    if (this.Filter == 'AdjustedEbitda') {
      this.GetDataEBITDA();
    }
    if (this.Filter == 'ExpenseTrend') {
      if (this.SubFilter == 'VariableTrendsvsBudget') {
        this.GetETBudgetData();
      }
      if (this.SubFilter == 'VariableTrendsvsStores') {
        this.GetETDealerData();
      }
    }
    if (this.Filter == 'VariableKPI') {
      if (this.SubFilter == 'VariableTrendsvsBudget') {
        this.GetVKBudgetData_NU();
        this.GetVKBudgetData_PC();
        this.GetVKBudgetData_CV();
      }
      if (this.SubFilter == 'VariableTrendsvsStores') {
        this.GetVKDealerData_NU();
        this.GetVKDealerData_PC();
        this.GetVKDealerData_CV();
      }
    }
  }

  openMenu(Object) {
    console.log(Object);
    const DetailsFs = this.ngbmodal.open(FinancialsummaryDetailsComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    DetailsFs.componentInstance.Fsdetails = {
      TYPE: Object.LABLE1Val,
      NAME: Object.LABLE1,
      STORES: this.StoreValues,
      LatestDate: this.Month,
    };
  }
}
