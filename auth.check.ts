import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './src/app/auth.service'; // Service to check authentication

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Check if the user is logged in
    if (this.authService.isAuthenticated()) {
      return true;  // Allow the route to activate
    } else {
      // Redirect to login if not authenticated
      this.router.navigate(['/login']);
      return false;
    }
  }
}
