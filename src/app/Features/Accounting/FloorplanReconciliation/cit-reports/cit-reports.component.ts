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
  selector: 'app-cit-reports',
  templateUrl: './cit-reports.component.html',
  styleUrls: ['./cit-reports.component.scss'],
})
export class CitReportsComponent implements OnInit {
  StoresIds: any = [];
  @Input() Parentcomponent: any;
  stores: any = [];
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  Performance: any = 'Load';
  maxDate: any;
  tab = 'S';
  constructor(
    private ngbmodel: NgbModal,
    private renderer: Renderer2,
    private service: ApiService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private formBuilder: FormBuilder,
    private config: NgbDatepickerConfig
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      const TagName = e.target as HTMLButtonElement;
      if (TagName.className === 'd-block modal fade show modal-static') {
        this.close();
      }
    });
  }
  month: any;
  ngOnInit() {
    this.maxDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
    };
    console.log(this.Parentcomponent);
    this.getStores();
  }
  save() {
    // console.log(this.DropdownFiltersForm.value)
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
  close() {
    this.ngbmodel.dismissAll();
    this.Performance = 'Unload';
  }
  viewreport() {
    let sname: any = 'All Stores';
    if (this.selectedStore.toString() !== '0') {
      sname = this.stores.filter((e) => e.AS_ID == this.selectedStore);
      sname = sname[0].DEALER_NAME;
    }
    const data = {
      Reference: this.Parentcomponent,
      storeValues:
        this.selectedstorevalues.length == this.stores.length
          ? 0
          : this.selectedstorevalues[0],
      // FromDate: this.fromDate.year + '-' + ('0' + this.fromDate.month).slice(-2) + '-' + ('0' + this.fromDate.day).slice(-2),
      // ToDate: this.toDate.year + '-' + ('0' + this.toDate.month).slice(-2) + '-' + ('0' + this.toDate.day).slice(-2),
      Sname: sname,
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
  getStores() {
    const obj = {
      AU_ID: 1,
    };
    this.service.postmethod('xtract/GetStores', obj).subscribe(
      (res) => {
        if (res.status == 200) {
          this.stores = res.response;
          this.selectedstorevalues = [];
          // console.log(this.stores);
          this.service.GetHeaderData().subscribe((res) => {
            if (res.obj.title == 'CIT Report' && this.Performance == 'Load') {
              // this.selectedStore = res.obj.stores
              console.log(this.selectedstorevalues);

              if (res.obj.stores != '' && res.obj.stores != '0') {
                this.selectedstorevalues = [];
                this.selectedstorevalues.push(parseInt(res.obj.stores));
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

  selectedstorevalues: any = [];
  individualStores(e) {
    if (e == 0) {
      if (this.selectedstorevalues.length == this.stores.length) {
        this.selectedstorevalues = [];
      } else {
        this.selectedstorevalues = this.stores.map(function (a) {
          return a.AS_ID;
        });
      }
    } else {
      this.selectedstorevalues = [];
      this.selectedstorevalues.push(e);
    }
  }

  Tabs(e) {
    this.tab = e;
  }
}
