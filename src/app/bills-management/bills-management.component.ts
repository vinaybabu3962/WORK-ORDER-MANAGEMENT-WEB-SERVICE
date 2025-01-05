import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillService, Bill } from './../bills.service';  // Assuming you have a BillService
import { ApiService } from './../../../api.service';   // Assuming you have an ApiService
import { MdbModalService } from 'mdb-angular-ui-kit/modal';  // Modal service for modals
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-bills-management',
  templateUrl: './bills-management.component.html',
  styleUrls: ['./bills-management.component.css'],
  imports: [MdbModalModule, FormsModule, CommonModule]
})
export class BillsManagementComponent implements OnInit {
  bills: Bill[] = [];  // Store the list of bills
  isLoading = false;  // Loading indicator
  
  constructor(
    private billService: BillService,
    private apiService: ApiService,
    private modalService: MdbModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchBills();  // Fetch bills when the component loads
  }

  // Fetch the list of bills from the API
  fetchBills(): void {
    this.isLoading = true;
    this.billService.getAllBills().subscribe(
      (response) => {
        console.log(response);
        this.bills = response.bills;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching bills:', error);
        this.isLoading = false;
      }
    );
  }

  // Function to handle generating bills for all contractors
  generateBills(): void {
    this.isLoading = true;
    this.billService.generateAllBills().subscribe(
      (response) => {
        this.fetchBills();  // Fetch updated bills after generating
        this.isLoading = false;
        alert('Bills generated successfully!');
      },
      (error) => {
        console.error('Error generating bills:', error);
        this.isLoading = false;
      }
    );
  }

  // Function to download the bill PDF by its ID
  getBillPdf(billId: string, billNumber: string): void {
    this.isLoading = true;
    this.billService.generateBillPdf(billId).subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Bill-${billNumber}.pdf`;
        link.click();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error downloading bill PDF:', error);
        this.isLoading = false;
      }
    );
  }

  // Navigate to the dashboard page
  goBackToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  // Handle logout
  logout(): void {
    // Handle logout logic here, possibly redirect to login page
    this.router.navigate(['/login']);
  }
}
