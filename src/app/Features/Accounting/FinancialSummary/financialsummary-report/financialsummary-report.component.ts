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
  selector: 'app-financialsummary-report',
  templateUrl: './financialsummary-report.component.html',
  styleUrls: ['./financialsummary-report.component.scss'],
})
export class FinancialsummaryReportComponent implements OnInit {
  stores: any = [];
  RegionBasedStores: any = [];
  tab = 'C';
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
  month: any;
  FilterTabs: any = ['StoreSummary'];
  SubFiltersTab: any = [];
  // Date = '11-14-2022';
  ngOnInit() {
    this.getStores();
    this.DateType = localStorage.getItem('time');
    this.service.GetHeaderData().subscribe((res) => {
      if (this.Performance == 'Load') {
        this.month = res.obj.Month;

        if (res.obj.title == 'Financial Summary') {
          if (res.obj.filter != '') {
            this.FilterTabs = [];
            this.FilterTabs.push(res.obj.filter);
          }
          if (res.obj.subfilter != '') {
            this.SubFiltersTab = [];
            this.SubFiltersTab.push(res.obj.subfilter);
          }
        }
      }
    });

    this.maxDate = new Date();
    // this.minDate.setDate(this.minDate.getDate() + 10);
    this.maxDate.setDate(this.maxDate.getDate());
    // this.getStores();
    // this.getDataGroupings();
    // this.allstores();
  }
  Tabs(e) {
    this.tab = e;
  }

  opencalender() {
    document.getElementById('DateOfBirth').click();
  }
  onOpenCalendar(container) {
    container.setViewMode('month');
    container.monthSelectHandler = (event: CalendarCellViewModel): void => {
      container.value = event.date;
      return;
    };
  }
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  changeDate(e) {
    console.log(e);
    // if (new Date(e) > new Date(this.maxDate)) {
    //   this.month = '';
    // }
    let year = e.getFullYear();
    let lastDay = new Date(e.getFullYear(), e.getMonth() + 1, 0);
    let month = parseInt(('0' + (lastDay.getMonth() + 1)).slice(-2));
    let day = parseInt(('0' + lastDay.getDate()).slice(-2));
    this.fromDate = new NgbDate(year, month, 1);
    this.toDate = new NgbDate(year, month, day);
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

          console.log(this.stores);

          this.service.GetHeaderData().subscribe((res) => {
            console.log(res);

            if (
              res.obj.title == 'Financial Summary' &&
              this.Performance == 'Load'
            ) {
              if (res.obj.stores != '' && res.obj.stores != '0') {
                this.selectedStore = [];

                this.selectedStore.push(parseInt(res.obj.stores));
                // this.Categories[1].Cat_length=this.selectedStore.length
                console.log(this.selectedStore);
              }
              if (res.obj.stores == '' || res.obj.stores == '0') {
                this.selectedStore = this.stores.map(function (a) {
                  return a.AS_ID;
                });
                console.log(this.selectedStore);
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

  individualStores(e) {
    if (e == 0) {
      if (this.selectedStore.length == this.stores.length) {
        this.selectedStore = [];
      } else {
        this.selectedStore = this.stores.map(function (a) {
          return a.AS_ID;
        });
      }
    } else {
      this.selectedStore = [];
      this.selectedStore.push(e);
    }
  }
  FT_Name: any;
  SFT_Name: any;
  multipleorsingle(block, e) {
    console.log(block);
    console.log(e);
    this.FT_Name = block;
    this.SFT_Name = e;
    if (block == 'FT') {
      this.FilterTabs = [];
      this.SubFiltersTab = [];
      this.FilterTabs.push(e);
      if (e == 'ExpenseTrend' || e == 'VariableKPI') {
        this.SubFiltersTab.push('VariableTrendsvsBudget');
      }
    }
    if (block == 'SFT') {
      this.SubFiltersTab = [];
      this.SubFiltersTab.push(e);
    }
  }
  selectedStoresRegions: any = [];

  selectedStore: any = [];
  indexstores: any = [];

  viewreport() {
    let sname: any = 'All Stores';
    if (this.selectedStore.length !== this.stores.length) {
      sname = this.stores.filter((e) => e.AS_ID == this.selectedStore[0]);
      sname = sname[0].DEALER_NAME;
    }
    if (this.SFT_Name == 'ExpenseTrend') {
      console.log(this.selectedStore.length, this.stores.length);
      if (this.selectedStore.length == this.stores.length) {
        alert('Please select a single store');
      } else {
        this.SrvcData();
      }
    } else if (this.SFT_Name == 'VariableKPI') {
      if (this.selectedStore.length == this.stores.length) {
        alert('Please select a single store');
      } else {
        this.SrvcData();
      }
    } else {
      this.SrvcData();
    }
  }
  close() {
    this.ngbmodel.dismissAll();
    this.Performance = 'Unload';
  }
  @Input() Parentcomponent: any;

  SrvcData() {
    let sname: any = 'All Stores';
    if (this.selectedStore.length !== this.stores.length) {
      sname = this.stores.filter((e) => e.AS_ID == this.selectedStore[0]);
      sname = sname[0].DEALER_NAME;
    }
    const data = {
      Reference: 'FS',
      storeValues:
        this.selectedStore.length == this.stores.length
          ? 0
          : this.selectedStore[0],
      month: this.month,
      Sname: sname,
      filters: this.FilterTabs.toString(),
      subfilters: this.SubFiltersTab.toString(),
    };
    console.log(data);
    this.service.SetReports({
      obj: data,
    });
    this.Performance = 'Unload';
    this.close();
  }
}
