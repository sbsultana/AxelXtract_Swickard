import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild, } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbCalendar, NgbDateParserFormatter, NgbDate, NgbDateStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormArray, FormGroup, } from '@angular/forms';
import { ApiService } from '../../../../Core/Providers/ApiService/api.service';
import { CalendarCellViewModel } from 'ngx-bootstrap/datepicker/models';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-schedule-reports',
  templateUrl: './schedule-reports.component.html',
  styleUrls: ['./schedule-reports.component.scss']
})
export class ScheduleReportsComponent implements OnInit {

  public selectedItems = [];
  StoresIds: any = []

  @Input() Parentcomponent: any;
  FromDate: any;
  ToDate: any;
  TotalReport: any = 'T';

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  stores: any = [];
  salesPersons: any = [];
  salesManagers: any = [];
  financeManager: any = [];
  selectedStores: any = [];
  public formatOptions = {
    month: 'long'
  };

  Regions:any=[]
  public date = new Date();
  public locales = ['en', 'de', 'fr', 'ar', 'zh'];
  public locale = 'en';

  maxDate: any;
  @ViewChild('warningbtn') warningbtn: ElementRef;
  alertmessage: string;
 



  constructor(private ngbmodel: NgbModal, private renderer: Renderer2, private service: ApiService,
    private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private formBuilder: FormBuilder, private config: NgbDatepickerConfig
  ) {


    this.renderer.listen('window', 'click', (e: Event) => {
      const TagName = e.target as HTMLButtonElement
      if (TagName.className === 'd-block modal fade show modal-static') {

        this.close()
      }
    });
    let today = new Date();
    var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    //  alert(lastDayOfMonth)
    // this.FromDate=today.getFullYear()+("0" + (today.getMonth() + 1)).slice(-2)+'01'

    // this.ToDate=today.getFullYear()+("0" + (today.getMonth() + 1)).slice(-2)+("0" + today.getDate()).slice(-2)
    this.fromDate = new NgbDate(today.getFullYear(), today.getMonth() + 1, 1);
    this.toDate = new NgbDate(today.getFullYear(), today.getMonth() + 1, today.getDate() - 1);
    this.maxDate = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate() - 1
    };
 
   
  }

  month: any
scheduleType:any=[]
  ngOnInit() {
    console.log(this.Parentcomponent);

this.Regions=[
  {"RG_Name":"Eastern"},
  {"RG_Name":"Western "},
  {"RG_Name":"Northern "},
  {"RG_Name":"Southern "},                     
 
]

this.stores=[
  {"ST_Name":"Acura"},
  {"ST_Name":"Audi"},
  {"ST_Name":"BMW"},
  {"ST_Name":"Cadillac"},
  {"ST_Name":"Chevrolet"},
  {"ST_Name":"GMC"},
  {"ST_Name":"Honda"},
  {"ST_Name":"Hyundai"},
  {"ST_Name":"Kia"},
  {"ST_Name":"Lexus"},
  {"ST_Name":"Subharu"},
  {"ST_Name":"Toyota"},
  {"ST_Name":"Suzuki"},
 

]

this.scheduleType=[
  {"ST_Name":"Accrued Bonuses" ,"status":''},
  {"ST_Name":"Accrued Emp Benefits", "status":''},
  {"ST_Name":"Accounts Payable Factory", "status":''},
  {"ST_Name":"AP Finance & Insurance ", "status":''},
  {"ST_Name":"Lien Payoffs", "status":''},
  {"ST_Name":"Accounts Payable Other", "status":'Y'},
  {"ST_Name":"Accounts Payable Trade","status":''},
  {"ST_Name":"AP Vehicle Purchases", "status":''},
  {"ST_Name":"AP We Owe", "status":''},
  {"ST_Name":"AR Finance & Insurance", "status":'Y'},
  {"ST_Name":"After Market Warranty","status":''},
  {"ST_Name":"Body Shop", "status":''},
  {"ST_Name":"Cash","status":''},

  {"ST_Name":"Contracts in Transit", "status":''},
  {"ST_Name":"COD", "status":''},
  {"ST_Name":"Accounts Receivable Employees", "status":''},
  {"ST_Name":"Factory Incentives", "status":''},
  {"ST_Name":"Finance Reserve", "status":'Y'},
  {"ST_Name":"Fixed Assets", "status":''},
  {"ST_Name":"Factory Other","status":''},
  {"ST_Name":"Factory Warranty", "status":'Y'},
  {"ST_Name":"Hold Back","status":''},
  {"ST_Name":"Intercompany", "status":''},
  {"ST_Name":"Inventory Other","status":''},
  {"ST_Name":"New Inventory", "status":''},
  {"ST_Name":"Note Payable ST", "status":'Y'},

  {"ST_Name":"Other", "status":'Y'},
  {"ST_Name":"Prepaid", "status":'Y'},
  {"ST_Name":"Parts and Service", "status":''},
  {"ST_Name":"Sublet", "status":''},
  {"ST_Name":"Used Inventory", "status":''},
  {"ST_Name":"Vehicle Receivables", "status":''},
  {"ST_Name":"Vehicle Sales", "status":''},
  {"ST_Name":"Wholesale", "status":''},
  {"ST_Name":"Work in Process Inventory", "status":''},

]
    this.selectedStores.push("0")
    this.month = new Date()
    // this.getStores();

    this.service.GetHeaderData().subscribe(res => {
      if(res.obj.title == 'Sales Gross'){
      this.neworused=res.obj.dealType.split(',')
      this.retailorlease=res.obj.saleType.split(',')  
      this.dealstatus= res.obj.dealStatus.split(',')
      }
    })

  }



  save() {
  }
  onOpenCalendar(container) {
    container.setViewMode('month');
    container.monthSelectHandler = (event: CalendarCellViewModel): void => {
      container.value = event.date;
      return;
    };
  }

  changeDate(e) {
    let year = e.getFullYear()
    let lastDay = new Date(e.getFullYear(), e.getMonth() + 1, 0);
    let month = parseInt(("0" + (lastDay.getMonth() + 1)).slice(-2))
    let day = parseInt(("0" + lastDay.getDate()).slice(-2))
    this.fromDate = new NgbDate(year, month, 1);
    this.toDate = new NgbDate(year, month, day);
  }
  close() {
    this.ngbmodel.dismissAll()
  }
  getrange(e, range) {
    if (range == 'F') {
      this.FromDate = e.target.value
      let date = new Date(this.FromDate)
      let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      let mnth = ("0" + (lastDay.getMonth() + 1)).slice(-2)
      let day = ("0" + lastDay.getDate()).slice(-2)
      let lastDate = [lastDay.getFullYear(), mnth, day].join("-");
      this.ToDate = lastDate
    }
    if (range == 'T') {
      this.ToDate = e.target.value
    }

  }
  viewreport() {
  
  }
 
  onDateSelection(date: NgbDate) {

    console.log(date)
    if (!this.fromDate && !this.toDate) {
      console.log('1')
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      console.log('2')
      // 
      this.toDate = date;


    } else {
      console.log('3')
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
  datagrp: any = []



  getStores() {
    this.StoresIds = []
    const obj = {
      "AU_ID": 1
    };
    this.service.postmethod('xtract/GetStores', obj).subscribe(
      res => {
        if (res.status == 200) {
          this.stores = res.response
          console.log(this.stores);
      
        }
        else {
          alert('Invalid Details');
        }
      },
      (error) => {
        console.log(error);
      })
  }

 
  selectedDataGrouping: any = []
  pushvalue(val) {
    if (val.state == false) {
      if (this.selectedDataGrouping.length >= 3) {
        alert('Select up to 3 Filters only To Group Your Data')
      }
      else {
        val.state = true
        this.selectedDataGrouping.push(val)
      }
    }
    else {
      val.state = false;
      this.selectedDataGrouping.splice(this.selectedDataGrouping.indexOf(val), 1)
    }
    console.log(this.selectedDataGrouping)
  }
  neworused: any = ['New', 'Used']
  retailorlease: any = ['Retail', 'Lease', 'Misc'];
  includeorexclude: any = ['I'];
  dealstatus: any = ['Delivered', 'Capped', 'Finalized'];
  selecttarget: any = ['F'];
  toporbottom: any = ['T'];
  includecharges: any = ['N'];
  Transactorgl: any = ['T'];


  Section:any=['S']
  multipleorsingle(block, e) {
    if (block == 'Section') {
      this.Section = [];
      this.Section.push(e)
    }
    if (block == 'RL') {
      const index = this.retailorlease.findIndex(i => i == e)
      if (index >= 0) {
        this.retailorlease.splice(index, 1)
      }
      else {
        this.retailorlease.push(e)
      }
    }
    if (block == 'PH') {
      this.includeorexclude = [];
      this.includeorexclude.push(e)
    }
    if (block == 'DS') {
      const index = this.dealstatus.findIndex(i => i == e)
      if (index >= 0) {
        this.dealstatus.splice(index, 1)
      }
      else {
        this.dealstatus.push(e)
      }
    }
    if (block == 'ST') {
      const index = this.selecttarget.findIndex(i => i == e)
      if (index >= 0) {
        this.selecttarget.splice(index, 1)
      }
      else {
        this.selecttarget.push(e)
      }
    }
    if (block == 'TB') {
      this.toporbottom = [];
      this.toporbottom.push(e)
    }
    if (block == 'IC') {
      this.includecharges = [];
      this.includecharges.push(e)
    }
    if (block == 'SRC') {
      this.Transactorgl = [];
      this.Transactorgl.push(e)

    }
  }


 
}
