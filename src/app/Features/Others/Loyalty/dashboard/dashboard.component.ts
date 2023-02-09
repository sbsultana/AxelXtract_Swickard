import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../../Core/Providers/ApiService/api.service';

import { Title } from '@angular/platform-browser';
import {
  trigger,
  transition,
  useAnimation,
  style,
  sequence,
  animate,
  query,
  stagger,
  state,
  keyframes,
} from '@angular/animations';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    // trigger('enterAnimation', [
    //   transition(':enter', [
    //     style({ opacity: 0 }),
    //     animate(
    //       '5s ease',
    //       style({
    //         opacity: 1,
    //         'overflow-x': 'hidden',
    //       })
    //     ),
    //   ]),
    //   transition(':leave', [
    //     style({ opacity: 1 }),
    //     animate('2s ease', style({ opacity: 0 })),
    //   ]),
    // ]),
    trigger('dropDownMenu', [
      transition(':enter', [
        style({ height: 0, overflow: 'hidden' }),
        sequence([animate('1000ms', style({ height: '*' }))]),
      ]),

      transition(':leave', [
        style({ height: '*', overflow: 'hidden' }),
        sequence([animate('1000ms', style({ height: 0 }))]),
      ]),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  LoyaltyData: any = [];
  ReportTotalData: any;
  SalespersonData: any = [
    {
      Sp_Id: 1,
      Salesperson: 'Salesperson',
      LoyalCustCount: '',
      LoyalTotalGross: '',
      LoyalAverage: '',
      Loyalitypercentage: '',
      NonLoyalCustCount: '',
      NonLoyalTotalGross: '',
      NonLoyalAverage: '',
      Differencetotal: '',
      DifferenceAverage: '',
    },
    {
      Sp_Id: 1,
      Salesperson: 'Anderson, Mike',
      LoyalCustCount: 25959,
      LoyalTotalGross: 128996228,
      LoyalAverage: 17373.38,
      Loyalitypercentage: 13,
      NonLoyalCustCount: 145843,
      NonLoyalTotalGross: 290566540,
      NonLoyalAverage: 6493.85,
      Differencetotal: -198693,
      DifferenceAverage: 10879.53,
    },
    {
      Sp_Id: 1,
      Salesperson: 'Blights, Andrea',
      LoyalCustCount: 25959,
      LoyalTotalGross: 128996228,
      LoyalAverage: 17373.38,
      Loyalitypercentage: 13,
      NonLoyalCustCount: 145843,
      NonLoyalTotalGross: 290566540,
      NonLoyalAverage: 6493.85,
      Differencetotal: -198693,
      DifferenceAverage: 10879.53,
    },
    {
      Sp_Id: 1,
      Salesperson: 'Smith, Stephen',
      LoyalCustCount: 25959,
      LoyalTotalGross: 128996228,
      LoyalAverage: 17373.38,
      Loyalitypercentage: 13,
      NonLoyalCustCount: 145843,
      NonLoyalTotalGross: 290566540,
      NonLoyalAverage: 6493.85,
      Differencetotal: -198693,
      DifferenceAverage: 10879.53,
    },
    {
      Sp_Id: 1,
      Salesperson: 'Walsh, Brandon',
      LoyalCustCount: 25959,
      LoyalTotalGross: 128996228,
      LoyalAverage: 17373.38,
      Loyalitypercentage: 13,
      NonLoyalCustCount: 145843,
      NonLoyalTotalGross: 290566540,
      NonLoyalAverage: 6493.85,
      Differencetotal: -198693,
      DifferenceAverage: 10879.53,
    },
  ];
  isOpen = false;
  date: any;
  constructor(
    public apiSrvc: ApiService,
    private ngbmodal: NgbModal,
    private ngbmodalActive: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private title: Title
  ) {
    this.date = new Date();
    this.title.setTitle('Xtract-Loyalty Dashboard');
    const data = {
      title: 'Loyalty',
      path1: '',
      path2: '',
      path3: '',
      Month: this.date,
    };
    this.apiSrvc.SetHeaderData({
      obj: data,
    });
  }

  ngOnInit(): void {
    console.log(
      this.date.toString().substr(4, 3),
      this.date.toString().substr(8, 2),
      this.date.toString().substr(11, 4)
    );
    this.Month =
      this.date.toString().substr(8, 2) +
      '-' +
      this.date.toString().substr(4, 3) +
      '-' +
      this.date.toString().substr(11, 4);
    this.GetLoyaltyData();
    console.log(this.SalespersonData);
  }

  GetLoyaltyData() {
    console.log(
      this.date.toString().substr(4, 3),
      this.date.toString().substr(8, 2),
      this.date.toString().substr(11, 4)
    );
    this.Month =
      this.date.toString().substr(8, 2) +
      '-' +
      this.date.toString().substr(4, 3) +
      '-' +
      this.date.toString().substr(11, 4);
    console.log('Month', this.Month);

    this.ReportTotalData = [];
    this.spinner.show();
    let Obj = {
      Date: this.Month,
    };
    console.log(Obj);

    this.apiSrvc.postmethodXiom('loyaltydata/getloyaltydataV1', Obj).subscribe(
      (res) => {
        if (res.status == 200) {
          this.LoyaltyData = res.response;

          const index = this.LoyaltyData.findIndex(
            (i) => i.Dealership == 'Report Total'
          );
          if (index >= 0) {
            this.ReportTotalData.push(this.LoyaltyData[index]);
            this.LoyaltyData.splice(index, 1);
          }
          this.LoyaltyData.unshift(this.ReportTotalData[0]);
          console.log('Report Total', this.LoyaltyData);
          this.spinner.hide();
        } else {
          alert('Invalid Details');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  Month: any = '';
  ngAfterViewInit(): void {
    this.apiSrvc.GetReports().subscribe((data) => {
      if (data.obj.Reference == 'LR') {
        this.date = data.obj.month;
        this.Month = data.obj.month;
        this.GetLoyaltyData();
        const headerdata = {
          title: 'Loyalty',
          path1: '',
          path2: '',
          path3: '',
          Month: data.obj.month,
        };
        this.apiSrvc.SetHeaderData({
          obj: headerdata,
        });
      }
    });
  }

  public inTheGreen(value: number): boolean {
    if (value >= 0) {
      return true;
    }
    return false;
  }

  // openMenu(){
  //   const modalRef = this.ngbmodal.open(LoyaltyDetailsComponent,{
  //     size:'xl',
  //     backdrop: "static",
  //   });
  //   modalRef.componentInstance.Parentcomponent = 'LD';
  // }
}
