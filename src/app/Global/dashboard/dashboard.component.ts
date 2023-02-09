import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../../Core/Providers/ApiService/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @Input() Parentcomponent: any;

  TodayDate: any;
  yesterday: any;
  NoData: boolean = false;
  isShow: boolean = false;
  store: any = 0;
  // unitsandgross: any =[];
  FromDate: string;

  CurrentDate = new Date();
  LastDate: any;
  FirstDate: any;

  unitsandgross = [
    {
      val: 'New Units',
      Data: [
        {
          Today: 0,
          DailyGoal: 0,
          MTD: 0,
          Pace: 0,
          Goal: 0,
        },
      ],
    },
    {
      val: 'Used Units',
      Data: [
        {
          Today: 0,
          DailyGoal: 0,
          MTD: 0,
          Pace: 0,
          Goal: 0,
        },
      ],
    },
    {
      val: 'Total Units',
      Data: [
        {
          Today: 0,
          DailyGoal: 0,
          MTD: 0,
          Pace: 0,
          Goal: 0,
        },
      ],
    },
    {
      val: 'Front Gross',
      Data: [
        {
          Today: 0,
          DailyGoal: 0,
          MTD: 0,
          Pace: 0,
          Goal: 0,
        },
      ],
    },
    {
      val: 'Front PVR',
      Data: [
        {
          Today: 0,
          DailyGoal: 0,
          MTD: 0,
          Pace: 0,
          Goal: 0,
        },
      ],
    },
    {
      val: 'Back Gross',
      Data: [
        {
          Today: 0,
          DailyGoal: 0,
          MTD: 0,
          Pace: 0,
          Goal: 0,
        },
      ],
    },
    {
      val: 'Back PVR',
      Data: [
        {
          Today: 0,
          DailyGoal: 0,
          MTD: 0,
          Pace: 0,
          Goal: 0,
        },
      ],
    },
    {
      val: 'Total Gross',
      Data: [
        {
          Today: 0,
          DailyGoal: 0,
          MTD: 0,
          Pace: 0,
          Goal: 0,
        },
      ],
    },
    {
      val: 'Total PVR',
      Data: [
        {
          Today: 0,
          DailyGoal: 0,
          MTD: 0,
          Pace: 0,
          Goal: 0,
        },
      ],
    },
  ];

  ModulesData: any = [];
  ShowModules: any;
  constructor(
    public apiSrvc: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private ngbmodal: NgbModal,
    private ngbmodalActive: NgbActiveModal,
    private http: HttpClient,
    private title: Title
  ) {
    this.title.setTitle('Xtract-Dashboard');
    const data = {
      title: 'Dashboard',
      path1: '',
      path2: '',
      path3: '',
    };
    this.apiSrvc.SetHeaderData({ obj: data });
  }
  time: any;
  ngOnInit(): void {
    this.CurrentDate.setDate(this.CurrentDate.getDate() - 1);
    this.TodayDate = new Date(
      this.CurrentDate.getFullYear(),
      this.CurrentDate.getMonth(),
      2
    );

    this.FromDate = this.TodayDate.toISOString().slice(0, 10);
    this.TodayDate = this.CurrentDate.toISOString().slice(0, 10);

    this.GetData();
    this.updateDate = localStorage.getItem('date');
  }

  GetData() {
    this.spinner.show();
    const obj = {
      StartDate: this.FromDate,
      EndDate: this.TodayDate,
    };
    this.apiSrvc.postmethod('xtract/GetDashboardSalesSummary', obj).subscribe(
      (res) => {
        if (res.status == 200) {
          // this.unitsandgross = JSON.parse(res.response[0].New_Units)
          if (res.response.length > 0) {
            if (res.response[0].New_Units != null) {
              this.unitsandgross = [];
              this.unitsandgross.push({
                val: 'New Units',
                Data: JSON.parse(res.response[0].New_Units),
              });
              this.unitsandgross.push({
                val: 'Used Units',
                Data: JSON.parse(res.response[0].Used_Units),
              });
              this.unitsandgross.push({
                val: 'Total Units',
                Data: JSON.parse(res.response[0].Total_Units),
              });
              this.unitsandgross.push({
                val: 'Front Gross',
                Data: JSON.parse(res.response[0].FrontGross),
              });
              this.unitsandgross.push({
                val: 'Front PVR',
                Data: JSON.parse(res.response[0].FrontGrossPvr),
              });
              this.unitsandgross.push({
                val: 'Back Gross',
                Data: JSON.parse(res.response[0].BackGross),
              });
              this.unitsandgross.push({
                val: 'Back PVR',
                Data: JSON.parse(res.response[0].BackGrossPvr),
              });
              this.unitsandgross.push({
                val: 'Total Gross',
                Data: JSON.parse(res.response[0].TotalGross),
              });
              this.unitsandgross.push({
                val: 'Total PVR',
                Data: JSON.parse(res.response[0].TotalGrossPvr),
              });
              this.isShow = true;
              console.log(this.unitsandgross);
              console.log(res);
            }
          }
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
  updateDate: any = '';
  displaydate(e) {
    this.updateDate = e;
  }

  public inTheGreen(value: number): boolean {
    if (value >= 0) {
      return true;
    }
    return false;
  }
}
