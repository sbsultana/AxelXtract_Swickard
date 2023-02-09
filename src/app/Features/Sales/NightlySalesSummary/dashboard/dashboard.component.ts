import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../../Core/Providers/ApiService/api.service';
import { NightlysalesDealsComponent } from '../nightlysales-deals/nightlysales-deals.component';
import { Title } from '@angular/platform-browser';

// import { DealsComponent } from '../deals/deals.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public href: string = '';
  public GetStores: any = [];
  TabChange = '0';
  Sortby = 'TR';
  storeIds: any = '0';
  ChangeDate = new Date(new Date().setDate(new Date().getDate() - 1))
    .toISOString()
    .split('T')[0];

  SalesGridData: any = [];
  SalesGridData_excel: any = [];
  FIGridData: any = [];
  FIGridData_excel: any = [];
  FIGridData_PP: any = [];
  FIGridData_LD: any = [];
  DealesGridData: any = [];
  SummaryGridData_FI: any = [];
  SummaryGridData_LD: any = [];
  New: any = [];
  PreOwned: any = [];
  New_Front_Gross: any = [];
  New_Back_Gross: any = [];
  New_Gross_SubTotal: any = [];
  PreOwned_Front_Gross: any = [];
  PreOwned_Back_Gross: any = [];
  PreOwned_Gross_SubTotal: any = [];
  Total: any = [];
  TODAY_New: any = [];
  TODAY_Used: any = [];
  TODAY_Total: any = [];
  MTD_New: any = [];
  MTD_Used: any = [];
  MTD_Total: any = [];
  VSC: any = [];
  Summary_VSC: any = [];
  Execshield: any = [];
  Summary_Execshield: any = [];
  CASH: any = [];
  CHASE: any = [];
  CAPTIVE: any = [];
  USBANK: any = [];
  Summary_CASH: any = [];
  Summary_CHASE: any = [];
  Summary_CAPTIVE: any = [];
  Summary_USBANK: any = [];
  Summary_ALLY: any = [];
  AllHeaderkeys: any = [];
  DealesDetailedData: any = [];
  SalesPersonData: any = [];
  SalesPersonData_excel: any = [];
  Count_SubTotal: any = [];
  previousUrl: string;
  Filter_CVType_by = '';
  Deals: boolean = true;
  Sales: boolean = true;
  FI: boolean = true;
  Sub: boolean = false;
  Summary_Sub: boolean = false;
  SalesPerson: boolean = false;
  NoData: boolean = false;
  CV_Sales: boolean = false;
  CV_Sales_Filters: boolean = false;
  CompleteComponentState: boolean = true;
  updateDate: string = '';

  constructor(
    public apiSrvc: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private ngbmodal: NgbModal,
    private ngbmodalActive: NgbActiveModal,
    private title: Title
  ) {
    this.title.setTitle('Xtract-Nightly Sales Summary');
    const data = {
      title: 'Nightly Sales Report',
      path1: '',
      path2: '',
      path3: '',
    };
    this.apiSrvc.SetHeaderData({ obj: data });
  }

  ngOnInit(): void {
    this.updateDate = localStorage.getItem('date');
    this.TabClick('1');
  }

  TabClick(event) {
    this.TabChange = event;
    this.Sales = false;
    this.Deals = false;
    this.FI = false;
    this.SalesPerson = false;
    this.CV_Sales = false;
    this.CV_Sales_Filters = false;
    this.Sales = true;
    this.SalesReport('LI', this.TabChange);
    this.SalesReport('FI', this.TabChange);
    this.SalesReport('LD', this.TabChange);
  }

  SalesReport(Block_val, TabEventID) {
    this.spinner.show();
    this.Summary_Sub = true;
    this.Sub = false;
    var obj;
    let apiMethod = '';
    if (TabEventID == '1') {
      apiMethod = 'xtract/GetNightlySummaryReport';
      obj = {
        block: Block_val,
        au_id: '69',
        as_Id: this.storeIds,
        SalesDate: this.ChangeDate,
      };
    } else if (TabEventID == '7') {
      apiMethod = 'xtract/GetNightlySummaryReportCV';
      obj = {
        block: Block_val,
        au_id: '69',
        as_Id: this.storeIds,
        SalesDate: this.ChangeDate,
        CV_Type: this.Filter_CVType_by,
      };
    }
    this.apiSrvc.postmethod(apiMethod, obj).subscribe(
      (res) => {
        if (res.status == 200) {
          if (Block_val == 'LI') {
            this.SalesGridData = res.response;
            this.SalesGridData_excel = res.response.map(({ SNo, ...rest }) => ({
              ...rest,
            }));
            var sorted = {};
            for (var i = 0, max = this.SalesGridData.length; i < max; i++) {
              if (sorted[this.SalesGridData[i].LABLE1] == undefined) {
                sorted[this.SalesGridData[i].LABLE1] = [];
              }
              sorted[this.SalesGridData[i].LABLE1].push(this.SalesGridData[i]);
            }
            this.New = sorted['New_Count'];
            this.PreOwned = sorted['Pre-Owned_Count'];
            this.New_Front_Gross = sorted['New_Front_Gross'];
            this.New_Back_Gross = sorted['New_Back_Gross'];
            this.New_Gross_SubTotal = sorted['New_Gross_SubTotal'];
            this.PreOwned_Front_Gross = sorted['Pre-Owned_Front_Gross'];
            this.PreOwned_Back_Gross = sorted['Pre-Owned_Back_Gross'];
            this.PreOwned_Gross_SubTotal = sorted['Pre-Owned_Gross_SubTotal'];
            this.Count_SubTotal = sorted['Count_SubTotal'];
            this.Total = sorted['Total'];
            if (this.SalesGridData.length > 0) {
              this.Summary_Sub = true;
            } else this.Summary_Sub = false;
          } else if (Block_val == 'FI') {
            this.SummaryGridData_FI = res.response;
          } else if (Block_val == 'LD') {
            this.SummaryGridData_LD = res.response;
          }
          if (this.SalesGridData.length == 0) {
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
      },
      () => {
        setTimeout(() => {
          this.spinner.hide();
        }, 5000);
      }
    );
  }

  FIReport(Block_val) {
    this.Sub = true;
    this.Summary_Sub = false;
    const obj = {
      block: Block_val,
      au_id: '69',
      as_Id: this.storeIds,
      SalesDate: this.ChangeDate,
    };
    this.spinner.show();
    this.apiSrvc.postmethod('xtract/GetNightlyFIReport', obj).subscribe(
      (res) => {
        if (res.status == 200) {
          if (Block_val == 'FI') {
            this.FIGridData = res.response;
            this.FIGridData_excel = res.response.map(({ SNo, ...rest }) => ({
              ...rest,
            }));

            // console.log("this.FIGridData",this.FIGridData);

            var sorted = {};
            for (var i = 0, max = this.FIGridData.length; i < max; i++) {
              if (sorted[this.FIGridData[i].LABLE1] == undefined) {
                sorted[this.FIGridData[i].LABLE1] = [];
              }
              sorted[this.FIGridData[i].LABLE1].push(this.FIGridData[i]);
            }
            this.TODAY_New = sorted['TODAY_New'];
            this.TODAY_Used = sorted['TODAY_Used'];
            this.TODAY_Total = sorted['TODAY_Total'];
            this.MTD_New = sorted['MTD_New'];
            this.MTD_Used = sorted['MTD_Used'];
            this.MTD_Total = sorted['MTD_Total'];
            if (this.FIGridData.length > 0) {
              this.Sub = true;
            } else this.Sub = false;
          } else if (Block_val == 'PP') {
            this.FIGridData_PP = res.response;
          } else if (Block_val == 'LD') {
            this.FIGridData_LD = res.response;
          }
          if (this.FIGridData.length == 0) {
            this.NoData = true;
          } else {
            this.NoData = false;
          }
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        setTimeout(() => {
          this.spinner.hide();
        }, 3000);
      }
    );
    this.Sub = true;
  }

  DealesReport() {
    this.Summary_Sub = false;
    this.Sub = false;
    const obj = {
      AU_ID: '69',
      AS_ID: this.storeIds,
      DATE: this.ChangeDate,
      type: '',
    };
    this.spinner.show();
    this.apiSrvc.postmethod('xtract/GetNightlyDealsReport', obj).subscribe(
      (res) => {
        if (res.status == 200) {
          this.DealesGridData = res.response;
          var Deales_Grid_VS_ID = res.response.map(({ VS_ID, ...rest }) => ({
            ...rest,
          }));
          var Deales_Grid_AS_ID = Deales_Grid_VS_ID.map(
            ({ AS_ID, ...rest }) => ({ ...rest })
          );
          var Deales_Grid_CONTRACTDATE = Deales_Grid_AS_ID.map(
            ({ CONTRACTDATE, ...rest }) => ({ ...rest })
          );
          this.SalesGridData_excel = Deales_Grid_CONTRACTDATE.map(
            ({ AS_DEALERNAME, ...rest }) => ({ ...rest })
          );

          if (this.DealesGridData.length == 0) {
            this.NoData = true;
          } else {
            this.NoData = false;
          }
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        setTimeout(() => {
          this.spinner.hide();
        }, 3000);
      }
    );
  }

  SalesPersonReport() {
    this.spinner.show();
    this.Summary_Sub = false;
    this.Sub = false;
    const obj = {
      AU_ID: '69',
      AS_ID: this.storeIds,
      SalesDate: this.ChangeDate,
      OrderBy: this.Sortby,
    };
    this.SalesPersonData = [];
    this.apiSrvc
      .postmethod('xtract/GetNightlySalesPersonReport', obj)
      .subscribe(
        (res) => {
          if (res.status == 200) {
            this.SalesPersonData = res.response;
            this.SalesPersonData_excel = res.response.map(
              ({ AS_ID, ...rest }) => ({ ...rest })
            );
            if (this.SalesPersonData.length == 0) {
              this.NoData = true;
            } else {
              this.NoData = false;
            }
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          setTimeout(() => {
            this.spinner.hide();
          }, 3000);
        }
      );
  }

  ngAfterViewInit(): void {
    this.apiSrvc.GetReports().subscribe((data) => {
      if (data.obj.Reference == 'SRC') {
        if (data.obj.changeDate != undefined) {
          this.ChangeDate = data.obj.changeDate;
          this.storeIds = data.obj.storeValues;
          this.TabChange = data.obj.activeTab;
          this.Filter_CVType_by = data.obj.cvfilter;
          this.Sortby = data.obj.sort;

          if (this.TabChange == '1') {
            // this.apiSrvc.setTitle('Nightly Summary Report');
            const data = {
              title: 'Nightly Summary Report',
              path1: '',
              path2: '',
              path3: '',
            };
            this.apiSrvc.SetHeaderData({ obj: data });
            this.NoData = false;
            this.FI = false;
            this.Deals = false;
            this.SalesPerson = false;
            this.CV_Sales = false;
            this.Sub = false;
            this.Sales = true;
            this.SalesReport('LI', this.TabChange); //"SS";
            this.SalesReport('FI', this.TabChange);
            this.SalesReport('LD', this.TabChange);
          } else if (this.TabChange == '2') {
            // this.apiSrvc.setTitle('Nightly FI Report');
            const data = {
              title: 'Nightly FI Report',
              path1: '',
              path2: '',
              path3: '',
            };
            this.apiSrvc.SetHeaderData({ obj: data });
            this.NoData = false;
            this.Sales = false;
            this.Deals = false;
            this.SalesPerson = false;
            this.CV_Sales = false;
            this.Summary_Sub = false;
            this.FI = true;
            this.FIReport('FI');
            this.FIReport('PP');
            this.FIReport('LD');
          } else if (this.TabChange == '5') {
            // this.apiSrvc.setTitle('Nightly Deal Report');
            const data = {
              title: 'Nightly Deal Report',
              path1: '',
              path2: '',
              path3: '',
            };
            this.apiSrvc.SetHeaderData({ obj: data });
            this.NoData = false;
            this.Sales = false;
            this.SalesPerson = false;
            this.CV_Sales = false;
            this.Summary_Sub = false;
            this.FI = false;
            this.Sub = false;
            this.Deals = true;
            this.DealesReport();
          } else if (this.TabChange == '6') {
            // this.apiSrvc.setTitle('Nightly SalesPerson Report');
            const data = {
              title: 'Nightly SalesPerson Report',
              path1: '',
              path2: '',
              path3: '',
            };
            this.apiSrvc.SetHeaderData({ obj: data });
            this.NoData = false;
            this.Sales = false;
            this.CV_Sales = false;
            this.Summary_Sub = false;
            this.FI = false;
            this.Sub = false;
            this.Deals = false;
            this.SalesPerson = true;
            this.SalesPersonReport();
          } else if (this.TabChange == '7') {
            // this.apiSrvc.setTitle('Nightly Summary Report');
            const data = {
              title: 'Nightly Summary Report',
              path1: '',
              path2: '',
              path3: '',
            };
            this.apiSrvc.SetHeaderData({ obj: data });
            this.NoData = false;
            this.CV_Sales = false;
            this.Summary_Sub = false;
            this.FI = false;
            this.Sub = false;
            this.Deals = false;
            this.SalesPerson = false;
            this.Sales = true;
            this.CV_Sales = true;
            this.SalesReport('LI', this.TabChange);
            this.SalesReport('FI', this.TabChange);
            this.SalesReport('LD', this.TabChange);
          }
        }
      }
    });

    this.apiSrvc.getBackgroundstate().subscribe((res) => {
      this.CompleteComponentState = res.obj.state;
    });
  }
  currentElement: string;

  DealesDetailed(e) {
    const Deals = this.ngbmodal.open(NightlysalesDealsComponent, {
      // size:'xl',
      backdrop: 'static',
    });
    Deals.componentInstance.Dealsdetails = [
      {
        id: e,
      },
    ];
    Deals.result.then(
      (data) => {},
      (reason) => {
        // on dismiss
        this.CompleteComponentState = true;
      }
    );
  }
}
