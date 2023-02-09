import { Component, OnInit } from '@angular/core';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../Core/Providers/ApiService/api.service';

@Component({
  selector: 'app-log-reports',
  templateUrl: './log-reports.component.html',
  styleUrls: ['./log-reports.component.scss'],
})
export class LogReportsComponent implements OnInit {
  Grid: boolean = true;
  AddPanel: boolean = false;
  EditPanel: boolean = false;

  UsersForm: FormGroup;

  UsersData: any = [];
  submitted = false;

  AddSave: boolean = false;
  EditSave: boolean = false;
  StatusHide: boolean;
  IsActive: boolean;
  IsInactive: boolean;
  StatusValue: string;
  UserId: any;

  User_name: any;

  NoDetailFound: boolean = true;

  expression: any = '';

  constructor(
    public apiSrvc: ApiService,
    private formBuilder: FormBuilder,
    private ngbmodal: NgbModal,
    private ngbmodalActive: NgbActiveModal,
    private spinner: NgxSpinnerService
  ) {
    const data = {
      title: 'Log',
      path1: '',
      path2: '',
      path3: '',
    };
    this.apiSrvc.SetHeaderData({
      obj: data,
    });
  }

  ngOnInit(): void {
    this.UsersForm = this.formBuilder.group({
      User_Name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      User_Status: ['Y'],
    });
    //console.log(this.UsersForm.value);

    this.getData();
  }

  get form() {
    return this.UsersForm.controls;
  }

  getData() {
    // this.spinner.show();
    this.NoDetailFound = false;
    let Obj = {
      UL_Id: '',
      expression: this.expression,

      // "expression": "UL_ResponseStatus = 'Failure'"
    };
    this.apiSrvc.postmethod('useractivitylog/get', Obj).subscribe((res) => {
      this.UsersData = res.response;
      this.spinner.hide();
      this.NoDetailFound = true;
    });
  }

  statusfilter(e) {
    if (e == '') {
      this.expression = '';
      this.getData();
    } else {
      this.expression = "UL_ResponseStatus = '" + e + "'";
      this.getData();
    }
  }
  AddShowPanel() {
    this.submitted = false;
    this.Grid = false;
    this.AddPanel = true;
    this.EditPanel = false;
    this.AddSave = true;
    this.EditSave = false;
    this.UsersForm.reset();
    this.StatusHide = false;
  }
  EditShowPanel(value) {
    //console.log(value);
    this.UsersForm.controls['User_Name'].setValue(value.User_Name);
    this.UserId = value.Role_Id;
    this.AddPanel = true;
    this.Grid = false;
    this.AddSave = false;
    this.EditSave = true;
    this.StatusHide = true;
    this.IsActive = value.User_Status == 'Y';
    this.IsInactive = value.User_Status == 'N';
    if (value.User_Status == 'Y') {
      this.UsersForm.controls['User_Status'].setValue(value.User_Status);
    }
    if (this.IsActive == true) {
      this.StatusValue = 'Y';
    }
    if (this.IsInactive == true) {
      this.StatusValue = 'N';
    }
  }

  RoleInsert() {
    this.submitted = true;
    if (this.UsersForm.invalid) {
      //console.log(this.UsersForm.value);

      return false;
    }
    const Obj = {
      User_Name: this.UsersForm.value.User_Name,
      User_Status: 'Y',
    };
    this.apiSrvc.postmethod('roles', Obj).subscribe((res) => {
      if (res.status == 200) {
        //console.log(res);
        alert('Record Added Successfully');
        this.AddPanel = false;
        this.Grid = true;
        this.getData();
      } else {
        alert(res.error);
      }
    });
  }

  checkStatus(e: any) {
    let target = e.target;
    if (target.checked) {
      this.StatusValue = 'Y';
    } else {
      this.StatusValue = 'N';
    }
  }

  RoleUpdate() {
    //console.log(this.UserId);

    this.submitted = true;
    if (this.UsersForm.invalid) {
      return;
    }

    const Obj = {
      Role_Id: this.UserId,
      User_Name: this.UsersForm.value.User_Name,
      User_Status: this.StatusValue,
    };
    this.apiSrvc.putmethod('roles', Obj).subscribe((res) => {
      //console.log(res);
      if (res.status == 200) {
        alert('Record Updated Successfully');
        this.AddPanel = false;
        this.Grid = true;
        this.getData();
      } else {
        alert(res.error);
      }
    });
  }

  ChangeStatus(e) {
    if (e == true) {
      this.StatusValue = 'Y';
      this.IsActive = true;
      this.IsInactive = false;
    } else {
      this.StatusValue = 'N';
      this.IsActive = false;
      this.IsInactive = true;
    }
  }
  Cancel() {
    this.Grid = true;
    this.AddPanel = false;
    this.EditPanel = false;
    this.UsersForm.reset();
    this.getData();
  }
}
