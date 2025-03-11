import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ThemeSettingsService {
    private baseUrl = environment.api_url;

    constructor(private _http: HttpClient) { }

    getThemeSettings(): Observable<any> {
        return this._http.get(`${this.baseUrl}/Theme/current`);
    }

    updateThemeSettings(id: number, themeSettings: any): Observable<any> {
        return this._http.put(`${this.baseUrl}/Theme/update/${id}`, themeSettings, { responseType: 'text' })
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        console.error("API Error:", error);
        return throwError(() => new Error(error.message || "An unknown error occurred."));
    }
}