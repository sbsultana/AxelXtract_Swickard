import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../../Core/Providers/ApiService/api.service';
import { ExcelService } from '../../../../Core/Providers/ExcelService/excel.service';
import {
  WorkSheet as XLSXWorkSheet,
  utils as XLSXUtils,
  WorkBook as XLSXWorkBook,
  write as StyleWrite,
  utils as StyleUtils,
  CellObject as StyleCellObject,
} from 'xlsx';
import * as XLSX from 'xlsx-with-styles';
import * as FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import { formatDate } from '@angular/common';
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = 'xlsx';
@Component({
  selector: 'app-financialstatement-details',
  templateUrl: './financialstatement-details.component.html',
  styleUrls: ['./financialstatement-details.component.scss'],
})
export class FinancialstatementDetailsComponent implements OnInit {
  @Input() SFdetails: any;
  as_id: any = [];
  SFdetailsdata: any = [];
  pageNumber: any = 1;
  LatestDate: any;

  details: any = [];
  NoData: boolean;
  loadMore = 1;
  spinner: boolean = true;
  componentState: boolean = false;
  Opacity: any = 'N';
  constructor(
    private ngbmodel: NgbModal,
    private renderer: Renderer2,
    private apiSrvc: ApiService,
    private ngbmodalActive: NgbActiveModal,
    private excelService: ExcelService
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      const TagName = e.target as HTMLButtonElement;
      // if (TagName.className === 'container-fluid d-flex justify-content-center align-items-center') {
      //   this.onclose()
      // }
      if (TagName.className === 'modal fade bd-example-modal-xl') {
        // this.componentState = false
        this.Opacity = 'N';
      }
      if (TagName.className === 'fa-solid fa-xmark') {
        this.Opacity = 'N';
      }
      if (TagName.className === 'close-btn ms-auto me-0') {
        this.Opacity = 'N';
      }
    });
  }

  ngOnInit(): void {
    //console.log(this.SFdetails);
    this.GetDetails();
  }

  getStoresId(Value) {
    //console.log(Value);
  }
  GetDetails() {
    this.Opacity = 'N';
    const format = 'MM-yyyy';
    const locale = 'en-US';
    const myDate = this.SFdetails.LatestDate;
    const formattedDate = formatDate(myDate, format, locale);
    this.LatestDate = formattedDate;

    const Obj = {
      Type: this.SFdetails.TYPE,
      Date: this.LatestDate,
      Stores:
        this.SFdetails.STORES == undefined ||
        this.SFdetails.STORES == null ||
        this.SFdetails.STORES == 0
          ? ''
          : this.SFdetails.STORES,
      PageNumber: this.pageNumber,
      PageSize: '100',
    };
    //console.log(Obj);

    this.apiSrvc
      .postmethod('xtract/GetFinacialSummaryDetails', Obj)
      .subscribe((res) => {
        if (res.status == 200) {
          this.details = res.response;
          this.SFdetailsdata = [...this.SFdetailsdata, ...this.details];
          //console.log(this.SFdetailsdata);
          this.spinner = false;
          if (this.SFdetailsdata.length > 0) {
            this.NoData = false;
          } else {
            this.NoData = true;
          }
        }
      });
  }
  updateVerticalScroll(event): void {
    //  //console.log(event);

    if (
      event.target.scrollTop + event.target.clientHeight >=
      event.target.scrollHeight
    ) {
      if (this.pageNumber == 1) {
        this.spinner = true;
        this.pageNumber++;
        this.GetDetails();
      } else {
        if (this.details.length > 0) {
          this.spinner = true;
          this.pageNumber++;
          this.GetDetails();
        }
      }
    }
  }
  public inTheGreen(value: number): boolean {
    if (value >= 0) {
      return true;
    }
    return false;
  }
  close() {
    this.ngbmodalActive.close();
    //console.log(this.Opacity);
  }
  onclose() {
    this.ngbmodel.dismissAll();
    //console.log(this.Opacity);
  }
  exportAsXLSX() {
    let element = document.getElementById('Details');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element, {
      raw: true,
      dateNF: 'MMM-YYYY',
    });
    const wb = new Workbook();
    const ws = wb.addWorksheet('Sharing Data');
    const title = 'Back Gross Details';
    const titleRow = ws.addRow([title]);
    titleRow.font = {
      name: 'Corbel',
      family: 4,
      size: 16,
      underline: 'double',
      bold: true,
    };
    ws.addRow([]);
    ws.mergeCells('A1:D2');

    for (var i in worksheet) {
      //console.log(worksheet[i]);
      const range = StyleUtils.decode_range(worksheet['!ref']);
      var wscols = [{ wch: 30 }, { wch: 20 }, { wch: 40 }, { wch: 20 }];
      var wsrows = [{ hpt: 30 }];
      worksheet['!cols'] = wscols;
      worksheet['!rows'] = wsrows;
      // worksheet['!merges'] = [{s:{r:0,c:0},e:{r:0,c:5}}, {s:{r:1,c:0},e:{r:1,c:5}}];
      if (typeof worksheet[i] != 'object') continue;
      let cell = XLSX.utils.decode_cell(i);
      worksheet[i].s = {
        font: { name: 'arial' },
        alignment: { vertical: 'right', horizontal: 'right', wrapText: '3' },
        border: {
          right: { style: 'thin', color: '000000' },
          left: { style: 'thin', color: '000000' },
        },
      };
      if (cell.r == 0) {
        worksheet[i].s.border.bottom = { style: 'thin', color: 'FFCCFFE5' };
      }
      if (cell.r % 2) {
        worksheet[i].s.fill = {
          patternType: 'solid',
          fgColor: { rgb: 'b2b2b2' },
          bgColor: { rgb: 'b2b2b2' },
        };
      }
    }
    const workbook: XLSX.WorkBook = { Sheets: {}, SheetNames: [] };
    workbook.SheetNames.push(this.SFdetails.NAME);
    workbook.Sheets[this.SFdetails.NAME] = worksheet;
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const data: Blob = new Blob([excelBuffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(
      data,
      this.SFdetails.NAME + '-' + this.SFdetails.STORENAME
    );
  }
}
