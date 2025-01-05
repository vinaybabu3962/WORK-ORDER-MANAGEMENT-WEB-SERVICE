import { Component, OnInit } from '@angular/core';
import { ContractorService } from './../contractor.service';
import { MdbModalService } from 'mdb-angular-ui-kit/modal'; // Import MdbModalService
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { RouterModule, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-contractor-dashboard',
  templateUrl: './contractor-dashboard.component.html',
  styleUrls: ['./contractor-dashboard.component.css'],
  imports: [FormsModule, CommonModule, MdbModalModule],
})

export class ContractorDashboardComponent implements OnInit {
  contractors: any[] = [];
  name: string = '';
  phone: string = '';

  constructor(
    private contractorService: ContractorService,
    private modalService: MdbModalService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadContractors();
  }

  loadContractors(): void {
    this.contractorService.getContractors().subscribe(
      (data) => {
        this.contractors = data;
      },
      (error) => {
        console.error('Error fetching contractors:', error);
      }
    );
  }

  // Open the modal and pass the modal reference
  openModal(content: any): void {
    const modalRef = this.modalService.open(content);
    modalRef.onClose.subscribe(() => {
      // Optionally perform any clean-up here when the modal is closed
      this.name = '';
      this.phone = '';
    });
  }

  addContractor(modalRef: any): void {
    if (this.name && this.phone) {
      this.contractorService.addContractor(this.name, this.phone).subscribe(
        (response) => {
          this.loadContractors(); // Reload contractors after adding one
          this.name = ''; // Clear input fields
          this.phone = '';
          modalRef.close(); // Close the modal after successful addition
        },
        (error) => {
          console.error('Error adding contractor:', error);
        }
      );
    } else {
      alert('Please fill out both fields');
    }
  }

  deleteContractor(id: any): void {
    console.log('Deleting contractor with id:', id);

    // Call the delete API endpoint
    this.contractorService.deleteContractor(id).subscribe(
      (response) => {
        console.log('Contractor deleted');
        this.loadContractors(); // Reload contractors list after deletion
      },
      (error) => {
        console.error('Error deleting contractor:', error);
      }
    );
  }

  logout(): void {
    this.authService.logout();
  }

  goBackToDashboard() {
    this.router.navigate(['/dashboard']);  // Adjust this route to match your actual dashboard route
  }
}
