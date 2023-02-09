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
@Component({
  selector: 'app-salesrecon-details',
  templateUrl: './salesrecon-details.component.html',
  styleUrls: ['./salesrecon-details.component.scss'],
})
export class SalesreconDetailsComponent implements OnInit {
  @Input() SRDetails: any = [];
  SRSalesPersonDetails: any = [];
  NoData: boolean;
  spinnerLoader: boolean = true;
  constructor(
    private ngbmodel: NgbModal,
    private renderer: Renderer2,
    private apiSrvc: ApiService,
    private ngbmodalActive: NgbActiveModal,
    private excelService: ExcelService
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      const TagName = e.target as HTMLButtonElement;
      if (TagName.className === 'd-block modal fade show modal-static') {
        // this.closeBtn.nativeElement.click();
        this.close();
      }
    });
  }
  pageNumber: any = 0;
  spinnerLoadersec: boolean = false;
  details: any = [];

  ngOnInit(): void {
    this.GetSRDetails();
  }

  GetSRDetails() {
    console.log(this.SRDetails);

    const obj = {
      as_id: this.SRDetails.AS_ID,
      Date: this.SRDetails.DATE,
      datarow_lable1: this.SRDetails.SR_LABLE1,
      datarow_lable2_code: this.SRDetails.SR_LABLE2,
    };
    this.apiSrvc
      .postmethod('xtract/GetSalesReconciliationDetails', obj)
      .subscribe((res) => {
        if (res.status == 200) {
          this.details = res.response;
          this.SRSalesPersonDetails = [
            ...this.SRSalesPersonDetails,
            ...this.details,
          ];

          console.log(this.SRSalesPersonDetails);
          // this.spinner.hide()
          this.spinnerLoader = false;
          this.spinnerLoadersec = false;
          if (this.SRSalesPersonDetails.length > 0) {
            this.NoData = false;
          } else {
            this.NoData = true;
          }
        }
      });
  }
  public inTheGreen(value: number): boolean {
    if (value >= 0) {
      return true;
    }
    return false;
  }
  close() {
    this.ngbmodel.dismissAll();
  }

  currentElement: string;
  @ViewChild('scrollOne') scrollOne: ElementRef;
  @ViewChild('scrollTwo') scrollTwo: ElementRef;
  updateVerticalScroll(event): void {
    if (this.currentElement === 'scrollTwo') {
      this.scrollOne.nativeElement.scrollTop = event.target.scrollTop;
      if (
        event.target.scrollTop + event.target.clientHeight >=
        event.target.scrollHeight
      ) {
        // alert("reached at bottom");
        if (this.pageNumber == 0) {
          this.spinnerLoadersec = true;
          this.pageNumber++;
          this.GetSRDetails();
        } else {
          if (this.details.length > 0) {
            this.spinnerLoadersec = true;
            this.pageNumber++;
            this.GetSRDetails();
          }
        }
      }
    } else if (this.currentElement === 'scrollOne') {
      this.scrollTwo.nativeElement.scrollTop = event.target.scrollTop;
      if (
        event.target.scrollTop + event.target.clientHeight >=
        event.target.scrollHeight
      ) {
        if (this.pageNumber == 0) {
          this.spinnerLoadersec = true;
          this.pageNumber++;
          this.GetSRDetails();
        } else {
          if (this.details.length > 0) {
            this.spinnerLoadersec = true;
            this.pageNumber++;
            this.GetSRDetails();
          }
        }
      }
    }
  }

  updateCurrentElement(element: 'scrollOne' | 'scrollTwo') {
    this.currentElement = element;
  }
}
