import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent  } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, HttpClientModule, FormsModule],
  providers: [HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'contract-management-web-service';
}
