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
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-financialsummary-details',
  templateUrl: './financialsummary-details.component.html',
  styleUrls: ['./financialsummary-details.component.scss'],
})
export class FinancialsummaryDetailsComponent implements OnInit {
  @Input() Fsdetails: any;
  as_id: any = [];
  FSDetailsData: any = [];
  pageNumber: any = 1;
  LatestDate: any;

  details: any = [];
  NoData: boolean;
  loadMore = 1;
  spinnerLoader: boolean = true;
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
      console.log(TagName.className);
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
    console.log(this.Fsdetails);
    this.GetDetails();
  }

  getStoresId(Value) {
    console.log(Value);
  }
  GetDetails() {
    this.Opacity = 'N';
    const format = 'MM-yyyy';
    const locale = 'en-US';
    const myDate = this.Fsdetails.LatestDate;
    const formattedDate = formatDate(myDate, format, locale);
    this.LatestDate = formattedDate;

    const Obj = {
      Type: this.Fsdetails.TYPE,
      Date: this.LatestDate,
      Stores:
        this.Fsdetails.STORES == undefined ||
        this.Fsdetails.STORES == null ||
        this.Fsdetails.STORES == 0
          ? ''
          : this.Fsdetails.STORES,
      PageNumber: this.pageNumber,
      PageSize: '100',
    };
    console.log(Obj);

    this.apiSrvc
      .postmethod('xtract/GetFinacialSummaryDetails', Obj)
      .subscribe((res) => {
        if (res.status == 200) {
          this.details = res.response;
          this.FSDetailsData = [...this.FSDetailsData, ...this.details];
          console.log(this.FSDetailsData);
          this.spinnerLoader = false;
          if (this.FSDetailsData.length > 0) {
            this.NoData = false;
          } else {
            this.NoData = true;
          }
        }
      });
  }
  updateVerticalScroll(event): void {
    //  console.log(event);

    if (
      event.target.scrollTop + event.target.clientHeight >=
      event.target.scrollHeight
    ) {
      if (this.pageNumber == 1) {
        this.spinnerLoader = true;
        this.pageNumber++;
        this.GetDetails();
      } else {
        if (this.details.length > 0) {
          this.spinnerLoader = true;
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
    console.log(this.Opacity);
  }
  onclose() {
    this.ngbmodel.dismissAll();
    console.log(this.Opacity);
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
      console.log(worksheet[i]);
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
    workbook.SheetNames.push(this.Fsdetails.NAME);
    workbook.Sheets[this.Fsdetails.NAME] = worksheet;
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const data: Blob = new Blob([excelBuffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, this.Fsdetails.NAME + '_export_' + EXCEL_EXTENSION);
  }

  Account_Details: any = [];
  AcctDetails: any = [];
  Acct_ID: any;

  AccountDetails(igconfirmtemp, Object) {
    this.Opacity = 'Y';
    this.Account_Details = [];
    this.componentState = true;
    console.log(Object);
    console.log(this.LatestDate);
    this.spinnerLoader = true;
    this.Acct_ID = Object.Account_ID;
    const Obj = {
      AccountNumber: Object.Account_ID,
      DateVal: this.LatestDate,
      Store:
        Object.STORE_ID == undefined ||
        Object.STORE_ID == null ||
        Object.STORE_ID == 0
          ? ''
          : Object.STORE_ID,
    };

    this.apiSrvc
      .postmethod('xtract/GetFinacialSummaryTransactionDetails', Obj)
      .subscribe((res) => {
        if (res.status == 200) {
          this.AcctDetails = res.response;
          this.Account_Details = [...this.Account_Details, ...this.AcctDetails];
          console.log(this.Account_Details);
          this.spinnerLoader = false;
          if (this.Account_Details.length > 0) {
            this.NoData = false;
          } else {
            this.NoData = true;
          }
        }
      });
  }

  exportAsXLSX_1() {
    // Excel Title, Header, Data
    console.log(this.AcctDetails);
    const detailsData = [];
    const title = 'Back Gross Details';
    const header = [
      'Control',
      'Detail Description',
      'Accounting Date',
      'Refer',
      'Posting',
    ];
    const data = this.AcctDetails.forEach((arry) => {
      detailsData.push(
        arry.control,
        arry.detaildescription,
        arry.accountingdate,
        arry.refer,
        arry.postingamount
      );
      console.log('Details Data', detailsData);
    });
    // Create workbook and worksheet
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sharing Data');
    // Add Row and formatting
    const titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Corbel', family: 4, size: 16, bold: true };
    worksheet.addRow([]);
    worksheet.mergeCells('A1:E2');
    // Blank Row
    worksheet.addRow([]);
    // Add Header Row
    const headerRow = worksheet.addRow(header);

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFCCFFE5' },
        bgColor: { argb: 'FFCCFFE5' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
    // Add Data and Conditional Formatting
    data.forEach((d) => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(5);
      let color = 'FF99FF99';
      if (+qty.value < 500) {
        color = 'FF9999';
      }
      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color },
      };
    });
    worksheet.getColumn(1).width = 20;
    worksheet.getColumn(2).width = 30;
    worksheet.getColumn(3).width = 20;
    worksheet.getColumn(4).width = 20;
    worksheet.getColumn(5).width = 20;
    worksheet.addRow([]);
    // Footer Row
    const footerRow = worksheet.addRow([
      'This is system generated excel sheet.',
    ]);
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCFFE5' },
    };
    footerRow.getCell(1).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    // Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);
    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: EXCEL_TYPE });
      FileSaver.saveAs(blob, this.Acct_ID + EXCEL_EXTENSION);
    });
  }
}
