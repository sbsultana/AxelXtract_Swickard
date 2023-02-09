import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../Core/Providers/ApiService/api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  ModulesData: any = [];
  ShowModules: any;
  @Input() Parentcomponent: any = [];
  constructor(private apiSrvc: ApiService, private route: Router, private renderer: Renderer2, private ngbmodel: NgbModal, private spinner: NgxSpinnerService) {
    this.renderer.listen('window', 'click', (e: Event) => {
      const TagName = e.target as HTMLButtonElement
      if (TagName.className === 'd-block modal fade show modal-static') {
        // this.closeBtn.nativeElement.click();
        this.close()
      }
    });
  }

  ngOnInit() {
    console.log(this.Parentcomponent)
    this.ShowModules = this.Parentcomponent
  }
  navigate(val) {
    const data={}
    this.apiSrvc.SetReports({
      obj: data
    })
    this.route.navigateByUrl(val);
    this.close();
  }
  close() {
    this.ngbmodel.dismissAll()
  }
}
