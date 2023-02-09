import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDatepickerConfig,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ApiService } from '../../../../Core/Providers/ApiService/api.service';

@Component({
  selector: 'app-nightlysales-report',
  templateUrl: './nightlysales-report.component.html',
  styleUrls: ['./nightlysales-report.component.scss'],
})
export class NightlysalesReportComponent implements OnInit {
  @ViewChild('multiSelect') multiSelect;
  public data: any;
  public strsettings: IDropdownSettings;
  public selectedItems = [];
  ChangeDate = new Date(new Date().setDate(new Date().getDate() - 1))
    .toISOString()
    .split('T')[0];

  StoresIds: any = [];
  selectedsite: any = '0';

  @Input() Parentcomponent: any;
  FromDate: any;
  ToDate: any;
  TotalReport: any = 'T';
  DropdownFiltersForm: FormGroup;
  DropDowns: FormGroup;

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  stores: any = [];
  selectedstore: any = '0';
  selectedStores: any = [];
  public formatOptions = {
    month: 'long',
  };

  public date = new Date();
  public locales = ['en', 'de', 'fr', 'ar', 'zh'];
  public locale = 'en';
  activeTab: any = '1';
  cvfilter: any = '';
  Sortby: any = 'TR';
  maxDate: any;
  @ViewChild('warningbtn') warningbtn: ElementRef;
  alertmessage: string;

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
    let today = new Date();
    var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    this.fromDate = new NgbDate(today.getFullYear(), today.getMonth() + 1, 1);
    this.toDate = new NgbDate(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate() - 1
    );
    this.maxDate = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate() - 1,
    };
    this.DropDowns = this.formBuilder.group({
      storesData: [''],
    });
  }

  ngOnInit(): void {
    this.ChangeDate = new Date(new Date().setDate(new Date().getDate() - 1))
      .toISOString()
      .split('T')[0];
    this.strsettings = {
      singleSelection: false,
      idField: 'AS_ID',
      textField: 'DEALER_NAME',
      enableCheckAll: true,
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 2,
      searchPlaceholderText: 'Search Store',
      noDataAvailablePlaceholderText: 'Select Store First',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };
    this.selectedStores.push('0');
    this.getStores();
  }

  close() {
    this.ngbmodel.dismissAll();
  }
  getToday(): string {
    return new Date(new Date().setDate(new Date().getDate()))
      .toISOString()
      .split('T')[0];
  }

  TabClick(e) {
    this.activeTab = e;
  }
  CV_Filters(e) {
    this.cvfilter = e;
  }
  sort(e) {
    this.Sortby = e;
  }

  updatedate(event) {
    this.ChangeDate = event;
    return this.ChangeDate;

    // alert(this.ChangeDate);
  }

  previousstrs: any = [];
  lateststrs: any = [];
  public onDropDownClose(item: any) {
    this.lateststrs = this.DropDowns.value.storesData;
    if (this.lateststrs.length > 0) {
      var diffresult = this.lateststrs.filter(
        (o) => !this.previousstrs.some(({ AS_ID }) => o.AS_ID == AS_ID)
      );
      if (
        diffresult.length > 0 ||
        this.lateststrs.length != this.previousstrs.length
      ) {
        let result = this.lateststrs.map(({ AS_ID }) => AS_ID);
        if (result.length == this.stores.length) {
          this.previousstrs = this.lateststrs;
          diffresult = [];
        } else {
          this.previousstrs = this.lateststrs;
          diffresult = [];
        }
      }
    } else {
      if (this.lateststrs.length != this.previousstrs.length)
        this.previousstrs = [];
    }
  }

  getStores() {
    this.StoresIds = [];
    const obj = {
      AU_ID: 1,
    };
    this.service.postmethod('xtract/GetStores', obj).subscribe(
      (res) => {
        if (res.status == 200) {
          this.stores = res.response;
          this.service.GetHeaderData().subscribe((res) => {
            if (res.obj.title == 'Sales Gross') {
              this.StoresIds = [];
              if (res.obj.stores != '') {
                let strids = res.obj.stores.split(',');
                console.log(strids);
                this.stores.forEach((val) => {
                  strids.forEach((ele) => {
                    if (val.AS_ID == ele) {
                      this.StoresIds.push(val);
                    }
                  });
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

  ngAfterViewInit(): void {
    this.service.GetReports().subscribe((data) => {
      if (data.obj.Reference == 'SRC') {
        this.ChangeDate = data.obj.changeDate;
        this.selectedsite = data.obj.storeValues;
        this.activeTab = data.obj.activeTab;
        this.cvfilter = data.obj.cvfilter;
        this.Sortby = data.obj.sort;
      }
    });
  }
  StoreChange(e) {
    this.selectedsite = e.target.value;
  }

  viewreport() {
    // let selectedstorevalues = 0;
    // if (this.DropDowns.value.storesData.length > 0) {
    //   let selectedstores = this.DropDowns.value.storesData.map(({ AS_ID }) => AS_ID)
    //   if (selectedstores.length == this.stores.length) {
    //     selectedstorevalues = 0
    //   }
    //   else {
    //     selectedstorevalues = this.DropDowns.value.storesData.map(({ AS_ID }) => AS_ID).toString()
    //   }
    // }
    const data = {
      Reference: this.Parentcomponent,
      changeDate: this.ChangeDate,
      storeValues: this.selectedsite,
      activeTab: this.activeTab,
      cvfilter: this.cvfilter,
      sort: this.Sortby,
    };
    this.service.SetReports({
      obj: data,
    });
    this.close();
  }

  save() {
    console.log(this.DropdownFiltersForm.value);
  }
}
