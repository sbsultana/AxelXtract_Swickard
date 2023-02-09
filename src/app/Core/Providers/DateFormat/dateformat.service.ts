import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

function padNumber(value: number | null) {
  if (!isNaN(value) && value !== null) {
    return `0${value}`.slice(-2);
  } else {
    return '';
  }
}

@Injectable({
  providedIn: 'root'
})
export class DateformatService {

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const dateParts = value.trim().split('/');

      let dateObj: NgbDateStruct = { month: <any>null, day: <any>null,  year: <any>null }
      const dateLabels = Object.keys(dateObj);

      dateParts.forEach((datePart, idx) => {
        dateObj[dateLabels[idx]] = parseInt(datePart, 10) || <any>null;
      });
      return dateObj;
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ?
        `${padNumber(date.month)}/${padNumber(date.day)}/${date.year || ''}` :
        '';
  }

}
