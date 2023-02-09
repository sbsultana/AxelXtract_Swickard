import { Component, OnInit } from '@angular/core';

import {
  NgbActiveModal,
  NgbModal,
  NgbCalendar,
  NgbDateParserFormatter,
  NgbDate,
  NgbDateStruct,
  NgbDatepickerConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../../Core/Providers/ApiService/api.service';

@Component({
  selector: 'app-accountmapping-report',
  templateUrl: './accountmapping-report.component.html',
  styleUrls: ['./accountmapping-report.component.scss'],
})
export class AccountmappingReportComponent implements OnInit {
  filter = 'Accounts';

  tab = 'F';

  Performance: any = 'Load';

  constructor(private service: ApiService, private ngbmodel: NgbModal) {}

  ngOnInit(): void {
    this.service.GetHeaderData().subscribe((res) => {
      if (this.Performance == 'Load') {
        if (res.obj.title == 'Account Mapping') {
          console.log(res);

          this.filter = res.obj.filter;
        }
      }
    });
  }
  viewreport() {
    const data = {
      Reference: 'AM',
      Filter: this.filter,
    };
    ////console.log(data);
    this.service.SetReports({
      obj: data,
    });
    this.close();
  }
  close() {
    this.ngbmodel.dismissAll();
    this.Performance = 'Unload';
  }

  typeselection(block) {
    this.filter = block;
  }

  Tabs(e) {
    this.tab = e;
  }
}
