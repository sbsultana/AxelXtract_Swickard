import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../../Core/Providers/ApiService/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @Input() Parentcomponent: any;
  @Input() Salesdetails: any = [];

  IndividualSalesGross: any = [];
  SalesData: any = [];
  TotalSalesGross: any = [];

  FromDate: any = '2022-03-01';
  ToDate: any = '2022-03-31';
  TotalReport: any = 'T';

  NoData: boolean = false;
  store: any = 0;

  constructor(
    public apiSrvc: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private ngbmodal: NgbModal,
    private ngbmodalActive: NgbActiveModal,
    private title: Title
  ) {
    this.title.setTitle('Xtract-Inventory');

    const data = {
      title: 'Inventory ',
      path1: '',
      path2: '',
      path3: '',
    };
    this.apiSrvc.SetHeaderData({ obj: data });
  }
  ngOnInit(): void {
    // this.GetData();
  }

  GetData() {
    this.SalesData = [];
    this.IndividualSalesGross = [];
    this.spinner.show();
    const obj = {
      store_id: this.store,
      startdealdate: this.FromDate,
      enddealdate: this.ToDate,
      type: 'A',
    };

    this.apiSrvc.postmethod('xtract/GetDealsSummary', obj).subscribe(
      (res) => {
        if (res.status == 200) {
          this.IndividualSalesGross = res.response;
          this.GetTotalData();
        } else {
          alert('Invalid Details');
        }
      },
      (error) => {
        console.log(error);
      }
    );

    console.log('SalesData', this.IndividualSalesGross);
  }
  GetTotalData() {
    this.TotalSalesGross = [];
    const obj = {
      store_id: this.store,
      startdealdate: this.FromDate,
      enddealdate: this.ToDate,
      type: 'R',
    };
    this.apiSrvc.postmethod('xtract/GetDealsSummary', obj).subscribe(
      (totalres) => {
        if (totalres.status == 200) {
          this.TotalSalesGross = totalres.response;
          console.log('Total Sale Data', this.TotalSalesGross);

          this.TotalSalesGross.forEach((val) => {
            val.DealerName = 'Reports Total';
          });
          console.log(this.TotalSalesGross);
          if (this.TotalReport == 'B') {
            this.IndividualSalesGross.push(this.TotalSalesGross[0]);
          } else {
            this.IndividualSalesGross.unshift(this.TotalSalesGross[0]);
          }
          console.log(this.IndividualSalesGross);
          this.IndividualSalesGross.forEach((val, i) => {
            if (val.DealerName == 'Reports Total') {
              val.Newbysalesperson = '';
              val.New = JSON.parse(val.New);
              val.Used = JSON.parse(val.Used);
              val.Usedbysalesperson = '';
              val.Dealer = '+';
              val.NewDealer = '-';
              val.UsedDealer = '-';
              // val.DealerName=val.DealerName.toLowerCase()
              val.Name = val.DealerName;
              this.SalesData.push(val);
            } else {
              val.Newbysalesperson = JSON.parse(val.Newbysalesperson);
              val.New = JSON.parse(val.New);
              val.Used = JSON.parse(val.Used);
              val.Usedbysalesperson = JSON.parse(val.Usedbysalesperson);
              val.Dealer = '+';
              val.NewDealer = '-';
              val.UsedDealer = '-';
              // val.DealerName=val.DealerName.toLowerCase()
              val.Name = val.DealerName;

              this.SalesData.push(val);
            }
          });
          console.log('', this.SalesData);
          if (this.SalesData.length == 0) {
            this.NoData = true;
          } else {
            this.NoData = false;
          }
          this.spinner.hide();
          setTimeout(() => {
            //         var tds = document.getElementById('d1').offsetWidth;
            // console.log( tds)
            //     for (var td in tds) {
            //       console.log(tds)
            //     if (tds[td].nodeType == 1)
            //     console.log( parseFloat(tds[td].offsetWidth) + "px ")
            //     // document.getElementById('output').innerHTML += parseFloat(tds[td].offsetWidth) + "px ";
            // }
            // let calcwidth =  document.getElementById('DataBody8').offsetWidth+ 'px';
            // console.log(calcwidth)
            // document.getElementById("DataHead8").style.width = calcwidth;
            //this.DynamicStyles()
          }, 1000);
        } else {
          alert('Invalid Details');
        }
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(this.SalesData);
    console.log('Individual Sales Data', this.IndividualSalesGross);
  }
  // getStyles() {
  //   let calcwidth =  document.getElementById('d1').offsetWidth;
  //    // do the calcutions
  //   return {'width': calcwidth + 'px'};
  // }
  DynamicStyles() {
    let calcwidth1 = document.getElementById('DataBody1').offsetWidth + 'px';
    document.getElementById('DataHead1').style.width = calcwidth1;
    let calcwidth2 = document.getElementById('DataBody2').offsetWidth + 'px';
    document.getElementById('DataHead2').style.width = calcwidth2;
    let calcwidth3 = document.getElementById('DataBody3').offsetWidth + 'px';
    document.getElementById('DataHead3').style.width = calcwidth3;
    let calcwidth4 = document.getElementById('DataBody4').offsetWidth + 'px';
    document.getElementById('DataHead4').style.width = calcwidth4;
    let calcwidth5 = document.getElementById('DataBody5').offsetWidth + 'px';
    document.getElementById('DataHead5').style.width = calcwidth5;
    let calcwidth6 = document.getElementById('DataBody6').offsetWidth + 'px';
    document.getElementById('DataHead6').style.width = calcwidth6;
    // console.log(calcwidth6)
    let calcwidth7 = document.getElementById('DataBody7').offsetWidth + 'px';
    document.getElementById('DataHead7').style.width = calcwidth7;
    let calcwidth8 = document.getElementById('DataBody8').offsetWidth + 'px';
    document.getElementById('DataHead8').style.width = calcwidth8;
    let calcwidth9 = document.getElementById('DataBody9').offsetWidth + 'px';
    document.getElementById('DataHead9').style.width = calcwidth9;
    let calcwidth10 = document.getElementById('DataBody10').offsetWidth + 'px';
    document.getElementById('DataHead10').style.width = calcwidth10;
    let calcwidth11 = document.getElementById('DataBody11').offsetWidth + 'px';
    document.getElementById('DataHead11').style.width = calcwidth11;
    let calcwidth12 = document.getElementById('DataBody12').offsetWidth + 'px';
    document.getElementById('DataHead12').style.width = calcwidth12;
    let calcwidth13 = document.getElementById('DataBody13').offsetWidth + 'px';
    document.getElementById('DataHead13').style.width = calcwidth13;
    let calcwidth14 = document.getElementById('DataBody14').offsetWidth + 'px';
    document.getElementById('DataHead14').style.width = calcwidth14;
    let calcwidth15 = document.getElementById('DataBody15').offsetWidth + 'px';
    document.getElementById('DataHead15').style.width = calcwidth15;
    let calcwidth16 = document.getElementById('DataBody16').offsetWidth + 'px';
    document.getElementById('DataHead16').style.width = calcwidth16;
    let calcwidth17 = document.getElementById('DataBody17').offsetWidth + 'px';
    document.getElementById('DataHead17').style.width = calcwidth17;
    let calcwidth18 = document.getElementById('DataBody18').offsetWidth + 'px';
    document.getElementById('DataHead18').style.width = calcwidth18;
    let calcwidth19 = document.getElementById('DataBody19').offsetWidth + 'px';
    document.getElementById('DataHead19').style.width = calcwidth19;
    let calcwidth20 = document.getElementById('DataBody20').offsetWidth + 'px';
    document.getElementById('DataHead20').style.width = calcwidth20;
    let calcwidth21 = document.getElementById('DataBody21').offsetWidth + 'px';
    document.getElementById('DataHead21').style.width = calcwidth21;
    // let Dealer =  document.getElementById('DealerBody').offsetWidth+ 'px';
    // console.log(document.getElementById('DealerBody'))
    // document.getElementById("DealerHead").style.width = Dealer;
  }
  ngAfterViewInit(): void {
    console.log('NgAfterviewinit');
    this.apiSrvc.GetReports().subscribe((data) => {
      console.log(data);
      if (data.obj.Reference == 'SG') {
        this.TotalReport = data.obj.TotalReport;
        if (data.obj.FromDate != undefined && data.obj.ToDate != undefined) {
          this.FromDate = data.obj.FromDate;
          this.ToDate = data.obj.ToDate;
          this.store = data.obj.storeValues;
          this.GetData();
        } else {
          this.FromDate = this.FromDate;
          this.ToDate = this.ToDate;
          this.store = data.obj.storeValues;
          this.GetData();
        }
      }
    });
  }

  expandorcollapse(ind, e, ref, Item) {
    let id = (e.target as Element).id;
    if (id == 'D_' + ind) {
      if (ref == '-') {
        Item.Dealer = '+';
      }
      if (ref == '+') {
        Item.Dealer = '-';
      }
    }
    if (id == 'DN_' + ind) {
      if (ref == '-') {
        Item.NewDealer = '+';
      }
      if (ref == '+') {
        Item.NewDealer = '-';
      }
    }
    if (id == 'DU_' + ind) {
      if (ref == '-') {
        Item.UsedDealer = '+';
      }
      if (ref == '+') {
        Item.UsedDealer = '-';
      }
    }
  }
  public inTheGreen(value: number): boolean {
    if (value >= 0) {
      return true;
    }
    return false;
  }
  openMenu() {
    // const modalRef = this.ngbmodal.open(SalesReportsComponent,{
    //   size:'xl',
    //   backdrop: "static",
    // });
    // modalRef.componentInstance.Parentcomponent = 'SG';
  }
  openDetails(Item, ParentItem, type) {
    // const DetailsSalesPeron = this.ngbmodal.open(DetailsComponent,{
    //   // size:'xl',
    //   backdrop: "static",
    // });
    // DetailsSalesPeron.componentInstance.Salesdetails = [{"storeId":ParentItem.Storeid,"SPID":Item.SPID,"StartDate":this.FromDate,"EndDate":this.ToDate,"salesPerson":Item.spname, "dealType":type}];
  }
}
