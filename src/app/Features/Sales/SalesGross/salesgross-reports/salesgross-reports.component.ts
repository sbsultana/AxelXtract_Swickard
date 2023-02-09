import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  NgbActiveModal,
  NgbModal,
  NgbCalendar,
  NgbDateParserFormatter,
  NgbDate,
  NgbDateStruct,
  NgbDatepickerConfig,
} from '@ng-bootstrap/ng-bootstrap';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormArray,
  FormGroup,
} from '@angular/forms';
import { ApiService } from '../../../../Core/Providers/ApiService/api.service';
import { CalendarCellViewModel } from 'ngx-bootstrap/datepicker/models';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-salesgross-reports',
  templateUrl: './salesgross-reports.component.html',
  styleUrls: ['./salesgross-reports.component.scss'],
})
export class SalesgrossReportsComponent implements OnInit {
  stores: any = [];
  RegionBasedStores: any = [];
  tab = 'G';
  DateType = 'MTD';
  Performance: any = 'Load';

  selectedDataGrouping: any = [];
  GroupingDetails: any = [];
  dataGrouping: any = [];
  datagrp: any = [];

  FromDate: any;
  ToDate: any;

  AllStores: boolean = true;
  salesPersons: any = [];
  salesManagers: any = [];
  financeManager: any = [];

  selectedSalespersonvalues: any = [];
  selectedSalesManagersvalues: any = [];
  selectedFiManagersvalues: any = [];

  Teams = 'SP';
  custom: boolean = false;

  Groupingcols = [
    { id: 1, columnname: 'store' },
    { id: 2, columnname: 'ad_dealtype' },
    { id: 3, columnname: 'ad_dealtype2' },
    { id: 4, columnname: 'salesperson' },
    { id: 5, columnname: 'fimanager' },
    { id: 6, columnname: 'salesmanager' },
    { id: 16, columnname: 'ad_Lender' },
    { id: 17, columnname: 'ad_dealstatus' },
    { id: 19, columnname: 'ad_Year' },
    { id: 24, columnname: 'ad_styleid' },
    { id: 25, columnname: 'ad_Month' },

    { id: 7, columnname: '' },
    { id: 8, columnname: '' },
    { id: 9, columnname: '' },
    { id: 10, columnname: 'ad_custzip' },
    { id: 11, columnname: 'ad_custstate' },
    { id: 12, columnname: 'ad_custAge' },
    { id: 13, columnname: '' },
    { id: 14, columnname: '' },
    { id: 15, columnname: '' },
    { id: 18, columnname: '' },
    { id: 20, columnname: 'ad_make' },
    { id: 21, columnname: 'ad_model' },
    { id: 22, columnname: '' },
    { id: 23, columnname: 'ad_trim' },
  ];
  constructor(
    private ngbmodel: NgbModal,
    private renderer: Renderer2,
    private service: ApiService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private formBuilder: FormBuilder,
    private config: NgbDatepickerConfig,
    private pipe: DatePipe
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      const TagName = e.target as HTMLButtonElement;
      if (
        TagName.className === 'd-block modal fade show modal-static' ||
        TagName.className === 'row'
      ) {
        this.close();
      }
      // if (TagName.className === 'row') {
      //   this.close();
      // }
      console.log(TagName.className);
      // if (TagName.className === 'modal fade bd-example-modal-lg') {
      //   this.componentState = false;
      // }
    });
  }
  bsValue = new Date();
  bsRangeValue: Date[];
  minDate: Date;
  maxDate: Date;

  // Date = '11-14-2022';
  ngOnInit() {
    this.DateType = localStorage.getItem('time');
    this.service.GetHeaderData().subscribe((res) => {
      if (this.Performance == 'Load') {
        this.FromDate = res.obj.fromdate.replace(/-/g, '/');
        this.ToDate = res.obj.todate.replace(/-/g, '/');
        // let start = new Date('11/12/2022');
        // let end = new Date('11/15/2022');
        this.bsRangeValue = [this.FromDate, this.ToDate];
        console.log(this.FromDate, this.ToDate);
        if (this.DateType == 'C') {
          this.bsRangeValue = [this.FromDate, this.ToDate];
        }
        if (res.obj.title == 'Sales Gross') {
          if (res.obj.dealType != '') {
            this.neworused = res.obj.dealType.split(',');
          }
          if (res.obj.saleType != '') {
            this.retailorlease = res.obj.saleType.split(',');
          }
          if (res.obj.dealStatus) {
            this.dealstatus = res.obj.dealStatus.split(',');
          }
          if (res.obj.toporbottom != '') {
            this.toporbottom = res.obj.toporbottom;
          }
        }
      }
    });

    this.maxDate = new Date();
    // this.minDate.setDate(this.minDate.getDate() + 10);
    this.maxDate.setDate(this.maxDate.getDate());
    this.getStores();
    this.getDataGroupings();
    // this.allstores();
  }
  Tabs(e) {
    this.tab = e;
  }

  opencalender() {
    this.custom = true;
    this.DateType = 'C';
    document.getElementById('DateOfBirth').click();
  }
  getDataGroupings() {
    this.selectedDataGrouping = [];
    this.GroupingDetails = [];
    const obj = {
      pageid: 1,
    };

    this.service.postmethod('xtract/GetDataGroupingsbyPage', obj).subscribe(
      (res) => {
        if (res.status == 200) {
          this.dataGrouping = res.response;
          this.dataGrouping.forEach((ele) => {
            ele.state = false;
            this.Groupingcols.forEach((val) => {
              if (ele.ARG_ID == val.id) {
                ele.columnName = val.columnname;
              }
              if (
                ele.ARG_ID != '1' &&
                ele.ARG_ID != '2' &&
                ele.ARG_ID != '10' &&
                ele.ARG_ID != '11' &&
                ele.ARG_ID != '12' &&
                ele.ARG_ID != '20' &&
                ele.ARG_ID != '21' &&
                ele.ARG_ID != '23' &&
                ele.ARG_ID != '3' &&
                ele.ARG_ID != '4' &&
                ele.ARG_ID != '5' &&
                ele.ARG_ID != '6' &&
                ele.ARG_ID != '16' &&
                ele.ARG_ID != '17' &&
                ele.ARG_ID != '24' &&
                ele.ARG_ID != '19' &&
                ele.ARG_ID != '25'
              ) {
                ele.Active = 'N';
              } else {
                ele.Active = 'Y';
              }
            });
            this.service.GetHeaderData().subscribe((res) => {
              if (
                res.obj.title == 'Sales Gross' &&
                this.Performance == 'Load'
              ) {
                console.log(res.obj);

                this.GroupingDetails = [];
                this.GroupingDetails = res.obj;

                this.selectedDataGrouping = [];

                if (this.GroupingDetails.path1id != '') {
                  if (ele.ARG_ID == this.GroupingDetails.path1id) {
                    this.datagrp[0] = ele;

                    ele.state = true;
                  }
                }
                if (this.GroupingDetails.path12d != '') {
                  if (ele.ARG_ID == this.GroupingDetails.path2id) {
                    this.datagrp[1] = ele;
                    ele.state = true;
                  }
                }
                if (this.GroupingDetails.path3id != '') {
                  if (ele.ARG_ID == this.GroupingDetails.path3id) {
                    this.datagrp[2] = ele;
                    ele.state = true;
                  }
                }
              }
            });
          });
          this.selectedDataGrouping = this.datagrp;
          console.log(this.selectedDataGrouping);
        } else {
          alert('Invalid Details');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  SelectedData(val) {
    if (val.state == false) {
      if (this.selectedDataGrouping.length >= 3) {
        alert('Select up to 3 Filters only To Group Your Data');
      } else {
        val.state = true;
        this.selectedDataGrouping.push(val);
      }
    } else {
      val.state = false;
      this.selectedDataGrouping.splice(
        this.selectedDataGrouping.indexOf(val),
        1
      );
    }

    // if (this.selectedDataGrouping.length >= 3) {
    //   alert('Select up to 3 Filters only To Group Your Data');
    // } else {
    //   const index = this.selectedDataGrouping.findIndex((i) => i == e);
    //   if (index >= 0) {
    //     this.selectedDataGrouping.splice(index, 1);
    //   } else {
    //     this.selectedDataGrouping.push(e);
    //   }
    //   console.log(this.selectedDataGrouping);
    // }
  }
  Reset() {
    this.dataGrouping = this.dataGrouping.map((obj, i) => ({
      ...obj,
      state: false,
    }));
    this.selectedDataGrouping = [];
    console.log(this.selectedstorevalues, this.selectedDataGrouping);
  }
  SetDates(type) {
    this.DateType = type;
    localStorage.setItem('time', this.DateType);
    let today = new Date();
    // alert('hi');
    let enddate = new Date(today.setDate(today.getDate() - 1));
    console.log(enddate);

    if (type == 'MTD') {
      this.custom = false;

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
      this.bsRangeValue = [this.FromDate, this.ToDate];
    }
    if (type == 'QTD') {
      this.custom = false;
      if (enddate.getMonth() == 0) {
        this.FromDate = '10-01-' + (enddate.getFullYear() - 1);
        this.ToDate = '12-31-' + (enddate.getFullYear() - 1);
        this.bsRangeValue = [this.FromDate, this.ToDate];
      } else {
        this.FromDate =
          ('0' + (enddate.getMonth() - 2)).slice(-2) +
          '-01' +
          '-' +
          enddate.getFullYear();
        this.ToDate =
          ('0' + (enddate.getMonth() + 1)).slice(-2) +
          '-' +
          ('0' + enddate.getDate()).slice(-2) +
          '-' +
          enddate.getFullYear();
        this.bsRangeValue = [this.FromDate, this.ToDate];
      }
    }
    if (type == 'YTD') {
      this.custom = false;

      this.FromDate = ('0' + 1).slice(-2) + '-01' + '-' + enddate.getFullYear();
      this.ToDate =
        ('0' + (enddate.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + enddate.getDate()).slice(-2) +
        '-' +
        enddate.getFullYear();
      this.bsRangeValue = [this.FromDate, this.ToDate];
    }
    if (type == 'LM') {
      this.custom = false;
      if (enddate.getMonth() == 0) {
        this.FromDate = '12-01-' + (enddate.getFullYear() - 1);
        this.ToDate = '12-31-' + (enddate.getFullYear() - 1);
        this.bsRangeValue = [this.FromDate, this.ToDate];
      } else {
        this.FromDate =
          ('0' + enddate.getMonth()).slice(-2) +
          '-01' +
          '-' +
          enddate.getFullYear();
        var lastDayOfMonth = new Date(
          enddate.getFullYear(),
          enddate.getMonth(),
          0
        );
        this.ToDate =
          ('0' + enddate.getMonth()).slice(-2) +
          '-' +
          ('0' + lastDayOfMonth.getDate()).slice(-2) +
          '-' +
          enddate.getFullYear();
        this.bsRangeValue = [this.FromDate, this.ToDate];
      }
      console.log(this.FromDate, this.ToDate);
    }
    if (type == 'LY') {
      this.custom = false;

      this.FromDate = '01-01-' + (enddate.getFullYear() - 1);
      this.ToDate = '12-31-' + (enddate.getFullYear() - 1);
      this.bsRangeValue = [this.FromDate, this.ToDate];
    }
    // console.log(this.FromDate);
    // console.log(this.ToDate);
  }

  dateRangeCreated($event) {
    console.log($event);
    if ($event !== null) {
      let startDate = $event[0].toJSON();
      let endDate = $event[1].toJSON();
      console.log(startDate, endDate);

      this.FromDate = this.pipe.transform(startDate, 'MM-dd-yyyy');
      this.ToDate = this.pipe.transform(endDate, 'MM-dd-yyyy');
      if (this.DateType == 'C') {
        this.custom = true;
      }
      console.log(this.FromDate);
      console.log(this.ToDate);
    }
  }
  count = 0;
  getStores() {
    const obj = {
      AU_ID: 1,
    };
    this.service.postmethod('xtract/GetStores', obj).subscribe(
      (res) => {
        if (res.status == 200) {
          this.stores = res.response;
          // this.stores.some(function (x: any, i) {
          //   let count = 0;

          //   x.Stores = JSON.parse(x.Stores);
          //   // x.id.push(x.Stores.AS_ID);
          //   x.Stores.some(function (y: any) {
          //     // x.id = y.AS_ID;
          //     // console.log(y);
          //     y.status = true;
          //     y.regionName = x.Region;
          //     y.mainid = i;
          //   });

          //   return false;
          // });
          console.log(this.stores);

          this.service.GetHeaderData().subscribe((res) => {
            console.log(res);

            if (res.obj.title == 'Sales Gross' && this.Performance == 'Load') {
              if (res.obj.stores != '' && res.obj.stores != '0') {
                this.selectedstorevalues = [];
                var result = res.obj.stores.split(',');
                this.selectedstorevalues = result.map(function (x) {
                  return parseInt(x, 10);
                });
                // this.Categories[1].Cat_length=this.selectedstorevalues.length
                console.log(this.selectedstorevalues);

                this.getEmployees('SP', this.selectedstorevalues.toString());
                this.getEmployees('F', this.selectedstorevalues.toString());
                this.getEmployees('M', this.selectedstorevalues.toString());
              }
              if (res.obj.stores == '' || res.obj.stores == '0') {
                this.selectedstorevalues = this.stores.map(function (a) {
                  return a.AS_ID;
                });
                console.log(this.selectedstorevalues);
                this.getEmployees('SP', this.selectedstorevalues.toString());
                this.getEmployees('F', this.selectedstorevalues.toString());
                this.getEmployees('M', this.selectedstorevalues.toString());
              }
            }
          });
        } else {
          alert('Invalid Details');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  teamsselection(e) {
    this.Teams = e;
  }

  employees(block, e) {
    if (block == 'SP') {
      const index = this.selectedSalespersonvalues.findIndex((i) => i == e);
      if (index >= 0) {
        this.selectedSalespersonvalues.splice(index, 1);
      } else {
        this.selectedSalespersonvalues.push(e);
      }
    }
    if (block == 'SM') {
      const index = this.selectedSalesManagersvalues.findIndex((i) => i == e);
      if (index >= 0) {
        this.selectedSalesManagersvalues.splice(index, 1);
      } else {
        this.selectedSalesManagersvalues.push(e);
      }
    }
    if (block == 'FM') {
      const index = this.selectedFiManagersvalues.findIndex((i) => i == e);
      if (index >= 0) {
        this.selectedFiManagersvalues.splice(index, 1);
      } else {
        this.selectedFiManagersvalues.push(e);
      }
    }
    if (block == 'AllSP') {
      if (this.selectedSalespersonvalues.length == this.salesPersons.length) {
        this.selectedSalespersonvalues = [];
      } else {
        this.selectedSalespersonvalues = this.salesPersons.map(function (a) {
          return a.SPID;
        });
      }
      console.log(this.selectedSalespersonvalues);
    }
    if (block == 'AllSM') {
      if (
        this.selectedSalesManagersvalues.length == this.salesManagers.length
      ) {
        this.selectedSalesManagersvalues = [];
      } else {
        this.selectedSalesManagersvalues = this.salesManagers.map(function (a) {
          return a.SmId;
        });
      }
      console.log(this.selectedSalesManagersvalues);
    }
    if (block == 'AllFM') {
      if (this.selectedFiManagersvalues.length == this.financeManager.length) {
        this.selectedFiManagersvalues = [];
      } else {
        this.selectedFiManagersvalues = this.financeManager.map(function (a) {
          return a.FiId;
        });
      }
      console.log(this.selectedFiManagersvalues);
    }
  }

  getEmployees(val, ids) {
    const obj = {
      AS_ID: ids,
      type: val,
    };
    this.service.postmethod('xtract/GetEmployeesDev', obj).subscribe(
      (res) => {
        if (res.status == 200) {
          // //console.log('fjdgdgdfgdfhkl');

          if (val == 'SP') {
            this.salesPersons = res.response.filter(
              (e) => e.SPName != 'Unknown'
            );

            this.service.GetHeaderData().subscribe((data) => {
              //console.log('data', data, this.Performance);

              if (
                data.obj.title == 'Sales Gross' &&
                this.Performance == 'Load'
              ) {
                if (data.obj.salespresons != '') {
                  let spids = data.obj.salespresons.split(',');
                  this.selectedSalespersonvalues = spids;
                }
              }
            });
          }
          if (val == 'F') {
            this.financeManager = res.response.filter(
              (e) => e.FiName != 'Unknown'
            );
            this.service.GetHeaderData().subscribe((data) => {
              if (
                data.obj.title == 'Sales Gross' &&
                this.Performance == 'Load'
              ) {
                if (data.obj.financemanagers != '') {
                  let fiids = data.obj.financemanagers.split(',');
                  this.selectedFiManagersvalues = fiids;
                }
              }
            });
          }
          if (val == 'M') {
            this.salesManagers = res.response.filter(
              (e) => e.SmName != 'Unknown'
            );
            this.service.GetHeaderData().subscribe((data) => {
              if (
                data.obj.title == 'Sales Gross' &&
                this.Performance == 'Load'
              ) {
                if (data.obj.salesmanagers != '') {
                  let smids = data.obj.salesmanagers.split(',');
                  this.selectedSalesManagersvalues = smids;
                }
              }
            });
          }
        } else {
          alert('Invalid Details');
        }
      },
      (error) => {
        // //console.log(error);
      }
    );
  }
  individualStores(e) {
    const index = this.selectedstorevalues.findIndex((i) => i == e.AS_ID);
    if (index >= 0) {
      this.selectedstorevalues.splice(index, 1);
      this.AllStores = false;
    } else {
      this.selectedstorevalues.push(e.AS_ID);
      if (this.selectedstorevalues.length == this.stores.length) {
        this.AllStores = true;
      } else {
        this.AllStores = false;
      }
    }
    this.getEmployees('SP', this.selectedstorevalues.toString());
    this.getEmployees('F', this.selectedstorevalues.toString());
    this.getEmployees('M', this.selectedstorevalues.toString());
    this.selectedSalesManagersvalues = [];
    this.selectedSalespersonvalues = [];
    this.selectedFiManagersvalues = [];
  }
  selectedStoresRegions: any = [];
  // storesSelection(e) {
  //   console.log(e);
  //   const index = this.selectedStoresRegions.findIndex((i) => i == e);
  //   if (index >= 0) {
  //     this.selectedStoresRegions.splice(index, 1);
  //     let result = this.stores.findIndex((val) => val.Region == e);
  //     let ids = this.stores[result].Stores.map(function (a) {
  //       return a.AS_ID;
  //     });
  //     ids.forEach((val) => {
  //       this.selectedstorevalues = this.selectedstorevalues.filter(
  //         (e) => e != val
  //       );
  //     });
  //     console.log(ids, this.selectedstorevalues);
  //   } else {
  //     this.selectedStoresRegions.push(e);
  //     let result = this.stores.findIndex((val) => val.Region == e);
  //     console.log(this.stores);
  //     let ids = this.stores[result].Stores.map(function (a) {
  //       return a.AS_ID;
  //     });
  //     this.selectedstorevalues = [...this.selectedstorevalues, ...ids];
  //     console.log(this.selectedstorevalues);
  //   }
  //   console.log(this.selectedStoresRegions, this.selectedstorevalues);
  // }
  selectedstorevalues: any = [];
  indexstores: any = [];
  // individualStores(e, idx, prnt) {
  //   console.log(prnt, this.selectedstorevalues);
  //   const index = this.selectedstorevalues.findIndex((i) => i == e.AS_ID);
  //   if (index >= 0) {
  //     this.selectedstorevalues.splice(index, 1);

  //     let ids = this.stores[idx].Stores.map(function (a) {
  //       return a.AS_ID;
  //     });
  //     let result = this.selectedstorevalues.filter((val) => ids.includes(val));
  //     console.log(result, ids, this.selectedstorevalues);
  //     if (result.length == 0) {
  //       const indexed = this.selectedStoresRegions.findIndex((i) => i == prnt);
  //       console.log(indexed, this.selectedStoresRegions);
  //       if (indexed >= 0) {
  //         this.selectedStoresRegions.splice(indexed, 1);
  //       }
  //     }
  //   } else {
  //     this.selectedstorevalues.push(e.AS_ID.toString());

  //     const index = this.selectedStoresRegions.findIndex((i) => i == prnt);
  //     if (index < 0) {
  //       this.selectedStoresRegions.push(prnt);
  //     }
  //   }
  // }

  allstores() {
    this.AllStores = !this.AllStores;
    if (this.AllStores == true) {
      // let tempstrs: any = [];
      // this.stores.forEach((val) => {
      //   tempstrs.push(
      //     val.Stores.map(function (a) {
      //       return a.AS_ID;
      //     })
      //   );
      // });
      // this.selectedStoresRegions = this.stores.map(function (a) {
      //   return a.Region;
      // });
      // this.selectedstorevalues = tempstrs.toString().split(',');
      // console.log(this.selectedstorevalues, this.selectedStoresRegions);
      this.selectedstorevalues = this.stores.map(function (a) {
        return a.AS_ID;
      });
      console.log(this.selectedstorevalues);
    } else {
      this.selectedstorevalues = [];
      // this.selectedStoresRegions = [];
    }
    this.getEmployees('SP', this.selectedstorevalues.toString());
    this.getEmployees('F', this.selectedstorevalues.toString());
    this.getEmployees('M', this.selectedstorevalues.toString());
    this.selectedSalesManagersvalues = [];
    this.selectedSalespersonvalues = [];
    this.selectedFiManagersvalues = [];
  }
  // selectedStores: any = [];
  // store(e) {
  //   if (e != 'Store') {
  //     const index = this.selectedStores.findIndex((i) => i == e);
  //     if (index >= 0) {
  //       this.selectedStores.splice(index, 1);
  //     } else {
  //       this.selectedStores.push(e.toString());
  //     }
  //     console.log(this.selectedStores);
  //   } else {
  //     const index = this.RegionBasedStores.findIndex((i) => i == e);
  //     if (index >= 0) {
  //       this.RegionBasedStores.splice(index, 1);
  //       this.selectedStores = [];
  //       this.selectedRegion = [];
  //     } else {
  //       this.selectedStores = [];
  //       this.RegionBasedStores.push(e);
  //       let tempstrs: any = [];
  //       this.stores.forEach((val) => {
  //         tempstrs.push(
  //           val.Stores.map(function (a) {
  //             return a.AS_ID;
  //           })
  //         );
  //       });
  //       this.selectedStores = tempstrs.toString().split(',');
  //       this.selectedRegion = this.stores.map(function (a) {
  //         return a.Region;
  //       });
  //       console.log(this.selectedStores);
  //     }
  //   }
  // }

  // selectedRegion: any = [];
  // region(e, list) {
  //   if (e != 'Region') {
  //     const index = this.selectedRegion.findIndex((i) => i == e);
  //     if (index >= 0) {
  //       this.selectedRegion.splice(index, 1);
  //     } else {
  //       this.selectedRegion.push(e);
  //       this.selectedStores.push(
  //         list.Stores.map(function (a) {
  //           return a.AS_ID;
  //         })
  //       );
  //       console.log(this.selectedStores);
  //     }
  //     console.log(this.selectedRegion);
  //   } else {
  //     const index = this.RegionBasedStores.findIndex((i) => i == e);
  //     if (index >= 0) {
  //       this.RegionBasedStores.splice(index, 1);
  //       this.selectedRegion = [];
  //       this.selectedStores = [];
  //     } else {
  //       this.selectedRegion = [];
  //       this.RegionBasedStores.push(e);
  //       this.selectedRegion = this.stores.map(function (a) {
  //         return a.Region;
  //       });
  //       let tempstrs: any = [];
  //       this.stores.forEach((val) => {
  //         tempstrs.push(
  //           val.Stores.map(function (a) {
  //             return a.AS_ID;
  //           })
  //         );
  //       });
  //       this.selectedStores = tempstrs.toString().split(',');
  //       console.log(this.selectedRegion);
  //     }
  //   }
  // }

  neworused: any = ['New', 'Used'];
  retailorlease: any = ['Retail', 'Lease', 'Misc'];
  includeorexclude: any = [''];
  dealstatus: any = ['Delivered', 'Capped', 'Finalized'];
  selecttarget: any = ['F'];
  toporbottom: any = ['T'];
  includecharges: any = [''];
  Transactorgl: any = ['T'];
  multipleorsingle(block, e) {
    if (block == 'NU') {
      const index = this.neworused.findIndex((i) => i == e);
      if (index >= 0) {
        this.neworused.splice(index, 1);
      } else {
        this.neworused.push(e);
      }
    }
    if (block == 'RL') {
      const index = this.retailorlease.findIndex((i) => i == e);
      if (index >= 0) {
        this.retailorlease.splice(index, 1);
      } else {
        this.retailorlease.push(e);
      }
    }
    if (block == 'PH') {
      this.includeorexclude = [];
      this.includeorexclude.push(e);
    }
    if (block == 'DS') {
      const index = this.dealstatus.findIndex((i) => i == e);
      if (index >= 0) {
        this.dealstatus.splice(index, 1);
      } else {
        this.dealstatus.push(e);
      }
    }
    if (block == 'ST') {
      const index = this.selecttarget.findIndex((i) => i == e);
      if (index >= 0) {
        this.selecttarget.splice(index, 1);
      } else {
        this.selecttarget.push(e);
      }
    }
    if (block == 'TB') {
      this.toporbottom = [];
      this.toporbottom.push(e);
    }
    if (block == 'IC') {
      this.includecharges = [];
      this.includecharges.push(e);
    }
    if (block == 'SRC') {
      this.Transactorgl = [];
      this.Transactorgl.push(e);
    }
  }

  viewreport() {
    // //console.log(this.selectedDataGrouping)
    if (this.selectedDataGrouping.length == 0) {
      alert('Please select atleast one ');
    } else {
      // let selectedSalespersonvalues = 0;
      // if (this.DropDowns.value.spManagers.length > 0) {
      //   let selectedsp = this.DropDowns.value.spManagers.map(
      //     ({ SPID }) => SPID
      //   );
      //   // if (selectedsp.length == this.salesPersons.length) {
      //   //   selectedSalespersonvalues = 0
      //   // }
      //   // else {
      //   selectedSalespersonvalues = this.DropDowns.value.spManagers
      //     .map(({ SPID }) => SPID)
      //     .toString();
      //   // }
      // }
      // let selectedSalesManagersvalues = 0;
      // if (this.DropDowns.value.sManagers.length > 0) {
      //   let selectedsM = this.DropDowns.value.sManagers.map(({ SmId }) => SmId);
      //   // if (selectedsM.length == this.salesManagers.length) {
      //   //   selectedSalesManagersvalues = 0
      //   // }
      //   // else {
      //   selectedSalesManagersvalues = this.DropDowns.value.sManagers
      //     .map(({ SmId }) => SmId)
      //     .toString();
      //   // }
      // }
      // let selectedFiManagersvalues = 0;
      // if (this.DropDowns.value.fiManagers.length > 0) {
      //   let selectedfM = this.DropDowns.value.fiManagers.map(
      //     ({ FiId }) => FiId
      //   );
      //   // if (selectedfM.length == this.financeManager.length) {
      //   //   selectedFiManagersvalues = 0
      //   // }
      //   // else {
      //   selectedFiManagersvalues = this.DropDowns.value.fiManagers
      //     .map(({ FiId }) => FiId)
      //     .toString();
      //   // }
      // }
      // let selectedstorevalues = 0;
      // if (this.DropDowns.value.storesData.length > 0) {
      //   let selectedstores = this.DropDowns.value.storesData.map(
      //     ({ AS_ID }) => AS_ID
      //   );
      //   // if (selectedstores.length == this.stores.length) {
      //   //   selectedstorevalues = 0
      //   // }
      //   // else {
      //   selectedstorevalues = this.DropDowns.value.storesData
      //     .map(({ AS_ID }) => AS_ID)
      //     .toString();
      // }
      // // } else if (selectedstorevalues == 0) {
      // //   this.componentState = true;
      // //   document.getElementById('Storesalert').click();
      // // } else {
      const data = {
        Reference: 'SG',
        FromDate: this.FromDate,
        ToDate: this.ToDate,

        TotalReport: this.toporbottom[0],
        storeValues:
          this.selectedstorevalues.toString() == ''
            ? '0'
            : this.selectedstorevalues.toString(),
        Spvalues:
          this.selectedSalespersonvalues.toString() == ''
            ? '0'
            : this.selectedSalespersonvalues.toString(),
        SMvalues:
          this.selectedSalesManagersvalues.toString() == ''
            ? '0'
            : this.selectedSalesManagersvalues.toString(),
        FIvalues:
          this.selectedFiManagersvalues.toString() == ''
            ? '0'
            : this.selectedFiManagersvalues.toString(),
        dealType: this.neworused.toString(),
        saleType: this.retailorlease.toString(),
        dealStatus: this.dealstatus.toString(),
        dataGroupingvalues: this.selectedDataGrouping,
      };
      console.log(data);
      this.service.SetReports({
        obj: data,
      });
      this.close();
      // }
    }
  }
  close() {
    this.ngbmodel.dismissAll();
    this.Performance = 'Unload';
  }
}
