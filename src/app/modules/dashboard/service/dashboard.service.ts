import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private baseUrl = environment.api_url;

    constructor(private _http: HttpClient) { }

    getData(): Observable<any> {
        return this._http.get(`${this.baseUrl}/App/all`);
    }

    getDataNew(): Observable<any> {
        return this._http.get(`${this.baseUrl}/App/all-new`);
    }

}

