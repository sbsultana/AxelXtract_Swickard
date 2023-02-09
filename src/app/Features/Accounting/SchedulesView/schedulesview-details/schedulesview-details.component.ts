import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../../Core/Providers/ApiService/api.service';
import { ExcelService } from '../../../../Core/Providers/ExcelService/excel.service';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Component({
  selector: 'app-schedulesview-details',
  templateUrl: './schedulesview-details.component.html',
  styleUrls: ['./schedulesview-details.component.scss'],
})
export class SchedulesviewDetailsComponent implements OnInit {
  @Input() svdetails: any = [];
  status = 'true';
  spinnerLoader: boolean = true;
  solutionurl = '';
  constructor(
    private ngbmodel: NgbModal,
    private renderer: Renderer2,
    private apiSrvc: ApiService,
    private ngbmodalActive: NgbActiveModal,
    private datepipe: DatePipe
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      const TagName = e.target as HTMLButtonElement;
      // console.log(TagName.className);
    });
  }
  newsvdetails: any = [];
  ngOnInit(): void {
    console.log(this.svdetails);
    if (this.svdetails.length == 0) {
      this.newsvdetails = JSON.parse(localStorage.getItem('svdetails'));
      this.getStores(this.newsvdetails);

      const data = {
        title: 'Schedules View Details',
        path1: '',
        path2: '',
        path3: '',
      };
      this.apiSrvc.SetHeaderData({
        obj: data,
      });
    } else {
      this.getStores(this.svdetails);
    }
  }
  Account_Details: any = [];
  NoData: boolean = false;
  getdata(e) {
    this.spinnerLoader = true;
    const Obj = {
      AccountNumber: e.header,
      DateVal: this.datepipe.transform(e.date, 'dd-MM-yyyy'),
      Store: this.stores[0].AS_ID,
    };

    this.apiSrvc
      .postmethod('xtract/GetFinacialSummaryTransactionDetails', Obj)
      .subscribe((res) => {
        if (res.status == 200) {
          console.log(res);
          // this.scheduledetails=res.response
          this.Account_Details = res.response;
          console.log(this.Account_Details);
          this.spinnerLoader = false;
          if (this.Account_Details.length > 0) {
            this.NoData = false;
          } else {
            this.NoData = true;
          }
        }
      });
  }
  close() {
    this.ngbmodalActive.close();
  }
  stores: any = [];
  getStores(e) {
    const obj = {
      AU_ID: 1,
    };
    this.apiSrvc.postmethod('xtract/GetStores', obj).subscribe((res) => {
      if (res.status == 200) {
        this.stores = res.response.filter(
          (val) => val.CORA_ACCT_CODE == e.store
        );

        this.getdata(e);
      }
    });
  }
  exportAsXLSX() {
    let element = document.getElementById('Schedulesview-details');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'sheet1');
    XLSX.writeFile(wb, 'Schedulesview-details.xlsx');
  }

  setdata() {
    let index = window.location.href.lastIndexOf('/');

    this.solutionurl =
      window.location.href.substring(0, index) + '/scheduleviewdetails';
    console.log(
      this.solutionurl,
      window.location.href.substring(index),
      window.location.href,
      index
    );

    localStorage.setItem('svdetails', JSON.stringify(this.svdetails));
    localStorage.setItem('status', 'false');
  }

  public inTheGreen(value: number): boolean {
    if (value >= 0) {
      return true;
    }
    return false;
  }
}
