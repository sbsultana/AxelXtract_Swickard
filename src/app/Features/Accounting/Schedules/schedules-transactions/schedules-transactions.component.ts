import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../../Core/Providers/ApiService/api.service';


@Component({
  selector: 'app-schedules-transactions',
  templateUrl: './schedules-transactions.component.html',
  styleUrls: ['./schedules-transactions.component.scss']
})
export class SchedulesTransactionsComponent implements OnInit {

  constructor(private ngbmodel: NgbModal, private renderer: Renderer2, private service: ApiService) { 
    this.renderer.listen('window', 'click', (e: Event) => {
      const TagName = e.target as HTMLButtonElement
      if (TagName.className === 'd-block modal fade show modal-static') {
        // this.closeBtn.nativeElement.click();
        this.close()
      }
    });
  }

  ngOnInit(): void {
  }
  viewreport(){

  }
  save(){

  }
  close() {
    this.ngbmodel.dismissAll()
  }
}
