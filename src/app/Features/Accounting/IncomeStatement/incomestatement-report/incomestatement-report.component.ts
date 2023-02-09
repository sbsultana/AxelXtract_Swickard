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

@Component({
  selector: 'app-incomestatement-report',
  templateUrl: './incomestatement-report.component.html',
  styleUrls: ['./incomestatement-report.component.scss'],
})
export class IncomestatementReportComponent implements OnInit {
  public today = new Date();
  public previous = new Date(
    this.today.getFullYear(),
    this.today.getMonth() - 1,
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
  tab = 'ST';
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
    private service: ApiService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private formBuilder: FormBuilder,
    private config: NgbDatepickerConfig // private pipe: DatePipe
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
  // Date = '11-14-2022';
  ngOnInit() {
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
    this.service.GetHeaderData().subscribe((res) => {
      if (this.Performance == 'Load') {
        if (res.obj.title == 'Income Statement') {
          ////console.log(res);
          this.month = new Date(res.obj.Month);
          ////console.log(this.month, res.obj.Month);
          this.filter = res.obj.filter;

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

  SetDates(type) {
    this.DateType = type;
    localStorage.setItem('time', this.DateType);
    let today = new Date();
    // alert('hi');
    let enddate = new Date(today.setDate(today.getDate() - 1));
    ////console.log(enddate);

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
      ////console.log(this.FromDate, this.ToDate);
    }
    if (type == 'LY') {
      this.custom = false;

      this.FromDate = '01-01-' + (enddate.getFullYear() - 1);
      this.ToDate = '12-31-' + (enddate.getFullYear() - 1);
      this.bsRangeValue = [this.FromDate, this.ToDate];
    }
    // ////console.log(this.FromDate);
    // ////console.log(this.ToDate);
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

  getStores() {
    const obj = {
      AU_ID: 1,
    };
    this.service.postmethod('xtract/GetStores', obj).subscribe(
      (res) => {
        if (res.status == 200) {
          this.stores = res.response.filter(
            (ele) =>
              ele.AS_ID != 26 &&
              ele.AS_ID != 27 &&
              ele.AS_ID != 28 &&
              ele.AS_ID != 29 &&
              ele.AS_ID != 30
          );

          // console.log(this.stores);

          this.service.GetHeaderData().subscribe((res) => {
            ////console.log(res);

            if (
              res.obj.title == 'Income Statement' &&
              this.Performance == 'Load'
            ) {
              if (res.obj.stores != '' && res.obj.stores != '0') {
                this.selectedstorevalues = [];
                var result = res.obj.stores.split(',');
                this.selectedstorevalues = result.map(function (x) {
                  return parseInt(x, 10);
                });
                // this.Categories[1].Cat_length=this.selectedstorevalues.length
                ////console.log(this.selectedstorevalues);
              }
              if (res.obj.stores == '' || res.obj.stores == '0') {
                this.selectedstorevalues = this.stores.map(function (a) {
                  return a.AS_ID;
                });
                ////console.log(this.selectedstorevalues);
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
    ////console.log(this.selectedstorevalues);
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
    // if(this.toMonthYear==null ){
    //   this.monthsData.forEach((month, index) => {
    //     if (this.rangeIndexes[0] === index) {
    //       alert("please select month range")
    //       this.tab='C'
    //       // month.isUpperEdge = true;
    //     }
    //   });
    // }
    //  else{
    let date =
      ('0' + (this.month.getMonth() + 1)).slice(-2) +
      '-01' +
      '-' +
      this.month.getFullYear();
    // //////console.log(this.selectedDataGrouping)
    // if (this.selectedDataGrouping.length == 0) {
    //   alert('Please select atleast one ');
    // } else {

    const data = {
      Reference: 'IS',
      FromDate: this.frommonth,
      ToDate: this.tomonth,
      month: date,
      storeValues:
        this.selectedstorevalues.toString() == ''
          ? '0'
          : this.selectedstorevalues.toString(),
      Filter: this.filter,
    };
    ////console.log(data);
    this.service.SetReports({
      obj: data,
    });
    this.close();
    // }
    // }
    //  }
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

  // emitData(string) {
  //   this.monthRangeSelected.emit(string)
  // };

  // onClick(indexClicked) {
  //   ////console.log(indexClicked);
  //   if (this.rangeIndexes[0] === null) {
  //     this.rangeIndexes[0] = this.globalIndexOffset + indexClicked;
  //     ////console.log(this.rangeIndexes[0], 'single');
  //     this.monthsData.forEach((month, index) => {
  //       if (this.rangeIndexes[0] === index) {
  //         month.isLowerEdge = true;
  //         // month.isUpperEdge = true;
  //       }
  //     });
  //     let fromMonthYear = this.monthsData[this.rangeIndexes[0]];
  //     ////console.log(
  //       fromMonthYear,
  //       `${fromMonthYear.monthName} ${fromMonthYear.monthYear}`
  //     );
  //   } else if (this.rangeIndexes[1] === null) {
  //     this.rangeIndexes[1] = this.globalIndexOffset + indexClicked;
  //     this.rangeIndexes.sort((a, b) => a - b);
  //     this.monthsData.forEach((month, index) => {
  //       if (this.rangeIndexes[0] <= index && index <= this.rangeIndexes[1]) {
  //         month.isInRange = true;
  //       }
  //       if (this.rangeIndexes[0] === index) {
  //         month.isLowerEdge = true;
  //       }
  //       if (this.rangeIndexes[1] === index) {
  //         month.isUpperEdge = true;
  //       }
  //     });
  //     let fromMonthYear = this.monthsData[this.rangeIndexes[0]];
  //     let toMonthYear = this.monthsData[this.rangeIndexes[1]];

  //   } else {
  //     this.initRangeIndexes();
  //     this.initMonthsData();
  //     this.onClick(indexClicked);
  //     this.sliceDataIntoView();
  //   }
  // }
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
