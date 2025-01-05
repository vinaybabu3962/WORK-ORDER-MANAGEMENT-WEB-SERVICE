import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  email = '';
  password = '';
  name = '';
  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const data = {
      name: this.name,
      email: this.email,
      password: this.password,
    };
    this.authService.signup(data).subscribe(
      (response) => {
        this.successMessage = 'Signup successful! Redirecting to login...';
        setTimeout(() => {
          this.router.navigate(['/login']);  // Redirect to login page after 2 seconds
        }, 2000);  // Wait for 2 seconds to show the success message
      },
      (error) => {
        this.errorMessage = `Signup failed because  ${error.error?.message} Please try again.`;
        console.error('Signup failed', error);
      }
    );
  }
}
