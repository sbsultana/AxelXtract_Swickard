import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../Core/Providers/ApiService/api.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-job-roles',
  templateUrl: './job-roles.component.html',
  styleUrls: ['./job-roles.component.scss'],
})
export class JobRolesComponent implements OnInit {
  Grid: boolean = true;
  AddPanel: boolean = false;
  EditPanel: boolean = false;

  JobTitlesData: any = [];
  RolesData: any = [];
  JobTitlesForm: FormGroup;
  AddJob: any;
  submitted = false;

  AddSave: boolean = false;
  EditSave: boolean = false;
  StatusHide: boolean;
  IsActive: boolean;
  IsInactive: boolean;
  StatusValue: string;

  JobTitleId: any;

  selectValue = 0;
  job_name: any;
  constructor(
    public apiSrvc: ApiService,
    private formBuilder: FormBuilder,
    private ngbmodal: NgbModal,
    private ngbmodalActive: NgbActiveModal,
    private title: Title
  ) {
    this.title.setTitle('Xtract-Roles');
  }

  ngOnInit(): void {
    const data = {
      title: 'Job Titles',
      path1: '',
      path2: '',
      path3: '',
    };
    this.apiSrvc.SetHeaderData({
      obj: data,
    });

    this.JobTitlesForm = this.formBuilder.group({
      Job_Title: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z .&/-]*')],
      ],
      Role_Name: ['', [Validators.required]],
      Status: ['Y'],
    });

    let Obj = {
      Role_Id: '',
      expression: '',
    };
    this.apiSrvc.postmethod('roles/get', Obj).subscribe((res) => {
      this.RolesData = res.response;
    });

    this.getData();
  }
  get form() {
    return this.JobTitlesForm.controls;
  }
  getData() {
    let Obj = {
      ID: '',
      expression: '',
    };
    this.apiSrvc.postmethod('roles/getjobwithroles', Obj).subscribe((res) => {
      this.JobTitlesData = res.response;
    });
  }

  SelectRole(value) {
    console.log(value);
  }

  AddShowPanel() {
    this.selectValue = 0;
    this.submitted = false;
    this.Grid = false;
    this.AddPanel = true;
    this.EditPanel = false;
    this.AddSave = true;
    this.EditSave = false;
    this.JobTitlesForm.reset();
    this.StatusHide = false;
  }
  EditShowPanel(object) {
    console.log(object);
    this.selectValue = object.Role_Name;
    this.JobTitlesForm.controls['Job_Title'].setValue(object.Job_Title);
    this.JobTitlesForm.controls['Role_Name'].setValue(object.Role_Name);
    this.JobTitleId = object.Id;
    this.AddPanel = true;
    this.Grid = false;
    this.AddSave = false;
    this.EditSave = true;
    this.StatusHide = true;
    this.IsActive = object.Status == 'Y';
    this.IsInactive = object.Status == 'D';
    if (object.Status == 'Y') {
      this.JobTitlesForm.controls['Status'].setValue(object.Status);
    }
    if (this.IsActive == true) {
      this.StatusValue = 'Y';
    }
    if (this.IsInactive == true) {
      this.StatusValue = 'D';
    }
  }

  JobInsert() {
    this.submitted = true;
    if (this.JobTitlesForm.invalid) {
      console.log(this.JobTitlesForm.value);
      return false;
    }
    const Obj = {
      Job_Title: this.JobTitlesForm.value.Job_Title,
      Role_Name: this.JobTitlesForm.value.Role_Name,
      Status: 'Y',
    };
    this.apiSrvc.postmethod('roles/jobwithroles', Obj).subscribe((res) => {
      console.log(res);
      this.AddJob = res.response;
      console.log(this.AddJob);
      alert('Record added successfully');
      this.getData();
    });
    this.AddPanel = false;
    this.Grid = true;
  }

  JobUpdate() {
    console.log(this.JobTitleId);

    this.submitted = true;
    if (this.JobTitlesForm.invalid) {
      return;
    }

    const Obj = {
      Id: this.JobTitleId,
      Job_Title: this.JobTitlesForm.value.Job_Title,
      Role_Name: this.JobTitlesForm.value.Role_Name,
      Status: this.StatusValue,
    };
    this.apiSrvc.putmethod('roles/jobwithroles', Obj).subscribe((res) => {
      console.log(res);
      alert('Record updated successfully');
      this.getData();
    });
    this.AddPanel = false;
    this.Grid = true;
  }

  ChangeStatus(e) {
    if (e == true) {
      this.StatusValue = 'Y';
      this.IsActive = true;
      this.IsInactive = false;
    } else {
      this.StatusValue = 'D';
      this.IsActive = false;
      this.IsInactive = true;
    }
  }
  Cancel() {
    this.Grid = true;
    this.AddPanel = false;
    this.EditPanel = false;
    this.JobTitlesForm.reset();
    this.getData();
  }
}
