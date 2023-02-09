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
  selector: 'app-loyaltyactivity-report',
  templateUrl: './loyaltyactivity-report.component.html',
  styleUrls: ['./loyaltyactivity-report.component.scss'],
})
export class LoyaltyactivityReportComponent implements OnInit {
  StoresIds: any = [];
  @Input() Parentcomponent: any;
  stores: any = [];
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  Performance: any = 'Load';
  // maxDate: any;
  tab = 'C';

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
    });
  }
  month: any;

  bsValue = new Date();
  bsRangeValue: Date[];
  minDate: Date;
  maxDate: Date;
  ngOnInit() {
    this.maxDate = new Date();
    // this.minDate.setDate(this.minDate.getDate() + 10);
    this.maxDate.setDate(this.maxDate.getDate());
    // this.getStores();
    this.service.GetHeaderData().subscribe((res) => {
      if (this.Performance == 'Load') {
        if (res.obj.title == 'Loyalty Activity Report') {
          this.FromDate = res.obj.fromdate.replace(/-/g, '/');
          this.ToDate = res.obj.todate.replace(/-/g, '/');
          // let start = new Date('11/12/2022');
          // let end = new Date('11/15/2022');
          this.bsRangeValue = [this.FromDate, this.ToDate];
        }
      }
    });
  }
  save() {
    // console.log(this.DropdownFiltersForm.value)
  }

  FromDate: any;
  ToDate: any;
  dateRangeCreated($event) {
    console.log($event);
    if ($event !== null) {
      let startDate = $event[0].toJSON();
      let endDate = $event[1].toJSON();
      console.log(startDate, endDate);

      this.FromDate = this.pipe.transform(startDate, 'MM/dd/yyyy');
      this.ToDate = this.pipe.transform(endDate, 'MM/dd/yyyy');

      console.log(this.FromDate);
      console.log(this.ToDate);
    }
  }
  opencalender() {
    document.getElementById('DateOfBirth').click();
  }

  close() {
    this.ngbmodel.dismissAll();
    this.Performance = 'Unload';
  }
  viewreport() {
    // let sname: any = 'All Stores'
    // if (this.selectedStore.toString() !== "0") {
    //   sname = this.stores.filter(e => e.AS_ID == this.selectedStore)
    //   sname = sname[0].DEALER_NAME
    // }
    const data = {
      Reference: this.Parentcomponent,

      FromDate: this.FromDate,
      ToDate: this.ToDate,
    };
    console.log(data);
    this.service.SetReports({
      obj: data,
    });
    this.Performance = 'Unload';
    this.close();
  }
  selectedStore: any = '0';
  StoreFilter(val) {
    console.log(val.target.value);
    this.selectedStore = val.target.value;
  }
}
