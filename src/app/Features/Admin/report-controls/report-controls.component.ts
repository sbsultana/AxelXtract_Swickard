import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../Core/Providers/ApiService/api.service';
import { Title } from '@angular/platform-browser';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-report-controls',
  templateUrl: './report-controls.component.html',
  styleUrls: ['./report-controls.component.scss'],
})
export class ReportControlsComponent implements OnInit {
  Grid: boolean = true;
  AddPanel: boolean = false;
  EditPanel: boolean = false;

  RCVdata: any = [];
  ModulesData: any = [];
  SubModulesData: any = [];
  SubModData: any = [];
  SubModName: any = [];

  RCVForm: FormGroup;
  AddRCV: any;
  submitted = false;

  AddSave: boolean = false;
  EditSave: boolean = false;
  StatusHide: boolean;
  IsActive: boolean;
  IsInactive: boolean;
  StatusValue: string;

  SubMod_Id: any;
  RCV_ID: any;
  selectValue = '0';
  SelectedValue = '0';
  RCV_Name: any;
  NoDetailFound: boolean = true;
  constructor(
    public apiSrvc: ApiService,
    private formBuilder: FormBuilder,
    private ngbmodal: NgbModal,
    private ngbmodalActive: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private title: Title
  ) {
    this.title.setTitle('Xtract-Report Control');
    const data = {
      title: 'Report Control Variables',
      path1: '',
      path2: '',
      path3: '',
    };
    this.apiSrvc.SetHeaderData({
      obj: data,
    });
  }

  ngOnInit(): void {
    this.RCVForm = this.formBuilder.group({
      RCV_Name: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z .&/-]*')],
      ],
      RCV_SubModule_Id: ['', [Validators.required]],
      RCV_Status: ['Y'],
    });

    let Obj = {
      RoleID: '001',
      expression: "mod_status='Y'",
    };
    this.apiSrvc
      .postmethod('permissionsbasedonroles/get', Obj)
      .subscribe((res) => {
        this.ModulesData = res.response;
        this.SubMod_Id = res.SMOD_ID;
        this.ModulesData.forEach((res) => {
          if (res.MOD_ID == 0 && res.SMOD_ID != 0) {
            this.SubModulesData.push(res);
            //console.log(this.SubModulesData);
          }
        });
      });

    this.getData();
  }
  get form() {
    return this.RCVForm.controls;
  }

  getData() {
    this.spinner.show();
    this.NoDetailFound = false;
    let Obj = {
      ID: '',
      expression: '',
    };
    this.apiSrvc
      .postmethod('reportcontrolvariable/get', Obj)
      .subscribe((res) => {
        this.RCVdata = res.response;
        this.spinner.hide();
        this.NoDetailFound = true;
        this.RCVdata.forEach((e) => {
          this.SubModulesData.forEach((evt) => {
            if (e.RCV_SubModule_Id == evt.SMOD_ID) {
              e.RCV_SubModule_Name = evt.SMOD_NAME;
            }
          });
        });
        this.SubModData = this.RCVdata;
        // console.log(this.RCVdata,this.SubModulesData);
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

  SelectSubModule(value) {
    this.SubModData = [];
    this.RCVdata.forEach((res) => {
      if (value == 0) {
        this.SubModData = this.RCVdata;
      } else if (value == res.RCV_SubModule_Id) {
        this.SubModData.push(res);
      }
    });
  }

  AddShowPanel() {
    this.selectValue = '0';
    this.SelectedValue = '';
    this.submitted = false;
    this.Grid = false;
    this.AddPanel = true;
    this.EditPanel = false;
    this.AddSave = true;
    this.EditSave = false;
    this.RCVForm.reset();
    this.StatusHide = false;
  }
  EditShowPanel(object) {
    //console.log(object);
    this.SelectedValue = object.RCV_SubModule_Id;
    this.RCVForm.controls['RCV_Name'].setValue(object.RCV_Name);
    this.RCVForm.controls['RCV_SubModule_Id'].setValue(object.RCV_SubModule_Id);
    this.RCV_ID = object.RCV_Id;
    this.AddPanel = true;
    this.Grid = false;
    this.AddSave = false;
    this.EditSave = true;
    this.StatusHide = true;
    this.IsActive = object.RCV_Status == 'Y';
    this.IsInactive = object.RCV_Status == 'N';
    if (object.RCV_Status == 'Y') {
      this.RCVForm.controls['RCV_Status'].setValue(object.RCV_Status);
    }
    if (this.IsActive == true) {
      this.StatusValue = 'Y';
    }
    if (this.IsInactive == true) {
      this.StatusValue = 'N';
    }
  }

  RCVInsert() {
    this.submitted = true;
    if (this.RCVForm.invalid) {
      //console.log(this.RCVForm.value);
      return false;
    }
    const Obj = {
      RCV_Name: this.RCVForm.value.RCV_Name,
      RCV_SubModule_Id: this.RCVForm.value.RCV_SubModule_Id,
      RCV_Status: 'Y',
    };
    this.apiSrvc.postmethod('reportcontrolvariable', Obj).subscribe((res) => {
      if (res.status == 200) {
        //console.log(res);
        this.AddRCV = res.response;
        //console.log(this.AddRCV);
        alert('Record Added Successfully');
        this.AddPanel = false;
        this.Grid = true;
        this.getData();
      } else {
        alert(res.error);
      }
    });
  }

  RCVUpdate() {
    //console.log(this.RCV_ID);
    this.submitted = true;
    if (this.RCVForm.invalid) {
      return;
    }

    const Obj = {
      RCV_Id: this.RCV_ID,
      RCV_Name: this.RCVForm.value.RCV_Name,
      RCV_SubModule_Id: this.RCVForm.value.RCV_SubModule_Id,
      RCV_Status: this.StatusValue,
    };
    this.apiSrvc.putmethod('reportcontrolvariable', Obj).subscribe((res) => {
      if (res.status == 200) {
        //console.log(res);
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
    this.RCVForm.reset();
    this.SelectSubModule(0);
    this.getData();
  }
}
