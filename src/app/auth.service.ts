import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // Replace with your backend URL

  constructor(private http: HttpClient, private router: Router) {}

  isAuthenticated(): boolean {
    if (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    ) {
      const token = localStorage.getItem('authToken');
      if (token) {
        const decoded = this.decodeToken(token);
        if (decoded && decoded.exp > Date.now() / 1000) {
          return true; // Token is valid
        }
      }
    }
    return false;
  }
  decodeToken(token: string) {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  }

  private getCookie(name: string): string | null {
    console.log(document.cookie);
    const match = document.cookie.match(
      new RegExp('(^| )' + name + '=([^;]+)')
    );
    return match ? match[2] : null;
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  signup(data: any): Observable<any> {
    console.log(data);
    return this.http.post(`${this.apiUrl}/auth/signup`, data);
  }

  logout(): void {
    localStorage.removeItem('authToken'); // Clear the stored token
    this.router.navigate(['/login']);
  }
}
