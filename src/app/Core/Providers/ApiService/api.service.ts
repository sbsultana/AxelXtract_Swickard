import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map, tap, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private accountmapping = new BehaviorSubject<any>({ obj: '' });

  private Reports = new BehaviorSubject<any>({
    obj: '',
  });
  private HeaderData = new BehaviorSubject<any>({
    obj: '',
  });

  private BackgroundComponentState = new BehaviorSubject<any>({
    obj: '',
  });

  constructor(private http: HttpClient, private router: Router) {}

  postmethod(endpoint: string, obj: object): Observable<any> {
    return this.http.post(`${environment.apiUrl}${endpoint}`, obj).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  putmethod(endpoint: string, obj: object): Observable<any> {
    return this.http.put(`${environment.apiUrl}${endpoint}`, obj).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  postmethodOne(endpoint: string, obj: object): Observable<any> {
    return this.http
      .post(`${environment.axelOneUrl}${endpoint}`, obj)

      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  deletemethod(endpoint: string, obj: object): Observable<any> {
    return this.http
      .request('delete', `${environment.apiUrl}${endpoint}`, { body: obj })
      .pipe(
        map((res: any) => {
          console.log(res);
          return res;
        })
      );
  }

  postmethodXiom(endpoint: string, obj: object): Observable<any> {
    return this.http
      .post(`${environment.axelXiomUrl}${endpoint}`, obj)

      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  SetReports(data: any) {
    this.Reports.next(data);
  }
  GetReports() {
    return this.Reports.asObservable();
  }

  SetHeaderData(data: any) {
    this.HeaderData.next(data);
  }
  GetHeaderData() {
    return this.HeaderData.asObservable();
  }

  setBackgroundstate(data: any) {
    this.BackgroundComponentState.next(data);
  }
  getBackgroundstate() {
    return this.BackgroundComponentState.asObservable();
  }

  directSignIn(userId: any) {
    return this.http.request(
      'post',
      `${environment.apiUrl}xtract/userexists/` + userId
    );
  }

  setaccountmappingstate(data: any) {
    this.accountmapping.next(data);
  }
  getaccountmappingstate() {
    return this.accountmapping.asObservable();
  }
}
