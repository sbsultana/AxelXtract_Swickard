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
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-floorplanrecon-details',
  templateUrl: './floorplanrecon-details.component.html',
  styleUrls: ['./floorplanrecon-details.component.scss'],
})
export class FloorplanreconDetailsComponent implements OnInit {
  @Input() Fpdetails: any;
  as_id: any = [];
  FPDetailsData: any = [];
  pageNumber: any = 1;
  LatestDate: any;

  details: any = [];
  NoData: boolean;
  loadMore = 1;
  spinnerLoader: boolean = true;
  componentState: boolean = false;
  constructor(
    private ngbmodel: NgbModal,
    private renderer: Renderer2,
    private apiSrvc: ApiService,
    private ngbmodalActive: NgbActiveModal,
    private excelService: ExcelService
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      const TagName = e.target as HTMLButtonElement;
      // console.log(TagName.className);
    });
  }

  ngOnInit(): void {
    console.log(this.Fpdetails);
    this.GetDetails();
  }

  GetDetails() {
    // const format = 'MM-yyyy';
    // const locale = 'en-US';
    // const myDate = this.Fpdetails.LatestDate;
    // const formattedDate = formatDate(myDate, format, locale);
    // this.LatestDate = formattedDate

    const Obj = {
      cora_acct_Code: this.Fpdetails.STORECODE,
      control: this.Fpdetails.Stock,
      accountnumber: this.Fpdetails.ACCOUNT,

      //  "PageNumber": this.pageNumber,
      //  "PageSize": "100"
    };
    console.log(Obj);

    this.apiSrvc
      .postmethod('xtract/GetCITFloorPlanDetail', Obj)
      .subscribe((res) => {
        if (res.status == 200) {
          this.details = res.response;
          this.FPDetailsData = [...this.FPDetailsData, ...this.details];
          // this.FPDetailsData=res.response
          console.log(this.FPDetailsData);
          // this.spinner.hide()
          this.spinnerLoader = false;
          if (this.FPDetailsData.length > 0) {
            this.NoData = false;
          } else {
            this.NoData = true;
          }
        }
      });
  }
  updateVerticalScroll(event): void {
    console.log(event);

    if (
      event.target.scrollTop + event.target.clientHeight >=
      event.target.scrollHeight
    ) {
      if (this.pageNumber == 1) {
        this.spinnerLoader = true;
        this.pageNumber++;
        this.GetDetails();
      } else {
        if (this.details.length > 0) {
          this.spinnerLoader = true;
          this.pageNumber++;
          this.GetDetails();
        }
      }
    }
  }
  public inTheGreen(value: number): boolean {
    if (value >= 0) {
      return true;
    }
    return false;
  }

  close() {
    this.ngbmodalActive.close();
  }
  onclose() {
    this.ngbmodalActive.close();
  }
  //   exportAsXLSX(){
  //     let element = document.getElementById('Details')
  //     const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
  //     const wb:XLSX.WorkBook = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(wb, ws, "sheet1");
  //     XLSX.writeFile(wb, this.Fpdetails.NAME+' Details.xlsx')
  //  }
}
