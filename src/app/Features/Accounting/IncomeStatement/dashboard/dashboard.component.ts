import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ApiService } from '../../../../Core/Providers/ApiService/api.service';
import { formatDate } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
// import { DetailsComponent } from 'details/details.component';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  Current_Date: any;

  storegridshow: boolean = false;
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
  Filter: any = 'Store';
  StoreName: any;
  SubFilter: any;
  SelectedTab: any[];
  SubSelectedTab1: any[];
  Month: string;

  totals = [];
  data: any = [];
  months: any = [];
  colKeys: string[];
  fromdate: any;
  todate: any;
  settingkeys: any = [];

  constructor(
    private datepipe: DatePipe,
    public apiSrvc: ApiService,
    private ngbmodal: NgbModal,
    private ngbmodalActive: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private title: Title
  ) {
    this.date = new Date();
    // this.Filter='Store'
    let newdate = new Date();
    //this.Month='01-'+('0' +( newdate.getMonth())).slice(-2)+'-'+newdate.getFullYear()
    this.Month =
      '01-' +
      ('0' + (newdate.getMonth() + 1)).slice(-2) +
      '-' +
      newdate.getFullYear();
    // this.Month= new Date(newdate.getFullYear(), newdate.getMonth(), 1)
    this.title.setTitle('Xtract - Income Statement');
    const data = {
      title: 'Income Statement',
      path1: '',
      path2: '',
      path3: '',
      Month: new Date(newdate.getFullYear(), newdate.getMonth() - 1, 1),
      // stores: 0,
      filter: this.Filter,
      stores: this.StoreValues,
      fromdate: new Date(newdate.getFullYear(), newdate.getMonth() - 2, 1),
      todate: new Date(newdate.getFullYear(), newdate.getMonth() - 1, 1),

      // subfilter: this.SubFilter
    };
    this.apiSrvc.SetHeaderData({
      obj: data,
    });
  }

  ngOnInit(): void {
    // this.Month=new Date(newdate.getFullYear(),newdate.getMonth() - 1, 1)

    // this.GetData();
    this.IncomeStatementByStore();

    // this.DataSelection(this.Filter);
    //  this. getExpenseTrendByStore()
  }

  // GetData() {
  //   this.spinner.show();
  //   this.ExpenseTrendByStoreKeys= [];
  //   this.AllDatakeys = [];

  //   const obj = {
  //     // "SalesDate": "11-01-2022"
  //      "SalesDate":this.Month
  //   }
  //   this.apiSrvc.postmethod('xtract/GetSimpleFinancialSummaryReport', obj).subscribe(x => {

  //     if (x.status == 200) {
  //       this.monthgridshow=true
  //       //console.log('Overall Response',x.response)
  //       this.ExpenseTrendByStore_Excel = x.response.map(({ SNo, ...rest }) => ({ ...rest }));
  //       //console.log('ExpenseTrendByStore_Excel',this.ExpenseTrendByStore_Excel)
  //       this.XpenseTrendByStoreKeys = Object.keys(x.response[0]);
  //       //console.log('XpenseTrendByStoreKeys',this.XpenseTrendByStoreKeys)
  //       let ETByStoreKeys_sorted = this.XpenseTrendByStoreKeys.filter(x => { return (x != "SNo"  && x != "NgClass") });

  //       // let ETByStoreKeys_sorted = this.XpenseTrendByStoreKeys.filter(x => { return (x != "" && x != "" && x != "") }).sort((a,b) => a.localeCompare(b));
  //       //console.log('ETByStoreKeys_sorted',ETByStoreKeys_sorted)
  //       let AllStore_Label = ETByStoreKeys_sorted.find(x => {if(x.toUpperCase() == "All Stores".toUpperCase()) return x;});
  //       //console.log('AllStore_Label',AllStore_Label)
  //       ETByStoreKeys_sorted = ETByStoreKeys_sorted.splice(1);
  //       //console.log('ETByStoreKeys_sorted',ETByStoreKeys_sorted)
  //       // /* To add space between each array value to get dynamic <th>*/
  //       // this.AllDatakeys= ["LABLE1", "NgClass"];
  //        for(var i =0; i<ETByStoreKeys_sorted.length; i++)
  //        {
  //         this.ExpenseTrendByStoreKeys.push(ETByStoreKeys_sorted[i]);
  //         // this.ExpenseTrendByStoreKeys.push("");

  //         this.AllDatakeys.push(ETByStoreKeys_sorted[i]);

  //         // this.AllDatakeys.push("");
  //        }
  //       this.ExpenseTrendByStoreKeys.push(AllStore_Label);
  //       this.AllDatakeys.push(AllStore_Label);
  //       //console.log('ExpenseTrendByStoreKeys',this.ExpenseTrendByStoreKeys)
  //       //console.log('AllDatakeys',this.AllDatakeys)
  //       let XpenseTrendByStoreData =  x.response;
  //       let ETByStoreData_sorted = XpenseTrendByStoreData;
  //       let AllStoreLabel_Data = "";
  //       this.ExpenseTrendByStore =  x.response;
  //       //console.log('ExpenseTrendByStore',this.ExpenseTrendByStore)

  //       if (this.ExpenseTrendByStoreKeys.length == 0) {
  //         this.NoData = true;
  //       }
  //       else {
  //         this.NoData = false
  //       }
  //       this.spinner.hide();
  //     }

  //   }, () => {
  //   });
  // }

  GetTotal() {
    this.spinner.show();
    this.data = [];
    this.settingkeys = [];
    this.colKeys = [];
    this.totals = [];
    const Obj = {
      SalesDate: this.fromdate,
      EndDate: this.todate,
      as_id: this.StoreValues,
      Type: 'T',
    };
    this.apiSrvc
      .postmethod('xtract/GetQuickIncomeStatementByMonth', Obj)
      .subscribe((res) => {
        this.totals = res.response;
        this.GetData();
      });
  }
  GetData() {
    // this.months = this.diff(this.fromdate.substring(3), this.todate.substring(3));
    // ////console.log(this.months);
    const Obj = {
      SalesDate: this.fromdate,
      EndDate: this.todate,
      as_id: this.StoreValues,
      Type: 'D',
    };
    this.apiSrvc
      .postmethod('xtract/GetQuickIncomeStatementByMonth', Obj)
      .subscribe((res) => {
        //console.log(res);

        if (res.status == 200) {
          this.monthgridshow = true;
          if (res.response != undefined) {
            this.settingkeys = Object.keys(res.response[0]);
            const storenames = this.settingkeys.findIndex(
              (i) => i == 'StoreName'
            );

            this.settingkeys.splice(storenames, 1);
            //console.log(this.settingkeys);
            this.data = res.response.reduce((r, { StoreName }) => {
              if (!r.some((o) => o.StoreName == StoreName)) {
                r.push({
                  StoreName,
                  Stores: res.response.filter((v) => v.StoreName == StoreName),
                });
              }
              return r;
            }, []);

            // let renameKeys = (keysMap, object) =>
            //   Object.keys(object).reduce(  https://xtractapi.swickard.com/api/xtract/GetQuickIncomeStatementByMonth
            //     (acc, key) => ({
            //       ...acc,
            //       ...{ [keysMap[key] || key]: object[key] },
            //     }),
            //     {}
            //   );
            if (this.data.length > 1) {
              this.data.forEach((obj, i) => {
                const replaceAllObjKeys = (obj) => {
                  if (typeof obj === 'object') {
                    for (const key in obj) {
                      if (key != 'LABLE' && key != 'StoreName') {
                        //console.log(obj, key, 'ds');
                        const newKey = i + key;
                        obj[newKey] = obj[key];
                        if (key !== newKey) {
                          delete obj[key];
                        }
                        //console.log(key);
                        replaceAllObjKeys(obj[newKey]);
                      }
                    }
                  }
                  return obj;
                };
                obj.Stores.forEach((val, j) => {
                  // obj.Stores[j] = renameKeys(
                  //   {
                  //     StoreId: i + 'StoreId',
                  //     'oct-22': i + 'oct-22',
                  //     'Store Total': i + 'Store Total',
                  //     'dec-22': i + 'dec-22',
                  //     'nov-22': i + 'nov-22',
                  //   },
                  //   val
                  // );
                  obj.Stores[j] = replaceAllObjKeys(val);
                  if (i > 0) {
                    this.data[0].Stores[j] = {
                      ...this.data[0].Stores[j],
                      ...this.data[i].Stores[j],
                      ...this.totals[j],
                    };
                  }
                });
              });
            } else {
              //console.log(this.data[0].Stores);
              this.data[0].Stores.forEach((val, j) => {
                //console.log(this.totals[j]);
                // obj.Stores[j] = renameKeys(
                //   {
                //     StoreId: i + 'StoreId',
                //     'oct-22': i + 'oct-22',
                //     'Store Total': i + 'Store Total',
                //     'dec-22': i + 'dec-22',
                //     'nov-22': i + 'nov-22',
                //   },
                //   val
                // );
                // this.data[0].Stores[j] = replaceAllObjKeys(val);
                // if (i > 0) {
                this.data[0].Stores[j] = {
                  ...this.data[0].Stores[j],
                  ...this.totals[j],
                  // };
                };
                //console.log(this.data[0].Stores[j]);
              });
              //console.log(this.data[0].Stores[0]);
            }
            //console.log(this.data);
            this.colKeys = Object.keys(this.data[0].Stores[0]);
            const snoindex = this.colKeys.findIndex((i) => i == 'SNo');
            this.colKeys.splice(snoindex, 1);
            //console.log(this.colKeys);
            // this.colKeys = Object.keys(this.data[0].Stores[0]);
            const storename = this.colKeys.findIndex((i) => i == 'StoreName');

            this.colKeys.splice(storename, 1);

            // //console.log(Object.keys(this.data[0].Stores[0]));
            // const index = this.colKeys.findIndex((i) => i == '');
            const index = this.colKeys.findIndex((i) => i == 'Totals');
            if (index >= 0) {
              this.colKeys.splice(index, 1);
              this.colKeys.splice(1, 0, 'Totals');
              // this.colKeys.unshift('Totals');
              console.log(this.colKeys);
            }
            if (this.data.length == 0) {
              this.NoData = true;
            } else {
              this.NoData = false;
            }
            // }
          }
          this.spinner.hide();
        }
      });
  }
  // monthNames = [
  //   'jan',
  //   'feb',
  //   'mar',
  //   'apr',
  //   'may',
  //   'jun',
  //   'jul',
  //   'aug',
  //   'sep',
  //   'oct',
  //   'nov',
  //   'dec',
  // ];
  // diff(from, to) {
  //   var arr = [];
  //   var datFrom = new Date('1 ' + from);
  //   var datTo = new Date('1 ' + to);
  //   var fromYear = datFrom.getFullYear();
  //   var toYear = datTo.getFullYear();
  //   var diffYear = 12 * (toYear - fromYear) + datTo.getMonth();
  //   for (var i = datFrom.getMonth(); i <= diffYear; i++) {
  //     arr.push(
  //       this.monthNames[i % 12] +
  //         '-' +
  //         Math.floor(fromYear + i / 12)
  //           .toString()
  //           .substring(2)
  //     );
  //   }
  //   // ////console.log(arr)
  //   return arr;
  // }

  IncomeStatementByStore() {
    this.spinner.show();
    this.ExpenseTrendByStoreKeysMonth = [];
    this.AllDatakeysMonth = [];

    const obj = {
      // "SalesDate": "11-01-2022"
      // "as_id":this.StoreValues,
      Stores: this.StoreValues,

      SalesDate: this.Month,
    };
    this.apiSrvc
      .postmethod('xtract/GetQuickIncomeStatementByStore', obj)
      .subscribe(
        (x) => {
          if (x.status == 200) {
            this.storegridshow = true;
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
            console.log('AllStore_LabelMonth', AllStore_LabelMonth);
            // ETByStoreKeys_sortedMonth = ETByStoreKeys_sortedMonth.splice(1);
            // console.log('ETByStoreKeys_sortedMonth',ETByStoreKeys_sortedMonth)
            const lable = ETByStoreKeys_sortedMonth.findIndex(
              (i) => i == 'LABLE'
            );

            ETByStoreKeys_sortedMonth.splice(lable, 1);

            // ETByStoreKeys_sortedMonth = ETByStoreKeys_sortedMonth.splice(1);

            const index = ETByStoreKeys_sortedMonth.findIndex(
              (i) => i == 'Report Total'
            );
            if (index >= 0) {
              ETByStoreKeys_sortedMonth.splice(index, 1);
              ETByStoreKeys_sortedMonth.splice(0, 0, 'Report Total');
            }

            console.log('ETByStoreKeys_sortedMonth', ETByStoreKeys_sortedMonth);
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
            console.log(
              'ExpenseTrendByStoreKeysMonth',
              this.ExpenseTrendByStoreKeys
            );
            //console.log('AllDatakeysMonth',this.AllDatakeysMonth)
            let XpenseTrendByStoreDataMonth = x.response;
            let ETByStoreData_sorted = XpenseTrendByStoreDataMonth;
            let AllStoreLabel_Data = '';
            this.ExpenseTrendByStoreMonth = x.response;
            console.log(
              'ExpenseTrendByStoreMonth',
              this.ExpenseTrendByStoreMonth
            );

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

  // DataSelection(Val){
  //   //console.log(this.Filter);
  //   //console.log(this.SubFilter);
  //   this.SelectedTab = [];
  //   // this.SubSelectedTab1 =[];
  //   this.SelectedTab.push(this.Filter);
  //   // this.SubSelectedTab1.push(this.SubFilter)
  //   if(this.Filter == "Store"){
  //     // this.IncomeStatementByStore();
  //   }

  // }

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
      if (data.obj.Reference == 'IS') {
        this.date = data.obj.month;
        this.Month = data.obj.month;
        // this.Month =  ('0' +( new Date(data.obj.month).getMonth())).slice(-2)+'-01'+'-'+new Date (data.obj.month).getFullYear()
        this.StoreValues = data.obj.storeValues;
        this.StoreName = data.obj.Sname;
        this.Filter = data.obj.Filter;
        (this.fromdate = this.datepipe.transform(
          data.obj.FromDate,

          'dd-MMM-yyyy'
        )),
          (this.todate = this.datepipe.transform(
            data.obj.ToDate,

            'dd-MMM-yyyy'
          ));
        // this.SubFilter = data.obj.subfilters
        // this.DataSelection(this.Filter);
        const headerdata = {
          title: 'Income Statement',
          path1: '',
          path2: '',
          path3: '',
          Month: data.obj.month,
          filter: this.Filter,
          stores: this.StoreValues,
          fromdate: data.obj.FromDate,
          todate: data.obj.ToDate,
        };

        this.apiSrvc.SetHeaderData({
          obj: headerdata,
        });
        if (this.Filter == 'Store') {
          this.IncomeStatementByStore();
          this.storegridshow = true;
          this.monthgridshow = false;
        } else {
          this.GetTotal();
          this.storegridshow = false;
          // this.monthgridshow=true
        }
      }
    });
  }
}
