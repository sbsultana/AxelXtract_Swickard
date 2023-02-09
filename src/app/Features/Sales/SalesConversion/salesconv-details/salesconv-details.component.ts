import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../../Core/Providers/ApiService/api.service';

@Component({
  selector: 'app-salesconv-details',
  templateUrl: './salesconv-details.component.html',
  styleUrls: ['./salesconv-details.component.scss'],
})
export class SalesconvDetailsComponent implements OnInit {
  @Input() SalesCondetails: any = [];
  constructor(
    private ngbmodel: NgbModal,
    private renderer: Renderer2,
    private service: ApiService
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      const TagName = e.target as HTMLButtonElement;
      if (TagName.className === 'd-block modal fade show modal-static') {
        // this.closeBtn.nativeElement.click();
        this.close();
      }
    });
  }

  ngOnInit(): void {}
  viewreport() {}
  save() {}
  close() {
    this.ngbmodel.dismissAll();
  }
}
