
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbCalendar, NgbDateParserFormatter, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cit-analyse',
  templateUrl: './cit-analyse.component.html',
  styleUrls: ['./cit-analyse.component.scss']
})
export class  CitAnalyseComponent implements OnInit {

  constructor(private ngbmodel: NgbModal,) { }


  ngOnInit(): void {
  }
  close() {
    this.ngbmodel.dismissAll()
  }

}
