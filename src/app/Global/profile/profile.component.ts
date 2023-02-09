import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Core/Providers/ApiService/api.service';

import { saveAs as fileSaverSave } from 'file-saver';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(public apiSrvc: ApiService) {
    const data = {
      title: 'Profile',
      path1: '',
      path2: '',
      path3: '',
    };
    this.apiSrvc.SetHeaderData({
      obj: data,
    });
  }

  ngOnInit(): void {}
  Download() {
    let fileName = '../../assets/images/PrasadChavali.vcf';
    fileSaverSave(fileName, 'PrasadChavali');
  }
}
