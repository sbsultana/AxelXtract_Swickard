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
  selector: 'app-cashflow-reports',
  templateUrl: './cashflow-reports.component.html',
  styleUrls: ['./cashflow-reports.component.scss'],
})
export class CashflowReportsComponent implements OnInit {
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
  }

  close() {
    this.ngbmodel.dismissAll();
    this.Performance = 'Unload';
  }

  selectedStore: any = '0';
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
            if (res.obj.title == 'Cash Flow' && this.Performance == 'Load') {
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
        // console.log(error);
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

  viewreport() {
    // let sname: any = 'All Stores'
    // if (this.selectedStore.toString() !== "0") {
    //   sname = this.stores.filter(e => e.AS_ID == this.selectedStore)
    //   sname = sname[0].DEALER_NAME
    // }

    let sname: any = 'All Stores';
    if (this.selectedStore.length !== this.stores.length) {
      sname = this.stores.filter((e) => e.AS_ID == this.selectedStore[0]);
      sname = sname[0].DEALER_NAME;
    }
    const data = {
      Reference: this.Parentcomponent,
      storeValues:
        this.selectedStore.length == this.stores.length
          ? 0
          : this.selectedStore[0],

      Sname: sname,
      fromdate: '',
      todate: '',
    };
    console.log(data);
    this.service.SetReports({
      obj: data,
    });
    this.Performance = 'Unload';
    this.close();
  }
}
