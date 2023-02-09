import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ApiService } from '../../../Core/Providers/ApiService/api.service';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  @ViewChild('content', { static: false }) content: ElementRef;
  title: any;
  constructor(private apiSrvc: ApiService) {
    this.apiSrvc
      .GetHeaderData()
      .subscribe((appTitle) => (this.title = appTitle.obj.title));
    console.log(this.title);
  }

  GetPrintData(PrintID) {
    let printContents, popupWin;
    printContents = document.getElementById(PrintID).innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>

          @font-face {
           font-family: 'GothamBookRegular';
           src: url('assets/fonts/Gotham\ Book\ Regular.otf') format('otf'), /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
                url('assets/fonts/Gotham\ Book\ Regular.otf') format('opentype'); /* Chrome 4+, Firefox 3.5, Opera 10+, Safari 3—5 */
         }
         @font-face {
           font-family: 'Roboto';
           src: url('assets/fonts/Roboto-Regular.ttf') format('ttf'), /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
                url('assets/fonts/Roboto-Regular.ttf') format('truetype'); /* Chrome 4+, Firefox 3.5, Opera 10+, Safari 3—5 */
         }
         @font-face {
           font-family: 'RobotoBold';
           src: url('assets/fonts/Roboto-Bold.ttf') format('ttf'), /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
                url('assets/fonts/Roboto-Bold.ttf') format('truetype'); /* Chrome 4+, Firefox 3.5, Opera 10+, Safari 3—5 */
         }

         table{border-collapse: collapse;font-family: Roboto;}

        .gross-tbl table tbody .title {font-family: 'Roboto';font-size: .8rem;}
        .d-flex {display: flex!important;}

        .gross-tbl table tbody{z-index: 4;width: auto;text-align: end;background: #363b4f;color: #fff;padding-right: 2rem;cursor: pointer;text-align: left;white-space: nowrap;font-size: .7rem;font-family: 'Roboto';border:none !important ;}
        .gross-tbl thead {border-top: none !important;border-bottom: none !important;box-shadow: inset 0 -5px 0 #2d91f1;background: #ffffff;z-index: 2;width: 11%;}
        .gross-tbl thead tr th{z-index: 3;left: 0;top: 0;}
        .gross-tbl thead tr:nth-child(1) th:not(:first-child){padding-bottom: 0px !important;color: black;font-size: .9rem;}
        .gross-tbl thead tr:nth-child(2) th:not(:first-child){padding-bottom: 10px;color: #a2a3a7;font-size: .7rem;text-align: center !important;}

        .gross-tbl tr th:first-child {z-index: 4;display: block;background-color: #2d91f1;color: white;font-size: .7rem;}
        .sec-tbl thead tr th:first-child {left: 0;display: block !important;color: #000;font-size: .7rem;}

        .gross-tbl table tbody .sub-title td:nth-child(1) {color: #2d7dcc;text-align: left;}
        .gross-tbl table tbody .sub-title {font-family: 'Roboto';font-size: .7rem;}
        .sec-tbl table{padding: 2px 5px;border-top: 2px solid #e0e1e2;border-bottom: 2px solid #e0e1e2;font-size: .8rem;}

        .sec-tbl thead {border-top: none !important;border-bottom: none !important;box-shadow: inset 0 -5px 0 #2d91f1;background: #ffffff;z-index: 2;font-family: 'RobotoBold';}
        .sec-tbl thead tr:nth-child(1) th:not(:first-child){padding-bottom: 0px !important;font-size: .9rem;}
        .sec-tbl thead tr:nth-child(2) th:not(:first-child){color: #a2a3a7;font-size: .8rem;white-space: nowrap;}

        .sec-tbl table tbody .sub-title {font-size:.7rem;background-color: #eaf4fd !important;}
        .sec-tbl table tbody .title:nth-child(odd){background-color: #e5e5e5;}
        .sec-tbl table tbody .hidden:nth-child(odd){background-color: #eaf4fd;}
        .sec-tbl table tbody {font-size:.7rem;}
        .sec-tbl table thead tr:nth-child(2) th:not(:first-child) {padding-bottom: 10px;color: #a2a3a7;font-size: .7rem;white-space: nowrap;}
        .gross-tbl table th{padding: 4.2px 5px;}

        .Salesgross-tbl2 table tbody td:nth-child(5n + 6) {border-right: 2px solid #e0e1e2;position: relative;padding-right: 1rem;}
        .Salesgross-tbl2 table thead th:nth-child(5n + 6) {border-right: 2px solid #e0e1e2;position: relative;padding-right: 1rem;}
        .gross-tbl table tbody .title td:first-child {color: white;word-wrap: break-word;height: 35px;white-space: nowrap;text-align: left;}
        .sec-tbl table tbody .title td {color: #000;word-wrap: break-word;height: 35px;}
        .gross-tbl table tbody .titleodd td:first-child {color: white;word-wrap: break-word;height: 35px;white-space: nowrap;text-align: left;}

        .sec-tbl table tbody .titleodd td {color: #000;word-wrap: break-word;height: 35px;}

        .sec-tbl table td{padding: 2px 5px;text-align: right;}
        .gross-tbl table td {padding: 2px 5px;}
        .sec-tbl table tbody .hidden{display: none;}
        .gross-tbl table tbody .hidden{display: none;}
        .negative {color: red !important;}



        .SrvcGross-tbl2 table thead th:nth-child(6){border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}
        .SrvcGross-tbl2 table thead th:nth-child(10){border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}
        .SrvcGross-tbl2 table thead th:nth-child(14){border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}
        .SrvcGross-tbl2 table thead th:nth-child(21){border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}

        .SrvcGross-tbl2 table tbody td:nth-child(6){border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}
        .SrvcGross-tbl2 table tbody td:nth-child(10){border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}
        .SrvcGross-tbl2 table tbody td:nth-child(14){border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}
        .SrvcGross-tbl2 table tbody td:nth-child(21){border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}



        .Partsgross-tbl2 table thead th:nth-child(4){border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}
        .Partsgross-tbl2 table thead th:nth-child(10){border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}
        .Partsgross-tbl2 table thead th:nth-child(14){border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}
        .Partsgross-tbl2 table thead th:nth-child(18){border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}

        .Partsgross-tbl2 table tbody td:nth-child(4){border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}
        .Partsgross-tbl2 table tbody td:nth-child(10){border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}
        .Partsgross-tbl2 table tbody td:nth-child(14){border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}
        .Partsgross-tbl2 table tbody td:nth-child(18){border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}


        .fs-tbl table{ border-top:2px solid #e0e1e2;border-bottom:2px solid #e0e1e2;}
        .fs-tbl table{border-collapse: collapse;font-family: Roboto; width: 100%;}
        .fs-tbl table tbody .sub-title td:not(:first-child){text-align: end;}
        .fs-tbl table tbody .sub-title{color: #000;font-family: 'Roboto';font-size: .7rem;background-color: #fff;}
        .fs-tbl table tbody .sub-title td:nth-child(1){ color: #ffff; background-color: #363b4f;}
        .fs-tbl table tbody .sub-title .sub-trgt{font-family: 'Roboto' ;color: #000 ;background-color: #9dc9f169;}
        // .fs-tbl table thead tr:nth-child(1) th:not(:first-child){padding-bottom: 0px !important;color: #fff;font-size: 0.8rem;}
        .fs-tbl table thead tr:nth-child(2) th:not(:first-child){padding-bottom: 10px;font-size: .70rem; font-family: 'Roboto';}
        .fs-tbl table thead tr th:first-child { position: sticky;z-index: 4;left: 0;display: block; width:150px; background-color: #2d91f1;color: white;font-size: .70rem;font-family: 'RobotoBold';white-space:  nowrap;overflow:  hidden;text-overflow:  ellipsis;}
        .fs-tbl table tbody tr td:first-child {position: sticky;z-index: 4;left: 0;color: #fff;padding-right: 1rem;white-space:  nowrap;overflow:  hidden;text-overflow:  ellipsis;display:  block; width:150px;}
        .fs-tbl table thead th{padding: 5px 10px;}
        .fs-tbl table tbody td {padding: 4px 8px;}
        .fs-tbl table tbody .sub-title td:first-child{padding: 5px 15px !important;}
        .fs-tbl table thead  th:first-child{padding: 5px 15px !important; border-bottom: 10px solid #2d91f1;vertical-align: middle;}
        .fs-tbl table tbody .title{background-color: #363b4f;}
        .fs-tbl table tbody .title td:first-child{color: #2d91f1 !important;font-size: .7rem !important;}
        .fs-tbl table tbody .colortitle td:first-child{color: #2d91f1 !important;font-size: .80rem !important;}
        .fs-tbl table tbody .sub-title:nth-child(odd){color: #000;background-color: #e5e5e5;}
        .fs-tbl table tbody .maintitle{font-size: .80rem !important;font-family: 'RobotoBold' !important;}
        .fs-tbl table thead th:last-child{border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}
        .fs-tbl table tbody td:last-child{border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}


        .acct-tbl {width:100% ;margin-top: 1rem;text-align: center;background: #fff;margin-bottom: 1rem;}
        .acct-tbl table{white-space: nowrap; width:100% ;border: 2px solid #e0e1e2;}
        .acct-tbl table, td, th {border-collapse: collapse;}
        .acct-tbl th{padding:10px 20px;border-right: 2px solid #e0e1e2;font-family: 'Roboto';}
        .acct-tbl td{padding:5px 20px;border-right: 2px solid #e0e1e2;font-family: 'Roboto';}
        .acct-tbl tr td:nth-last-child(-n+1){border-right: none !important;}
        .acct-tbl thead {border-top: none !important;border-bottom: none !important;background: #ffffff;font-size: .8vw;position: sticky;top:0;}
        .acct-tbl th:nth-child(n),td:nth-child(n){text-align: left;width:10%}
        // .acct-tbl th:nth-child(n+2),th:nth-child(n+3),th:nth-child(n+4), td:nth-child(n+2),td:nth-child(n+3),td:nth-child(n+4){text-align: left;}
        // .acct-tbl th:nth-child(n+5),td:nth-child(n+5){text-align: left;}
        .acct-tbl th:nth-child(n+6),td:nth-child(n+6){text-align: center;}
        .acct-tbl tbody {background: #fff;color: #000; font-size: .8vw;font-family: 'Roboto';}
        .acct-tbl tr:first-child{padding-top: 2rem !important;}

        .sale-row-tbl{ display: flex;}
        .sales-tbl{ width: 350px; padding-left: 30px; }
        .sales-tbl table tbody td{padding: 2px 25px;}
        .sales-tbl table thead th{padding: 2px 25px;}
        .sales-tbl table{white-space: nowrap;margin-bottom: 30px;}
        .sales-tbl table,td,th{border-collapse: collapse;}
        .sales-tbl table .sub-title td:first-child {padding: 2px 40px !important;}
        .sales-tbl table thead {box-shadow: inset 0 -5px 0 #2d91f1;background: #ffffff;position: sticky;z-index: 2;top: 0;}
        .sales-tbl table thead tr th {z-index: 3;left: 0;top: 0;}
        .sales-tbl table thead tr:nth-child(1) th:not(:first-child) {padding-bottom: 0px !important;color: #000;font-size: 0.9rem;}
        .sales-tbl table thead .SGtitle:nth-child(2) th:first-child {border-bottom: 5px solid #2d91f1; font-size: 1rem;}
        .sales-tbl table thead .SGtitle:nth-child(1) th:first-child {border-bottom: 5px solid #2d91f1;font-size: .9rem;}
        .sales-tbl table thead .factory-row:nth-child(1) th:not(:first-child) {// padding-bottom: 10px !important;color: #a2a3a7 !important;font-size: 1rem !important;}
        .sales-tbl table thead tr th:first-child {position: sticky;z-index: 4;left: 0;display: block;background-color: #2d91f1;color: white;font-size: .80rem;font-family: 'RobotoBold';}
        .sales-tbl table thead .TitleHead th:first-child {font-family: 'RobotoBold';background-color: #363b4f !important;font-size: 1.1rem;color: #fff;}
        .sales-tbl table thead .TitleHead th {font-family: 'RobotoBold';background-color: #363b4f !important;font-size: 1.1rem;color: #fff;}
        .sales-tbl table thead th {border-right: 2px solid #e0e1e2;position: relative;padding-right: 1rem;}
        .sales-tbl table .divRed {color: red !important;}
        .sales-tbl table .divGreen {color: green !important;}
        .sales-tbl table .title-head th {background-color: #363b4f !important;font-family: 'Roboto';}
        .sales-tbl table .EmptyRed {background-color: #fff0 !important;font-family: 'Roboto';font-size: .9rem;color: red;}
        .sales-tbl table .EmptyRed td:first-child {background-color: #fff0 !important;color: red !important;}
        .sales-tbl table .Empty {background-color: #fff0 !important;font-family: 'Roboto';font-size: .9rem;color: #000;}
        .sales-tbl table .divRed {color: red !important;}
        .sales-tbl table .divGreen {color: green !important;}
        .sales-tbl table .title-head th {background-color: #363b4f !important;font-family: 'Roboto';}
        .sales-tbl table .EmptyRed {background-color: #fff0 !important;font-family: 'Roboto';font-size: .9rem;color: red;}
        .sales-tbl table .EmptyRed td:first-child {background-color: #fff0 !important;color: red !important;}
        .sales-tbl table .Empty {background-color: #fff0 !important;font-family: 'Roboto';font-size: .9rem;color: #000;}
        .sales-tbl table tbody td:first-child {background-color: #fff0 !important;}
        .sales-tbl table tbody .Empty#363b4f {background-color: #363b4f !important;font-family: 'Roboto';font-size: .9rem;color: #fff;}
        .sales-tbl table tbody .Empty#363b4f td:first-child {background-color: #363b4f !important;color: #fff !important;}
        .sales-tbl table tbody tr td:first-child {position: sticky;z-index: 4;left: 0;width: 150px !important;background: #363b4f !important;color: #fff !important;padding-right: 1rem;}
        .sales-tbl table tbody .title-spl {font-size: 0.9rem;}
        .sales-tbl table thead .title-head td {background-color: #fff0 !important;font-family: 'Roboto';}
        .sales-tbl table tbody {background: #fff;color: #788494;font-size: .7rem;font-family: 'Roboto';}
        .sales-tbl table tbody .sub-title td:not(:first-child){text-align: end;}
        .sales-tbl table thead .SGtitle th:not(:first-child){text-align: end;}
        .sales-tbl table tbody .title-head td:first-child {background-color: #363b4f !important;border: none;z-index: 4;text-align: left;color: #fff;font-family: 'Roboto';font-size: 0.9rem;}
        .sales-tbl table tbody .title-head td:not(:first-child) {background-color: #363b4f !important;color: #fff;font-family: 'Roboto';font-size: 0.9rem;}
        .sales-tbl table tbody td {border-right: 2px solid #e0e1e2;position: relative;padding-right: 1rem;}
        .sales-tbl table tbody .title:nth-child(odd) {color: #000;background-color: #e5e5e5;}
        .sales-tbl table tbody .sub-title:nth-child(odd) {color: #000;background-color: #e5e5e5;}
        .sales-tbl table tbody .title {font-family: 'RobotoBold';color: #000;font-size: 0.8rem;}
        .sales-tbl table tbody .title td:first-child {color: #2d91f1;word-wrap: break-word;font-size: 0.8rem !important;text-align: left;}
        .sales-tbl table tbody .title .sub-Trgt {font-family: 'Roboto';color: #000;background-color: #eaf4fd;}
        .sales-tbl table tbody .title .sub-Diffrnce {font-family: 'Roboto' !important;color: #000 !important;background-color: #eaf4fd !important;}
        .sales-tbl table tbody .title .sub-trgt {font-family: 'Roboto';background-color: #9dc9f169;}
        .sales-tbl table tbody .total {font-family: 'Roboto';color: #000;font-size: .9rem;border: 1px solid #2d7dcc;}
        .sales-tbl table tbody .sub-title td:first-child {text-align: left;}
        .sales-tbl table tbody .sub-title {color: #000;font-family: 'Roboto';font-size: .8rem;text-align: right;}
        .sales-tbl table tbody .sub-title td:nth-child(1) {color: #ffff;}
        .sales-tbl table tbody .sub-title .sub-trgt {font-family: 'Roboto';color: #000;background-color: #9dc9f169;}

      </style>

        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`);
    popupWin.document.close();
  }

  generarPDF() {
    console.log('Header Name', this.title);

    const div = document.getElementById(this.title);
    const options = {
      background: 'white',
      scale: 3,
    };
    html2canvas(div, options)
      .then((canvas) => {
        var img = canvas.toDataURL('image/PNG');
        var doc = new jsPDF('l', 'mm', 'a4');
        // Add image Canvas to PDF
        const bufferX = 5;
        const bufferY = 5;
        const imgProps = (<any>doc).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(
          img,
          'PNG',
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST'
        );

        return doc;
      })
      .then((doc) => {
        doc.save('salereports.pdf');
      });
  }

  sendEmailData(pdf_ID) {
    console.log('Header Name', pdf_ID);
    let printContents, popupWin;
    printContents = document.getElementById(pdf_ID).innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
          <html>
            <head>
              <title>Print tab</title>
                 <style>
                 @font-face {
                  font-family: 'GothamBookRegular';
                  src: url('assets/fonts/Gotham\ Book\ Regular.otf') format('otf'), /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
                       url('assets/fonts/Gotham\ Book\ Regular.otf') format('opentype'); /* Chrome 4+, Firefox 3.5, Opera 10+, Safari 3—5 */
                }
                @font-face {
                  font-family: 'Roboto';
                  src: url('assets/fonts/Roboto-Regular.ttf') format('ttf'), /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
                       url('assets/fonts/Roboto-Regular.ttf') format('truetype'); /* Chrome 4+, Firefox 3.5, Opera 10+, Safari 3—5 */
                }
                @font-face {
                  font-family: 'RobotoBold';
                  src: url('assets/fonts/Roboto-Bold.ttf') format('ttf'), /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
                       url('assets/fonts/Roboto-Bold.ttf') format('truetype'); /* Chrome 4+, Firefox 3.5, Opera 10+, Safari 3—5 */
                }

                table{border-collapse: collapse;font-family: Roboto;}

                .gross-tbl table tbody .title {font-family: 'Roboto';font-size: .8rem;}

                .d-flex {display: flex!important;}

          .gross-tbl table tbody{z-index: 4;width: auto;text-align: end;background: #363b4f;color: #fff;padding-right: 2rem;cursor: pointer;text-align: left;white-space: nowrap;font-size: .7rem;font-family: 'Roboto';border:none !important ;}
          .gross-tbl thead {box-shadow: inset 0 -5px 0 #2d91f1;background: #ffffff;z-index: 2;width: 100%;}
          .gross-tbl thead tr th{z-index: 3;left: 0;top: 0;}
          .gross-tbl thead tr:nth-child(1) th:not(:first-child){padding-bottom: 0px !important;color: black;font-size: .9rem;}
          .gross-tbl thead tr:nth-child(2) th:not(:first-child){padding-bottom: 10px;color: #a2a3a7;font-size: .7rem;}

          .gross-tbl tr th:first-child {z-index: 4;display: block;background-color: #2d91f1;color: white;font-size: .72rem;}

          .sec-tbl thead tr th:first-child {left: 0;display: block !important;color: #000;font-size: .82rem;}
          .gross-tbl table tbody .sub-title td:nth-child(1) {color: #2d7dcc;text-align: left;}
          .gross-tbl table tbody .sub-title {font-family: 'Roboto';font-size: .7rem;}
          .sec-tbl table{padding: 2px 5px;border-top: 2px solid #e0e1e2;border-bottom: 2px solid #e0e1e2;font-size: .8rem;}
          .gross-tbl table{border-top: 2px solid #e0e1e2;border-bottom: 2px solid #e0e1e2;}
          .sec-tbl thead {border-top: none !important;border-bottom: none !important;box-shadow: inset 0 -5px 0 #2d91f1;background: #ffffff;z-index: 2;font-family: 'RobotoBold';}
          .sec-tbl thead tr:nth-child(1) th:not(:first-child){text-align: center !important;}
          .sec-tbl thead tr:nth-child(1) th:not(:first-child){padding-bottom: 0px !important;font-size: .9rem;}
          .sec-tbl thead tr:nth-child(2) th:not(:first-child){color: #a2a3a7;font-size: .8rem;white-space: nowrap;}

          .sec-tbl table tbody .sub-title {font-size:.7rem;background-color: #eaf4fd !important;}
          .sec-tbl table tbody .hidden:nth-child(odd){background-color: #eaf4fd;}
          // .sec-tbl table tbody .hidden:nth-child(even){background-color: #ccc;}
          .sec-tbl table tbody {font-size:.7rem;}
          .sec-tbl table thead tr:nth-child(2) th:not(:first-child) {padding-bottom: 10px;color: #a2a3a7;font-size: .7rem;white-space: nowrap;}
          .gross-tbl table th{padding: 4.2px 5px;}
          .Salesgross-tbl2 table tbody td:nth-child(5n + 6) {border-right: 2px solid #e0e1e2;position: relative;padding-right: 1rem;}
          .Salesgross-tbl2 table thead th:nth-child(5n + 6) {border-right: 2px solid #e0e1e2;position: relative;padding-right: 1rem;}
          .gross-tbl table tbody .title td:first-child {color: white;word-wrap: break-word;white-space: nowrap;text-align: left;}
          .sec-tbl table tbody .title{color: #000;word-wrap: break-word;font-size:.8rem;}
          .sec-tbl table tbody .titleOdd{font-family: 'Roboto';color: #000;font-size: .8rem;background-color: #e5e5e5;}
          .gross-tbl table tbody .titleodd td:first-child {color: white;word-wrap: break-word;white-space: nowrap;text-align: left;}

        .sec-tbl table tbody .Pdf_title {color: #000;word-wrap: break-word;font-size:.8rem;}

        .sec-tbl table tbody td{padding: 8px 5px;text-align: right;}
        .gross-tbl table tbody td {padding: 8px 5px;}
        .sec-tbl table tbody .hidden{display: none;}
        .gross-tbl table tbody .hidden{display: none;}
        .negative {color: red;}



        .SrvcGross-tbl2 table thead th:nth-child(6){border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}
        .SrvcGross-tbl2 table thead th:nth-child(10){border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}
        .SrvcGross-tbl2 table thead th:nth-child(14){border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}
        .SrvcGross-tbl2 table thead th:nth-child(21){border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}

        .SrvcGross-tbl2 table tbody td:nth-child(6){border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}
        .SrvcGross-tbl2 table tbody td:nth-child(10){border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}
        .SrvcGross-tbl2 table tbody td:nth-child(14){border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}
        .SrvcGross-tbl2 table tbody td:nth-child(21){border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}


        .Partsgross-tbl2 table thead th:nth-child(4){border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}
        .Partsgross-tbl2 table thead th:nth-child(10){border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}
        .Partsgross-tbl2 table thead th:nth-child(14){border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}
        .Partsgross-tbl2 table thead th:nth-child(18){border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}

        .Partsgross-tbl2 table tbody td:nth-child(4){border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}
        .Partsgross-tbl2 table tbody td:nth-child(10){border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}
        .Partsgross-tbl2 table tbody td:nth-child(14){border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}
        .Partsgross-tbl2 table tbody td:nth-child(18){border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}

        .fs-tbl table{border-collapse: collapse;font-family: Roboto;}
        .fs-tbl table tbody .sub-title td:not(:first-child){text-align: end;}
        .fs-tbl table tbody .sub-title{color: #000;font-family: 'Roboto';font-size: .8rem;background-color: #fff;}
        .fs-tbl table tbody .sub-title td:nth-child(1){ color: #ffff; background-color: #363b4f;}
        .fs-tbl table tbody .sub-title .sub-trgt{font-family: 'Roboto' ;color: #000 ;background-color: #9dc9f169;}
        .fs-tbl table thead tr th:first-child { position: sticky;z-index: 4;left: 0;display: block;background-color: #2d91f1;color: white;font-size: .80rem;font-family: 'RobotoBold';white-space:  nowrap;overflow:  hidden;text-overflow:  ellipsis;}
        .fs-tbl table tbody tr td:first-child {position: sticky;z-index: 4;left: 0;color: #fff;padding-right: 1rem;white-space:  nowrap;overflow:  hidden;text-overflow:  ellipsis;display:  block; width:225px;}
        .fs-tbl table thead th{padding: 7px 15px;}
        .fs-tbl table tbody td {padding: 5px 15px;}
        .fs-tbl table tbody .sub-title td:first-child{padding: 5px 25px !important;}
        .fs-tbl table tbody .title{background-color: #363b4f;}
        .fs-tbl table tbody .title td:first-child{color: #2d91f1 !important;font-size: .8rem !important;}
        .fs-tbl table tbody .colortitle td:first-child{color: #2d91f1 !important;font-size: .8rem !important;}
        .fs-tbl table tbody .sub-title:nth-child(odd){color: #000;background-color: #e5e5e5;}
        .fs-tbl table tbody .maintitle{font-size: .90rem !important;font-family: 'RobotoBold' !important;}
        .fs-tbl table thead th:last-child{border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}
        .fs-tbl table tbody td:last-child{border-right: 2px solid #e0e1e2; position: relative; padding-right: 1rem;}


      .acct-tbl{width:100% ;margin-top: 1rem;// text-align: center;background: #fff;margin-bottom: 1rem;}
      .acct-tbl table{// white-space: nowrap; width:100% ;}
      .acct-tbl table, td, th {border-collapse: collapse;}
      .acct-tbl table thead th{padding:10px 23px;border-right: 1px solid #e0e1e2;font-family: 'Roboto';}
      .acct-tbl table tbody td{padding:5px 20px;border-right: 1px solid #e0e1e2;font-family: 'Roboto';}
      .acct-tbl table tbody tr td:nth-last-child(-n+1){border-right: none !important;}
      .acct-tbl table thead {border-top: none !important;border-bottom: none !important;// box-shadow: inset 0 -5px 0 #2d91f1;background: #ffffff;font-size: .8vw;position: sticky;top:0;}
      .acct-tbl table thead th:nth-child(n),td:nth-child(n){text-align: left;width:10%}
      .acct-tbl table thead th:nth-child(n+2),th:nth-child(n+3),th:nth-child(n+4), td:nth-child(n+2),td:nth-child(n+3),td:nth-child(n+4){text-align: left;}
      .acct-tbl table thead th:nth-child(n+5),td:nth-child(n+5){text-align: left;}
    //.acct-tbl table thead th:nth-child(n+6),td:nth-child(n+6){text-align: center;}
      .acct-tbl table tbody {background: #fff;color: #000; font-size: .8vw;font-family: 'Roboto';}
      .acct-tbl table tbody tr:first-child{padding-top: 2rem !important;}
      .acct-tbl table tbody tr ._btn{background: #e0e8ec;color: #000;border-radius: 20px;font-size: .7vw;}
      .acct-tbl table tbody tr ._btnred{color: red;border-radius: 20px;font-size: .7vw;border: 1px solid red;}



        .sale-row-tbl{ display: block;}
        .sales-tbl{ width: 350px;}
        .sales-tbl table{white-space: nowrap;margin-bottom: 30px;}
        .sales-tbl table,td,th{border-collapse: collapse;}
        .sales-tbl table tbody td{padding: 2px 25px;}
        .sales-tbl table thead th{padding: 2px 25px;}
        .sales-tbl table .sub-title td:first-child {padding: 2px 40px !important;}
        .sales-tbl table thead {box-shadow: inset 0 -5px 0 #2d91f1;background: #ffffff;position: sticky;z-index: 2;top: 0;}
        .sales-tbl table thead tr th {z-index: 3;left: 0;top: 0;}
        .sales-tbl table thead tr:nth-child(1) th:not(:first-child) {padding-bottom: 0px !important;color: #000;font-size: 0.9rem;}
        .sales-tbl table thead .SGtitle:nth-child(2) th:first-child {border-bottom: 5px solid #2d91f1; font-size: 1rem;}
        .sales-tbl table thead .SGtitle:nth-child(1) th:first-child {border-bottom: 5px solid #2d91f1;font-size: .9rem;}
        .sales-tbl table thead .factory-row:nth-child(1) th:not(:first-child) {// padding-bottom: 10px !important;color: #a2a3a7 !important;font-size: 1rem !important;}
        .sales-tbl table thead tr th:first-child {position: sticky;z-index: 4;left: 0;display: block;background-color: #2d91f1;color: white;font-size: .80rem;font-family: 'RobotoBold';}
        .sales-tbl table thead .TitleHead th:first-child {font-family: 'RobotoBold';background-color: #363b4f !important;font-size: 1.1rem;color: #fff;}
        .sales-tbl table thead .TitleHead th {font-family: 'RobotoBold';background-color: #363b4f !important;font-size: 1.1rem;color: #fff;}
        .sales-tbl table thead th {border-right: 2px solid #e0e1e2;position: relative;padding-right: 1rem;}
        .sales-tbl table .divRed {color: red !important;}
        .sales-tbl table .divGreen {color: green !important;}
        .sales-tbl table .title-head th {background-color: #363b4f !important;font-family: 'Roboto';}
        .sales-tbl table .EmptyRed {background-color: #fff0 !important;font-family: 'Roboto';font-size: .9rem;color: red;}
        .sales-tbl table .EmptyRed td:first-child {background-color: #fff0 !important;color: red !important;}
        .sales-tbl table .Empty {background-color: #fff0 !important;font-family: 'Roboto';font-size: .9rem;color: #000;}
        .sales-tbl table tbody td:first-child {background-color: #fff0 !important;}
        .sales-tbl table tbody .Empty#363b4f {background-color: #363b4f !important;font-family: 'Roboto';font-size: .9rem;color: #fff;}
        .sales-tbl table tbody .Empty#363b4f td:first-child {background-color: #363b4f !important;color: #fff !important;}
        .sales-tbl table tbody tr td:first-child {position: sticky;z-index: 4;left: 0;background: #363b4f !important;color: #fff;padding-right: 1rem;}
        .sales-tbl table tbody .title-spl {font-size: 0.9rem;}
        .sales-tbl table thead .title-head td {background-color: #fff0 !important;font-family: 'Roboto';}
        .sales-tbl table tbody {background: #fff;color: #788494;font-size: .7rem;font-family: 'Roboto';}
        .sales-tbl table tbody .sub-title td:not(:first-child){text-align: end;}
        .sales-tbl table thead .SGtitle th:not(:first-child){text-align: end;}
        .sales-tbl table tbody .title-head td:first-child {background-color: #363b4f !important;border: none;z-index: 4;text-align: left;color: #fff;font-family: 'Roboto';font-size: 0.9rem;}
        .sales-tbl table tbody .title-head td:not(:first-child) {background-color: #363b4f !important;color: #fff;font-family: 'Roboto';font-size: 0.9rem;}
        .sales-tbl table tbody td {border-right: 2px solid #e0e1e2;position: relative;padding-right: 1rem;}
        .sales-tbl table tbody .title:nth-child(odd) {color: #000;background-color: #e5e5e5;}
        .sales-tbl table tbody .sub-title:nth-child(odd) {color: #000;background-color: #e5e5e5;}
        .sales-tbl table tbody .title {font-family: 'RobotoBold';color: #000;font-size: 0.8rem;}
        .sales-tbl table tbody .title td:first-child {color: #2d91f1;word-wrap: break-word;font-size: 0.8rem !important;text-align: left;}
        .sales-tbl table tbody .title .sub-Trgt {font-family: 'Roboto';color: #000;background-color: #eaf4fd;}
        .sales-tbl table tbody .title .sub-Diffrnce {font-family: 'Roboto' !important;color: #000 !important;background-color: #eaf4fd !important;}
        .sales-tbl table tbody .title .sub-trgt {font-family: 'Roboto';background-color: #9dc9f169;}
        .sales-tbl table tbody .total {font-family: 'Roboto';color: #000;font-size: .9rem;border: 1px solid #2d7dcc;}
        .sales-tbl table tbody .sub-title td:first-child {text-align: left;}
        .sales-tbl table tbody .sub-title {color: #000;font-family: 'Roboto';font-size: .8rem;text-align: right;}
        .sales-tbl table tbody .sub-title td:nth-child(1) {color: #ffff;}
        .sales-tbl table tbody .sub-title .sub-trgt {font-family: 'Roboto';color: #000;background-color: #9dc9f169;}


                 </style>
            </head>
        <body id='content'>${printContents}</body>
          </html>`);
    // popupWin.document.close();
    const div = popupWin.document.getElementById('content');
    html2canvas(div, {
      logging: true,
      allowTaint: false,
      useCORS: true,
    }).then((canvas) => {
      let imgWidth = 285;
      let pageHeight = 208;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png');
      let pdfData = new jsPDF('l', 'mm', 'a4', true); // A4 size page of PDF
      let position = 5;
      pdfData.addImage(
        contentDataURL,
        'PNG',
        5,
        position,
        imgWidth,
        imgHeight,
        undefined,
        'FAST'
      );
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdfData.addPage();
        pdfData.addImage(
          contentDataURL,
          'PNG',
          5,
          position,
          imgWidth,
          imgHeight,
          undefined,
          'FAST'
        );
        heightLeft -= pageHeight;
      }
      var myBlob = new Blob();
      myBlob = pdfData.output('blob');
      var myFiles: File;
      myFiles = this.blobToFile(myBlob, pdf_ID + '.pdf');
      const fd: any = new FormData(); // To carry on your data
      fd.append('to_email', 'gowthamg@spyhre.com');
      fd.append('subject', 'Sample test from dev');
      fd.append('file', myFiles);
      console.log('formdata', myFiles);
      this.apiSrvc.postmethod('xtract/mail', fd).subscribe(
        (res: any) => {
          console.log('response', res);
          if (res.status == 200) {
            alert(res.response);
          } else {
            alert('Invalid Details');
          }
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }
  public blobToFile = (theBlob: Blob, fileName: string): File => {
    return new File([theBlob], fileName, {
      lastModified: new Date().getTime(),
      type: theBlob.type,
    });
  };
}
