import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private baseUrl = environment.api_url;

    constructor(private _http: HttpClient) {     console.log('service ',this.baseUrl);}

    // getData(): Observable<any> {
    //     return this._http.get(`${this.baseUrl}/Apps/GetAllApps`);
    // }

    getData(): Observable<any> {
        return this._http.get(`${this.baseUrl}/App/all`);
    }
    
}

