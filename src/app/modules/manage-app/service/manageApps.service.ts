import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ManageAppService {
    private baseUrl = environment.api_url;

    constructor(private _http: HttpClient) { }

    addData(app: any): Observable<any> {
        return this._http.post(`${this.baseUrl}/App/create`, app);
    }

    updateData(id: number, app: any): Observable<any> {
        const url = `${this.baseUrl}/App/${id}`;
        return this._http.put(url, app ).pipe(
            catchError(this.handleError)
        );
    }

    getData(): Observable<any> {
        return this._http.get(`${this.baseUrl}/App/allAdmin`);
    }

    getDataAll(): Observable<any> {
        return this._http.get(`${this.baseUrl}/App/all-admin`);
    }

    updateDataAll(id: number, app: any): Observable<any> {
        const url = `${this.baseUrl}/App/update-dynamic/${id}`;
        return this._http.put(url, app, { responseType: 'text' }) // บังคับให้ Angular รับเป็น text
            .pipe(
                catchError(this.handleError)
            );
    }

    addDataAll(app: any): Observable<any> {
        return this._http.post(`${this.baseUrl}/App/create-dynamic`, app);
    }

    private handleError(error: HttpErrorResponse) {
        console.error("API Error:", error);
        return throwError(() => new Error(error.message || "An unknown error occurred."));
    }

}

