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
  selector: 'app-partsgross-reports',
  templateUrl: './partsgross-reports.component.html',
  styleUrls: ['./partsgross-reports.component.scss'],
})
export class PartsgrossReportsComponent implements OnInit {
  stores: any = [];

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

  Teams = 'CP';
  custom: boolean = false;

  Groupingcols = [
    { id: 48, columnname: 'DealerName' },
    { id: 41, columnname: 'Advisor_Name' },
    { id: 42, columnname: '' },
    { id: 43, columnname: 'Customername' },
    { id: 44, columnname: '' },
    { id: 45, columnname: '' },
    { id: 46, columnname: '' },
    { id: 47, columnname: '' },
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
      if (TagName.className === 'd-block modal fade show modal-static') {
        this.close();
      }
      console.log(TagName);
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
        console.log(this.FromDate, this.ToDate);
        this.bsRangeValue = [this.FromDate, this.ToDate];
        if (res.obj.title == 'Parts Gross') {
          if (res.obj.toporbottom != '') {
            this.toporbottom = res.obj.toporbottom;
          }
          if (res.obj.ROType != '') {
            this.openorclosed = res.obj.ROType.split(',');
          }
          if (res.obj.Department != '') {
            this.department = res.obj.Department.split(',');
          } else {
            this.department = [];
          }
          if (res.obj.Paytype != '') {
            this.saletype = res.obj.Paytype.split(',');
          } else {
            this.saletype = [];
          }
          if (res.obj.Target != '') {
            this.selecttarget = res.obj.Target.split(',');
          } else {
            this.selecttarget = [];
          }
          this.toporbottom = res.obj.ToporBottom.split(',');
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
    const obj = {
      pageid: 49,
    };

    this.service.postmethod('xtract/GetDataGroupingsbyPage', obj).subscribe(
      (res) => {
        if (res.status == 200) {
          this.dataGrouping = res.response.map((v) => ({ ...v, state: false }));

          this.selectedDataGrouping.push(this.dataGrouping[0]);
          this.dataGrouping.forEach((ele) => {
            this.Groupingcols.forEach((val) => {
              if (ele.ARG_ID == val.id) {
                ele.columnName = val.columnname;
              }
              if (
                ele.ARG_ID == '28' ||
                ele.ARG_ID == '29' ||
                ele.ARG_ID == '30' ||
                ele.ARG_ID == '31' ||
                ele.ARG_ID == '32' ||
                ele.ARG_ID == '33' ||
                ele.ARG_ID == '38' ||
                ele.ARG_ID == '39'
              ) {
                ele.Active = 'N';
              } else {
                ele.Active = 'Y';
              }
            });
            this.service.GetHeaderData().subscribe((res) => {
              if (
                res.obj.title == 'Parts Gross' &&
                this.Performance == 'Load'
              ) {
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
                // // console.log(this.datagrp)
              }
            });
          });
          this.selectedDataGrouping = this.datagrp;
          // console.log(this.dataGrouping)
        } else {
          alert('Invalid Details');
        }
      },
      (error) => {
        // console.log(error);
      }
    );
  }

  SelectedData(val) {
    if (val.state == false) {
      if (this.selectedDataGrouping.length >= 2) {
        alert('Select up to 2 Filters only To Group Your Data');
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

  getStores() {
    const obj = {
      AU_ID: 1,
    };
    this.service.postmethod('xtract/GetStores', obj).subscribe(
      (res) => {
        if (res.status == 200) {
          this.stores = res.response;
          this.service.GetHeaderData().subscribe((res) => {
            if (res.obj.title == 'Parts Gross' && this.Performance == 'Load') {
              console.log(res.obj.stores);
              if (res.obj.stores != '' || res.obj.stores != '0') {
                let strids = res.obj.stores.split(',');
                this.selectedstorevalues = strids.map(function (x) {
                  return parseInt(x, 10);
                });
                console.log(this.selectedstorevalues);
              }
              if (res.obj.stores == '' || res.obj.stores == '0') {
                this.selectedstorevalues = this.stores.map(function (a) {
                  return a.AS_ID;
                });
                console.log(this.selectedstorevalues);
              }
            }
          });
        } else {
          alert('Invalid Details');
        }
      },
      (error) => {
        // console.log(error);
      }
    );
  }
  teamsselection(e) {
    this.Teams = e;
  }
  // opencalender() {
  //   this.DateType = 'C';
  //   document.getElementById('DateOfBirth').click();
  // }
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
  }
  selectedStoresRegions: any = [];

  selectedstorevalues: any = [];

  allstores() {
    this.AllStores = !this.AllStores;
    if (this.AllStores == true) {
      this.selectedstorevalues = this.stores.map(function (a) {
        return a.AS_ID;
      });
      console.log(this.selectedstorevalues);
    } else {
      this.selectedstorevalues = [];
      // this.selectedStoresRegions = [];
    }
  }

  openorclosed: any = ['Open', 'Closed'];
  department: any = ['Service', 'Parts', 'Body'];
  // includeorexclude: any = ['I'];
  saletype: any = ['Warranty', 'Internal'];
  selecttarget: any = ['F'];
  toporbottom: any = ['T'];
  // includecharges:any=['N'];
  Transactorgl: any = ['T'];
  multipleorsingle(block, e) {
    // if (block == 'Grp') {

    //     const index = this.selected.findIndex(i => i == e)
    //     if (index >= 0) {
    //       this.selected.splice(index, 1)
    //     }
    //     else {
    //       if(this.selected.length<3){
    //       this.selected.push(e)
    //       }
    //       else{
    //         this.alertmessage='Select up to 3 Filters only To Group Your Data';
    //        document.getElementById("warningbtn").click();
    //       //  (<HTMLElement>document.getElementsByClassName('alertbtn')[0]).click()
    //       }

    //     console.log(this.selected);
    //   }

    // }
    if (block == 'RO') {
      const index = this.openorclosed.findIndex((i) => i == e);
      if (index >= 0) {
        this.openorclosed.splice(index, 1);
      } else {
        this.openorclosed.push(e);
      }
      // console.log(this.openorclosed);
    }
    if (block == 'Dept') {
      const index = this.department.findIndex((i) => i == e);
      if (index >= 0) {
        this.department.splice(index, 1);
      } else {
        this.department.push(e);
      }
      // console.log(this.department);
    }
    if (block == 'PT') {
      const index = this.saletype.findIndex((i) => i == e);
      if (index >= 0) {
        this.saletype.splice(index, 1);
      } else {
        this.saletype.push(e);
      }
      // console.log(this.saletype);
    }
    if (block == 'ST') {
      const index = this.selecttarget.findIndex((i) => i == e);
      if (index >= 0) {
        this.selecttarget.splice(index, 1);
      } else {
        this.selecttarget.push(e);
      }
      // console.log(this.selecttarget);
    }
    if (block == 'TB') {
      this.toporbottom = [];
      this.toporbottom.push(e);
      // console.log(this.toporbottom)
    }
    // if (block == 'IC') {
    //   this.includecharges = [];
    //   this.includecharges.push(e)
    // console.log(this.includecharges)
    // }
    if (block == 'SRC') {
      this.Transactorgl = [];
      this.Transactorgl.push(e);
      // console.log(this.Transactorgl)
    }
  }
  viewreport() {
    if (this.selectedDataGrouping.length == 0) {
      alert('Please select atleast one ');
    } else {
      const data = {
        Reference: 'PG',
        FromDate: this.FromDate,
        ToDate: this.ToDate,
        TotalReport: this.toporbottom[0],
        storeValues:
          this.selectedstorevalues.toString() == ''
            ? '0'
            : this.selectedstorevalues.toString(),
        // ADvalues: this.selectedSalespersonvalues.length == 0 ? '0' :  this.selectedSalespersonvalues.toString(),
        // Techvalues: this.selectedSalesManagersvalues.length == 0 ? '0' :this.selectedSalesManagersvalues.toString(),
        ROType: this.openorclosed.toString(),
        Departments: this.department.toString(),
        PayType: this.saletype.toString(),
        Target: this.selecttarget.toString(),
        dataGroupingvalues: this.selectedDataGrouping,
      };
      // console.log(data)
      this.Performance = 'Unload';
      this.service.SetReports({
        obj: data,
      });
      this.close();
    }
  }
  close() {
    this.ngbmodel.dismissAll();
    this.Performance = 'Unload';
  }
}
