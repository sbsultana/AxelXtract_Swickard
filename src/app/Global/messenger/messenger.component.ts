import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
// import { AxelOneService } from '../providers/axelone.api';
import { ApiService } from '../../Core/Providers/ApiService/api.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss'],
})
export class MessengerComponent implements OnInit {
  userObj: any;
  url: any;
  isLoading: boolean = false;
  constructor(
    // private aoser:AxelOneService,
    public sanitizer: DomSanitizer,
    private router: Router,
    public apiSrvc: ApiService
  ) {
    const data = {
      title: 'Messenger',
      path1: '',
      path2: '',
      path3: '',
    };
    this.apiSrvc.SetHeaderData({ obj: data });

    this.isLoading = true;
    //  this.aoser.changehead(true);
    //  this.aoser.showfilter(false);
    // let user: any = localStorage.getItem("userobj");
    // this.userObj = JSON.parse(user);
    // this.setmessenger();
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  ngOnInit(): void {}

  setmessenger() {
    let token = { userid: localStorage.getItem('UserID'), productid: 2 };
    var tkn = btoa(JSON.stringify(token));
    this.url = 'https://axelonechat.axelautomotive.com/' + tkn;

    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://axelonechat.axelautomotive.com/' + tkn
    );
  }
  close() {
    this.router.navigate(['/']);
  }
}
