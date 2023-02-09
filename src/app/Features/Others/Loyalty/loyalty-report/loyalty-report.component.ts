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
  selector: 'app-loyalty-report',
  templateUrl: './loyalty-report.component.html',
  styleUrls: ['./loyalty-report.component.scss'],
})
export class LoyaltyReportComponent implements OnInit {
  @Input() Parentcomponent: any;
  public today = new Date();
  previous: Date;
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  Performance: any = 'Load';
  month: any;
  tab = 'SM';
  frommonth: any;
  DateType = 'MTD';
  custom: boolean = false;
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

  ngOnInit(): void {
    this.DateType = localStorage.getItem('time');
    this.apiSrvc.GetHeaderData().subscribe((res) => {
      if (this.Performance == 'Load') {
        this.month = res.obj.Month;
      }
    });
    this.previous = new Date(
      this.today.getFullYear(),
      this.today.getMonth(),
      1
    );
  }
  opencalender() {
    this.custom = true;
    this.DateType = 'SM';
    document.getElementById('DateOfBirth').click();
  }
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
  public toprevious: Date;
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
  close() {
    this.ngbmodel.dismissAll();
    this.Performance = 'Unload';
  }
  Tabs(e) {
    this.tab = e;
  }
  viewreport() {
    const data = {
      Reference: this.Parentcomponent,
      month: this.month,
    };
    console.log(data);
    this.apiSrvc.SetReports({
      obj: data,
    });
    this.Performance = 'Unload';
    this.close();
  }
}
