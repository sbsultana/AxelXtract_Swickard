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
  selector: 'app-schedulesview-report',
  templateUrl: './schedulesview-report.component.html',
  styleUrls: ['./schedulesview-report.component.scss'],
})
export class SchedulesviewReportComponent implements OnInit {
  StoresIds: any = [];
  @Input() Parentcomponent: any;
  stores: any = [];
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  Performance: any = 'Load';
  today = new Date();
  previous: Date;
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
  spinnerLoader: boolean = false;
  month: any;

  ngOnInit() {
    this.getStores();
    this.getSchedules();
  }
  Tabs(e) {
    this.tab = e;
  }
  close() {
    this.ngbmodel.dismissAll();
    this.Performance = 'Unload';
  }

  selectedStore: any = '0';
  selectedstorecode: any = [];
  StoreFilter(val) {
    console.log(val.target.value);
    this.selectedStore = val.target.value;
  }

  getStores() {
    this.spinnerLoader = true;
    const obj = {
      AU_ID: 1,
    };
    this.service.postmethod('xtract/GetStores', obj).subscribe(
      (res) => {
        if (res.status == 200) {
          this.stores = res.response;
          // console.log(this.stores);
          this.spinnerLoader = false;
          this.service.GetHeaderData().subscribe((res) => {
            if (
              res.obj.title == 'Schedules View' &&
              this.Performance == 'Load'
            ) {
              if (res.obj.stores != '' && res.obj.stores != '0') {
                this.selectedStore = [];
                var result = res.obj.stores.split(',');
                this.selectedStore = result.map(function (x) {
                  return parseInt(x, 10);
                });
                this.selectedstorecode = res.obj.storecode.split(',');
                // this.selectedstorecode =
                // this.selectedStore.push(parseInt(res.obj.stores));
                // this.Categories[1].Cat_length=this.selectedStore.length
                console.log(this.selectedStore);
              }
              if (res.obj.stores == '' || res.obj.stores == '0') {
                this.selectedStore = this.stores.map(function (a) {
                  return a.AS_ID;
                });
                this.selectedstorecode = this.stores.map(function (a) {
                  return a.CORA_ACCT_CODE;
                });
                console.log(this.selectedStore);
              }
            }
            console.log(this.selectedstorecode);
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
  schedules: any = [];
  getSchedules() {
    this.spinnerLoader = true;
    const obj = {};
    this.service.postmethod('xtract/GetSchedulesTypes', obj).subscribe(
      (res) => {
        if (res.status == 200) {
          this.schedules = res.response;
          // console.log(this.stores);
          // this.spinnerLoader = false;
          this.service.GetHeaderData().subscribe((res) => {
            if (
              res.obj.title == 'Schedules View' &&
              this.Performance == 'Load'
            ) {
              if (res.obj.schedule != '') {
                this.selectedschedule = parseInt(res.obj.schedule);
                this.schedulename = res.obj.schedulename;
              }
            }
            console.log(this.schedulename);
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
  individualStores(e, code) {
    if (e == 0) {
      if (this.selectedStore.length == this.stores.length) {
        this.selectedStore = [];
        this.selectedstorecode = [];
      } else {
        this.selectedStore = this.stores.map(function (a) {
          return a.AS_ID;
        });
        this.selectedstorecode = this.stores.map(function (a) {
          return a.CORA_ACCT_CODE;
        });
      }
      console.log(this.selectedstorecode);
    } else {
      const index = this.selectedStore.findIndex((i) => i == e);
      const indexcode = this.selectedstorecode.findIndex((i) => i == code);

      if (index >= 0) {
        this.selectedStore.splice(index, 1);
        this.selectedstorecode.splice(indexcode, 1);
      } else {
        this.selectedStore.push(e);
        this.selectedstorecode.push(code);
      }
      console.log(this.selectedstorecode);
    }
  }
  selectedschedule: any = '0';
  schedulename: any = '';
  schedulechange(e) {
    let data = this.schedules.filter((val) => val.S_ID == e);
    this.schedulename = data[0].S_NAME;
    console.log(data, this.schedulename);
  }
  viewreport() {
    // let sname: any = 'All Stores'
    // if (this.selectedStore.toString() !== "0") {
    //   sname = this.stores.filter(e => e.AS_ID == this.selectedStore)
    //   sname = sname[0].DEALER_NAME
    // }

    const data = {
      Reference: this.Parentcomponent,
      storeValues:
        this.selectedStore.length == this.stores.length
          ? 0
          : this.selectedStore.toString(),
      schedule: this.selectedschedule,
      storecode: this.selectedstorecode.toString(),
      schedulename: this.schedulename,
    };
    console.log(data);
    this.service.SetReports({
      obj: data,
    });
    this.Performance = 'Unload';
    this.close();
  }
}
