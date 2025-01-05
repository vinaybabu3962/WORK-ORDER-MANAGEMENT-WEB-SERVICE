import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule, CommonModule],
  providers: [HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';
  successMessage = '';
  errorMessage = '';
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const data = { email: this.email, password: this.password };
    this.authService.login(data).subscribe(
      (response) => {
        console.log('Login successful', response);
        this.successMessage = 'Login successful! Redirecting to Dashboard...';
        localStorage.setItem('authToken', response.user.token);
        setTimeout(() => {
          this.router.navigate(['/dashboard']); // Redirect to login page after 2 seconds
        }, 2000);
      },
      (error) => {
        this.errorMessage = `Login failed because  ${error.error?.message} Please try again.`;
        console.error('Signup failed', error);
      }
    );
  }
}
