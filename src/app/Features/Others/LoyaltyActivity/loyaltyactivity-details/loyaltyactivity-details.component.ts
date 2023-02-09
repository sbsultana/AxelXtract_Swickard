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
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-loyaltyactivity-details',
  templateUrl: './loyaltyactivity-details.component.html',
  styleUrls: ['./loyaltyactivity-details.component.scss'],
})
export class LoyaltyactivityDetailsComponent implements OnInit {
  @Input() Loyaltydetails: any = [];
  spinnerLoader: boolean = false;
  NoData: boolean = false;
  LoyaltyActivity: any = [];

  constructor(
    private ngbmodel: NgbModal,
    private renderer: Renderer2,
    private apiSrvc: ApiService,
    private spinner: NgxSpinnerService,
    private pipe: DatePipe
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      const TagName = e.target as HTMLButtonElement;
      if (TagName.className === 'd-block modal fade show modal-static') {
        // this.closeBtn.nativeElement.click();
        this.close();
      }
    });
  }

  ngOnInit(): void {
    console.log(this.Loyaltydetails[0]);
    this.GetDetails();
  }

  GetDetails() {
    // this.spinner.show()
    this.spinnerLoader = true;
    this.NoData = false;
    let to = this.pipe.transform(this.Loyaltydetails[0].to, 'dd MMM yyyy');
    let from = this.pipe.transform(this.Loyaltydetails[0].from, 'dd MMM yyyy');
    const obj = {
      // startdealdate: this.Loyaltydetails[0].from,
      // enddealdate: this.Loyaltydetails[0].to,
      // dealtype: this.Loyaltydetails[0].colName,
      // saletype: this.Loyaltydetails[0].colName,
      // dealstatus: this.Loyaltydetails[0].store_id,
      EmpID: this.Loyaltydetails[0].cust_id,
      StoreID: this.Loyaltydetails[0].store_id,
      StartDate: from,
      EndDate: to,
      ActivityType: this.Loyaltydetails[0].colName,
    };
    this.apiSrvc
      .postmethod('xtract/GetLoyaltyActivityDetail', obj)
      .subscribe((res) => {
        if (res.status == 200) {
          this.LoyaltyActivity = res.response;
          // this.LoyaltyActivity= [ ...this.LoyaltyActivity, ...this.details];
          console.log(this.LoyaltyActivity);
          // this.spinner.hide()
          this.spinnerLoader = false;
          if (this.LoyaltyActivity.length > 0) {
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
}
