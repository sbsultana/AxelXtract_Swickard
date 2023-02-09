import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../Core/Providers/ApiService/api.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
})
export class PermissionsComponent implements OnInit {
  ModulesData: any = [];
  RolesData: any = [];

  P_ID: any = [];
  U_ID: any = [];

  SelectedId = '0';
  Rold_Id: any;
  RolePermission: any;

  MsgShow: boolean;
  MsgNotShow: boolean;
  constructor(
    public apiSrvc: ApiService,
    private formBuilder: FormBuilder,
    private ngbmodal: NgbModal,
    private ngbmodalActive: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private router: Router,
    private title: Title
  ) {
    this.title.setTitle('Xtract-Permissions');

    const data = {
      title: 'Permissions',
      path1: '',
      path2: '',
      path3: '',
    };
    this.apiSrvc.SetHeaderData({
      obj: data,
    });
  }

  ngOnInit(): void {
    let Obj = {
      Role_Id: '',
      expression: '',
    };
    this.apiSrvc.postmethod('roles/get', Obj).subscribe((res) => {
      this.RolesData = res.response;
    });
    this.OnSelectRole(1);
    this.RoleChange(0);
  }

  RoleChange(value) {
    console.log(value);
    this.OnSelectRole(value);
    if (value == '0') {
      this.MsgShow = true;
      this.MsgNotShow = false;
    } else if (value != '0') {
      this.MsgShow = false;
      this.MsgNotShow = true;
      this.spinner.show();
    }
  }

  OnSelectRole(RoleId) {
    this.Rold_Id = RoleId;
    let Obj = {
      RoleID: RoleId,
      expression: "mod_status='Y'",
    };

    this.apiSrvc
      .postmethod('permissionsbasedonroles/get', Obj)
      .subscribe((res) => {
        this.ModulesData = res.response;
        console.log(this.ModulesData);
        this.spinner.hide();
        this.P_ID = [];
        this.U_ID = [];
        this.ModulesData.forEach((data) => {
          if (data.status == 'Y' && data.MOD_ID != '0') {
            this.P_ID.push(data.MOD_ID.toString());
            this.spinner.hide();
          }
          console.log('P id is', this.P_ID);
          if (data.status == 'Y' && data.MOD_ID == '0') {
            this.U_ID.push(data.SMOD_ID.toString());
          }
          console.log('U id is ', this.U_ID);
        });
      });
  }

  CheckModule(id, event) {
    console.log('Mail Check', id);
    if (event.target.checked) {
      for (let i = 0; i < this.ModulesData.length; i++) {
        if (id.MOD_ID == this.ModulesData[i].SMOD_MOD_ID) {
          id.status = 'Y';
          this.ModulesData[i].status = 'Y';
          console.log(this.ModulesData[i]);
        }
      }
    } else {
      for (let i = 0; i < this.ModulesData.length; i++) {
        if (id.MOD_ID == this.ModulesData[i].SMOD_MOD_ID) {
          id.status = 'N';
          this.ModulesData[i].status = 'N';
        }
      }
    }

    //console.log('Chck Module',this.moduleData)
  }

  CheckSubModule(id, main, evt) {
    let arry1: any = [];
    console.log(main);

    if (evt.target.checked) {
      for (let i = 0; i < this.ModulesData.length; i++) {
        if (id.SMOD_MOD_ID == this.ModulesData[i].MOD_ID) {
          id.status = 'Y';
          this.ModulesData[i].status = 'Y';
          break;
        }
      }
    } else {
      for (let i = 0; i < this.ModulesData.length; i++) {
        if (main.MOD_ID == this.ModulesData[i].SMOD_MOD_ID) {
          // this.ModulesData[i].status = 'N';
          console.log(this.ModulesData[i]);
          arry1.push(this.ModulesData[i]);
          id.status = 'N';
          // break;
        }
      }
      const allEqual = (arr) => arr.every((val) => val.status === 'N');
      const result = allEqual(arry1);
      result == true ? (main.status = 'N') : (main.status = 'Y');
      if (main.status == 'N') {
        this.P_ID.forEach((e, index) => {
          if (e == main.MOD_ID) {
            this.P_ID.splice(index, 1);
          }
        });
      }
    }
  }

  UpdateRolePermissions() {
    console.log(this.Rold_Id);

    console.log('update Obj', this.ModulesData);
    this.P_ID = [];
    this.U_ID = [];
    this.ModulesData.forEach((data) => {
      if (data.status == 'Y' && data.MOD_ID != '0') {
        this.P_ID.push(data.MOD_ID.toString());
      }
      console.log(this.P_ID);

      if (data.status == 'Y' && data.MOD_ID == '0') {
        this.U_ID.push(data.SMOD_ID.toString());
      }
      console.log(this.U_ID);
    });
    if (this.U_ID.length > 0 || this.P_ID.length > 0) {
      const obj = {
        AX_ROLE_ID: this.Rold_Id,
        AX_SMOD_ID: this.U_ID.join(','),
        AX_MOD_ID: this.P_ID.join(','),
      };
      console.log('update Obj', obj);
      this.apiSrvc
        .putmethod('permissionsbasedonroles', obj)
        .subscribe((data: any) => {
          console.log(data);
          if (data.status == 200) {
            alert('Permissions Based On Roles Inserted Successfully');
            // this.router.navigate(['Permissions']);
            this.OnSelectRole(this.Rold_Id);
            this.RoleChange(this.Rold_Id);
          } else {
            alert(data.error);
          }
          // }, err => {
          //   alert("Modules don't not added!!");
        });
    } else {
      alert('Please select modules');
    }
  }

  Cancel() {
    this.OnSelectRole(this.Rold_Id);
    this.RoleChange(this.Rold_Id);
  }
}
