import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ApiService } from '../../../../Core/Providers/ApiService/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-salesgross-details',
  templateUrl: './salesgross-details.component.html',
  styleUrls: ['./salesgross-details.component.scss'],
})
export class SalesgrossDetailsComponent implements OnInit {
  @Input() Salesdetails: any = [];
  SalesPersonDetails: any = [];
  NoData: boolean;
  spinnerLoader: boolean = true;
  constructor(
    private ngbmodel: NgbModal,
    private renderer: Renderer2,
    private apiSrvc: ApiService,
    private spinner: NgxSpinnerService
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
  ngOnInit() {
    // console.log(this.Salesdetails)
    this.GetDetails();
  }
  GetDetails() {
    // this.spinner.show()
    const obj = {
      startdealdate: this.Salesdetails[0].StartDate,
      enddealdate: this.Salesdetails[0].EndDate,
      dealtype: this.Salesdetails[0].dealtype,
      saletype: this.Salesdetails[0].saletype,
      dealstatus: this.Salesdetails[0].dealstatus,
      var1: this.Salesdetails[0].var1,
      var2: this.Salesdetails[0].var2,
      var3: this.Salesdetails[0].var3,
      var1Value: this.Salesdetails[0].var1Value,
      var2Value: this.Salesdetails[0].var2Value,
      var3Value: this.Salesdetails[0].var3Value,
      PageNumber: this.pageNumber,
      PageSize: '100',
      // "store_id": this.Salesdetails[0].storeId,
      // "spid":  this.Salesdetails[0].SPID == undefined || this.Salesdetails[0].SPID == null || this.Salesdetails[0].SPID == '' ? 0 : this.Salesdetails[0].SPID,
      // "startdealdate": this.Salesdetails[0].StartDate,
      // "enddealdate": this.Salesdetails[0].EndDate,
      // "dealtype": this.Salesdetails[0].dealType,
      // "type": ""
    };
    this.apiSrvc
      .postmethod('xtract/GetSalesGrossSummaryDetails', obj)
      .subscribe((res) => {
        if (res.status == 200) {
          this.details = res.response;
          this.SalesPersonDetails = [
            ...this.SalesPersonDetails,
            ...this.details,
          ];

          console.log(this.SalesPersonDetails);
          // this.spinner.hide()
          this.spinnerLoader = false;
          this.spinnerLoadersec = false;
          if (this.SalesPersonDetails.length > 0) {
            this.NoData = false;
          } else {
            this.NoData = true;
          }
        }
      });
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
          this.GetDetails();
        } else {
          if (this.details.length > 0) {
            this.spinnerLoadersec = true;
            this.pageNumber++;
            this.GetDetails();
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
          this.GetDetails();
        } else {
          if (this.details.length > 0) {
            this.spinnerLoadersec = true;
            this.pageNumber++;
            this.GetDetails();
          }
        }
      }
    }
  }

  updateCurrentElement(element: 'scrollOne' | 'scrollTwo') {
    this.currentElement = element;
  }
}
