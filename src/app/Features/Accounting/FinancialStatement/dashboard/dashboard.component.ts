import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

// import { DetailsComponent } from 'details/details.component';
import { formatDate } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { ApiService } from '../../../../Core/Providers/ApiService/api.service';

import { FinancialstatementDetailsComponent } from '../financialstatement-details/financialstatement-details.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  Current_Date: any;

  gridshow: boolean = false;
  monthgridshow: boolean = false;
  FSData: any = [];

  NoData: boolean = false;
  date: any;
  ExpenseTrendByStoreKeys: any[];
  AllDatakeys: any[];
  ExpenseTrendByStore_Excel: any;
  XpenseTrendByStoreKeys: string[];
  ExpenseTrendByStore: any;
  ExpenseTrendByStore_ExcelMonth: any;
  XpenseTrendByStoreKeysMonth: string[];
  ExpenseTrendByStoreKeysMonth: any;
  AllDatakeysMonth: any;
  ExpenseTrendByStoreMonth: any;
  Filter: any;
  StoreName: any;
  SubFilter: any;
  SelectedTab: any[];
  SubSelectedTab1: any[];
  Month: any;
  stores: any;
  selectedstorevalues: any[];
  selectedstorename: any;
  constructor(
    private datepipe: DatePipe,
    public apiSrvc: ApiService,
    private ngbmodal: NgbModal,
    private ngbmodalActive: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private title: Title
  ) {
    this.Filter = 'StoreSummary';
    let newdate = new Date();
    //this.Month='01-'+('0' +( newdate.getMonth())).slice(-2)+'-'+newdate.getFullYear()
    this.date = new Date(newdate.setMonth(newdate.getMonth() - 1));

    this.Month =
      ('0' + (newdate.getMonth() + 1)).slice(-2) +
      '-01' +
      '-' +
      newdate.getFullYear();
    // this.Month='01-12-2022'
    // this.Month= new Date(newdate.getFullYear(), newdate.getMonth(), 1)
    this.title.setTitle('Xtract - Financial Statement');
    const data = {
      title: 'Financial Statement',
      path1: '',
      path2: '',
      path3: '',
      Month: this.date,
      stores: 0,
      filter: this.Filter,
      store: this.StoreValues,

      // subfilter: this.SubFilter
    };
    this.apiSrvc.SetHeaderData({
      obj: data,
    });
  }

  ngOnInit(): void {
    // this.Month='01-'+("0" + ( this.date.getMonth()+)).slice(-2)+'-'+ this.date.getFullYear()

    this.GetData();
    this.getStores();
  }

  GetData() {
    //console.log(this.Month)
    this.spinner.show();
    this.ExpenseTrendByStoreKeys = [];
    this.AllDatakeys = [];

    const obj = {
      // "SalesDate": "11-01-2022"
      SalesDate: this.Month,
    };
    this.apiSrvc
      .postmethod('xtract/GetSimpleFinancialSummaryReport', obj)
      .subscribe(
        (x) => {
          if (x.status == 200) {
            this.gridshow = true;
            //console.log('Overall Response',x.response)
            this.ExpenseTrendByStore_Excel = x.response.map(
              ({ SNo, ...rest }) => ({ ...rest })
            );
            //console.log('ExpenseTrendByStore_Excel',this.ExpenseTrendByStore_Excel)
            this.XpenseTrendByStoreKeys = Object.keys(x.response[0]);
            //console.log('XpenseTrendByStoreKeys',this.XpenseTrendByStoreKeys)
            let ETByStoreKeys_sorted = this.XpenseTrendByStoreKeys.filter(
              (x) => {
                return x != 'SNo' && x != 'NgClass';
              }
            );

            // let ETByStoreKeys_sorted = this.XpenseTrendByStoreKeys.filter(x => { return (x != "" && x != "" && x != "") }).sort((a,b) => a.localeCompare(b));
            //console.log('ETByStoreKeys_sorted',ETByStoreKeys_sorted)
            let AllStore_Label = ETByStoreKeys_sorted.find((x) => {
              if (x.toUpperCase() == 'All Stores'.toUpperCase()) return x;
            });
            //console.log('AllStore_Label',AllStore_Label)
            ETByStoreKeys_sorted = ETByStoreKeys_sorted.splice(1);
            //console.log('ETByStoreKeys_sorted',ETByStoreKeys_sorted)
            // /* To add space between each array value to get dynamic <th>*/
            // this.AllDatakeys= ["LABLE1", "NgClass"];
            for (var i = 0; i < ETByStoreKeys_sorted.length; i++) {
              this.ExpenseTrendByStoreKeys.push(ETByStoreKeys_sorted[i]);
              // this.ExpenseTrendByStoreKeys.push("");

              this.AllDatakeys.push(ETByStoreKeys_sorted[i]);

              // this.AllDatakeys.push("");
            }
            this.ExpenseTrendByStoreKeys.push(AllStore_Label);
            this.AllDatakeys.push(AllStore_Label);
            //console.log('ExpenseTrendByStoreKeys',this.ExpenseTrendByStoreKeys)
            //console.log('AllDatakeys',this.AllDatakeys)
            let XpenseTrendByStoreData = x.response;
            let ETByStoreData_sorted = XpenseTrendByStoreData;
            let AllStoreLabel_Data = '';
            this.ExpenseTrendByStore = x.response;
            //console.log('ExpenseTrendByStore',this.ExpenseTrendByStore)

            if (this.ExpenseTrendByStoreKeys.length == 0) {
              this.NoData = true;
            } else {
              this.NoData = false;
            }
            this.spinner.hide();
          }
        },
        () => {}
      );
  }

  GetDataByMonths() {
    this.spinner.show();
    this.ExpenseTrendByStoreKeysMonth = [];
    this.AllDatakeysMonth = [];

    const obj = {
      // "SalesDate": "11-01-2022"
      // "as_id":this.StoreValues,
      as_id: this.StoreValues,

      SalesDate: this.Month,
    };
    this.apiSrvc
      .postmethod('xtract/GetSimpleFinancialSummaryReportByMonths', obj)
      .subscribe(
        (x) => {
          if (x.status == 200) {
            this.monthgridshow = true;
            //console.log('Overall Response',x.response)
            this.ExpenseTrendByStore_ExcelMonth = x.response.map(
              ({ SNo, ...rest }) => ({ ...rest })
            );
            //console.log('ExpenseTrendByStore_ExcelMonth',this.ExpenseTrendByStore_ExcelMonth)
            this.XpenseTrendByStoreKeysMonth = Object.keys(x.response[0]);
            //console.log('XpenseTrendByStoreKeysMonth',this.XpenseTrendByStoreKeysMonth)
            let ETByStoreKeys_sortedMonth =
              this.XpenseTrendByStoreKeysMonth.filter((x) => {
                return x != 'SNo' && x != 'NgClass';
              });

            // let ETByStoreKeys_sorted = this.XpenseTrendByStoreKeys.filter(x => { return (x != "" && x != "" && x != "") }).sort((a,b) => a.localeCompare(b));
            //console.log('ETByStoreKeys_sortedMonth',ETByStoreKeys_sortedMonth)
            let AllStore_LabelMonth = ETByStoreKeys_sortedMonth.find((x) => {
              if (x.toUpperCase() == 'All Stores'.toUpperCase()) return x;
            });
            //console.log('AllStore_LabelMonth',AllStore_LabelMonth)
            ETByStoreKeys_sortedMonth = ETByStoreKeys_sortedMonth.splice(1);
            //console.log('ETByStoreKeys_sortedMonth',ETByStoreKeys_sortedMonth)
            // /* To add space between each array value to get dynamic <th>*/
            // this.AllDatakeys= ["LABLE1", "NgClass"];
            for (var i = 0; i < ETByStoreKeys_sortedMonth.length; i++) {
              this.ExpenseTrendByStoreKeysMonth.push(
                ETByStoreKeys_sortedMonth[i]
              );
              // this.ExpenseTrendByStoreKeysMonth.push("");
              this.AllDatakeysMonth.push(ETByStoreKeys_sortedMonth[i]);
              // this.AllDatakeysMonth.push("");
            }
            this.ExpenseTrendByStoreKeysMonth.push(AllStore_LabelMonth);
            this.AllDatakeysMonth.push(AllStore_LabelMonth);
            //console.log('ExpenseTrendByStoreKeysMonth',this.ExpenseTrendByStoreKeys)
            //console.log('AllDatakeysMonth',this.AllDatakeysMonth)
            let XpenseTrendByStoreDataMonth = x.response;
            let ETByStoreData_sorted = XpenseTrendByStoreDataMonth;
            let AllStoreLabel_Data = '';
            this.ExpenseTrendByStoreMonth = x.response;
            //console.log('ExpenseTrendByStoreMonth',this.ExpenseTrendByStoreMonth)

            if (this.ExpenseTrendByStoreKeysMonth.length == 0) {
              this.NoData = true;
            } else {
              this.NoData = false;
            }
            this.spinner.hide();
          }
        },
        () => {}
      );
  }

  DataSelection(Val) {
    //console.log(this.Filter);
    //console.log(this.SubFilter);
    this.SelectedTab = [];
    // this.SubSelectedTab1 =[];
    this.SelectedTab.push(this.Filter);
    // this.SubSelectedTab1.push(this.SubFilter)
    if (this.Filter == 'StoreSummary') {
      // this.GetDataByMonths();
    }
  }

  public inTheGreen(value: number): boolean {
    if (value >= 0) {
      return true;
    }
    return false;
  }

  StoreValues: any = 0;
  ngAfterViewInit(): void {
    this.apiSrvc.GetReports().subscribe((data) => {
      //console.log(data)
      if (data.obj.Reference == 'SF') {
        this.date = data.obj.month;
        this.Month = data.obj.month;
        // this.Month =  ('0' +( new Date(data.obj.month).getMonth())).slice(-2)+'-01'+'-'+new Date (data.obj.month).getFullYear()
        this.StoreValues = data.obj.storeValues;
        this.StoreName = data.obj.Sname;
        this.Filter = data.obj.filters;
        this.SubFilter = data.obj.subfilters;
        // this.DataSelection(this.Filter);
        const headerdata = {
          title: 'Financial Statement',
          path1: '',
          path2: '',
          path3: '',
          Month: data.obj.month,
          filter: this.Filter,
          store: this.StoreValues,
        };
        this.apiSrvc.SetHeaderData({
          obj: headerdata,
        });
        if (this.Filter == 'StoreSummary') {
          this.GetData();
        } else {
          this.GetDataByMonths();
        }
      }
    });
  }

  getStores() {
    this.selectedstorevalues = [];
    const obj = {
      AU_ID: 1,
    };
    this.apiSrvc.postmethod('xtract/GetStores', obj).subscribe(
      (res) => {
        if (res.status == 200) {
          this.stores = res.response;
        } else {
          alert('Invalid Details');
        }
      },
      (error) => {
        // console.log(error);
      }
    );
  }

  openDetails(Object, storename, ref, item) {
    let index = this.stores.filter((store) => store.DEALER_NAME == storename);
    // console.log(Object,storename,ref,index);

    this.selectedstorevalues = index[0].AS_ID;
    this.selectedstorename = index[0].DEALER_NAME;

    if (ref == 'store') {
      const DetailsSF = this.ngbmodal.open(FinancialstatementDetailsComponent, {
        size: 'xl',
        backdrop: 'static',
      });
      DetailsSF.componentInstance.SFdetails = {
        TYPE: item.LABLEVAL,
        NAME: item.LABLE,
        STORES: this.selectedstorevalues,
        LatestDate: this.Month,
        STORENAME: this.selectedstorename,
      };
    } else {
      // const DetailsSF = this.ngbmodal.open(SimpleFinancialDetailsComponent, {
      //   size: 'xl',
      //   backdrop: "static",
      // });
      // DetailsSF.componentInstance.SFdetails = { "TYPE": Object.LABLE1Val, "NAME": Object.LABLE1, "STORES": this.StoreValues, 'LatestDate': this.Month };
    }
  }
}
