import { ApiService } from '../../../../Core/Providers/ApiService/api.service';

import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CalendarCellViewModel } from 'ngx-bootstrap/datepicker/models';
@Component({
  selector: 'app-salesperson-report',
  templateUrl: './salesperson-report.component.html',
  styleUrls: ['./salesperson-report.component.scss'],
})
export class SalespersonReportComponent implements OnInit {
  tab = 'C';
  DateType = 'MTD';
  custom: boolean = false;
  Performance: any = 'Load';
  AllStores: boolean = true;
  FromDate: any;
  ToDate: any;
  stores: any = [];
  selectedstorevalues: any = [];
  StoresIds: any = [];

  public strsettings: IDropdownSettings;

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  DropDowns: FormGroup;
  public formatOptions = {
    month: 'long',
  };

  public date = new Date();
  public locales = ['en', 'de', 'fr', 'ar', 'zh'];
  public locale = 'en';
  toporbottom: any = ['T'];

  bsValue = new Date();
  bsRangeValue: Date[];
  minDate: Date;
  maxDate: Date;

  constructor(
    private ngbmodel: NgbModal,
    private renderer: Renderer2,
    private service: ApiService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private formBuilder: FormBuilder,
    private pipe: DatePipe
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      const TagName = e.target as HTMLButtonElement;
      if (TagName.className === 'd-block modal fade show modal-static') {
        this.close();
      }
    });
  }

  ngOnInit(): void {
    // this.DateType = localStorage.getItem('time');
    this.service.GetHeaderData().subscribe((res) => {
      if (this.Performance == 'Load') {
        this.FromDate = res.obj.fromdate.replace(/-/g, '/');
        this.ToDate = res.obj.todate.replace(/-/g, '/');
        this.bsRangeValue = [this.FromDate, this.ToDate];
        if (this.DateType == 'C') {
          this.bsRangeValue = [this.FromDate, this.ToDate];
        }
        if (res.obj.title == 'SalesPerson Ranking') {
          if (res.obj.toporbottom != '') {
            this.toporbottom = res.obj.toporbottom;
          }
          if (res.obj.datetype != '') {
            this.DateType = res.obj.datetype;
          }
        }
      }
    });
    this.getStores();
    this.SetDates(this.DateType);
  }
  opencalender() {
    this.custom = true;
    this.DateType = 'C';
    document.getElementById('DateOfBirth').click();
  }

  allstores() {
    this.AllStores = !this.AllStores;
    if (this.AllStores == true) {
      this.selectedstorevalues = this.stores.map(function (a) {
        return a.AS_ID;
      });
    } else {
      this.selectedstorevalues = [];
    }
  }

  close() {
    this.ngbmodel.dismissAll();
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }

  Tabs(e) {
    this.tab = e;
  }

  SetDates(type) {
    this.DateType = type;
    localStorage.setItem('time', this.DateType);
    let today = new Date();
    // alert('hi');
    let enddate = new Date(today.setDate(today.getDate() - 1));
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

      this.FromDate =
        ('0' + 1).slice(-2) +
        '-' +
        ('0' + (enddate.getDate() - 1)).slice(-2) +
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
    if ($event !== null) {
      let startDate = $event[0].toJSON();
      let endDate = $event[1].toJSON();

      this.FromDate = this.pipe.transform(startDate, 'MM-dd-yyyy');
      this.ToDate = this.pipe.transform(endDate, 'MM-dd-yyyy');
      if (this.DateType == 'C') {
        this.custom = true;
      }
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
            console.log(res);

            if (
              res.obj.title == 'SalesPerson Ranking' &&
              this.Performance == 'Load'
            ) {
              if (res.obj.stores != '' && res.obj.stores != '0') {
                this.selectedstorevalues = [];
                var result = res.obj.stores.split(',');
                this.selectedstorevalues = result.map(function (x) {
                  return parseInt(x, 10);
                });
              }
              if (res.obj.stores == '' || res.obj.stores == '0') {
                this.selectedstorevalues = this.stores.map(function (a) {
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
        console.log(error);
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
  }

  multipleorsingle(block, e) {
    if (block == 'TB') {
      this.toporbottom = [];
      this.toporbottom.push(e);
    }
  }

  viewreport() {
    const data = {
      Reference: 'SPR',
      FromDate: this.FromDate,
      ToDate: this.ToDate,
      TotalReport: this.toporbottom[0],
      storeValues:
        this.selectedstorevalues.toString() == ''
          ? '0'
          : this.selectedstorevalues.toString(),
      dateType: this.DateType,
    };
    this.service.SetReports({
      obj: data,
    });
    this.close();
  }

  save() {}
}
