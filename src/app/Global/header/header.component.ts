import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../Core/Providers/ApiService/api.service';
import { ExcelService } from '../../Core/Providers/ExcelService/excel.service';
import { PdfService } from '../../Core/Providers/PdfService/pdf.service';
import { environment } from '../../../environments/environment';
import { encode, decode } from 'js-base64';
import { DatePipe } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { CitReportsComponent } from 'src/app/Features/Accounting/FloorplanReconciliation/cit-reports/cit-reports.component';
import { CitAnalyseComponent } from 'src/app/Features/Accounting/FloorplanReconciliation/cit-analyse/cit-analyse.component';
import { SalesgrossReportsComponent } from 'src/app/Features/Sales/SalesGross/salesgross-reports/salesgross-reports.component';
import { ServicegrossReportsComponent } from 'src/app/Features/ServiceBodyShop/ServiceGross/servicegross-reports/servicegross-reports.component';
import { PartsgrossReportsComponent } from 'src/app/Features/Parts/PartsGross/partsgross-reports/partsgross-reports.component';
import { ScheduleReportsComponent } from 'src/app/Features/Accounting/Schedules/schedule-reports/schedule-reports.component';
import { NightlysalesReportComponent } from 'src/app/Features/Sales/NightlySalesSummary/nightlysales-report/nightlysales-report.component';
import { CashflowReportsComponent } from 'src/app/Features/Accounting/CashFlow/cashflow-reports/cashflow-reports.component';
import { BalancesheetReportComponent } from 'src/app/Features/Accounting/BalanceSheet/balancesheet-report/balancesheet-report.component';
import { FinancialsummaryReportComponent } from 'src/app/Features/Accounting/FinancialSummary/financialsummary-report/financialsummary-report.component';
import { AccountmappingReportComponent } from 'src/app/Features/Accounting/AccountMapping/accountmapping-report/accountmapping-report.component';
import { IncomestatementReportComponent } from 'src/app/Features/Accounting/IncomeStatement/incomestatement-report/incomestatement-report.component';
import { SchedulesviewReportComponent } from 'src/app/Features/Accounting/SchedulesView/schedulesview-report/schedulesview-report.component';
import { FinancialstatementReportComponent } from 'src/app/Features/Accounting/FinancialStatement/financialstatement-report/financialstatement-report.component';
import { LoyaltyactivityReportComponent } from 'src/app/Features/Others/LoyaltyActivity/loyaltyactivity-report/loyaltyactivity-report.component';
import { SalespersonReportComponent } from 'src/app/Features/Sales/SalesPersonRanking/salesperson-report/salesperson-report.component';
import { LoyaltyReportComponent } from 'src/app/Features/Others/Loyalty/loyalty-report/loyalty-report.component';
import { SalesreconReportComponent } from 'src/app/Features/Sales/SalesReconciliation/salesrecon-report/salesrecon-report.component';
import { SalesconvReportComponent } from 'src/app/Features/Sales/SalesConversion/salesconv-report/salesconv-report.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() Parentcomponent;
  updatedDate: any = '-';
  updatedTime: any = '-';
  @Output() UpdatedDateFun = new EventEmitter();
  ModulesData: any = [];
  ShowModules: any;
  title: String;
  isShown = true;
  componentDetails: any;
  roleId: any = '';
  userData: any;
  flagvalue: any;
  axeloneurl = environment.axelOneSolutionUrl;

  constructor(
    private ngbmodal: NgbModal,
    private ngbmodalActive: NgbActiveModal,
    public apiSrvc: ApiService,
    private excelService: ExcelService,
    private pdfService: PdfService,
    private Router: Router,
    private datepipe: DatePipe
  ) {
    this.flagvalue = 'Y';
    this.roleId = '1';
    this.getData();

    Router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // console.log(event.url.substring(8), event.url.substring(0, 8));
        let authObjID = event.url.substring(8);
        let authObj = '';
        let navipath = '';
        if (window.location.href.substring(0, 16) == 'http://localhost') {
          this.roleId = '1';
          this.getData();
        } else {
          if (event.url.indexOf('?') > 1) {
            navipath = event.url.substring(1, event.url.indexOf('?'));
            let data1 = event.url.substring(
              event.url.indexOf('?') + 7,
              event.url.indexOf('%')
            );
            localStorage.setItem('token', data1);
            console.log(data1, navipath);
          } else if (event.url.substring(0, 8) == '/?token=') {
            let data = authObjID.substring(0, authObjID.indexOf('%'));
            localStorage.setItem('token', data);
            // localStorage.removeItem('token');
            // console.log(localStorage.getItem('token'));
          }
          if (this.flagvalue == 'Y') {
            if (localStorage.getItem('token') == null) {
              document.getElementById('Redirect').click();
            } else {
              authObj = decode(localStorage.getItem('token'));
              const Tokenobj = {
                token: JSON.parse(
                  authObj.slice(0, authObj.lastIndexOf('}') + 1)
                ).session,
              };
              this.apiSrvc
                .postmethodOne('axelone/verifyToken', Tokenobj)
                .subscribe((TokenData: any) => {
                  console.log('data', TokenData);
                  if (TokenData.status == 200) {
                    if (authObj != '' && authObj.lastIndexOf('}') > 1) {
                      let obj = {
                        userid: JSON.parse(
                          authObj.slice(0, authObj.lastIndexOf('}') + 1)
                        ).userid,
                      };
                      console.log(obj);
                      this.apiSrvc
                        .postmethodOne('axelone/AxelOneUserinfo', obj)
                        .subscribe((authData: any) => {
                          console.log('data', authData);
                          let decodedres = decode(authData.response);
                          console.log(
                            decodedres.slice(
                              decodedres.indexOf('}') + 1,
                              decodedres.lastIndexOf('}') + 1
                            )
                          );
                          let userdata = decodedres.slice(
                            decodedres.indexOf('}') + 1,
                            decodedres.lastIndexOf('}') + 1
                          );
                          this.flagvalue = '';
                          if (authData.status == 200) {
                            if (event.url.substring(0, 8) == '/?token=') {
                              this.Router.navigate(['/']);
                            } else if (event.url.indexOf('?') > 1) {
                              this.Router.navigate([navipath]);
                            }
                            this.userData = authData.response[0];
                            (this.roleId = JSON.parse(userdata).roleid),
                              localStorage.setItem(
                                'UserID',
                                authData.response[0].userid
                              );
                            localStorage.setItem(
                              'UserDetails',
                              JSON.stringify(authData.response[0])
                            );
                            this.getData();
                            // this.getstores();
                          } else {
                            document.getElementById('Redirect').click();
                          }
                        });
                    }
                  } else {
                    document.getElementById('Redirect').click();
                  }
                });
            }
          }
        }
      }
    });

    this.apiSrvc.GetHeaderData().subscribe((res) => {
      this.componentDetails = res.obj;
      console.log(this.componentDetails);
    });
    if (this.componentDetails.path1 == '') {
      this.isShown = false;
    }
  }

  ngOnInit() {
    const Data = {
      state: true,
    };
    this.apiSrvc.setBackgroundstate({ obj: Data });

    if (this.title == 'Account Mapping') {
      this.isShown = false;
    }

    const obj = {};
    this.apiSrvc.postmethod('xtract/LastUpdated', obj).subscribe((res) => {
      // console.log(res.response[0].LastUpdatedDate);
      // console.log(res.response[0].LastUpdatedTime);
      this.updatedTime = res.response[0].LastUpdatedTime;
      this.updatedDate = res.response[0].LastUpdatedDate;

      console.log(
        new DatePipe('en-Us').transform(
          this.updatedDate + ' ' + this.updatedTime,
          'dd:MM:yyyy hh-mm-ss',
          'GMT+1'
        )
      );
    });
    //this.getData();
  }

  dashboard() {
    this.Router.navigate(['/']);
  }
  SubModulesData: any = [];
  getmodules() {
    let Obj = {
      RoleID: '1',
      expression: "mod_status='Y'",
    };
    this.apiSrvc
      .postmethod('permissionsbasedonroles/get', Obj)
      .subscribe((res) => {
        this.ModulesData = res.response;
        console.log(this.ModulesData);
        // this.SubMod_Id=res.SMOD_ID;
        this.ModulesData.forEach((res) => {
          if (res.MOD_ID == 0 && res.SMOD_ID != 0) {
            this.SubModulesData.push(res);
            // console.log(this.SubModulesData);
          }
        });
      });
  }
  favList: any = [];
  selectedStore: any;
  submodules(e) {
    // alert(e)
    this.favList = [];
    // this.getFav(e)
    this.selectedStore = e;
  }
  getFav(e) {
    //   const obj = {
    //     "Id": e,
    //     "expression": ""
    //   }
    //   this.apiSrvc.postmethod('favourite/get', obj).subscribe(res => {
    //     this.favList = res.response;
    //     // console.log(this.favList);
    //   });
  }
  // navigate(item) {
  //   //   localStorage.setItem('Fav', "Y")
  //   //   localStorage.setItem('Fav_id', item.Fav_id)
  //   //   // document.getElementById("closeFav").click();
  //   //   this.closeNav()
  //   //   let navComponent = this.ShowModules.filter(e => e.SMOD_ID == item.Fav_Module_Id)
  //   //   // console.log(navComponent)
  //   //   this.Router.navigateByUrl(navComponent[0].SMOD_FILENAME).then(page => { window.location.reload(); });
  // }
  navigate(val) {
    const data = {};
    this.apiSrvc.SetReports({
      obj: data,
    });
    document.getElementById('CloseMenu').click();
    this.Router.navigateByUrl(val);
    // this.close();
  }

  getData() {
    this.ShowModules = [];
    this.ModulesData = [];
    let Obj = {
      RoleID: this.roleId,
      expression: "mod_status='Y'",
    };
    this.apiSrvc
      .postmethod('permissionsbasedonroles/get', Obj)
      .subscribe((res) => {
        this.ModulesData = res.response;
        this.ShowModules = [];
        console.log(this.ModulesData);
        this.ModulesData.forEach((e) => {
          // if(e.status == "Y"){
          this.ShowModules.push(e);
          // console.log(this.ShowModules)
          // }
        });
        console.log(this.ShowModules);
      });
  }

  openMenu() {
    // this.ngbmodalActive=this.ngbmodal.open(MenuComponent, {
    //   size:'xl',
    //   backdrop: "static"
    // });
    const modalRef = this.ngbmodal.open(MenuComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    //modalRef.componentInstance.Parentcomponent = this.ShowModules;
  }
  openNav() {
    document.getElementById('mySidenav').style.width = '350px';
  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
  }

  openAnalyze() {
    if (this.componentDetails.title == 'CIT Report') {
      this.ngbmodalActive = this.ngbmodal.open(CitAnalyseComponent, {
        size: 'xl',
        backdrop: 'static',
      });
    }
  }

  openFilter() {
    if (this.componentDetails.title == 'Sales Gross') {
      const Data = {
        state: false,
      };
      this.apiSrvc.setBackgroundstate({ obj: Data });
      const modalRef = this.ngbmodal.open(SalesgrossReportsComponent, {
        size: 'xl',
        backdrop: 'static',
      });
      modalRef.componentInstance.Parentcomponent = 'SG';
      modalRef.result.then(
        (data) => {},
        (reason) => {
          // on dismiss
          const Data = {
            state: true,
          };
          this.apiSrvc.setBackgroundstate({ obj: Data });
        }
      );
    }
    if (this.componentDetails.title == 'Service Gross') {
      const modalRef = this.ngbmodal.open(ServicegrossReportsComponent, {
        size: 'xl',
        backdrop: 'static',
      });
      modalRef.componentInstance.Parentcomponent = 'SrvcG';
    }
    if (this.componentDetails.title == 'Balance Sheet') {
      const modalRef = this.ngbmodal.open(BalancesheetReportComponent, {
        size: 'xl',
        backdrop: 'static',
      });
      modalRef.componentInstance.Parentcomponent = 'BS';
    }
    if (this.componentDetails.title == 'Schedules / Managed Accounts') {
      const modalRef = this.ngbmodal.open(ScheduleReportsComponent, {
        size: 'xl',
        backdrop: 'static',
      });
      modalRef.componentInstance.Parentcomponent = 'SMA';
    }
    if (this.componentDetails.title == 'CIT Report') {
      const modalRef = this.ngbmodal.open(CitReportsComponent, {
        size: 'xl',
        backdrop: 'static',
      });
      modalRef.componentInstance.Parentcomponent = 'CFR';
    }

    if (this.componentDetails.title == 'Sales Conversion') {
      const modalRef = this.ngbmodal.open(SalesconvReportComponent, {
        size: 'xl',
        backdrop: 'static',
      });
      modalRef.componentInstance.Parentcomponent = 'SR';
    }
    if (this.componentDetails.title == 'Parts Gross') {
      const modalRef = this.ngbmodal.open(PartsgrossReportsComponent, {
        size: 'xl',
        backdrop: 'static',
      });
      modalRef.componentInstance.Parentcomponent = 'PG';
    }
    if (this.componentDetails.title == 'Financial Summary') {
      const modalRef = this.ngbmodal.open(FinancialsummaryReportComponent, {
        size: 'xl',
        backdrop: 'static',
      });
      modalRef.componentInstance.Parentcomponent = 'FS';
    }

    if (this.componentDetails.title == 'Nightly Sales Report') {
      const modalRef = this.ngbmodal.open(NightlysalesReportComponent, {
        size: 'xl',
        backdrop: 'static',
      });
      modalRef.componentInstance.Parentcomponent = 'SRC';
    }
    if (this.componentDetails.title == 'Cash Flow') {
      const modalRef = this.ngbmodal.open(CashflowReportsComponent, {
        size: 'xl',
        backdrop: 'static',
      });
      modalRef.componentInstance.Parentcomponent = 'CF';
    }
    if (this.componentDetails.title == 'Account Mapping') {
      const modalRef = this.ngbmodal.open(AccountmappingReportComponent, {
        size: 'xl',
        backdrop: 'static',
      });
      modalRef.componentInstance.Parentcomponent = 'AM';
    }
    if (this.componentDetails.title == 'Income Statement') {
      const modalRef = this.ngbmodal.open(IncomestatementReportComponent, {
        size: 'xl',

        backdrop: 'static',
      });

      modalRef.componentInstance.Parentcomponent = 'IS';
    }
    if (this.componentDetails.title == 'Schedules View') {
      const modalRef = this.ngbmodal.open(SchedulesviewReportComponent, {
        size: 'xl',
        backdrop: 'static',
      });
      modalRef.componentInstance.Parentcomponent = 'SV';
    }
    if (this.componentDetails.title == 'Financial Statement') {
      const modalRef = this.ngbmodal.open(FinancialstatementReportComponent, {
        size: 'xl',
        backdrop: 'static',
      });
      modalRef.componentInstance.Parentcomponent = 'SF';
    }

    if (this.componentDetails.title == 'Loyalty Activity Report') {
      const modalRef = this.ngbmodal.open(LoyaltyactivityReportComponent, {
        size: 'xl',

        backdrop: 'static',
      });

      modalRef.componentInstance.Parentcomponent = 'LAR';
    }

    if (this.componentDetails.title == 'SalesPerson Ranking') {
      const modalRef = this.ngbmodal.open(SalespersonReportComponent, {
        size: 'xl',

        backdrop: 'static',
      });

      modalRef.componentInstance.Parentcomponent = 'SPR';
    }
    if (this.componentDetails.title == 'Loyalty') {
      const modalRef = this.ngbmodal.open(LoyaltyReportComponent, {
        size: 'xl',

        backdrop: 'static',
      });

      modalRef.componentInstance.Parentcomponent = 'LR';
    }
    if (this.componentDetails.title == 'Sales-Reconciliation') {
      const modalRef = this.ngbmodal.open(SalesreconReportComponent, {
        size: 'xl',
        backdrop: 'static',
      });
      modalRef.componentInstance.Parentcomponent = 'SRR';
    }

    if (this.componentDetails.title == 'Schedules View') {
      const modalRef = this.ngbmodal.open(SchedulesviewReportComponent, {
        size: 'xl',
        backdrop: 'static',
      });
      modalRef.componentInstance.Parentcomponent = 'SV';
    }
  }
  onclosemsg() {
    this.ngbmodalActive.close();
  }

  exportAsXLSX(ExcelID, Sub_ExcelID) {
    console.log(ExcelID);
    console.log(Sub_ExcelID);
    if (this.componentDetails.title == 'Sales Gross') {
      var wscols = [
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
      ];
      var wsrows = [
        { hpt: 30 },
        { hpt: 30 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
      ];
      let element = document.getElementById('Sales Gross');
      this.excelService.ExportTableToExcel(
        element,
        'Sales_Gross_Report',
        wscols,
        wsrows
      );
    } else if (this.componentDetails.title == 'Service Gross') {
      var wscols = [
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
      ];
      var wsrows = [
        { hpt: 30 },
        { hpt: 30 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
      ];
      let element = document.getElementById('Service Gross');
      this.excelService.ExportTableToExcel(
        element,
        'Service_Gross_Report',
        wscols,
        wsrows
      );
    } else if (this.componentDetails.title == 'Parts Gross') {
      var wscols = [
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
      ];
      var wsrows = [
        { hpt: 30 },
        { hpt: 30 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
        { hpt: 20 },
      ];
      let element = document.getElementById('Parts Gross');
      this.excelService.ExportTableToExcel(
        element,
        'Parts_Gross_Report',
        wscols,
        wsrows
      );
    } else if (this.componentDetails.title == 'Account Mapping') {
      // var wscols = [{ wch: 30 }, { wch: 30 }, { wch: 30 },{ wch: 30 },{ wch: 30 },{ wch: 30 },{ wch: 30 }, { wch: 30 }, { wch: 30 },{ wch: 30},{ wch: 30},{ wch: 30}];
      // var wsrows = [{ hpt: 30 },];
      // let element = document.getElementById("Account Mapping");
      // this.excelService.ExportTableToExcel(element, 'Account_Mapping_Report',wscols,wsrows);
      const Data = {
        state: true,
      };
      this.apiSrvc.setaccountmappingstate({ obj: Data });
    } else if (this.componentDetails.title == 'Financial Summary') {
      if (this.componentDetails.filter == 'StoreSummary') {
        var wscols = [
          { wch: 30 },
          { wch: 20 },
          { wch: 20 },
          { wch: 20 },
          { wch: 20 },
          { wch: 20 },
          { wch: 20 },
          { wch: 20 },
          { wch: 20 },
          { wch: 20 },
          { wch: 20 },
          { wch: 20 },
          { wch: 20 },
        ];
        var wsrows = [
          { hpt: 30 },
          { hpt: 30 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
          { hpt: 20 },
        ];
        let element = document.getElementById('StoreSummary');
        this.excelService.ExportTableToExcel(
          element,
          'Store_Summary_Report',
          wscols,
          wsrows
        );
      } else if (this.componentDetails.filter == 'AdjustedEbitda') {
        let element = document.getElementById('AdjustedEbitda');
        this.excelService.ExportTableToExcel(
          element,
          'Adjusted_EBITDA_Report',
          wscols,
          wsrows
        );
      } else if (this.componentDetails.filter == 'ExpenseTrend') {
        let element = document.getElementById('ExpenseTrend');
        this.excelService.ExportTableToExcel(
          element,
          'Expense_Trend_Report',
          wscols,
          wsrows
        );
      } else if (this.componentDetails.filter == 'VariableKPI') {
        let element = document.getElementById('VariableKPI_1');
        let element1 = document.getElementById('VariableKPI_2');
        let element2 = document.getElementById('VariableKPI_3');
        this.excelService.ExportMultipleTablesToExcel(
          element,
          element1,
          element2,
          'VariableKPI_Report'
        );
      }
    }
  }
  SendToEmailPDF(pdfID, Sub_pdfID) {
    let PDF_ID: any;
    if (pdfID == 'Financial Summary') {
      PDF_ID = Sub_pdfID;
    } else {
      PDF_ID = pdfID;
    }
    this.pdfService.sendEmailData(PDF_ID);
  }

  exportAsPDF() {
    this.pdfService.GetPrintData(this.componentDetails.title);
  }

  msg() {
    // this.Router.navigate(['/messenger']);
  }
  url: any;
  Actions() {
    let token = {
      uname: this.userData.fname + this.userData.lname,
      utitle: this.userData.title,
      uid: this.userData.userid,
      pid: 2,
    };
    var tkn = btoa(JSON.stringify(token));
    this.url = 'https://devtask.axelautomotive.com/dashboard/' + tkn;
    window.open(this.url, '_blank');

    // return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    // this.sanitizer.bypassSecurityTrustResourceUrl(
    //   'https://devtask.axelautomotive.com/dashboard/' + tkn
    // );
  }
}
