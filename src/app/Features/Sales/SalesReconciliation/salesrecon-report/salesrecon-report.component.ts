import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDatepickerConfig,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { CalendarCellViewModel } from 'ngx-bootstrap/datepicker/models';
import { ApiService } from '../../../../Core/Providers/ApiService/api.service';

@Component({
  selector: 'app-salesrecon-report',
  templateUrl: './salesrecon-report.component.html',
  styleUrls: ['./salesrecon-report.component.scss'],
})
export class SalesreconReportComponent implements OnInit {
  public today = new Date();
  public previous = new Date(
    this.today.getFullYear(),
    this.today.getMonth(),
    1
  );
  public previousmultiplemax = new Date(
    this.today.getFullYear(),
    this.today.getMonth() - 1,
    1
  );
  public toprevious: Date;
  stores: any = [];
  RegionBasedStores: any = [];
  tab = 'SM';
  Type = 'Store';
  DateType = 'MTD';
  Performance: any = 'Load';
  FromDate: any;
  ToDate: any;
  AllStores: boolean = true;
  custom: boolean = false;
  customfrom: boolean = false;
  customto: boolean = false;
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  filter = 'Store';
  selfromMonthYear: any;
  toMonthYear: any;
  selectedfromdate: string;
  selectedtodate: string;
  constructor(
    private ngbmodel: NgbModal,
    private renderer: Renderer2,
    private apiSrvc: ApiService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private formBuilder: FormBuilder,
    private config: NgbDatepickerConfig
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      const TagName = e.target as HTMLButtonElement;
      if (
        TagName.className === 'd-block modal fade show modal-static' ||
        TagName.className === 'row'
      ) {
        this.close();
      }
    });
  }
  bsValue = new Date();
  bsRangeValue: Date[];
  minDate: Date;
  maxDate: Date;
  month: any;
  frommonth: any;
  tomonth: any;
  ngOnInit(): void {
    this.initYearLabels();
    this.initMonthLabels();
    this.initViewSlices();
    this.initMonthsData();
    this.initRangeIndexes();
    this.currentYearIndex = this.years.findIndex(
      (year) => year === new Date().getFullYear()
    );
    this.sliceDataIntoView();
    this.Storeormonth('Store');

    this.DateType = localStorage.getItem('time');
    this.apiSrvc.GetHeaderData().subscribe((res) => {
      if (this.Performance == 'Load') {
        if (res.obj.title == 'Sales-Reconciliation') {
          this.month = new Date(res.obj.Month);
          this.filter = res.obj.filter;
          this.selectedStore = [res.obj.stores];
          this.selectedSname = [res.obj.Sname];
          this.frommonth = new Date(res.obj.fromdate);
          this.tomonth = res.obj.todate;
          this.toprevious = new Date(
            this.frommonth.getFullYear(),
            this.frommonth.getMonth() + 1,
            0
          );
        }
      }
    });

    this.maxDate = new Date();
    // this.minDate.setDate(this.minDate.getDate() + 10);
    this.maxDate.setDate(this.maxDate.getDate());
    this.getStores();

    // this.allstores();
  }

  Tabs(e) {
    this.tab = e;
  }

  opencalender() {
    this.custom = true;
    this.DateType = 'SM';
    document.getElementById('DateOfBirth').click();
  }

  opencalenderfrom() {
    this.customfrom = true;
    document.getElementById('fromDateOfBirth').click();
  }

  opencalenderto() {
    document.getElementById('toDateOfBirth').click();
  }

  Reset() {
    // this.selectedDataGrouping = [];
  }

  dateRangeCreated($event) {
    ////console.log($event);
    if ($event !== null) {
      let startDate = $event[0].toJSON();
      let endDate = $event[1].toJSON();
      ////console.log(startDate, endDate);

      // this.FromDate = this.pipe.transform(startDate, 'MM-dd-yyyy');
      // this.ToDate = this.pipe.transform(endDate, 'MM-dd-yyyy');
      if (this.DateType == 'C') {
        this.custom = true;
      }
      ////console.log(this.FromDate);
      ////console.log(this.ToDate);
    }
  }
  count = 0;

  selectedStore: any = [];
  selectedSname: any = [];
  StoreFilter(val, sname) {
    this.selectedStore = [];
    this.selectedSname = [];
    console.log(val);
    console.log(sname);
    if (val == '0') {
      this.selectedStore = this.stores.map(function (a) {
        return a.AS_ID;
      });
    } else {
      this.selectedStore.push(val);
      this.selectedSname.push(sname);
      console.log(this.selectedStore);
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

          ////console.log(this.stores);

          this.apiSrvc.GetHeaderData().subscribe((res) => {
            ////console.log(res);
            if (
              res.obj.title == 'Sales-Reconciliation' &&
              this.Performance == 'Load'
            ) {
              if (res.obj.stores == '0') {
                this.selectedStore = this.stores.map(function (a) {
                  return a.AS_ID;
                });
              }
            }
          });
        } else {
          alert('Invalid Details');
        }
      },
      (error) => {
        ////console.log(error);
      }
    );
  }

  selectedstorevalues: any = [];

  allstores() {
    this.AllStores = !this.AllStores;
    if (this.AllStores == true) {
      this.selectedstorevalues = this.stores.map(function (a) {
        return a.AS_ID;
      });
      ////console.log(this.selectedstorevalues);
    } else {
      this.selectedstorevalues = [];
    }
  }

  viewreport() {
    let Selstr = 0;
    let Strname = 'All Stores';

    if (this.selectedStore.length == this.stores.length) {
      Selstr = 0;
      Strname = 'All Stores';
    } else {
      Selstr = this.selectedStore[0];
      Strname = this.selectedSname[0];
    }
    let date =
      ('0' + (this.month.getMonth() + 1)).slice(-2) +
      '-01' +
      '-' +
      this.month.getFullYear();
    const data = {
      Reference: 'SRR',
      FromDate: this.frommonth,
      ToDate: this.tomonth,
      month: date,
      storeValues: Selstr,
      Filter: this.filter,
      Sname: Strname,
    };
    console.log(data);
    this.apiSrvc.SetReports({
      obj: data,
    });
    this.Performance = 'Unload';
    this.close();
  }
  close() {
    this.ngbmodel.dismissAll();
    this.Performance = 'Unload';
  }

  currentYearIndex: number;
  years: Array<number>;
  months: Array<string>;
  monthsData: Array<{
    monthName: string;
    monthYear: number;
    isInRange: boolean;
    isLowerEdge: boolean;
    isUpperEdge: boolean;
  }>;
  rangeIndexes: Array<number>;
  monthViewSlicesIndexes: Array<number>;
  monthDataSlice: Array<{
    monthName: string;
    monthYear: number;
    isInRange: boolean;
    isLowerEdge: boolean;
    isUpperEdge: boolean;
  }>;
  globalIndexOffset: number;

  onClick(indexClicked) {
    if (this.rangeIndexes[0] === null) {
      this.rangeIndexes[0] = this.globalIndexOffset + indexClicked;
    } else if (this.rangeIndexes[1] === null) {
      this.rangeIndexes[1] = this.globalIndexOffset + indexClicked;
      this.rangeIndexes.sort((a, b) => a - b);
      this.monthsData.forEach((month, index) => {
        if (this.rangeIndexes[0] <= index && index <= this.rangeIndexes[1]) {
          month.isInRange = true;
        }
        if (this.rangeIndexes[0] === index) {
          month.isLowerEdge = true;
        }
        if (this.rangeIndexes[1] === index) {
          month.isUpperEdge = true;
        }
      });
      let fromMonthYear = this.monthsData[this.rangeIndexes[0]];
      let toMonthYear = this.monthsData[this.rangeIndexes[1]];
      ////console.log(fromMonthYear, toMonthYear, 'bhkjhkhjljkl');
      this.selfromMonthYear = `${fromMonthYear.monthName} ${fromMonthYear.monthYear}`;
      let fromdate = new Date(this.selfromMonthYear);
      this.selectedfromdate =
        ('0' + (fromdate.getMonth() + 1)).slice(-2) +
        '-01' +
        '-' +
        fromdate.getFullYear();
      // ////console.log(date)
      this.toMonthYear = `${toMonthYear.monthName} ${toMonthYear.monthYear}`;
      let todate = new Date(this.toMonthYear);
      this.selectedtodate =
        ('0' + (todate.getMonth() + 1)).slice(-2) +
        '-01' +
        '-' +
        todate.getFullYear();

      // this.emitData(`Range is: ${fromMonthYear.monthName} ${fromMonthYear.monthYear} to ${toMonthYear.monthName} ${toMonthYear.monthYear}`)
    } else {
      this.initRangeIndexes();
      this.initMonthsData();
      this.onClick(indexClicked);
      this.sliceDataIntoView();
    }
  }
  sliceDataIntoView() {
    this.globalIndexOffset = this.monthViewSlicesIndexes[this.currentYearIndex];
    this.monthDataSlice = this.monthsData.slice(
      this.globalIndexOffset,
      this.globalIndexOffset + 24
    );
  }

  incrementYear() {
    if (this.currentYearIndex !== this.years.length - 1) {
      this.currentYearIndex++;
      this.sliceDataIntoView();
    }
  }

  decrementYear() {
    if (this.currentYearIndex !== 0) {
      this.currentYearIndex--;
      this.sliceDataIntoView();
    }
  }

  initRangeIndexes() {
    this.rangeIndexes = [null, null];
  }

  initMonthsData() {
    this.monthsData = new Array();
    this.years.forEach((year) => {
      this.months.forEach((month) => {
        this.monthsData.push({
          monthName: month,
          monthYear: year,
          isInRange: false,
          isLowerEdge: false,
          isUpperEdge: false,
        });
      });
    });
  }

  initYearLabels() {
    const currentYear = new Date().getFullYear();
    const range = (start, stop, step) =>
      Array.from(
        { length: (stop - start) / step + 1 },
        (_, i) => start + i * step
      );
    this.years = range(1956, currentYear + 5, 1);
  }

  initMonthLabels() {
    this.months = new Array(12).fill(0).map((_, i) => {
      return new Date(`${i + 1}/1`).toLocaleDateString(undefined, {
        month: 'short',
      });
    });
  }

  initViewSlices() {
    this.monthViewSlicesIndexes = [];
    this.years.forEach((year, index) => {
      if (index === 0) {
        this.monthViewSlicesIndexes.push(0);
      } else if (index === 1) {
        this.monthViewSlicesIndexes.push(6);
      } else
        this.monthViewSlicesIndexes.push(
          this.monthViewSlicesIndexes[index - 1] + 12
        );
    });
  }

  // single calender

  onOpenCalendar(container) {
    container.setViewMode('month');
    container.monthSelectHandler = (event: CalendarCellViewModel): void => {
      container.value = event.date;
      return;
    };
  }

  changeDate(e) {
    let year = e.getFullYear();
    let lastDay = new Date(e.getFullYear(), e.getMonth() + 1, 0);
    let month = parseInt(('0' + (lastDay.getMonth() + 1)).slice(-2));
    let day = parseInt(('0' + lastDay.getDate()).slice(-2));
    this.fromDate = new NgbDate(year, month, 1);
    this.toDate = new NgbDate(year, month, day);
  }

  onOpenCalendarfrom(container) {
    container.setViewMode('month');
    container.monthSelectHandler = (event: CalendarCellViewModel): void => {
      container.value = event.date;
      return;
    };
  }

  changeDatefrom(e) {
    let year = e.getFullYear();
    let lastDay = new Date(e.getFullYear(), e.getMonth() + 1, 0);
    let month = parseInt(('0' + (lastDay.getMonth() + 1)).slice(-2));
    let day = parseInt(('0' + lastDay.getDate()).slice(-2));
    this.fromDate = new NgbDate(year, month, 1);
    this.toDate = new NgbDate(year, month, day);
    this.toprevious = new Date(
      this.frommonth.getFullYear(),
      this.frommonth.getMonth() + 1,
      0
    );
  }

  onOpenCalendarto(container) {
    container.setViewMode('month');
    container.monthSelectHandler = (event: CalendarCellViewModel): void => {
      container.value = event.date;
      return;
    };
  }

  changeDateto(e) {
    let year = e.getFullYear();
    let lastDay = new Date(e.getFullYear(), e.getMonth() + 1, 0);
    let month = parseInt(('0' + (lastDay.getMonth() + 1)).slice(-2));
    let day = parseInt(('0' + lastDay.getDate()).slice(-2));
    this.fromDate = new NgbDate(year, month, 1);
    this.toDate = new NgbDate(year, month, day);
  }

  Storeormonth(block) {
    if (block == 'Store') {
      this.filter = 'Store';
      this.Type = 'Store';
    } else {
      this.filter = 'Month';
      this.Type = 'Month';
    }
  }
}
