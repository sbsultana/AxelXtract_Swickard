import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../Core/Providers/ApiService/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { ExcelService } from '../../../../Core/Providers/ExcelService/excel.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  selectedheadertab: any = ['ALL'];
  LendersData: any = [];
  Lenders: any = [];

  FIProductsData: any = [];
  FIProducts: any = [];
  ProductDropDownType: any = [];
  ProductDropDownCategory: any = [];
  LenderDropDownType: any = [];
  LenderDropDownCategory: any = [];
  AccountingMapping: any = [];
  AccountingMappingData: any = [];
  Department: any = [];
  Subtype: any = [];
  SubtypeDetail: any = [];
  stores: any = [];
  lenders: any = [];
  statusFilter: any = ['M'];
  NoData: any = false;
  PageCount = 1;
  Pagination: boolean = false;
  LastCount: boolean;

  selectedStore = '0';
  selectedstrid = 0;

  selectedAccountDetail: any;
  selectedAccountFIP: boolean = false;
  selectedAccountCMN: boolean = false;
  selectedAccountL: boolean = false;
  weowedescription: any;
  selectedMaporEdit: any;
  type: any;
  category: any;
  alid: any;
  lenderId: any = [];
  lenderselected: any = [];
  searchText: any = '';

  bulkEditRecords: any = [];
  bulksave: any = [];
  Bulk: Boolean = false;
  ignorebtn: boolean = false;
  Accounttype: any = [];
  Accounttypedetail: any = [];

  selectedaccounttypedetail: any = '0';
  Dselectedaccounttypedetail: any = '';
  Aselectedaccounttypedetail: boolean = false;

  accountfulldetail: any = '0';
  Daccountfulldetail: any = '';
  Aaccountfulldetail: boolean = false;

  department: any = '0';
  Ddepartment: any = '';
  Adepartment: boolean = false;

  departmenttype: any = '0';
  Ddepartmenttype: any = '';
  Adepartmenttype: boolean = false;

  departmentbody: any = 'No';
  actbal: any;
  Ddepartmentbody: any = '';
  Adepartmentbody: boolean = false;

  stype: any = '0';
  Dstype: any = '';
  Astype: boolean = false;

  subtype: any = '0';
  Dsubtype: any = '';
  Asubtype: boolean = false;

  subtypedetail: any = '0';
  Dsubtypedetail: any = '';
  Asubtypedetail: boolean = false;

  financialsummary: any = '0';
  Dfinancialsummary: any = '';
  Afinancialsummary: boolean = false;

  Accountfulldetail: any = [];
  Departmenttype: any = [];
  Departmentbody: any = [];
  Financialsummary: any = [];
  Type: any = [];
  accounttype: any = '0';

  submitted: boolean = false;
  ignoredata: any;

  FinalArray: any = [];
  FinalArrayunmapped: any = [];
  FinalArrayignored: any = [];

  revertdata: any;
  Ref2: any;
  BIref: any = '';
  Refchange: any;
  Dactbal: any;

  Filter: any = 'Accounts';
  allXLSX: any = [];
  AccountmappingState: any;

  constructor(
    private ngbmodal: NgbModal,
    private ngbmodalActive: NgbActiveModal,
    public apiSrvc: ApiService,
    private spinner: NgxSpinnerService,
    private title: Title,
    private excelService: ExcelService
  ) {
    this.title.setTitle('Xtract-Account Mapping');
    const data = {
      title: 'Account Mapping',
      path1: '',
      path2: '',
      path3: '',
      filter: this.Filter,
    };
    this.apiSrvc.SetHeaderData({
      obj: data,
    });
  }

  ngOnInit(): void {
    this.ignorebtn = false;

    this.getStores();
    this.getProductDropDown('T');
    this.getProductDropDown('C');
    this.getLendersDropDown('C');
    this.getLendersDropDown('T');
    this.lenderspopup();

    // this.getAccountingMappingTab('GP', this.selectedStore),
    this.getAccountingMappingTabALL();
    // this.getAccountingMappingTabALLXLSX()
    // this.getAccounttypedetail('AC','');
    //console.log(this.ignorebtn);
  }

  getAccountMappingDropdowns(e) {
    const obj = {
      type: e,
    };
    this.apiSrvc.postmethod('xtract/GetAccountMappingDropdowns', obj).subscribe(
      (res) => {
        if (res.status == 200) {
          if (e == 'D') {
            this.Department = res.response.filter((e) => e.Department != '');
          }
          if (e == 'S') {
            this.Subtype = res.response.filter((e) => e.Subtype != '');
          }
          if (e == 'T') {
            this.SubtypeDetail = res.response.filter(
              (e) => e.Subtype_Detail != ''
            );
            //console.log(this.SubtypeDetail);
          }
        } else {
          alert('Invalid Details');
        }
      },
      (error) => {
        //console.log(error);
      }
    );
  }
  getLendersDropDown(e) {
    const obj = {
      type: e,
    };
    this.apiSrvc.postmethod('xtract/GetLenderDropdowns', obj).subscribe(
      (res) => {
        if (res.status == 200) {
          if (e == 'T') {
            this.LenderDropDownType = res.response;
            // //console.log(this.LenderDropDownType)
          }
          if (e == 'C') {
            this.LenderDropDownCategory = res.response;
            // //console.log(this.LenderDropDownCategory)
          }
        } else {
          alert('Invalid Details');
        }
      },
      (error) => {
        //console.log(error);
      }
    );
  }
  getProductDropDown(e) {
    const obj = {
      type: e,
    };

    this.apiSrvc.postmethod('xtract/GetProductMappingDropdowns', obj).subscribe(
      (res) => {
        if (res.status == 200) {
          if (e == 'T') {
            this.ProductDropDownType = res.response;
            // //console.log(this.ProductDropDownType)
          }
          if (e == 'C') {
            this.ProductDropDownCategory = res.response;
            // //console.log(this.ProductDropDownCategory)
          }
        } else {
          alert('Invalid Details');
        }
      },
      (error) => {
        //console.log(error);
      }
    );
  }

  headerselection(e) {
    this.Bulk = false;
    this.ignorebtn = false;
    this.PageCount = 1;
    this.NoData = false;
    this.selectedheadertab = [];
    // this.searchText = '';
    // this.statusFilter=['M']
    this.selectedheadertab.push(e);
    if (e == 'L') {
      this.Pagination = false;
      this.GetLenders(this.selectedstrid);
    }
    if (e == 'FIP') {
      this.GetFIProducts(this.selectedstrid);
    }
    if (e != 'FIP' && e != 'L' && e != 'ALL') {
      this.Pagination = false;
      if (this.statusFilter[0] == 'N') {
        this.GetUnMapped();
      } else {
        this.getAccountingMappingTab(e, this.selectedStore);
      }
    }
    if (e == 'ALL') {
      this.Pagination = false;
      if (this.statusFilter[0] == 'N') {
        this.GetUnMapped();
      } else {
        this.getAccountingMappingTabALL();
      }
    }
  }

  getStores() {
    const obj = {
      AU_ID: 1,
    };
    this.apiSrvc.postmethod('xtract/GetStores', obj).subscribe(
      (res) => {
        if (res.status == 200) {
          this.stores = res.response;
          this.selectedStore = '0';
          this.selectedstrid = 0;
        } else {
          alert('Invalid Details');
        }
      },
      (error) => {
        //console.log(error);
      }
    );
  }
  StoreFilter(val) {
    //console.log(val.target.value);
    this.PageCount = 1;
    this.Pagination = false;
    this.selectedStore = val.target.value;
    let value = this.stores.filter(
      (x) => x.CORA_ACCT_CODE == this.selectedStore
    );
    if (val.target.value == 0) {
      this.selectedstrid = 0;
    } else {
      this.selectedstrid = value[0].AS_ID;
    }
    let e = this.selectedheadertab[0];
    if (e == 'ALL') {
      if (this.statusFilter[0] == 'N') {
        this.GetUnMapped();
      } else {
        this.getAccountingMappingTabALL();
      }
    }
    if (e == 'L') {
      this.Pagination = false;
      this.GetLenders(this.selectedstrid);
    }
    if (e == 'FIP') {
      this.GetFIProducts(this.selectedstrid);
    }
    if (e != 'L' && e != 'FIP' && e != 'ALL') {
      if (this.statusFilter[0] == 'N') {
        this.GetUnMapped();
      } else {
        this.getAccountingMappingTab(e, this.selectedStore);
      }
    }
  }

  StatusFiltering(e) {
    this.Bulk = false;
    this.ignorebtn = false;
    this.statusFilter = [];
    this.statusFilter.push(e);

    //console.log(this.statusFilter);
    let p1;
    p1 = this.statusFilter[0] == undefined ? '' : this.statusFilter[0];
    //console.log(p1);
    // p2 = this.statusFilter[1] == undefined ? '' : this.statusFilter[1];
    // p3 = this.statusFilter[2] == undefined ? '' : this.statusFilter[2];

    if (this.selectedheadertab[0] == 'L') {
      if (this.Lenders.length > 0) {
        this.LendersData = this.Lenders.filter((val) => val.STATUS == p1);
      }
    }
    if (this.selectedheadertab[0] == 'FIP') {
      if (this.FIProducts.length > 0) {
        this.FIProductsData = this.FIProducts.filter((val) => val.Status == p1);
        if (
          this.FIProductsData.length == 0 ||
          this.FIProductsData.length < 100
        ) {
          this.Pagination = false;
          this.LastCount = false;
        } else {
          this.Pagination = true;
          this.LastCount = true;
        }
      }
    }
    if (
      this.selectedheadertab[0] != 'L' &&
      this.selectedheadertab[0] != 'FIP' &&
      this.selectedheadertab[0] != 'ALL'
    ) {
      if (e == 'N') {
        this.GetUnMapped();
      }
      if (e == 'D') {
        this.getAccountingMappingTab(
          this.selectedheadertab[0],
          this.selectedStore
        );
      }
      if (e == 'M') {
        this.getAccountingMappingTab(
          this.selectedheadertab[0],
          this.selectedStore
        );
      }
    }
    if (this.selectedheadertab[0] == 'ALL') {
      if (e == 'M') {
        this.getAccountingMappingTabALL();
      }
      if (e == 'N') {
        this.GetUnMapped();
      }
      if (e == 'D') {
        this.getAccountingMappingTabALL();
      }
    }
  }
  GetLenders(strid) {
    this.LendersData = [];
    this.NoData = false;
    this.spinner.show();
    const obj = {
      store_id: strid,
      accountname: this.searchText,
      Lendertype: '0',
      LenderCategory: '',
      STATUS: 'A',
    };

    this.apiSrvc.postmethod('xtract/GetLenderTab', obj).subscribe(
      (res) => {
        if (res.status == 200) {
          this.spinner.hide();
          this.LendersData = res.response;
          // if(this.LendersData.length==0){
          this.Lenders = res.response;
          let p1, p2, p3;
          p1 = this.statusFilter[0] == undefined ? '' : this.statusFilter[0];
          // p2 = this.statusFilter[1] == undefined ? '' : this.statusFilter[1];
          // p3 = this.statusFilter[2] == undefined ? '' : this.statusFilter[2];
          if (this.Lenders.length > 0) {
            this.LendersData = this.Lenders.filter(
              (val) => val.STATUS == p1
              // || val.STATUS == p2 || val.STATUS == p3
            );
          }
          this.NoData = true;
          // }
          // else{
          // this.NoData=false;
          // }
        } else {
          alert('Invalid Details');
        }
      },
      (error) => {
        //console.log(error);
      }
    );
  }
  GetFIProducts(strid) {
    this.FIProductsData = [];
    this.NoData = false;
    this.Pagination = false;
    this.spinner.show();
    const obj = {
      // "store_id": strid,
      // "productname": "0",
      // "productdesc": "0",
      // "Producttype": "",
      // "ProductCategory": "",
      // "PageNumber": this.PageCount,
      // "PageSize": "1000",
      // "type": "0",
      // "date": "0"

      store_id: strid,
      PageNumber: this.PageCount,
      PageSize: '100',
      type: '0',
      SearchKey: this.searchText,
    };

    this.apiSrvc.postmethod('xtract/GetProductMappingTab', obj).subscribe(
      (res) => {
        if (res.status == 200) {
          this.FIProductsData = res.response;
          this.FIProducts = res.response;
          this.NoData = true;
          if (this.FIProductsData.length == 0) {
            // this.Pagination = false;
          } else {
            //console.log(this.statusFilter[0])
            // if (this.FIProductsData.length == 100) {
            //   this.Pagination = true
            // }
            // this.NoData=false;
            let p1, p2, p3;
            p1 = this.statusFilter[0] == undefined ? '' : this.statusFilter[0];
            // p2 = this.statusFilter[1] == undefined ? '' : this.statusFilter[1];
            // p3 = this.statusFilter[2] == undefined ? '' : this.statusFilter[2];
            if (this.FIProducts.length > 0) {
              this.FIProductsData = this.FIProducts.filter(
                (val) => val.Status == p1
                // || val.Status == p2 || val.Status == p3
              );
              //console.log(this.FIProductsData);
              if (this.FIProductsData.length < 100) {
                this.LastCount = false;
                this.Pagination = false;
              } else {
                this.LastCount = true;
                this.Pagination = true;
              }
            }
          }
          this.spinner.hide();
        } else {
          alert('Invalid Details');
        }
      },
      (error) => {
        //console.log(error);
      }
    );
  }

  getAccountingMappingTab(e, strcode) {
    //console.log(this.statusFilter[0]);
    let status = this.statusFilter[0] == 'M' ? '0' : 'D';
    // let status = '0';
    this.AccountingMapping = [];
    this.NoData = false;
    this.spinner.show();
    const obj = {
      store_code: strcode,
      accountname: e,
      department: '0',
      Category: '0',
      status: status,
      PageNumber: this.PageCount,
      PageSize: '100',
      SearchKey: this.searchText,
    };
    this.apiSrvc.postmethod('xtract/GetAccountMappingTab', obj).subscribe(
      (res) => {
        if (res.status == 200) {
          //console.log(res.response.length,  this.AccountingMapping);
          this.AccountingMapping = res.response;
          this.AccountingMappingData = res.response;
          if (this.AccountingMapping.length == 0) {
            this.Pagination = false;
          } else {
            // if (this.AccountingMapping.length == 100) {
            //   this.Pagination = true;
            // }
            // // this.Pagination = true
            // //console.log(this.AccountingMapping.length);
            let p1;
            p1 = this.statusFilter[0] == undefined ? '' : this.statusFilter[0];
            // p2 = this.statusFilter[1] == undefined ? '' : this.statusFilter[1];
            // p3 = this.statusFilter[2] == undefined ? '' : this.statusFilter[2];
            if (this.AccountingMappingData.length > 0) {
              if (status != 'D') {
                this.AccountingMapping = this.AccountingMappingData.filter(
                  (val) => val.Status == p1
                );
              }
              if (this.AccountingMapping.length < 100) {
                this.Pagination = false;
                this.LastCount = false;
              } else {
                this.LastCount = true;
                this.Pagination = true;
              }
            }
          }
          this.NoData = true;
          this.spinner.hide();
        } else {
          alert('Invalid Details');
        }
      },
      (error) => {
        //console.log(error);
      }
    );
    this.getMappedXLSX(e, strcode);
  }

  getAccountingMappingTabALL() {
    let status = this.statusFilter[0] == 'M' ? '0' : 'D';
    //  let status = '0';
    this.AccountingMapping = [];
    this.NoData = false;
    this.spinner.show();
    const obj = {
      store_code: this.selectedStore,
      accountname: '',
      department: '0',
      Category: '0',
      status: status,
      PageNumber: this.PageCount,
      PageSize: '100',
      SearchKey: this.searchText,
    };
    this.apiSrvc.postmethod('xtract/GetAccountMappingTabForAll', obj).subscribe(
      (res) => {
        if (res.status == 200) {
          //console.log(res.response.length);
          this.AccountingMapping = res.response;
          this.AccountingMappingData = res.response;
          if (this.AccountingMapping.length == 0) {
            this.Pagination = false;
          } else {
            // if (this.AccountingMapping.length == 100) {
            //   this.Pagination = true;
            // }
            // // this.Pagination = true
            // //console.log(this.AccountingMapping.length);
            let p1;
            p1 = this.statusFilter[0] == undefined ? '' : this.statusFilter[0];

            // p2 = this.statusFilter[1] == undefined ? '' : this.statusFilter[1];
            // p3 = this.statusFilter[2] == undefined ? '' : this.statusFilter[2];
            if (this.AccountingMappingData.length > 0) {
              if (status != 'D') {
                this.AccountingMapping = this.AccountingMappingData.filter(
                  (val) => val.Status == p1
                );
                // //console.log( this.AccountingMapping)
              }
              if (this.AccountingMapping.length < 100) {
                this.Pagination = false;
                this.LastCount = false;
              } else {
                this.LastCount = true;
                this.Pagination = true;
              }
            }
          }
          this.NoData = true;
          this.spinner.hide();
        } else {
          alert('Invalid Details');
        }
      },
      (error) => {
        //console.log(error);
      }
    );
    this.getAccountingMappingTabALLXLSX();
  }

  clearFilter() {
    this.searchText = '';
    this.searchFilter();
  }

  searchFilter() {
    let e = this.selectedheadertab[0];
    if (this.statusFilter[0] != 'N') {
      if (e == 'L') {
        this.Pagination = false;
        this.GetLenders(this.selectedstrid);
      }
      if (e == 'FIP') {
        this.GetFIProducts(this.selectedstrid);
      }
      if (e != 'L' && e != 'FIP' && e != 'ALL') {
        this.getAccountingMappingTab(e, this.selectedStore);
      }
      if (e == 'ALL') {
        this.getAccountingMappingTabALL();
      }
    } else {
      this.GetUnMapped();
    }
  }

  GetUnMapped() {
    this.AccountingMapping = [];
    this.NoData = false;
    this.spinner.show();
    const obj = {
      store_code: this.selectedStore,
      PageNumber: this.PageCount,
      PageSize: '100',
      SearchKey: this.searchText,
    };

    this.apiSrvc.postmethod('xtract/GetAccountMappingUnmapped', obj).subscribe(
      (res) => {
        if (res.status == 200) {
          this.AccountingMapping = res.response.map((v) => ({
            ...v,
            Status: 'N',
            state: false,
          }));
          //console.log(this.AccountingMapping);
          this.AccountingMappingData = res.response.map((v) => ({
            ...v,
            Status: 'N',
            state: false,
          }));
          this.spinner.hide();
          if (this.AccountingMappingData.length > 0) {
            this.NoData = false;
            if (this.AccountingMapping.length < 100) {
              this.Pagination = false;
              this.LastCount = false;
            } else {
              this.LastCount = true;
              this.Pagination = true;
            }
          } else {
            this.NoData = true;
          }
        } else {
          alert('Invalid Details');
        }
      },
      (error) => {
        //console.log(error);
      }
    );
    this.getUnMappedXLSX();
  }

  selecteditem: any;
  EditMapping(e) {
    // alert(e)
    this.selecteditem = e;
  }
  Prev() {
    this.Pagination = false;
    this.PageCount--;
    if (this.selectedheadertab[0] == 'ALL') {
      if (this.statusFilter[0] == 'N') {
        this.GetUnMapped();
      } else {
        this.getAccountingMappingTabALL();
      }
    }
    if (this.selectedheadertab[0] == 'FIP') {
      this.GetFIProducts(this.selectedstrid);
    }
    if (
      this.selectedheadertab[0] != 'FIP' &&
      this.selectedheadertab[0] != 'L' &&
      this.selectedheadertab[0] != 'ALL'
    ) {
      if (this.statusFilter[0] == 'N') {
        this.GetUnMapped();
      } else {
        this.getAccountingMappingTab(
          this.selectedheadertab[0],
          this.selectedStore
        );
      }
    }
  }

  Next() {
    this.Pagination = false;
    this.PageCount++;

    if (this.selectedheadertab[0] == 'ALL') {
      if (this.statusFilter[0] == 'N') {
        this.GetUnMapped();
      } else {
        this.getAccountingMappingTabALL();
      }
    }
    if (this.selectedheadertab[0] == 'FIP') {
      this.GetFIProducts(this.selectedstrid);
    }
    if (
      this.selectedheadertab[0] != 'FIP' &&
      this.selectedheadertab[0] != 'L' &&
      this.selectedheadertab[0] != 'ALL'
    ) {
      if (this.statusFilter[0] == 'N') {
        this.GetUnMapped();
      } else {
        this.getAccountingMappingTab(
          this.selectedheadertab[0],
          this.selectedStore
        );
      }
    }
  }
  openMapAccount(r, fi, sa) {
    //     if(this.selectedstrid==0){
    // alert("Please select the store");
    //     }
    // else{
    // //console.log(r,fi,sa)
    this.Ref2 = 'mapped';
    this.selectedMaporEdit = sa;
    this.selectedAccountDetail = Object.assign({}, fi);
    if (
      this.selectedAccountDetail.Type != null ||
      this.selectedAccountDetail.Category != null
    ) {
      this.type = this.ProductDropDownType.filter(
        (x) => x.PT_NAME == this.selectedAccountDetail.Type
      );
      this.selectedAccountDetail.Type = this.type[0].PT_ID;
      this.category = this.ProductDropDownCategory.filter(
        (x) => x.PC_NAME == this.selectedAccountDetail.Category
      );
      this.selectedAccountDetail.Category = this.category[0].PC_ID;
    }
    if (this.selectedAccountDetail.Status == 'M') {
      this.getAccounttypedetail('AC', 'mapped');
      // this.getAccountMappingDropdowns('D');
      // this.getAccountMappingDropdowns('S');
      // this.getAccountMappingDropdowns('T');
      // this.accounttype=this.selectedAccountDetail.AccountType
    } else {
      // this.accounttype=this.selectedAccountDetail.AccountType

      this.department = '0';
      this.subtype = '0';
      this.subtypedetail = '0';
    }
    this.Department = [];
    this.Subtype = [];
    this.SubtypeDetail = [];

    this.ngbmodalActive = this.ngbmodal.open(r, {
      size: 'sm',
      backdrop: 'static',
    });
  }
  // }

  openLenders(r, fi, sa) {
    // //console.log(r,fi,sa)
    this.selectedMaporEdit = sa;
    this.selectedAccountDetail = Object.assign({}, fi);
    //console.log(this.selectedAccountDetail);
    let lenderid = this.lenders.filter(
      (x) => x.AL_NAME == this.selectedAccountDetail.LenderName
    );
    // this.lenderselected = this.lenders.filter(x => x.AL_ID == .AL_ID);
    this.lenderId = lenderid[0].AL_ID;
    this.OnLenderNameChange(lenderid[0].AL_ID);
    //console.log(lenderid);

    if (
      this.selectedAccountDetail.Type != null ||
      this.selectedAccountDetail.Category != null
    ) {
      this.type = this.LenderDropDownType.filter(
        (x) => x.LT_NAME == this.selectedAccountDetail.LenderType
      );
      this.selectedAccountDetail.LenderType = this.type[0].LT_ID;
      this.category = this.LenderDropDownCategory.filter(
        (x) => x.LC_NAME == this.selectedAccountDetail.Category
      );
      this.selectedAccountDetail.Category = this.category[0].LC_ID;
    }
    this.ngbmodalActive = this.ngbmodal.open(r, {
      size: 'sm',
      backdrop: 'static',
    });
  }
  oncloseMapAccount() {
    this.ngbmodalActive.close();
  }
  onclose() {
    this.ngbmodalActive.close();
  }
  onclosetwo() {
    alert('closetwo');
    document.getElementById('closetwo').click();
  }
  MapAccountSave(ref) {
    if (this.selectedMaporEdit == 'MapFIP') {
      // //console.log(ref)
      const obj = {
        store: this.selectedstrid,
        AP_NAME: ref.weowecode,
        AP_DESC: ref.weowedesc,
        AP_PT_ID: this.selectedAccountDetail.Type,
        AP_PC_ID: this.selectedAccountDetail.Category,
        AP_STATUS: 'A',
      };
      //console.log(obj);
      this.apiSrvc.postmethod('productmapping', obj).subscribe(
        (res) => {
          if (res.status == 200) {
            this.ngbmodalActive.close();
            alert(res.response);
            this.GetFIProducts(this.selectedstrid);
          } else {
            alert('Invalid Details');
          }
        },
        (error) => {
          //console.log(error);
        }
      );
    }
    if (this.selectedMaporEdit == 'EditFIP') {
      // //console.log(ref)
      const obj = {
        AP_ID: ref.AP_ID,
        AP_DESC: ref.weowedesc,
        AP_PT_ID: this.selectedAccountDetail.Type,
        AP_PC_ID: this.selectedAccountDetail.Category,
      };
      //console.log(obj);
      this.apiSrvc.putmethod('productmapping', obj).subscribe(
        (res) => {
          if (res.status == 200) {
            this.ngbmodalActive.close();
            alert(res.response);
            this.GetFIProducts(this.selectedstrid);
          } else {
            alert('Invalid Details');
          }
        },
        (error) => {
          //console.log(error);
        }
      );
    }

    // if (this.selectedMaporEdit == 'EditCMN') {
    //   //console.log(ref);
    //   const obj = {
    //     store_code: ref.storecode,
    //     accountname: this.accounttype,
    //     AccountDesc: ref.AccountDescription,
    //     department: this.department,
    //     subtype: this.subtype,
    //     subtype_detail: this.subtypedetail,
    //     key: ref.id,
    //   };
    //   //console.log(obj);
    //   this.apiSrvc.putmethod('accountmapping', obj).subscribe(
    //     (res) => {
    //       if (res.status == 200) {
    //         this.ngbmodalActive.close();
    //         alert(res.response);
    //         this.getAccountingMappingTab(
    //           this.selectedheadertab[0],
    //           this.selectedStore
    //         );
    //       } else {
    //         alert('Invalid Details');
    //       }
    //     },
    //     (error) => {
    //       //console.log(error);
    //     }
    //   );
    // }

    if (this.selectedMaporEdit == 'EditL') {
      //console.log(ref);
      const obj = {
        ALM_ID: ref.ID,
        AL_ID: this.lenderId,
      };

      this.apiSrvc.putmethod('lendermapping', obj).subscribe(
        (res) => {
          if (res.status == 200) {
            //console.log(res);
            alert(res.response);
            this.ngbmodalActive.close();
            this.GetLenders(this.selectedstrid);
          } else {
            alert('Invalid Details');
          }
        },
        (error) => {
          //console.log(error);
        }
      );
    }
  }

  MapAccountCancel() {
    this.submitted = false;
    this.ngbmodalActive.close();
  }

  OnProductDropDownTypeChange(e) {
    // //console.log(e.target.value)
    this.selectedAccountDetail.Type = e.target.value;
  }

  OnProductDropDownCategoryChange(e) {
    // //console.log(e.target.value)
    this.selectedAccountDetail.Category = e.target.value;
  }

  OnAccountTypeChange(e) {
    // //console.log(e.target.value)
    this.selectedAccountDetail.AccountType = e.target.value;
  }

  OnDepartmentChange(e) {
    this.selectedAccountDetail.Department = e.target.value;
  }

  OnSubtypeChange(e) {
    this.selectedAccountDetail.Subtype = e.target.value;
  }
  OnSubtypeDetailChange(e) {
    this.selectedAccountDetail.SubtypeDetail = e.target.value;
  }

  OnLenderNameChange(e) {
    //console.log(e);
    this.lenderId = e;
    this.lenderselected = this.lenders.filter((x) => x.AL_ID == this.lenderId);
    //console.log(this.lenderselected);
  }

  lenderspopup() {
    const obj = {
      AL_ID: '0',
      ALM_ID: '0',
    };

    this.apiSrvc.postmethod('lendermapping', obj).subscribe(
      (res) => {
        if (res.status == 200) {
          //console.log(res);
          this.lenders = res.response;
          // this.lenders = this.lenders.filter((item) => item.AL_NAME == AL_NAME);
        } else {
          alert('Invalid Details');
        }
      },
      (error) => {
        //console.log(error);
      }
    );
  }

  bulkEdit(e, ref, template, multiorsingle, slrecord, BI?) {
    //console.log(ref);

    this.BIref = BI;
    //console.log(this.BIref);
    if (
      BI != 'BulkRevert' &&
      BI != 'MappedEditMapping' &&
      BI != 'unmappedMapAccount'
    ) {
      this.Ref2 = '';
      this.getAccounttypedetail('AC', '');
      this.bulkEditRecords = [];
      this.submitted = false;
      if (ref == 'E') {
        this.Bulk = true;
        this.ignorebtn = true;
      } else {
        if (multiorsingle == 'S') {
          //console.log(slrecord);

          this.bulkEditRecords.push(slrecord);
          //console.log(this.bulkEditRecords);
          if (this.bulkEditRecords.length > 0) {
            let bulkedits = this.bulkEditRecords.map(function (a) {
              return a.Account;
            });
            this.bulksave = bulkedits.toString();
            //console.log(this.bulksave);
            // this.Accounttype=[];
            this.accounttype = '0';
            this.department = '0';
            this.subtype = '0';
            this.stype = '0';
            this.financialsummary = '0';
            this.selectedaccounttypedetail = '0';
            this.accountfulldetail = '0';
            this.departmentbody = 'No';
            this.departmenttype = '0';
            this.subtypedetail = '0';
            this.Accounttypedetail = [];
            this.Accountfulldetail = [];
            this.Department = [];
            this.Departmenttype = [];
            this.Departmentbody = [];
            this.Subtype = [];
            this.SubtypeDetail = [];
            this.Financialsummary = [];
            this.Type = [];
            this.Dselectedaccounttypedetail = '';
            this.Daccountfulldetail = '';
            this.Ddepartment = '';
            this.Ddepartmenttype = '';
            this.Ddepartmentbody = '';
            this.Dstype = '';
            this.Dsubtype = '';
            this.Dsubtypedetail = '';
            this.Dfinancialsummary = '';
            this.Aselectedaccounttypedetail = false;
            this.Aaccountfulldetail = false;
            this.Adepartment = false;
            this.Adepartmenttype = false;
            // this.Adepartmentbody = false;
            this.Astype = false;
            this.Asubtype = false;
            this.Asubtypedetail = false;
            this.Afinancialsummary = false;
            //console.log(this.Accounttype);
            // this.ngbmodalActive = this.ngbmodal.open(template, {
            //   size: 'sm',
            //   backdrop: 'static',
            // });
          }
          // else{

          //     alert('Please select atleast one ')

          // }
        } else {
          this.Ref2 = '';
          this.bulkEditRecords = this.AccountingMapping.filter(
            (val) => val.state == true
          );
          if (this.bulkEditRecords.length > 0) {
            let bulkedits = this.bulkEditRecords.map(function (a) {
              return a.Account;
            });
            this.bulksave = bulkedits.toString();
            //console.log(this.bulksave);
            // this.Accounttype=[];
            this.accounttype = '0';
            this.department = '0';
            this.subtype = '0';
            this.stype = '0';
            this.financialsummary = '0';
            this.selectedaccounttypedetail = '0';
            this.accountfulldetail = '0';
            this.departmentbody = 'No';
            this.departmenttype = '0';
            this.subtypedetail = '0';
            this.Accounttypedetail = [];
            this.Accountfulldetail = [];
            this.Department = [];
            this.Departmenttype = [];
            this.Departmentbody = [];
            this.Subtype = [];
            this.SubtypeDetail = [];
            this.Financialsummary = [];
            this.Type = [];

            this.Dselectedaccounttypedetail = '';
            this.Daccountfulldetail = '';
            this.Ddepartment = '';
            this.Ddepartmenttype = '';
            this.Ddepartmentbody = '';
            this.Dstype = '';
            this.Dsubtype = '';
            this.Dsubtypedetail = '';
            this.Dfinancialsummary = '';
            this.Aselectedaccounttypedetail = false;
            this.Aaccountfulldetail = false;
            this.Adepartment = false;
            this.Adepartmenttype = false;
            // this.Adepartmentbody = false;
            this.Astype = false;
            this.Asubtype = false;
            this.Asubtypedetail = false;
            this.Afinancialsummary = false;
            //console.log(this.Accounttype);
            // this.ngbmodalActive = this.ngbmodal.open(template, {
            //   size: 'sm',
            //   backdrop: 'static',
            // });
          } else {
            alert('Please select atleast one ');
          }
        }

        // this.Bulk=false
        // //console.log(this.AccountingMapping.filter(val => val.state == true))
        // this.bulkEditRecords=this.AccountingMapping.filter(val => val.state == true)
      }
    }

    if (BI == 'BulkRevert') {
      this.Ref2 = '';
      this.bulkEditRecords = [];
      this.FinalArrayignored = [];
      this.submitted = false;
      if (ref == 'E') {
        this.Bulk = true;
        this.ignorebtn = true;
      } else {
        if (multiorsingle == 'S') {
          //console.log(slrecord);

          this.bulkEditRecords.push(slrecord);
          //console.log(this.bulkEditRecords);

          this.FinalArrayignored.push({
            Key: this.bulkEditRecords[0].Account,
            Cora_Acct_Code: this.bulkEditRecords[0].storecode,
            Account_Type: this.bulkEditRecords[0].Status,
          });
          //console.log('FinalArrayignored', this.FinalArrayignored);

          if (this.bulkEditRecords.length > 0) {
            let bulkedits = this.bulkEditRecords.map(function (a) {
              return a.Account;
            });
            this.bulksave = bulkedits.toString();
            //console.log(this.bulksave);
          }
        } else {
          this.Ref2 = '';
          this.bulkEditRecords = this.AccountingMapping.filter(
            (val) => val.state == true
          );
          if (this.bulkEditRecords.length > 0) {
            for (var i = 0; i < this.bulkEditRecords.length; i++) {
              this.FinalArrayignored.push({
                Key: this.bulkEditRecords[i].Account,
                Cora_Acct_Code: this.bulkEditRecords[i].storecode,
                Account_Type: this.bulkEditRecords[i].AccountType,
              });
            }

            //console.log('multiFinalArrayignored', this.FinalArrayignored);
            let bulkedits = this.bulkEditRecords.map(function (a) {
              return a.Account;
            });
            this.bulksave = bulkedits.toString();
            //console.log(this.bulksave);
          } else {
            alert('Please select atleast one ');
          }
        }
        // this.Bulk=false
        // //console.log(this.AccountingMapping.filter(val => val.state == true))
        // this.bulkEditRecords=this.AccountingMapping.filter(val => val.state == true)
      }
    }

    if (BI == 'MappedEditMapping') {
      this.Refchange = 'editmapping';
      this.Ref2 = '';

      this.bulkEditRecords = [];
      this.submitted = false;
      if (ref == 'E') {
        this.Bulk = true;
        this.ignorebtn = true;
      } else {
        if (multiorsingle == 'S') {
          //console.log(slrecord);

          this.bulkEditRecords.push(slrecord);
          //console.log(this.bulkEditRecords);
          this.OnChange('ATD', 'AC', '', '', '', '', '');
          this.actbal = this.bulkEditRecords[0].type;
          if (this.bulkEditRecords.length > 0) {
            let bulkedits = this.bulkEditRecords.map(function (a) {
              return a.Account;
            });
            this.bulksave = bulkedits.toString();
            //console.log(this.bulksave);

            this.accounttype = '0';
            this.departmenttype = '0';
            this.department = '0';
            this.subtype = '0';
            this.subtypedetail = '0';
            this.financialsummary = '0';

            this.Accounttypedetail = [];
            this.Accountfulldetail = [];
            this.Department = [];
            this.Departmenttype = [];
            this.Departmentbody = [];
            this.Subtype = [];
            this.SubtypeDetail = [];
            this.Financialsummary = [];
            this.Type = [];
            this.Dselectedaccounttypedetail = '';
            this.Daccountfulldetail = '';
            this.Ddepartment = '';
            this.Ddepartmenttype = '';
            this.Ddepartmentbody = '';
            this.Dstype = '';
            this.Dsubtype = '';
            this.Dsubtypedetail = '';
            this.Dfinancialsummary = '';
            this.Aselectedaccounttypedetail = false;
            this.Adepartment = false;
            this.Adepartmenttype = false;
            this.Asubtype = false;
            this.Asubtypedetail = false;
            this.Afinancialsummary = false;
          }
        }
      }
    }

    if (BI == 'unmappedMapAccount') {
      this.Ref2 = '';
      (this.Refchange = ''), this.OnChange('ATD', 'AC', '', '', '', '', '');
      this.selectedaccounttypedetail = '0';
      this.actbal = 'Activity';
      this.bulkEditRecords = [];
      this.submitted = false;
      if (ref == 'E') {
        this.Bulk = true;
        this.ignorebtn = true;
      } else {
        if (multiorsingle == 'S') {
          //console.log(slrecord);

          this.bulkEditRecords.push(slrecord);
          //console.log(this.bulkEditRecords);
          if (this.bulkEditRecords.length > 0) {
            let bulkedits = this.bulkEditRecords.map(function (a) {
              return a.Account;
            });
            this.bulksave = bulkedits.toString();
            //console.log(this.bulksave);
            // this.Accounttype=[];
            this.accounttype = '0';
            this.department = '0';
            this.subtype = '0';
            this.stype = '0';
            this.financialsummary = '0';

            this.selectedaccounttypedetail = '0';
            this.accountfulldetail = '0';
            this.departmentbody = 'No';
            this.departmenttype = '0';
            this.subtypedetail = '0';
            this.Accounttypedetail = [];
            this.Accountfulldetail = [];
            this.Department = [];
            this.Departmenttype = [];
            this.Departmentbody = [];
            this.Subtype = [];
            this.SubtypeDetail = [];
            this.Financialsummary = [];
            this.Type = [];
            this.Aselectedaccounttypedetail = false;
            this.Adepartment = false;
            this.Adepartmenttype = false;
            this.Asubtype = false;
            this.Asubtypedetail = false;
            this.Afinancialsummary = false;
          }
        } else {
          this.Ref2 = '';
          this.bulkEditRecords = this.AccountingMapping.filter(
            (val) => val.state == true
          );
          if (this.bulkEditRecords.length > 0) {
            let bulkedits = this.bulkEditRecords.map(function (a) {
              return a.Account;
            });
            this.bulksave = bulkedits.toString();
            //console.log(this.bulksave);
            // this.Accounttype=[];
            this.accounttype = '0';
            this.department = '0';
            this.subtype = '0';
            this.stype = '0';
            this.financialsummary = '0';
            this.selectedaccounttypedetail = '0';
            this.accountfulldetail = '0';
            this.departmentbody = 'No';
            this.departmenttype = '0';
            this.subtypedetail = '0';
            this.Accounttypedetail = [];
            this.Accountfulldetail = [];
            this.Department = [];
            this.Departmenttype = [];
            this.Departmentbody = [];
            this.Subtype = [];
            this.SubtypeDetail = [];
            this.Financialsummary = [];
            this.Type = [];

            this.Dselectedaccounttypedetail = '';
            this.Daccountfulldetail = '';
            this.Ddepartment = '';
            this.Ddepartmenttype = '';
            this.Ddepartmentbody = '';
            this.Dstype = '';
            this.Dsubtype = '';
            this.Dsubtypedetail = '';
            this.Dfinancialsummary = '';
            this.Aselectedaccounttypedetail = false;
            this.Adepartment = false;
            this.Adepartmenttype = false;
            this.Asubtype = false;
            this.Asubtypedetail = false;
            this.Afinancialsummary = false;
            // this.ngbmodalActive = this.ngbmodal.open(template, {
            //   size: 'sm',
            //   backdrop: 'static',
            // });
          } else {
            alert('Please select atleast one ');
          }
        }

        // this.Bulk=false
        // //console.log(this.AccountingMapping.filter(val => val.state == true))
        // this.bulkEditRecords=this.AccountingMapping.filter(val => val.state == true)
      }
    }
  }

  bulkIgnore(e, ref, template, multiorsingle, slrecord) {
    this.Ref2 = '';
    this.bulkEditRecords = [];
    this.FinalArray = [];
    this.FinalArrayunmapped = [];
    this.submitted = false;
    if (ref == 'E') {
      this.Bulk = true;
      this.ignorebtn = true;
    } else {
      if (multiorsingle == 'S') {
        //console.log(slrecord);
        this.bulkEditRecords.push(slrecord);
        //console.log(this.bulkEditRecords);
        if (this.statusFilter[0] == 'M') {
          // mapped single
          // this.FinalArray.push({
          //   store_code: this.bulkEditRecords[0].storecode,

          //   key: this.bulkEditRecords[0].Account,
          // });
          this.FinalArrayunmapped.push({
            //   store_code: this.bulkEditRecords[0].cora_acct_code,

            // key:this.bulkEditRecords[0].Account
            Key: this.bulkEditRecords[0].Account,
            Cora_Acct_Code: this.bulkEditRecords[0].storecode,
            Account_Number: this.bulkEditRecords[0].Acctnum,
            Account_Description: this.bulkEditRecords[0].AccountDescription,
            Account_Type: this.bulkEditRecords[0].Status,
            AUM_Status: 'D',
            AUM_Department: this.bulkEditRecords[0].Department,
            AUM_Subtype: this.bulkEditRecords[0].Subtype,
            AUM_Subtype_Detail: this.bulkEditRecords[0].SubtypeDetail,
          });
        } else {
          // unmapped single
          this.FinalArrayunmapped.push({
            //   store_code: this.bulkEditRecords[0].cora_acct_code,

            // key:this.bulkEditRecords[0].Account
            Key: this.bulkEditRecords[0].Account,
            Cora_Acct_Code: this.bulkEditRecords[0].cora_acct_code,
            Account_Number: this.bulkEditRecords[0].accountnumber,
            Account_Description: this.bulkEditRecords[0].AccountDescription,
            Account_Type: this.bulkEditRecords[0].AccountType,
            AUM_Status: 'D',
            AUM_Department: this.bulkEditRecords[0].Department,
            AUM_Subtype: this.bulkEditRecords[0].Subtype,
            AUM_Subtype_Detail: this.bulkEditRecords[0].SubtypeDetail,
          });
        }
      } else {
        this.bulkEditRecords = this.AccountingMapping.filter(
          (val) => val.state == true
        );
        //console.log(this.bulkEditRecords);
        // unmapped multi
        if (this.bulkEditRecords.length > 0) {
          if (this.statusFilter[0] == 'N') {
            for (var i = 0; i < this.bulkEditRecords.length; i++) {
              this.FinalArrayunmapped.push({
                Key: this.bulkEditRecords[i].Account,
                Cora_Acct_Code: this.bulkEditRecords[i].cora_acct_code,
                Account_Number: this.bulkEditRecords[i].accountnumber,
                Account_Description: this.bulkEditRecords[i].AccountDescription,
                Account_Type: this.bulkEditRecords[i].AccountType,
                AUM_Status: 'D',
                AUM_Department: this.bulkEditRecords[i].Department,
                AUM_Subtype: this.bulkEditRecords[i].Subtype,
                AUM_Subtype_Detail: this.bulkEditRecords[i].SubtypeDetail,
              });
            }
          }
          //console.log(this.FinalArray);
        } else {
          alert('Please select atleast one ');
        }
      }

      // this.Bulk=false
      // //console.log(this.AccountingMapping.filter(val => val.state == true))
      // this.bulkEditRecords=this.AccountingMapping.filter(val => val.state == true)
    }
    this.ngbmodalActive.close();
  }
  collectBulkEditvalues(e, val, Block) {
    // if(this.statusFilter== 'N'){
    this.bulkEditRecords = [];
    //console.log(e, val);
    if (Block == 'I') {
      if (e.target.checked) {
        val.state = true;
        this.Bulk = true;
        this.ignorebtn = true;
        //console.log(val);
      } else {
        val.state = false;
        this.bulkEditRecords = this.AccountingMapping.filter(
          (val) => val.state == true
        );

        if (this.bulkEditRecords.length == 0) {
          this.Bulk = false;
          this.ignorebtn = false;
        } else {
          this.Bulk = true;
          this.ignorebtn = true;
        }
        //console.log(val);
      }
    } else {
      if (e.target.checked) {
        this.Bulk = true;
        this.ignorebtn = true;
        this.AccountingMapping = this.AccountingMapping.map((v) => ({
          ...v,
          state: true,
        }));
        this.AccountingMappingData = this.AccountingMappingData.map((v) => ({
          ...v,
          state: true,
        }));
      } else {
        this.Bulk = false;
        this.ignorebtn = false;
        this.AccountingMapping = this.AccountingMapping.map((v) => ({
          ...v,
          state: false,
        }));
        this.AccountingMappingData = this.AccountingMappingData.map((v) => ({
          ...v,
          state: false,
        }));
      }
      // }
    }

    // if(this.statusFilter== 'D'){
    //   this.bulkEditRecords = [];
    //   //console.log(e, val);
    //   if (Block == 'I') {
    //     if (e.target.checked) {
    //       val.state = true;
    //       this.Bulk = true;
    //       this.ignorebtn = true;
    //       //console.log(val);
    //     } else {
    //       val.state = false;
    //       this.bulkEditRecords = this.AccountingMapping.filter(
    //         (val) => val.state == true
    //       );

    //       if (this.bulkEditRecords.length == 0) {
    //         this.Bulk = false;
    //         this.ignorebtn = false;
    //       } else {
    //         this.Bulk = true;
    //         this.ignorebtn = true;
    //       }
    //       //console.log(val);
    //     }
    //   } else {
    //     if (e.target.checked) {
    //       this.Bulk = true;
    //       this.ignorebtn = true;
    //       this.AccountingMapping = this.AccountingMapping.map((v) => ({
    //         ...v,
    //         state: true,
    //       }));
    //       this.AccountingMappingData = this.AccountingMappingData.map((v) => ({
    //         ...v,
    //         state: true,
    //       }));
    //     } else {
    //       this.Bulk = false;
    //       this.ignorebtn = false;
    //       this.AccountingMapping = this.AccountingMapping.map((v) => ({
    //         ...v,
    //         state: false,
    //       }));
    //       this.AccountingMappingData = this.AccountingMappingData.map((v) => ({
    //         ...v,
    //         state: false,
    //       }));
    //     }
    //   }

    // }
  }

  getAccounttypedetail(e, ref) {}
  OnChange(
    ref,
    typeref,
    acctyperef,
    accdetailref,
    departmentref,
    subtyperef,
    refchange?
  ) {
    if (refchange == 'AE') {
      this.Refchange = '';
    }
    const obj = {
      type: typeref,
      acc_type: acctyperef,
      acc_detail: accdetailref,

      department: departmentref,

      subtype: subtyperef,
    };
    this.apiSrvc
      .postmethod('xtract/GetAccountMappingFiltersNewV1', obj)
      .subscribe(
        (res) => {
          if (res.status == 200) {
            if (ref == 'ATD') {
              this.accounttype = '0';
              this.departmenttype = '0';
              this.department = '0';
              this.subtype = '0';
              this.subtypedetail = '0';
              this.financialsummary = '0';

              this.Aselectedaccounttypedetail = false;
              this.Adepartment = false;
              this.Adepartmenttype = false;
              this.Asubtype = false;
              this.Asubtypedetail = false;
              this.Afinancialsummary = false;

              this.Accounttypedetail = res.response.filter(
                (e) =>
                  e.Acc_Type_Detail != '' &&
                  e.Acc_Type_Detail != null &&
                  e.Acc_Type_Detail != 0
              );
              if (this.Refchange == 'editmapping') {
                this.selectedaccounttypedetail =
                  this.bulkEditRecords[0].accounttypedetail;
                this.OnChange(
                  'AT',
                  'A',
                  '',
                  this.selectedaccounttypedetail,
                  '',
                  '',
                  ''
                );
              } else {
                this.selectedaccounttypedetail = '0';
              }
            }

            if (ref == 'AT') {
              this.accounttype = '0';
              this.departmenttype = '0';
              this.department = '0';
              this.subtype = '0';
              this.subtypedetail = '0';
              this.financialsummary = '0';
              this.Accounttype = res.response.filter(
                (e) => e.Acc_Type != '' && e.Acc_Type != null && e.Acc_Type != 0
              );

              if (this.Accounttype.length == 1) {
                if (this.Refchange == 'editmapping') {
                  this.accounttype = this.bulkEditRecords[0].AccountType;
                  this.OnChange(
                    'OA',
                    'DC',
                    this.accounttype,
                    this.selectedaccounttypedetail,
                    '',
                    '',
                    ''
                  );
                } else {
                  this.accounttype = this.Accounttype[0].Acc_Type;
                  this.OnChange(
                    'OA',
                    'DC',
                    this.accounttype,
                    this.selectedaccounttypedetail,
                    '',
                    '',
                    ''
                  );
                }
              } else {
                if (this.Refchange == 'editmapping') {
                  this.accounttype = this.bulkEditRecords[0].AccountType;
                } else {
                  this.accounttype = '0';
                }
                this.OnChange(
                  'OA',
                  'DC',
                  this.accounttype,
                  this.selectedaccounttypedetail,
                  '',
                  '',
                  ''
                );
              }
            }

            if (ref == 'OA') {
              this.departmenttype = '0';
              this.OnChange(
                'D',
                'D',
                this.accounttype,
                this.selectedaccounttypedetail,
                '',
                '',
                ''
              );

              this.Departmenttype = res.response.filter(
                (e) =>
                  e.Dept_Type != '' && e.Dept_Type != null && e.Dept_Type != 0
              );
              // //console.log( this.Departmenttype.length,this.bulkEditRecords[0].DeptType,  this.departmenttype)
              if (this.Departmenttype.length == 1) {
                if (this.Refchange == 'editmapping') {
                  this.departmenttype = this.bulkEditRecords[0].DeptType;
                } else {
                  this.departmenttype = this.Departmenttype[0].Dept_Type;
                  //console.log( this.Departmenttype.length,this.Departmenttype[0].Dept_Type,  this.departmenttype,this.Refchange)
                }
              } else {
                if (this.Refchange == 'editmapping') {
                  this.departmenttype = this.bulkEditRecords[0].DeptType;
                } else {
                  this.departmenttype = '0';
                }
              }
            }

            if (ref == 'D') {
              this.subtype = '0';
              this.department = '0';
              this.Department = res.response.filter(
                (e) =>
                  e.Department != '' &&
                  e.Department != null &&
                  e.Department != 0
              );

              if (this.Department.length == 1) {
                if (this.Refchange == 'editmapping') {
                  this.department = this.bulkEditRecords[0].Department;
                } else {
                  this.department = this.Department[0].Department;
                }

                this.OnChange(
                  'ST',
                  'S',
                  this.accounttype,
                  this.selectedaccounttypedetail,
                  this.department,
                  '',
                  ''
                );
              } else {
                if (this.Refchange == 'editmapping') {
                  this.department = this.bulkEditRecords[0].Department;
                  this.OnChange(
                    'ST',
                    'S',
                    this.accounttype,
                    this.selectedaccounttypedetail,
                    this.department,
                    '',
                    ''
                  );
                } else {
                  this.department = '0';
                }
              }
            }

            if (ref == 'ST') {
              this.subtypedetail = '0';
              this.Subtype = res.response.filter(
                (e) => e.Subtype != '' && e.Subtype != null && e.Subtype != 0
              );

              if (this.Subtype.length == 1) {
                if (this.Refchange == 'editmapping') {
                  this.subtype = this.bulkEditRecords[0].Subtype;
                } else {
                  this.subtype = this.Subtype[0].Subtype;
                }

                this.OnChange(
                  'STD',
                  'SC',
                  this.accounttype,
                  this.selectedaccounttypedetail,
                  this.department,
                  this.subtype,
                  ''
                );
              } else {
                if (this.Refchange == 'editmapping') {
                  this.subtype = this.bulkEditRecords[0].Subtype;
                  this.OnChange(
                    'STD',
                    'SC',
                    this.accounttype,
                    this.selectedaccounttypedetail,
                    this.department,
                    this.subtype,
                    ''
                  );
                } else {
                  this.subtype = '0';
                }
              }
            }

            if (ref == 'STD') {
              this.OnChange(
                'FS',
                'F',
                this.accounttype,
                this.selectedaccounttypedetail,
                this.department,
                this.subtype,
                ''
              );

              this.SubtypeDetail = res.response.filter(
                (e) =>
                  e.Subtype_Detail != '' &&
                  e.Subtype_Detail != null &&
                  e.Subtype_Detail != 0
              );

              if (this.Subtype.length == 1) {
                if (this.Refchange == 'editmapping') {
                  this.subtypedetail = this.bulkEditRecords[0].SubtypeDetail;
                } else {
                  this.subtypedetail = this.SubtypeDetail[0].Subtype_Detail;
                }
              } else {
                if (this.Refchange == 'editmapping') {
                  this.subtypedetail = this.bulkEditRecords[0].SubtypeDetail;
                } else {
                  this.subtypedetail = '0';
                }
              }
            }

            if (ref == 'FS') {
              this.Financialsummary = res.response.filter(
                (e) =>
                  e.Fin_summary != '' &&
                  e.Fin_summary != null &&
                  e.Fin_summary != 0
              );

              if (this.Financialsummary.length == 1) {
                if (this.Refchange == 'editmapping') {
                  this.financialsummary = this.bulkEditRecords[0].Fin_Summary;
                } else {
                  this.financialsummary = this.Financialsummary[0].Fin_summary;
                }
              } else {
                if (this.Refchange == 'editmapping') {
                  this.financialsummary = this.bulkEditRecords[0].Fin_Summary;
                } else {
                  this.financialsummary = '0';
                }
              }
            }
          } else {
            alert('Invalid Details');
          }
        },
        (error) => {
          //console.log(error);
        }
      );
  }

  BulkMapAccountSave(template, confirmtemp, BulkRevertref?, BulkReverttemp?) {
    //console.log(BulkRevertref)
    if (this.Financialsummary.length > 0) {
      if (
        this.accounttype == '0' ||
        (this.selectedaccounttypedetail == '0' &&
          this.Aselectedaccounttypedetail == false) ||
        (this.department == '0' && this.Adepartment == false) ||
        (this.departmenttype == '0' && this.Adepartmenttype == false) ||
        // (this.departmentbody == '0' && this.Adepartmentbody == false) ||
        (this.subtype == '0' && this.Asubtype == false) ||
        (this.subtypedetail == '0' && this.Asubtypedetail == false) ||
        (this.financialsummary == '0' && this.Afinancialsummary == false) ||
        this.actbal == ''
      ) {
        if (BulkRevertref != 'BulkRevert') {
          this.ngbmodalActive = this.ngbmodal.open(template, {
            size: 'sm',
            backdrop: 'static',
          });
        }
        this.submitted = true;
      } else if (
        (this.Dselectedaccounttypedetail == '' &&
          this.Aselectedaccounttypedetail == true) ||
        (this.Ddepartment == '' && this.Adepartment == true) ||
        (this.Ddepartmenttype == '' && this.Adepartmenttype == true) ||
        (this.Dsubtype == '' && this.Asubtype == true) ||
        (this.Dsubtypedetail == '' && this.Asubtypedetail == true) ||
        (this.Dfinancialsummary == '' && this.Afinancialsummary == true)
      ) {
        if (BulkRevertref != 'BulkRevert') {
          this.ngbmodalActive = this.ngbmodal.open(template, {
            size: 'sm',
            backdrop: 'static',
          });
        }
        this.submitted = true;
      } else {
        if (BulkRevertref != 'BulkRevert') {
          this.ngbmodalActive = this.ngbmodal.open(confirmtemp, {
            size: 'sm',
            backdrop: 'static',
          });
        }
        // this.save();
      }
    }
    // document.getElementById("validation").click();&& this.Subtype.length > 0
    else {
      if (
        this.accounttype == '0' ||
        (this.selectedaccounttypedetail == '0' &&
          this.Aselectedaccounttypedetail == false) ||
        (this.department == '0' && this.Adepartment == false) ||
        (this.departmenttype == '0' && this.Adepartmenttype == false) ||
        // (this.departmentbody == '0' && this.Adepartmentbody == false) ||
        (this.subtype == '0' && this.Asubtype == false) ||
        (this.subtypedetail == '0' && this.Asubtypedetail == false) ||
        this.actbal == ''
      ) {
        if (BulkRevertref != 'BulkRevert') {
          this.ngbmodalActive = this.ngbmodal.open(template, {
            size: 'sm',
            backdrop: 'static',
          });
        }
        this.submitted = true;
      } else if (
        (this.Dselectedaccounttypedetail == '' &&
          this.Aselectedaccounttypedetail == true) ||
        (this.Ddepartment == '' && this.Adepartment == true) ||
        (this.Ddepartmenttype == '' && this.Adepartmenttype == true) ||
        (this.Dsubtype == '' && this.Asubtype == true) ||
        (this.Dsubtypedetail == '' && this.Asubtypedetail == true) ||
        (this.Dfinancialsummary == '' && this.Afinancialsummary == true)
      ) {
        if (BulkRevertref != 'BulkRevert') {
          this.ngbmodalActive = this.ngbmodal.open(template, {
            size: 'sm',
            backdrop: 'static',
          });
        }
        this.submitted = true;
      } else {
        if (BulkRevertref != 'BulkRevert') {
          this.ngbmodalActive = this.ngbmodal.open(confirmtemp, {
            size: 'sm',
            backdrop: 'static',
          });
          // this.save();
        }
      }
      // this.ngbmodalActive = this.ngbmodal.open(r, { size: 'sm', backdrop: 'static' });

      // if(this.accounttype!=0  ){
      // document.getElementById("confirm").click();
      // }
    }

    if (BulkRevertref == 'BulkRevert') {
      this.ngbmodalActive = this.ngbmodal.open(BulkReverttemp, {
        size: 'sm',
        backdrop: 'static',
      });
    }
  }

  save() {
    let bulkedits = this.bulkEditRecords.map(function (a) {
      return a.Account;
    });
    this.bulksave = bulkedits.toString();
    //console.log(this.bulksave);
    let finsum =
      this.Dfinancialsummary == ''
        ? this.financialsummary
        : this.Dfinancialsummary;
    if (
      this.Aselectedaccounttypedetail == true ||
      this.Aaccountfulldetail == true ||
      this.Adepartment == true ||
      this.Adepartmenttype == true ||
      // this.Adepartmentbody == true ||
      this.Asubtype == true ||
      this.Asubtypedetail == true ||
      this.Astype == true ||
      this.Afinancialsummary == true
    ) {
      const obj1 = {
        ACF_ACCOUNT_TYPE: this.accounttype,
        ACF_ACCOUNT_TYPE_DETAIL:
          this.Dselectedaccounttypedetail == ''
            ? this.selectedaccounttypedetail
            : this.Dselectedaccounttypedetail,
        ACF_ACCOUNT_FULL_DETAIL: '',
        ACF_DEPARTMENT:
          this.Ddepartment == '' ? this.department : this.Ddepartment,
        ACF_DEPARTMENT_TYPE:
          this.Ddepartmenttype == ''
            ? this.departmenttype
            : this.Ddepartmenttype,
        ACF_BUSINESS: '',
        // ACF_DEPARTMENT_BODY:
        //   this.Ddepartmentbody == ''
        //     ? this.departmentbody
        //     : this.Ddepartmentbody,
        ACF_SUBTYPE: this.Dsubtype == '' ? this.subtype : this.Dsubtype,
        ACF_SUBTYPE_DETAIL:
          this.Dsubtypedetail == '' ? this.subtypedetail : this.Dsubtypedetail,
        ACF_TYPE: '',
        ACF_FIN_SUMMARY: finsum == 0 ? '' : finsum,
        ACF_ACTIVE: 'Y',
      };
      //console.log(obj1);
      this.apiSrvc
        .postmethod('accountmapping/accountcoafilters', obj1)
        .subscribe(
          (res) => {
            if (res.status == 200) {
              //console.log(res);
            } else {
              // alert('Invalid Details');
            }
          },
          (error) => {
            //console.log(error);
          }
        );
    }

    const obj = {
      key: this.bulksave,
      AccountType: this.accounttype,
      AccountTypeDetail:
        this.selectedaccounttypedetail == ''
          ? this.Dselectedaccounttypedetail
          : this.selectedaccounttypedetail,
      AccountFullDetail: '',
      Department: this.department == 0 ? this.Ddepartment : this.department,
      DeptType:
        this.departmenttype == 0 ? this.Ddepartmenttype : this.departmenttype,
      Business: '',
      Subtype: this.subtype == 0 ? this.Dsubtype : this.subtype,
      SubtypeDetail:
        this.subtypedetail == 0 ? this.Dsubtypedetail : this.subtypedetail,
      Dept_Body: '',
      Fin_Summary:
        this.financialsummary == 0
          ? this.Dfinancialsummary
          : this.financialsummary,
      type: this.actbal == 0 ? this.Dactbal : this.actbal,
    };
    //console.log(obj);
    this.apiSrvc.postmethod('accountmapping', obj).subscribe(
      (res) => {
        if (res.status == 200) {
          //console.log(res);
          alert('Record Inserted Successfully');
          document.getElementById('close').click();
          this.oncloseMapAccount();
          this.ngbmodalActive.close();
          if (this.statusFilter[0] == 'N') {
            this.GetUnMapped();
          } else {
            this.getAccountingMappingTab(
              this.selectedheadertab[0],
              this.selectedStore
            );
          }
          this.Bulk = false;
          this.ignorebtn = false;
        } else {
          alert('Invalid Details');
        }
      },
      (error) => {
        //console.log(error);
      }
    );
  }

  AddTextBox(ref) {
    if (ref == 'ATD') {
      this.Dselectedaccounttypedetail = '';
      this.selectedaccounttypedetail = 0;
      this.accountfulldetail = 0;
      this.Aselectedaccounttypedetail = true;
    }
    if (ref == 'AFD') {
      this.Daccountfulldetail = '';
      this.accountfulldetail = 0;
      this.Aaccountfulldetail = true;
    }
    if (ref == 'D') {
      this.Ddepartment = '';
      this.department = 0;

      this.Adepartment = true;
    }
    if (ref == 'DC') {
      this.Ddepartmenttype = '';
      this.departmenttype = 0;
      this.departmentbody = 'No';
      this.Adepartmenttype = true;
    }
    if (ref == 'DB') {
      this.Ddepartmentbody = '';
      this.departmentbody = 'No';
      // this.Adepartmentbody = true;
    }
    if (ref == 'T') {
      this.Dstype = '';
      this.stype = 0;
      this.Astype = true;
    }
    if (ref == 'ST') {
      this.Dsubtype = '';
      this.subtype = 0;
      this.subtypedetail = 0;
      this.Asubtype = true;
    }
    if (ref == 'STD') {
      this.Dsubtypedetail = '';
      this.subtypedetail = 0;
      this.Asubtypedetail = true;
    }
    if (ref == 'F') {
      this.Dfinancialsummary = '';
      this.financialsummary = 0;
      this.Afinancialsummary = true;
    }
  }
  DelTextBox(ref) {
    if (ref == 'ATD') {
      this.Aselectedaccounttypedetail = false;
    }
    if (ref == 'AFD') {
      this.Aaccountfulldetail = false;
    }
    if (ref == 'D') {
      this.Adepartment = false;
    }
    if (ref == 'DC') {
      this.Adepartmenttype = false;
    }
    if (ref == 'DB') {
      // this.Adepartmentbody = false;
    }
    if (ref == 'T') {
      this.Astype = false;
    }
    if (ref == 'ST') {
      this.Asubtype = false;
    }
    if (ref == 'STD') {
      this.Asubtypedetail = false;
    }
    if (ref == 'F') {
      this.Afinancialsummary = false;
    }
  }
  // mapped ignore
  //   Ignore(data,ignoretemp){
  // this.ignoredata=data
  // //console.log(this.ignoredata)

  // this.ngbmodalActive = this.ngbmodal.open(ignoretemp, {
  //   size: 'sm',
  //   backdrop: 'static',
  // });
  //   }

  BulkIgnoreSave(igconfirmtemp) {
    this.ngbmodalActive = this.ngbmodal.open(igconfirmtemp, {
      size: 'sm',
      backdrop: 'static',
    });
  }

  Ignoresave() {
    //console.log(this.bulkEditRecords.length);

    if (this.bulkEditRecords.length > 1) {
      if (this.statusFilter[0] == 'N') {
        this.FinalArrayunmapped = [];
        for (var i = 0; i < this.bulkEditRecords.length; i++) {
          this.FinalArrayunmapped.push({
            Key: this.bulkEditRecords[i].Account,
            Cora_Acct_Code: this.bulkEditRecords[i].cora_acct_code,
            Account_Number: this.bulkEditRecords[i].accountnumber,
            Account_Description: this.bulkEditRecords[i].AccountDescription,
            Account_Type: this.bulkEditRecords[i].AccountType,
            AUM_Status: 'D',
            AUM_Department: this.bulkEditRecords[i].Department,
            AUM_Subtype: this.bulkEditRecords[i].Subtype,
            AUM_Subtype_Detail: this.bulkEditRecords[i].SubtypeDetail,
          });
        }
      }
      //console.log(this.FinalArray);
    }
    //console.log(this.FinalArrayunmapped);
    // if (this.statusFilter[0] == 'M') {
    //   //console.log(this.FinalArray);
    //   const obj = {
    //     DeleteAccountMapping: this.FinalArray,
    //   };
    //   //console.log(obj);
    //   this.apiSrvc.deletemethod('accountmapping', obj).subscribe(
    //     (res) => {
    //       if (res.status == 200) {
    //         //console.log(res);
    //         alert('Record Deleted Successfully');
    //         document.getElementById('closeone').click();
    //         this.oncloseMapAccount();
    //         this.ngbmodalActive.close();
    //         if (this.statusFilter[0] == 'N') {
    //           this.GetUnMapped();
    //         } else {
    //           this.getAccountingMappingTab(
    //             this.selectedheadertab[0],
    //             this.selectedStore
    //           );
    //         }
    //         this.Bulk = false;
    //         this.ignorebtn = false;
    //       } else {
    //         alert('Invalid Details');
    //       }
    //     },
    //     (error) => {
    //       //console.log(error);
    //     }
    //   );
    // } else {
    const obj = {
      UnMappedIgnoreRecords: this.FinalArrayunmapped,
    };
    //console.log(obj);
    this.apiSrvc
      .postmethod('accountmapping/unmappedignorerecords', obj)
      .subscribe(
        (res) => {
          if (res.status == 200) {
            //console.log(res);
            alert(res.response);

            document.getElementById('closeone').click();
            this.oncloseMapAccount();
            this.ngbmodalActive.close();
            if (this.statusFilter[0] == 'N') {
              this.GetUnMapped();
            } else {
              this.getAccountingMappingTab(
                this.selectedheadertab[0],
                this.selectedStore
              );
            }

            this.Bulk = false;
            this.ignorebtn = false;
          } else {
            alert('Invalid Details');
          }
        },
        (error) => {
          //console.log(error);
        }
      );
    // }
  }

  revertopen(reverttemp, data) {
    this.revertdata = data;
    //console.log(this.revertdata);
    this.ngbmodalActive = this.ngbmodal.open(reverttemp, {
      size: 'sm',
      backdrop: 'static',
    });
  }

  // revertsave() {
  //   if (this.revertdata.storecode != '') {
  //     const obj = {
  //       Cora_Acct_Code: this.revertdata.storecode,
  //       Account_Type: this.revertdata.AccountType,
  //       Key: this.revertdata.id,
  //     };

  //     // };
  //     // {
  //     //     UpdateAccountMapping: [
  //     //       {
  //     //         store_code: this.revertdata.storecode,
  //     //         key: this.revertdata.id,
  //     //       },
  //     //     ],
  //     this.apiSrvc
  //       .putmethod('accountmapping/unmappedstatuschange', obj)
  //       .subscribe(
  //         (res) => {
  //           if (res.status == 200) {
  //             //console.log(res);
  //             alert(res.response);
  //             this.oncloseMapAccount();
  //             this.ngbmodalActive.close();
  //             document.getElementById('close').click();
  //             this.getAccountingMappingTab(
  //               this.selectedheadertab[0],
  //               this.selectedStore
  //             );
  //             this.Bulk = false;
  //             this.ignorebtn = false;
  //           } else {
  //             alert('Invalid Details');
  //           }
  //         },
  //         (error) => {
  //           //console.log(error);
  //         }
  //       );
  //   } else {
  //     const obj1 = {
  //       Cora_Acct_Code: this.revertdata.cora_acct_code,
  //       Account_Type: 'M',
  //       Key: this.revertdata.Account,
  //     };
  //     this.apiSrvc
  //       .putmethod('accountmapping/unmappedstatuschange', obj1)
  //       .subscribe(
  //         (res) => {
  //           if (res.status == 200) {
  //             //console.log(res);
  //             alert(res.response);
  //             this.ngbmodalActive.close();
  //             document.getElementById('close').click();
  //             this.getAccountingMappingTab(
  //               this.selectedheadertab[0],
  //               this.selectedStore
  //             );
  //             this.Bulk = false;
  //             this.ignorebtn = false;
  //           } else {
  //             alert('Invalid Details');
  //           }
  //         },
  //         (error) => {
  //           //console.log(error);
  //         }
  //       );
  //   }
  // }

  bulkrevertsave() {
    //console.log(this.bulkEditRecords.length);
    if (this.bulkEditRecords.length > 1) {
      this.FinalArrayignored = [];
      for (var i = 0; i < this.bulkEditRecords.length; i++) {
        this.FinalArrayignored.push({
          Key: this.bulkEditRecords[i].Account,
          Cora_Acct_Code: this.bulkEditRecords[i].storecode,
          Account_Type: this.bulkEditRecords[i].AccountType,
        });
      }
    }
    //console.log('FinalArrayignored bulkrevertsave', this.FinalArrayignored);
    const obj = {
      UnMappedStatusChange: this.FinalArrayignored,
    };
    //console.log(obj);
    this.apiSrvc
      .putmethod('accountmapping/unmappedstatuschange', obj)
      .subscribe(
        (res) => {
          if (res.status == 200) {
            //console.log(res);
            alert(res.response);
            // jQuery("#bulkrevertconfirmtemp").modal("hide");
            document.getElementById('closethree').click();
            this.oncloseMapAccount();
            this.ngbmodalActive.close();
            if (this.statusFilter[0] == 'N') {
              this.GetUnMapped();
            } else {
              this.getAccountingMappingTab(
                this.selectedheadertab[0],
                this.selectedStore
              );
            }
            this.Bulk = false;

            this.ignorebtn = false;
          } else {
            alert('Invalid Details');
          }
        },
        (error) => {
          //console.log(error);
        }
      );
  }
  removeignore(x, ref) {
    //console.log(x);
    if (ref == 'ignore') {
      // var delBtn = confirm(" Do you want to delete ?");
      // if ( delBtn == true ) {
      this.bulkEditRecords[x].state = false;
      this.bulkEditRecords.splice(x, 1);
      //console.log(this.bulkEditRecords);
      // }
    } else {
      // var delBtn = confirm(" Do you want to delete ?");
      // if ( delBtn == true ) {
      this.bulkEditRecords[x].state = false;
      this.bulkEditRecords.splice(x, 1);
      //console.log(this.bulkEditRecords);
      // }
    }
  }

  ngAfterViewInit(): void {
    this.apiSrvc.GetReports().subscribe((data) => {
      //console.log(data)
      if (data.obj.Reference == 'AM') {
        this.Filter = data.obj.Filter;
        const headerdata = {
          title: 'Account Mapping',
          path1: '',
          path2: '',
          path3: '',
          filter: this.Filter,
        };

        this.apiSrvc.SetHeaderData({
          obj: headerdata,
        });
        if (this.Filter == 'Accounts') {
          this.headerselection('GP');
        } else if (this.Filter == 'FI') {
          this.headerselection('FIP');
        } else {
          this.headerselection('L');
        }
      }
    });

    this.apiSrvc.getaccountmappingstate().subscribe((res) => {
      //console.log(res)
      this.AccountmappingState = res.obj.state;

      if (res.obj.state == true) {
        this.exportAsXLSX_123();
        // document.getElementById('XLSX').click();
      }
    });
  }

  // excelcode

  MappedDataXLSX: any = [];
  UnMappedDataXLSX: any = [];
  getMappedXLSX(AccName, StrCode) {
    this.MappedDataXLSX = [];
    let status = this.statusFilter[0] == 'M' ? '0' : 'D';
    const obj = {
      store_code: StrCode,
      accountname: AccName,
      department: '0',
      Category: '0',
      status: status,
      PageNumber: this.PageCount,
      PageSize: '10000',
      SearchKey: this.searchText,
    };
    //console.log(obj);
    this.apiSrvc
      .postmethod('xtract/GetAccountMappingTab', obj)
      .subscribe((res) => {
        if (res.status == 200) {
          //console.log(res.response.length);
          this.MappedDataXLSX = res.response;
          // //console.log("MappedDataXLSX", this.MappedDataXLSX);
        }
      });
  }
  getUnMappedXLSX() {
    this.UnMappedDataXLSX = [];
    const obj = {
      store_code: this.selectedStore,
      PageNumber: this.PageCount,
      PageSize: '10000',
      SearchKey: this.searchText,
    };
    //console.log(obj);
    this.apiSrvc
      .postmethod('xtract/GetAccountMappingUnmapped', obj)
      .subscribe((res) => {
        if (res.status == 200) {
          //console.log(res.response.length);
          this.UnMappedDataXLSX = res.response;
          // //console.log("UnMappedDataXLSX", this.UnMappedDataXLSX);
        }
      });
  }

  getAccountingMappingTabALLXLSX() {
    let status = this.statusFilter[0] == 'M' ? '0' : 'D';
    this.allXLSX = [];
    this.NoData = false;
    this.spinner.show();
    const obj = {
      store_code: this.selectedStore,
      accountname: '',
      department: '0',
      Category: '0',
      status: status,
      PageNumber: this.PageCount,
      PageSize: '10000',
      SearchKey: this.searchText,
    };
    this.apiSrvc.postmethod('xtract/GetAccountMappingTabForAll', obj).subscribe(
      (res) => {
        if (res.status == 200) {
          //console.log(res.response.length);
          this.allXLSX = res.response;
          //console.log( this.allXLSX)
          //  this.AccountingMappingData = res.response;
        } else {
          alert('Invalid Details');
        }
      },
      (error) => {
        //console.log(error);
      }
    );
  }
  //     exportAsXLSX_123():void {

  //  if( this.selectedheadertab[0] =='ALL' && this.statusFilter == 'M' ||this.selectedheadertab[0] =='ALL' &&this.statusFilter =='N' ||this.selectedheadertab[0] =='ALL' &&this.statusFilter =='D'){
  //   var wscols = [{ wch: 30 }, { wch: 30 }, { wch: 30 },{ wch: 30 },{ wch: 30 },{ wch: 30 },{ wch: 30 }];
  //   var wsrows = [{ hpt: 30 },];
  //   this.excelService.exportAsExcelFile(this.allXLSX,'GetAccountMappingTabForAll',wscols,wsrows);
  // }
  //   else if(this.statusFilter == 'M'){
  //       var wscols = [{ wch: 20 }, { wch: 30 }, { wch: 20 },{ wch: 40 },{ wch: 20 },{ wch: 20 },{ wch: 20 },{ wch: 20 },{ wch: 20 },{ wch: 20 },
  //         { wch: 20 },{ wch: 20 },{ wch: 20 },{ wch: 20 },{ wch: 20 },{ wch: 20 },{ wch: 20 },{ wch: 20 },{ wch: 20 }];
  //       var wsrows = [{ hpt: 30 },];
  //       this.excelService.exportAsExcelFile(this.MappedDataXLSX,'Mapped Data',wscols,wsrows);
  //     }else if(this.statusFilter =='N'){
  //       var wscols = [{ wch: 30 }, { wch: 30 }, { wch: 30 },{ wch: 30 },{ wch: 30 },{ wch: 30 },{ wch: 30 }];
  //       var wsrows = [{ hpt: 30 },];
  //       this.excelService.exportAsExcelFile(this.UnMappedDataXLSX,'Unmapped Data',wscols,wsrows);
  //     }else if(this.statusFilter =='D'){
  //       var wscols = [{ wch: 30 }, { wch: 30 }, { wch: 30 },{ wch: 30 },{ wch: 30 },{ wch: 30 },{ wch: 30 }];
  //       var wsrows = [{ hpt: 30 },];
  //       this.excelService.exportAsExcelFile(this.MappedDataXLSX,'Ignore Data',wscols,wsrows);
  //     }

  //   }

  exportAsXLSX_123(): void {
    if (this.selectedStore == '0') {
      alert('please select any store');
    } else {
      // if( (this.selectedheadertab[0] =='ALL' && this.statusFilter == 'M')
      //  ||(this.selectedheadertab[0] =='ALL' &&this.statusFilter =='N' )||(this.selectedheadertab[0] =='ALL' &&this.statusFilter =='D'))
      this.spinner.show();
      if (this.selectedheadertab[0] == 'ALL') {
        if (this.statusFilter == 'M') {
          var wscols = [
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
          ];
          var wsrows = [{ hpt: 30 }];
          let Heading = [
            [
              'Id',
              'Store Name',
              'Store Code',
              'Account Description',
              'Account Type',
              'Account Full Details',
              'Operational Area',
              'Activity/Balance',
              'Financial Category',
              'Department Body',
              'Account',
              'Account Type',
              'Dept',
              'Sub Type',
              'Sub Type Details',
              'Stardard Mapping',
              'Status',
              'Ignore Status',
            ],
          ];
          // this.excelService.exportAsExcelFile(this.allXLSX,'GetAccountMappingTabForAll',wscols,wsrows);
          this.excelService.exportToExcel(
            this.allXLSX,
            Heading,
            'Mapped',
            wscols,
            wsrows,
            this.selectedheadertab[0],
            this.selectedStore
          );
        } else if (this.statusFilter == 'N') {
          var wscols = [
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
          ];
          var wsrows = [{ hpt: 30 }];
          let Heading = [
            [
              'Id',
              'Store Name',
              'Store Code',
              'Account Description',
              'Account Type',
              'Account Full Details',
              'Operational Area',
              'Activity/Balance',
              'Financial Category',
              'Department Body',
              'Account',
              'Account Type',
              'Dept',
              'Sub Type',
              'Sub Type Details',
              'Stardard Mapping',
              'Status',
              'Ignore Status',
            ],
          ];
          // this.excelService.exportAsExcelFile(this.allXLSX,'GetAccountMappingTabForAll',wscols,wsrows);
          this.excelService.exportToExcel(
            this.UnMappedDataXLSX,
            Heading,
            'Unmapped',
            wscols,
            wsrows,
            this.selectedheadertab[0],
            this.selectedStore
          );
        } else if (this.statusFilter == 'D') {
          var wscols = [
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
          ];
          var wsrows = [{ hpt: 30 }];
          let Heading = [
            [
              'Id',
              'Store Name',
              'Store Code',
              'Account Description',
              'Account Type',
              'Account Full Details',
              'Operational Area',
              'Activity/Balance',
              'Financial Category',
              'Department Body',
              'Account',
              'Account Type',
              'Dept',
              'Sub Type',
              'Sub Type Details',
              'Stardard Mapping',
              'Status',
              'Ignore Status',
            ],
          ];
          // this.excelService.exportAsExcelFile(this.allXLSX,'GetAccountMappingTabForAll',wscols,wsrows);
          this.excelService.exportToExcel(
            this.allXLSX,
            Heading,
            'Ignore',
            wscols,
            wsrows,
            this.selectedheadertab[0],
            this.selectedStore
          );
        }
      } else if (this.statusFilter == 'M') {
        var wscols = [
          { wch: 20 },
          { wch: 30 },
          { wch: 20 },
          { wch: 40 },
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
        var wsrows = [{ hpt: 30 }];
        // this.excelService.exportAsExcelFile(this.MappedDataXLSX,'Mapped Data',wscols,wsrows);
        let Heading = [
          [
            'Id',
            'Store Name',
            'Store Code',
            'Account Description',
            'Account Type',
            'Account Full Details',
            'Operational Area',
            'Activity/Balance',
            'Financial Category',
            'Department Body',
            'Account',
            'Account Type',
            'Dept',
            'Sub Type',
            'Sub Type Details',
            'Stardard Mapping',
            'Status',
            'Ignore Status',
          ],
        ];
        this.excelService.exportToExcel(
          this.MappedDataXLSX,
          Heading,
          'Mapped ',
          wscols,
          wsrows,
          this.selectedheadertab[0],
          this.selectedStore
        );
      } else if (this.statusFilter == 'N') {
        var wscols = [
          { wch: 30 },
          { wch: 30 },
          { wch: 30 },
          { wch: 30 },
          { wch: 30 },
          { wch: 30 },
          { wch: 30 },
        ];
        var wsrows = [{ hpt: 30 }];
        let Heading = [
          [
            'Account',
            'Store Name',
            'Account Type',
            'Account Description',
            'Account Number',
            'Cora Account Code',
          ],
        ];
        // this.excelService.exportAsExcelFile(this.UnMappedDataXLSX,'Unmapped Data',wscols,wsrows);
        this.excelService.exportToExcel(
          this.UnMappedDataXLSX,
          Heading,
          'Unmapped ',
          wscols,
          wsrows,
          this.selectedheadertab[0],
          this.selectedStore
        );
      } else if (this.statusFilter == 'D') {
        var wscols = [
          { wch: 30 },
          { wch: 30 },
          { wch: 30 },
          { wch: 30 },
          { wch: 30 },
          { wch: 30 },
          { wch: 30 },
        ];
        var wsrows = [{ hpt: 30 }];
        let Heading = [
          [
            'Id',
            'Store  Name',
            'Store  Code',
            'Account  Number',
            'Account  Description',
            'Account',
            'Account  Type',
            'Status',
          ],
        ];
        //  this.excelService.exportAsExcelFile(this.MappedDataXLSX,'Ignore  Data',wscols,wsrows);
        this.excelService.exportToExcel(
          this.MappedDataXLSX,
          Heading,
          'Ignore ',
          wscols,
          wsrows,
          this.selectedheadertab[0],
          this.selectedStore
        );
      }

      this.spinner.hide();
    }
  }
}
