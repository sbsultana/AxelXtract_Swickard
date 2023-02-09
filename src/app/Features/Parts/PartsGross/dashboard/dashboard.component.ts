import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../../Core/Providers/ApiService/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PartsgrossDetailsComponent } from '../partsgross-details/partsgross-details.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  FromDate: any;
  ToDate: any;

  PartsData: any = [];
  IndividualPartsGross: any = [];
  TotalPartsGross: any = [];

  TotalReport: any = 'T';
  NoData: boolean = false;
  CompleteComponentState: boolean = true;

  ROType: any = 'Open,Closed';
  Department: any = 'Service,Parts,Body';
  Paytype: any = 'Warranty,Internal';
  Target: any = 'F';
  store: any = '0';

  path1: any = 'DealerName';
  path2: any = 'Advisor_Name';
  path3: any = '';
  CurrentDate = new Date();

  constructor(
    public apiSrvc: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private ngbmodal: NgbModal,
    private ngbmodalActive: NgbActiveModal,
    private title: Title
  ) {
    this.title.setTitle('Xtract-Parts Gross');
    // this.store = localStorage.getItem('Stores');

    // this.CurrentDate.setDate(this.CurrentDate.getDate()-1);
    // let startdate  = new Date(this.CurrentDate.getFullYear(), this.CurrentDate.getMonth(), 2);

    // this.FromDate=startdate.toISOString().slice(0,10);
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
    const data = {
      title: 'Parts Gross',
      path1: 'All Dealerships',
      path2: 'All Advisor',
      path3: '',
      path1id: 48,
      path2id: 41,
      path3id: '',
      stores: '',

      ROType: this.ROType,
      Department: this.Department,
      Paytype: this.Paytype,
      Target: this.Target,
      ToporBottom: this.TotalReport,
      regions: [],
      fromdate: this.FromDate,
      todate: this.ToDate,
    };
    this.apiSrvc.SetHeaderData({
      obj: data,
    });
  }

  ngOnInit(): void {
    localStorage.setItem('time', 'MTD');
    this.GetTotalData();
    this.GetData();
  }
  GetData() {
    this.IndividualPartsGross = [];
    this.spinner.show();
    const obj = {
      startdate: this.FromDate,
      enddate: this.ToDate,
      dealername: '',
      Advisorname: '',
      Store: this.store,
      var1: this.path1,
      var2: this.path2,
      RowType: 'D',
    };

    this.apiSrvc.postmethod('xtract/GetPartsGrossSummary', obj).subscribe(
      (res) => {
        if (res.status == 200) {
          this.IndividualPartsGross = [];
          this.IndividualPartsGross = res.response;
          if (this.IndividualPartsGross.length > 0) {
            let idi_len = this.IndividualPartsGross.length;
            console.log(idi_len);
            this.IndividualPartsGross.some(function (x: any) {
              if (x.data2 != undefined) {
                x.Data2 = JSON.parse(x.data2);
              }
              if (idi_len == 1) {
                x.Dealer = '-';
              } else {
                x.Dealer = '+';
              }
              return false;
            });

            if (
              this.TotalPartsGross.length > 0 &&
              this.IndividualPartsGross.length > 0
            ) {
              if (this.TotalReport == 'B') {
                this.IndividualPartsGross.push(this.TotalPartsGross[0]);
              } else {
                this.IndividualPartsGross.unshift(this.TotalPartsGross[0]);
              }
              this.PartsData = [];
              this.PartsData = this.IndividualPartsGross;
              this.spinner.hide();
            }
            if (
              this.TotalPartsGross.length == 0 &&
              this.IndividualPartsGross.length == 0
            ) {
              this.NoData = true;
            } else {
              this.NoData = false;
            }
            //  console.log(this.IndividualPartsGross)
            //  this.spinner.hide()
            // this.PartsData=this.IndividualPartsGross
            //  console.log(this.PartsData);
          }
        } else {
          alert('Invalid Details');
          this.spinner.hide();
        }
      },
      (error) => {
        // console.log(error);
      }
    );
  }
  GetTotalData() {
    this.TotalPartsGross = [];
    const obj = {
      startdate: this.FromDate,
      enddate: this.ToDate,
      dealername: '',
      Advisorname: '',
      Store: this.store,
      var1: this.path1,
      var2: this.path2,
      RowType: 'T',
    };
    this.apiSrvc.postmethod('xtract/GetPartsGrossSummary', obj).subscribe(
      (totalres) => {
        if (totalres.status == 200) {
          this.TotalPartsGross = totalres.response.map((v) => ({
            ...v,
            Data2: [],
            DealerName: 'Reports Total',
            Dealer: '+',
          }));
          //  console.log(this.TotalPartsGross)

          if (
            this.TotalPartsGross.length > 0 &&
            this.IndividualPartsGross.length > 0
          ) {
            if (this.TotalReport == 'B') {
              this.IndividualPartsGross.push(this.TotalPartsGross[0]);
            } else {
              this.IndividualPartsGross.unshift(this.TotalPartsGross[0]);
            }
            this.PartsData = [];
            this.PartsData = this.IndividualPartsGross;
            this.spinner.hide();
          }
          if (
            this.TotalPartsGross.length == 0 &&
            this.IndividualPartsGross.length == 0
          ) {
            this.NoData = true;
          } else {
            this.NoData = false;
          }

          //  console.log(this.PartsData)
          // this.spinner.hide()
          //   if(this.PartsData.length>0){
          //      this.PartsData.some(function(x:any){
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
          //  console.log(this.PartsData)

          // if (this.PartsData.length == 0) {
          //   this.NoData = true;
          // } else {
          //   this.NoData = false;
          // }
          // console.log(this.PartsData);
        } else {
          alert('Invalid Details');
          this.spinner.hide();
        }
      },
      (error) => {
        // console.log(error);
      }
    );
  }

  // openMenu() {
  //   const modalRef = this.ngbmodal.open(PartsReportLatestComponent, {
  //     size: 'xl',
  //     backdrop: 'static',
  //   });
  //   modalRef.componentInstance.Parentcomponent = 'PG';
  // }
  ngAfterViewInit(): void {
    this.apiSrvc.GetReports().subscribe((data) => {
      if (data.obj.Reference == 'PG') {
        this.TotalReport = data.obj.TotalReport;

        const headerdata = {
          title: 'Parts Gross',
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
          regions: data.obj.regions,
          fromdate: data.obj.FromDate,
          todate: data.obj.ToDate,
        };
        // console.log(headerdata)
        this.apiSrvc.SetHeaderData({
          obj: headerdata,
        });
        if (data.obj.FromDate != undefined && data.obj.ToDate != undefined) {
          this.FromDate = data.obj.FromDate;
          this.ToDate = data.obj.ToDate;
          this.store = data.obj.storeValues;
          this.path1 =
            data.obj.dataGroupingvalues[0] == undefined
              ? ''
              : data.obj.dataGroupingvalues[0].columnName;
          this.path2 =
            data.obj.dataGroupingvalues[1] == undefined
              ? ''
              : data.obj.dataGroupingvalues[1].columnName;
          this.GetData();
          this.GetTotalData();
        } else {
          this.FromDate = this.FromDate;
          this.ToDate = this.ToDate;
          this.store = data.obj.storeValues;
          this.path1 =
            data.obj.dataGroupingvalues[0] == undefined
              ? ''
              : data.obj.dataGroupingvalues[0].columnName;
          this.path2 =
            data.obj.dataGroupingvalues[1] == undefined
              ? ''
              : data.obj.dataGroupingvalues[1].columnName;
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
  expandorcollapse(ind, e, ref, Item, parentData) {
    let id = (e.target as Element).id;
    if (this.path2 == '') {
      this.openDetails(Item, parentData, '1');
    }
    if (id == 'D_' + ind) {
      if (ref == '-') {
        Item.Dealer = '+';
      }
      if (ref == '+') {
        Item.Dealer = '-';
      }
    }
    //  if (id == 'DN_' + ind) {
    // console.log(this.path3)
    //  if(this.path3 == ''){
    //    this.openDetails(Item,parentData,'2')
    //  }
    //  else{
    //    if(ref=='-'){
    //   Item.data2sign='+'
    //    }
    //    if(ref == '+'){
    //   Item.data2sign='-'
    //   Item.Dealer='-'
    //      }
    //     }
    //   }
    //   // if (id == 'DU_' + ind) {
    //   //  if(ref=='-'){
    //   // Item.UsedDealer='+'
    //   //  }
    //   //  if(ref == '+'){
    //   //   Item.UsedDealer='-'
    //   //  }
    //   // }
    // console.log(this.SalesData);
  }

  openDetails(Item, ParentItem, ref) {
    console.log(Item, ParentItem, ref);
    if (ref == '2') {
      if (Item.data2 != undefined) {
        const DetailsPartsPerson = this.ngbmodal.open(
          PartsgrossDetailsComponent,
          {
            // size:'xl',
            backdrop: 'static',
          }
        );
        DetailsPartsPerson.componentInstance.Partsdetails = [
          {
            StartDate: this.FromDate,
            EndDate: this.ToDate,
            var1: this.path1,
            var2: this.path2,
            var3: '',
            var1Value: Item.data1,
            var2Value: Item.data2,
            var3Value: '',
            userName: Item.data2,
          },
        ];
      }
    }

    if (ref == '1') {
      if (Item.data1 != undefined && Item.data1 != 'Reports Total') {
        this.CompleteComponentState = false;
        const DetailsPartsPerson = this.ngbmodal.open(
          PartsgrossDetailsComponent,
          {
            // size:'xl',
            backdrop: 'static',
          }
        );
        DetailsPartsPerson.componentInstance.Partsdetails = [
          {
            StartDate: this.FromDate,
            EndDate: this.ToDate,

            var1: this.path1,
            var2: this.path2,
            var3: '',
            var1Value: Item.data1,
            var2Value: Item.data2 == undefined ? '' : Item.data2,
            var3Value: '',
            userName: Item.data1,
          },
        ];
        DetailsPartsPerson.result.then(
          (data) => {},
          (reason) => {
            // on dismiss
            this.CompleteComponentState = true;
          }
        );
      }
    }
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
    this.PartsData.sort(function (a, b) {
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
