import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ManageAppService {
    private baseUrl = environment.api_url;

    constructor(private _http: HttpClient) { console.log('service ',this.baseUrl);}

    addData(app: any): Observable<any> {
        return this._http.post(`${this.baseUrl}/App/create`, app);
    }

    updateData(id: number,app: any): Observable<any> {
        const url = `${this.baseUrl}/App/${id}`; 
        return this._http.put(url, app); 
    }

    getData(): Observable<any> {
        return this._http.get(`${this.baseUrl}/App/allAdmin`);
    }
    
}

