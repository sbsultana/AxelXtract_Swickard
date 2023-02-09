import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApiService } from '../../../Core/Providers/ApiService/api.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx-with-styles';

import { Workbook } from 'exceljs';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  title: any;
  constructor(private apiSrvc: ApiService) {
    this.apiSrvc
      .GetHeaderData()
      .subscribe((appTitle) => (this.title = appTitle.obj.title));
    console.log(this.title);
  }

  SalesReportsXLSX() {
    console.log(this.title);
    let element = document.getElementById(this.title);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'sheet1');
    XLSX.writeFile(wb, this.title + '.xlsx');
  }

  public ExportTableToExcel(tablename, excelFileName, wscols, wsrows) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tablename, {
      raw: true,
      dateNF: 'MMM-YYYY',
    });
    worksheet['!cols'] = wscols;
    worksheet['!rows'] = wsrows;
    for (var i in worksheet) {
      console.log(worksheet[i]);
      if (typeof worksheet[i] != 'object') continue;
      let cell = XLSX.utils.decode_cell(i);
      worksheet[i].s = {
        // styling for all cells
        font: {
          name: 'arial',
        },
        alignment: {
          vertical: 'center',
          horizontal: 'right',
          wrapText: '1', // any truthy value here
        },
        border: {
          right: {
            style: 'thin',
            color: '000000',
          },
          left: {
            style: 'thin',
            color: '000000',
          },
        },
      };

      if (cell.r == 0) {
        // first row
        worksheet[i].s.border.bottom = {
          // bottom border
          style: 'thin',
          color: '000000',
        };
      }

      if (cell.r % 2) {
        // every other row
        worksheet[i].s.fill = {
          // background color
          patternType: 'solid',
          fgColor: { rgb: 'b2b2b2' },
          bgColor: { rgb: 'b2b2b2' },
        };
      }
    }
    const workbook: XLSX.WorkBook = { Sheets: {}, SheetNames: [] };
    workbook.SheetNames.push(this.title);
    workbook.Sheets[this.title] = worksheet;
    // const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    // let fileDate =this.datepipe.transform(new Date(), 'MMddyyyy');
    //alert(fileDate);
    FileSaver.saveAs(data, fileName + '_export_' + EXCEL_EXTENSION);
  }

  public ExportMultipleTablesToExcel(
    tablename,
    tablename_1,
    tablename_2,
    excelFileName
  ) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tablename, {
      raw: true,
      dateNF: 'MMM-YYYY',
    });
    const workbook: XLSX.WorkBook = { Sheets: {}, SheetNames: [] };
    workbook.SheetNames.push('Variable');
    workbook.Sheets['Variable'] = worksheet;
    const worksheet_1: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tablename_1, {
      raw: true,
      dateNF: 'MMM-YYYY',
    });
    // const workbook_1: XLSX.WorkBook = { Sheets: { }, SheetNames: [] };
    workbook.SheetNames.push('Passenger Car');
    workbook.Sheets['Passenger Car'] = worksheet_1;
    const worksheet_2: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tablename_2, {
      raw: true,
      dateNF: 'MMM-YYYY',
    });
    // const workbook_2: XLSX.WorkBook = { Sheets: { }, SheetNames: [] };
    workbook.SheetNames.push('Commercial Vans');
    workbook.Sheets['Commercial Vans'] = worksheet_2;
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  SheetName: any;
  public exportAsExcelFile(
    json: any[],
    excelFileName: string,
    wscols,
    wsrows
  ): void {
    this.SheetName = excelFileName;
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet', worksheet);
    worksheet['!cols'] = wscols;
    worksheet['!rows'] = wsrows;
    for (var i in worksheet) {
      console.log(worksheet[i]);
      if (typeof worksheet[i] != 'object') continue;
      let cell = XLSX.utils.decode_cell(i);
      worksheet[i].s = {
        // styling for all cells
        font: { name: 'arial' },
        alignment: {
          vertical: 'center',
          horizontal: 'center',
          wrapText: '1', // any truthy value here
        },
        border: {
          right: {
            style: 'thin',
            color: '000000',
          },
          left: {
            style: 'thin',
            color: '000000',
          },
        },
      };

      if (cell.r == 0) {
        // first row
        worksheet[i].s.border.bottom = {
          // bottom border
          style: 'thin',
          color: '000000',
        };
      }

      if (cell.r % 2) {
        // every other row
        worksheet[i].s.fill = {
          // background color
          patternType: 'solid',
          fgColor: { rgb: 'b2b2b2' },
          bgColor: { rgb: 'b2b2b2' },
        };
      }
    }
    const workbook: XLSX.WorkBook = { Sheets: {}, SheetNames: [] };
    workbook.SheetNames.push(this.SheetName);
    workbook.Sheets[this.SheetName] = worksheet;
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  exportToExcel(
    arr: any[],
    Heading: any[],
    excelFileName: string,
    wscols,
    wsrows,
    headerTab,
    Store
  ) {
    //Had to create a new workbook and then add the header
    const wb = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(arr);
    ws['!cols'] = wscols;
    ws['!rows'] = wsrows;
    XLSX.utils.sheet_add_aoa(ws, Heading);
    //Starting in the second row to avoid overriding and skipping headers
    XLSX.utils.sheet_add_json(ws, arr, { origin: 'A2', skipHeader: true });
    XLSX.utils.book_append_sheet(wb, ws, excelFileName);
    XLSX.writeFile(
      wb,
      Store + '_' + headerTab + '-' + excelFileName + EXCEL_EXTENSION
    );
  }
}
