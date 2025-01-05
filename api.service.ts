import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api'; // Centralized base URL

  constructor(private http: HttpClient) {}

  // Method to get JWT token from localStorage or sessionStorage
  private getAuthToken(): string | null {
    if (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    ) {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  // Generic method to create headers with JWT token
  private createHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // Method to generate full API URL by appending path to base URL
  private buildUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`; // Combines base URL and endpoint path
  }

  // GET request
  get<T>(endpoint: string): Observable<T> {
    const url = this.buildUrl(endpoint); // Build full URL
    const headers = this.createHeaders();
    return this.http
      .get<T>(url, { headers })
      .pipe(catchError(this.handleError));
  }

  // POST request
  post<T>(endpoint: string, data: any): Observable<T> {
    const url = this.buildUrl(endpoint); // Build full URL
    const headers = this.createHeaders();
    return this.http
      .post<T>(url, data, { headers })
      .pipe(catchError(this.handleError));
  }

  // PUT request
  put<T>(endpoint: string, data: any): Observable<T> {
    const url = this.buildUrl(endpoint); // Build full URL
    const headers = this.createHeaders();
    return this.http
      .put<T>(url, data, { headers })
      .pipe(catchError(this.handleError));
  }

  delete<T>(endpoint: string, id: string): Observable<T> {
    const url = `${this.buildUrl(endpoint)}/${id}`; // Add ID to the URL
    const headers = this.createHeaders();
    return this.http
      .delete<T>(url, { headers })
      .pipe(catchError(this.handleError));
  }

  getPdf(url: string): Observable<Blob> {
    const url1 = this.buildUrl(url);
    return this.http.get<Blob>(url1, { responseType: 'blob' as 'json' });
  }

  // Generic error handler
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof HttpErrorResponse) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Error code: ${error.status}, Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
