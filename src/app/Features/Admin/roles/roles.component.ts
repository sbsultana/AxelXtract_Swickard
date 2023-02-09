import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../Core/Providers/ApiService/api.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  Grid: boolean = true;
  AddPanel: boolean = false;
  EditPanel: boolean = false;

  RolesForm: FormGroup;
  AddRole: any;
  RolesData: any = [];
  submitted = false;

  AddSave: boolean = false;
  EditSave: boolean = false;
  StatusHide: boolean;
  IsActive: boolean;
  IsInactive: boolean;
  StatusValue: string;
  RoleId: any;

  role_name: any;
  NoDetailFound: boolean = true;
  constructor(
    public apiSrvc: ApiService,
    private formBuilder: FormBuilder,
    private ngbmodal: NgbModal,
    private ngbmodalActive: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private title: Title
  ) {
    this.title.setTitle('Xtract-Roles');

    const data = {
      title: 'Roles',
      path1: '',
      path2: '',
      path3: '',
    };
    this.apiSrvc.SetHeaderData({
      obj: data,
    });
  }

  ngOnInit(): void {
    this.RolesForm = this.formBuilder.group({
      Role_Name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      Role_Status: ['Y'],
    });
    console.log(this.RolesForm.value);

    this.getData();
  }

  get form() {
    return this.RolesForm.controls;
  }

  getData() {
    this.spinner.show();
    this.NoDetailFound = false;
    let Obj = {
      Role_Id: '',
      expression: '',
    };
    this.apiSrvc.postmethod('roles/get', Obj).subscribe((res) => {
      this.RolesData = res.response;
      this.spinner.hide();
      this.NoDetailFound = true;
    });
  }

  AddShowPanel() {
    this.submitted = false;
    this.Grid = false;
    this.AddPanel = true;
    this.EditPanel = false;
    this.AddSave = true;
    this.EditSave = false;
    this.RolesForm.reset();
    this.StatusHide = false;
  }
  EditShowPanel(value) {
    console.log(value);
    this.RolesForm.controls['Role_Name'].setValue(value.Role_Name);
    this.RoleId = value.Role_Id;
    this.AddPanel = true;
    this.Grid = false;
    this.AddSave = false;
    this.EditSave = true;
    this.StatusHide = true;
    this.IsActive = value.Role_Status == 'Y';
    this.IsInactive = value.Role_Status == 'N';
    if (value.Role_Status == 'Y') {
      this.RolesForm.controls['Role_Status'].setValue(value.Role_Status);
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
    if (this.RolesForm.invalid) {
      console.log(this.RolesForm.value);

      return false;
    }
    const Obj = {
      Role_Name: this.RolesForm.value.Role_Name,
      Role_Status: 'Y',
    };
    this.apiSrvc.postmethod('roles', Obj).subscribe((res) => {
      if (res.status == 200) {
        console.log(res);
        this.AddRole = res.response;
        console.log(this.AddRole);
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
    console.log(this.RoleId);

    this.submitted = true;
    if (this.RolesForm.invalid) {
      return;
    }

    const Obj = {
      Role_Id: this.RoleId,
      Role_Name: this.RolesForm.value.Role_Name,
      Role_Status: this.StatusValue,
    };
    this.apiSrvc.putmethod('roles', Obj).subscribe((res) => {
      console.log(res);
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
    this.RolesForm.reset();
    this.getData();
  }
}
