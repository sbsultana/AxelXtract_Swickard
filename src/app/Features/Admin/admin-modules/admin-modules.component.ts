import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../Core/Providers/ApiService/api.service';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-admin-modules',
  templateUrl: './admin-modules.component.html',
  styleUrls: ['./admin-modules.component.scss']
})
export class AdminModulesComponent implements OnInit {

  Grid: boolean = true;
  AddEditPanel: boolean = false;
  SM_AddEditPanel: boolean = false;

  ModulesData: any =[];
  SubModulesData: any =[];
  ModulesForm: FormGroup;
  SubModulesForm: FormGroup;
  submitted = false;
  AddModule: any;
  AddSubModule: any;

  IsActive: boolean;
  IsInactive: boolean;
  SM_IsActive:boolean;
  SM_IsInactive:boolean;
  StatusValue: string;
  SM_StatusValue: string;
  StatusHide: boolean = false;
  SMStatusHide: boolean = false;
  AddSave: boolean = false;
  EditSave: boolean = false;
  SMAddSave: boolean = false;
  SMEditSave: boolean = false;

  Mod_Id :any;
  Sub_Mod_Id:any;
  SubModuleGrid: boolean = false;

  Module_Name :any;
  SubModule_Name:any;
  NoDetailFound: boolean = true;
  constructor(public apiSrvc: ApiService, private formBuilder: FormBuilder, private ngbmodal: NgbModal, private ngbmodalActive: NgbActiveModal,private spinner: NgxSpinnerService,private title: Title) {
    this.title.setTitle("Xtract-Modules");

    const data = {
      title: 'Modules',
      path1: '',
      path2: '',
      path3: ''
    }
    this.apiSrvc.SetHeaderData({
      obj: data
    })
   }

  ngOnInit(): void {

    this.ModulesForm = this.formBuilder.group({
      Module_Name: ['', [Validators.required, Validators.pattern('[a-zA-Z /()]*'),Validators.maxLength(50)]],
      Module_Sequence: ['', [Validators.required]],
      Module_Status: ['Y']
    });

    this.SubModulesForm = this.formBuilder.group({
      SubModule_Name: ['', [Validators.required, Validators.pattern('[a-zA-Z /()]*'),Validators.maxLength(50)]],
      SubModule_FileName: ['', [Validators.required]],
      SubModule_Sequence: ['', [Validators.required]],
      SM_DisplayStatus: ['', [Validators.required]],
      SubModule_Status: ['Y']
    });
    console.log(this.ModulesForm.value);
    this.getData();
    this.Sub_Mod_Id
  }

  get form() {return this.ModulesForm.controls; }
  get forms(){return this.SubModulesForm.controls;}

  getData() {
    this.spinner.show();
    this.NoDetailFound = false;
    let Obj = {
      "mod_id": ""
    }
    this.apiSrvc.postmethod('modules/get', Obj).subscribe(res => {
      if(res.status== 200){
        this.ModulesData = res.response;
        console.log(this.ModulesData);
        this.spinner.hide();
        this.NoDetailFound =true;
      }else{
        alert(res.error)
      }

    })
  }


  AddShowPanel(){
    this.submitted = false
    this.Grid = false;
    this.AddEditPanel = true;
    this.AddSave = true;
    this.EditSave = false;
    this.StatusHide = false;
    this.SubModuleGrid = false;
    this.ModulesForm.reset();
  }
  EditShowPanel(Object){
    this.ModulesForm.controls["Module_Name"].setValue(Object.mod_name);
    this.ModulesForm.controls["Module_Sequence"].setValue(Object.mod_seq)
    this.Mod_Id = Object.mod_id;
    this.AddEditPanel = true;
    this.Grid = false;
    this.AddSave = false;
    this.EditSave = true;
    this.StatusHide = true;
    this.SubModuleGrid = true;
    this.IsActive = Object.mod_status == "Y";
    this.IsInactive = Object.mod_status == "N";
    if (Object.mod_status == "Y") {
      this.ModulesForm.controls["Module_Status"].setValue(Object.mod_status)
    }
    if (this.IsActive == true) {
      this.StatusValue = 'Y'
    }
    if (this.IsInactive == true) {
      this.StatusValue = 'N'
    }
    this.getSubModulesData(Object);
  }





  ModuleInsert(){
    this.submitted = true;
    if (this.ModulesForm.invalid) {
      console.log(this.ModulesForm.value);
      return false;
    }
    const Obj = {
      "mod_seq": this.ModulesForm.value.Module_Sequence,
      "mod_name": this.ModulesForm.value.Module_Name,
      "mod_status": "Y"
    }
    this.apiSrvc.postmethod('modules', Obj).subscribe(res => {
      console.log(res);
      if(res.status== 200){
        this.AddModule = res.response;
        console.log(this.AddModule);
        alert("Record Added Successfully");
        this.AddEditPanel = false;
        this.Grid = true;
        this.getData();
        this.ModulesForm.reset();
      }
      else{
        alert(res.error)
       }

    })

  }

  ModuleUpdate(){
    console.log(this.Mod_Id);

    this.submitted = true;
    if (this.ModulesForm.invalid) {
      return false;
    }

    const Obj = {
      "mod_id": this.Mod_Id,
      "mod_seq": this.ModulesForm.value.Module_Sequence,
      "mod_name": this.ModulesForm.value.Module_Name,
      "mod_status": this.StatusValue
    }
    this.apiSrvc.putmethod('modules', Obj).subscribe(res => {
      console.log(res);
      if(res.status== 200){
        alert("Record Updated Successfully");
        this.AddEditPanel = false;
        this.Grid = true;
        this.getData();
        this.ModulesForm.reset();
        }
        else{
         alert(res.error)
        }
    })

  }

  checkStatus(e:any) {
    let target =e.target;
    if (target.checked) {
      this.StatusValue = "Y";
    }
    else{
      this.StatusValue = "N";
    }
  }

  Cancel(){
    this.Grid = true;
    this.AddEditPanel = false;
    this.ModulesForm.reset();
    this.getData();
  }

  Sub_object:any;


  getSubModulesData(value){
    this.spinner.show();
    this.NoDetailFound = false;
    this.Sub_object = value
    console.log(value);
    this.Sub_Mod_Id = value.mod_id;
    let Obj = {
      "modId": value.mod_id,
      "subId": "0",
      "expression": ""
    }
    this.apiSrvc.postmethod('submodules/get', Obj).subscribe(res => {
      if(res.status== 200){
        this.SubModulesData = res.response;
        console.log(this.SubModulesData);
        this.spinner.hide();
        this.NoDetailFound =true;
      }
      else{
        alert(res.error);
       }
    })

  }

 SubModuleAddPanel(){
   this.submitted =false
    this.AddEditPanel = false;
    this.SubModuleGrid =false;
    this.SM_AddEditPanel = true;
    this.SMAddSave = true;
    this.SMEditSave = false;
    this.SMStatusHide = false;
 }
  SM_Object:any;
 SubModuleEditPanel(value){
    console.log(value);
    this.SM_Object = value;
    this.SubModulesForm.controls["SubModule_Name"].setValue(value.smod_name);
    this.SubModulesForm.controls["SubModule_FileName"].setValue(value.smod_filename);
    this.SubModulesForm.controls["SubModule_Sequence"].setValue(value.smod_seq);
    this.SubModulesForm.controls["SM_DisplayStatus"].setValue(value.smod_display_status);
    this.AddEditPanel = false;
    this.SubModuleGrid = false;
    this.SM_AddEditPanel = true;
    this.SMAddSave = false;
    this.SMEditSave = true;
    this.SMStatusHide = true;
    this.SM_IsActive = value.smod_active == "Y";
    this.SM_IsInactive = value.smod_active == "N";
    if (value.smod_active == "Y") {
      this.SubModulesForm.controls["SubModule_Status"].setValue(value.smod_active);
    }
    if (this.SM_IsActive == true) {
      this.SM_StatusValue = 'Y'
    }
    if (this.SM_IsInactive == true) {
      this.SM_StatusValue = 'N'
    }
 }

 SubModuleInsert(){
   console.log(this.Sub_Mod_Id);
 this.submitted = true;
    if(this.SubModulesForm.invalid) {
      console.log(this.SubModulesForm.value);
      return false;
    }
    const Obj = {
      "smod_mod_id": this.Sub_Mod_Id,
      "smod_name": this.SubModulesForm.value.SubModule_Name,
      "smod_filename": this.SubModulesForm.value.SubModule_FileName,
      "smod_seq": this.SubModulesForm.value.SubModule_Sequence,
      "smod_active": "Y",
      "smod_display_status": this.SubModulesForm.value.SM_DisplayStatus
    }
    console.log(Obj);

    this.apiSrvc.postmethod('submodules', Obj).subscribe(res => {
      console.log(res);
      if(res.status== 200){
        this.AddSubModule = res.response;
        console.log(this.AddSubModule);
        alert("Record Added Successfully");
        this.EditShowPanel(this.Sub_object);
        this.SM_AddEditPanel = false;
        this.getSubModulesData(this.Sub_object);
        this.SubModulesForm.reset();
      }else{
        alert(res.error);
      }

    })

 }

 SubModuleUpdate(){
   console.log(this.SM_Object);
    this.submitted = true;
    if (this.ModulesForm.invalid) {
      return false;
    }

    const Obj = {
      "smod_id": this.SM_Object.smod_id,
      "smod_mod_id": this.SM_Object.smod_mod_id,
      "smod_name": this.SubModulesForm.value.SubModule_Name,
      "smod_filename": this.SubModulesForm.value.SubModule_FileName,
      "smod_seq": this.SubModulesForm.value.SubModule_Sequence,
      "smod_active": this.SM_StatusValue,
      "smod_display_status": this.SubModulesForm.value.SM_DisplayStatus
    }
    this.apiSrvc.putmethod('submodules', Obj).subscribe(res => {
      console.log(res);
      if(res.status== 200){
        alert("Record Updated Successfully");
        this.EditShowPanel(this.Sub_object);
        this.SM_AddEditPanel = false;
        this.getSubModulesData(this.Sub_object);
        this.SubModulesForm.reset();
      }
      else{
        alert(res.error);
      }
    })

 }
 SMcheckStatus(e:any) {
    let target =e.target;
    if (target.checked) {
      this.SM_StatusValue = "Y";
    }
    else{
      this.SM_StatusValue = "N";
    }
  }

  SMCancel(){
    this.AddEditPanel = true;
    this.Grid = false;
    this.AddSave = false;
    this.EditSave = true;
    this.StatusHide = true;
    this.SubModuleGrid = true;
    this.SM_AddEditPanel =false;
    this.SubModulesForm.reset();
  }
}
