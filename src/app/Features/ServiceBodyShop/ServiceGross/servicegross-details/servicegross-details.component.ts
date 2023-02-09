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
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-servicegross-details',
  templateUrl: './servicegross-details.component.html',
  styleUrls: ['./servicegross-details.component.scss'],
})
export class ServicegrossDetailsComponent implements OnInit {
  @Input() Servicedetails: any = [];
  ServicePersonDetails: any = [];
  NoData: boolean;
  spinnerLoader: boolean = true;
  spinnerLoadersec: boolean = false;
  pageNumber: any = 0;

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

  ngOnInit() {
    // this.spinnerLoader=false
    console.log(this.Servicedetails);
    this.GetDetails();
  }
  details: any = [];
  GetDetails() {
    // this.spinner.show()
    const obj = {
      startdealdate: this.Servicedetails[0].StartDate,
      enddealdate: this.Servicedetails[0].EndDate,
      var1: this.Servicedetails[0].var1,
      var2: this.Servicedetails[0].var2,
      var3: '',
      var1Value: this.Servicedetails[0].var1Value,
      var2Value: this.Servicedetails[0].var2Value,
      var3Value: '',
      GrossTypeLabor:
        this.Servicedetails[0].Grosstype[0] == 'Labour_0' ? 'Y' : '',
      GrossTypeParts:
        this.Servicedetails[0].Grosstype[1] == 'Parts_1' ? 'Y' : '',
      GrossTypeMisc: this.Servicedetails[0].Grosstype[2] == 'Misc_2' ? 'Y' : '',
      GrossTypeSublet:
        this.Servicedetails[0].Grosstype[3] == 'Sublet_3' ? 'Y' : '',
      PageNumber: this.pageNumber,
      PageSize: '100',
      // "startdealdate":this.Servicedetails[0].StartDate,
      // "enddealdate":this.Servicedetails[0].EndDate,
      // "var1": "Store_Name",
      // "var2": "ServiceAdvisor_Name",
      // "var3": "",
      // "var1Value":this.Servicedetails[0].var1Value,
      // "var2Value":this.Servicedetails[0].var2Value,
      // "var3Value":this.Servicedetails[0].var3Value
    };
    this.apiSrvc
      .postmethod('xtract/GetServicesGrossSummaryDetails_V1', obj)
      .subscribe((res) => {
        if (res.status == 200) {
          this.details = res.response;
          this.ServicePersonDetails = [
            ...this.ServicePersonDetails,
            ...this.details,
          ];
          // console.log(this.ServicePersonDetails);
          // this.spinner.hide()
          this.spinnerLoader = false;
          this.spinnerLoadersec = false;

          if (this.ServicePersonDetails.length > 0) {
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
