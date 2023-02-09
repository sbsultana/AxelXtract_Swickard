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
  selector: 'app-partsgross-details',
  templateUrl: './partsgross-details.component.html',
  styleUrls: ['./partsgross-details.component.scss'],
})
export class PartsgrossDetailsComponent implements OnInit {
  @Input() Partsdetails: any = [];
  PartsPersonDetails: any = [];
  NoData: boolean;
  spinnerLoader: boolean = true;

  pageNumber: any = 0;
  spinnerLoadersec: boolean = false;
  details: any = [];

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
    console.log(this.Partsdetails);
    this.GetDetails();
  }
  GetDetails() {
    // this.spinner.show()
    const obj = {
      // "startdealdate": this.Partsdetails[0].StartDate,
      // "enddealdate":"10-17-2022",
      // "var1": "DealerName",
      // "var2": "AdvisorName",
      // "var3": "",
      // "var1Value": "Audi of Scottsdale",
      // "var2Value": "Shah Amir",
      // "var3Value": ""

      startdealdate: this.Partsdetails[0].StartDate,
      enddealdate: this.Partsdetails[0].EndDate,
      var1:
        this.Partsdetails[0].var1 == 'Advisor_Name'
          ? 'AdvisorName'
          : this.Partsdetails[0].var1,
      var2:
        this.Partsdetails[0].var2 == 'Advisor_Name'
          ? 'AdvisorName'
          : this.Partsdetails[0].var2,
      var3: '',
      var1Value: this.Partsdetails[0].var1Value,
      var2Value: this.Partsdetails[0].var2Value,
      var3Value: this.Partsdetails[0].var3Value,
      PageNumber: this.pageNumber,
      PageSize: '100',
    };
    this.apiSrvc
      .postmethod('xtract/GetPartsGrossSummaryDetails', obj)
      .subscribe((res) => {
        if (res.status == 200) {
          this.details = res.response;
          this.PartsPersonDetails = [
            ...this.PartsPersonDetails,
            ...this.details,
          ];
          console.log(this.PartsPersonDetails);
          // this.spinner.hide()
          this.spinnerLoader = false;
          this.spinnerLoadersec = false;
          // this.PartsPersonDetails=res.response
          console.log(this.PartsPersonDetails);
          // this.spinner.hide()
          this.spinnerLoader = false;
          if (this.PartsPersonDetails.length > 0) {
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
