import { Component, Input, OnInit, Renderer2 } from '@angular/core';
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
import { ExcelService } from '../../../../Core/Providers/ExcelService/excel.service';
import { CalendarCellViewModel } from 'ngx-bootstrap/datepicker/models';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-financialstatement-report',
  templateUrl: './financialstatement-report.component.html',
  styleUrls: ['./financialstatement-report.component.scss'],
})
export class FinancialstatementReportComponent implements OnInit {
  public today = new Date();
  public previous = new Date(
    this.today.getFullYear(),
    this.today.getMonth() - 1,
    1
  );
  StoresIds: any = [];
  @Input() Parentcomponent: any;
  stores: any = [];
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  Performance: any = 'Load';
  // const lastMonth = new Date();
  tab = 'ST';
  filter = 'StoreSummary';
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
        // this.close()
      }
    });
  }
  month: any;
  ngOnInit(): void {
    // this.Storeormonth('StoreSummary');
    this.filter = 'StoreSummary';
    // this.date = new Date(lastMonth.setMonth(lastMonth.getMonth() - 1));
    this.getStores();
    this.service.GetHeaderData().subscribe((res) => {
      if (this.Performance == 'Load') {
        if (res.obj.title == 'Financial Statement') {
          this.month = new Date(res.obj.Month);
          console.log(this.month, res.obj.Month, res.obj.filter);
        }
        if (res.obj.filter != '') {
          this.FilterTabs = [];
          this.FilterTabs.push(res.obj.filter);
          if (this.FilterTabs[0] == 'StoreSummary') {
            // this.selectedStore='0'
            this.previous = new Date(
              this.today.getFullYear(),
              this.today.getMonth() - 1,
              1
            );
            this.filter = 'StoreSummary';
          } else {
            this.previous = new Date(
              this.today.getFullYear(),
              this.today.getMonth() - 1,
              1
            );
            this.filter = 'MonthSummary';
          }
        }

        // : data.obj.filters,
        // subfilter: data.obj.subfilters)
      }
    });
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
    let date =
      ('0' + (this.month.getMonth() + 1)).slice(-2) +
      '-01' +
      '-' +
      this.month.getFullYear();
    console.log(date);
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
      month: date,
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
            if (
              res.obj.title == 'Financial Statement' &&
              this.Performance == 'Load'
            ) {
              if (res.obj.store != '' && res.obj.store != '0') {
                this.selectedstorevalues = [];
                this.selectedstorevalues.push(parseInt(res.obj.store));
                console.log(this.selectedstorevalues);
              }
              if (res.obj.store == '' || res.obj.store == '0') {
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

  FilterTabs: any = ['StoreSummary'];
  SubFiltersTab: any = [];
  multipleorsingle(block, e) {
    console.log(block);
    console.log(e);
    if (block == 'FT') {
      this.month = new Date(
        this.today.getFullYear(),
        this.today.getMonth() - 1,
        1
      );
      this.FilterTabs = [];
      this.SubFiltersTab = [];
      this.FilterTabs.push(e);
      if (this.FilterTabs == 'StoreSummary') {
        this.selectedStore = '0';
        this.previous = new Date(
          this.today.getFullYear(),
          this.today.getMonth() - 1,
          1
        );
      } else {
        this.previous = new Date(
          this.today.getFullYear(),
          this.today.getMonth() - 1,
          1
        );
      }
    }
    if (block == 'SFT') {
      this.SubFiltersTab = [];
      this.SubFiltersTab.push(e);
      this.selectedStore = '0';
    }
  }

  Storeormonth(block) {
    if (block == 'Store') {
      this.filter = 'StoreSummary';
      // this.Type = 'Store';
      // this.FilterTabs='StoreSummary'

      this.FilterTabs = [];

      this.FilterTabs.push('StoreSummary');
    } else {
      this.FilterTabs = [];
      this.FilterTabs.push('MonthSummary');
      this.filter = 'MonthSummary';

      // this.Type = 'Month';
    }
  }

  Tabs(e) {
    this.tab = e;
  }
  custom: boolean = false;
  opencalender() {
    this.custom = true;
    // this.DateType = 'SM';
    document.getElementById('DateOfBirth').click();
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
}
