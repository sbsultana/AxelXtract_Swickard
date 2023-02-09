import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../../Core/Providers/ApiService/api.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  NoData: boolean = false;
  CashFlowData: any = [];
  CurrentDate = new Date();
  FromDate: any;
  ToDate: any;

  NetValues: any = [];

  // data = [
  //   { name: "A", price: 100, qty: 5 },
  //   { name: "B", price: 75, qty: 15 },
  //   { name: "A", price: 100, qty: 5 },
  //   { name: "A", price: 100, qty: 5 },
  //   { name: "C", price: 10, qty: 25 },
  //   { name: "B", price: 50, qty: 15 }
  // ];
  // groupedData: any = [];

  constructor(
    public apiSrvc: ApiService,
    private ngbmodal: NgbModal,
    private ngbmodalActive: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private title: Title
  ) {
    this.CurrentDate.setDate(this.CurrentDate.getDate() - 1);
    this.ToDate = new Date(
      this.CurrentDate.getFullYear(),
      this.CurrentDate.getMonth(),
      2
    );
    this.FromDate = this.ToDate.toISOString().slice(0, 10);
    this.ToDate = this.CurrentDate.toISOString().slice(0, 10);
    this.title.setTitle('Xtract-Cashflow');

    const data = {
      title: 'Cash Flow',
      path1: '',
      path2: '',
      path3: '',
      fromdate: this.FromDate,
      todate: this.ToDate,
      stores: '0',
    };
    this.apiSrvc.SetHeaderData({
      obj: data,
    });

    // Rx.Observable.from(this.data)
    // .groupBy(x => x.name) // using groupBy from Rxjs
    // .flatMap(group => group.toArray())// GroupBy dont create a array object so you have to flat it
    // .map(g => {// mapping
    //   return {
    //     name: g[0].name,//take the first name because we grouped them by name
    //     qty: _.sumBy(g, 'qty'), // using lodash to sum quantity
    //     price: _.sumBy(g, 'price'), // using lodash to sum price
    //   }
    // })
    // .toArray() //.toArray because I guess you want to loop on it with ngFor
    // .do(sum => console.log('sum:', sum)) // just for debug
    // .subscribe(d => this.groupedData = d);
  }

  ngOnInit(): void {
    this.GetData();
  }

  GetData() {
    this.spinner.show();
    this.NetValues = [];
    const Obj = { AS_ID: this.StoreValues };
    this.apiSrvc
      .postmethod('xtract/GetCashFlowBalance', Obj)
      .subscribe((res) => {
        if (res.status == 200) {
          this.spinner.hide();
          this.CashFlowData = res.response;
          if (this.CashFlowData.length > 0) {
            this.NetValues.push(
              this.CashFlowData.filter(
                (e) => e.SubLable == 'Cash and Cash Equivalents'
              )
            );
            this.NetValues.push(
              this.CashFlowData.filter(
                (e) => e.SubLable == 'Total Operating Activities'
              )
            );
            this.NetValues.push(
              this.CashFlowData.filter(
                (e) => e.SubLable == 'Total Financing Activities'
              )
            );
            this.NetValues.push(
              this.CashFlowData.filter(
                (e) => e.SubLable == 'Total Investing Activities'
              )
            );
            this.NetValues.push(
              this.CashFlowData.filter((e) => e.SubLable == 'Total Cash Impact')
            );

            console.log(this.NetValues);

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
  StoreValues: any = '0';
  StoreName = 'All Stores';

  ngAfterViewInit(): void {
    this.apiSrvc.GetReports().subscribe((data) => {
      if (data.obj.Reference == 'CF') {
        this.StoreValues = data.obj.storeValues;
        this.StoreName = data.obj.Sname;
        this.FromDate = data.obj.FromDate;
        this.ToDate = data.obj.ToDate;

        this.GetData();
        const headerdata = {
          title: 'Cash Flow',
          path1: '',
          path2: '',
          path3: '',
          fromdate: this.FromDate,
          todate: this.ToDate,
          stores: data.obj.storeValues,
        };

        // // console.log(headerdata)
        this.apiSrvc.SetHeaderData({
          obj: headerdata,
        });
      }
    });
  }
  public inTheGreen(value: number): boolean {
    if (value >= 0) {
      return true;
    }
    return false;
  }
  isNegitive(val: number): boolean {
    if (val < 0) {
      return true;
    } else {
      return false;
    }
  }
}
