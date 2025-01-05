import { Component, OnInit } from '@angular/core';
import { MdbModalService, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { WorkOrderService } from './../work-order.service';
import { ContractorService } from './../contractor.service';
import { EntityService } from './../entity.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';

@Component({
  standalone: true,
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.css'],
  imports: [FormsModule, CommonModule, MdbModalModule]
})
export class WorkOrderComponent implements OnInit {
  workOrders: any[] = [];
  contractors: any[] = [];
  locations: any[] = [];
  selectedContractor: string = '';
  paymentTerms: number | null = null;
  dueDate: string = '';
  selectedLocation: any = null; 
  newWorkOrder: { contractor: string; paymentTerms: number | null; dueDate: string; locations: any[] } = {
    contractor: '',
    paymentTerms: null,
    dueDate: '',
    locations: []
  };

  modalRef: MdbModalRef<any> | null = null;

  constructor(
    private workOrderService: WorkOrderService,
    private contractorService: ContractorService,
    private entityService: EntityService,
    private modalService: MdbModalService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadWorkOrders();
    this.loadContractors();
    this.loadLocations();
  }

  loadWorkOrders(): void {
    this.workOrderService.getWorkOrders().subscribe(
      (data) => {
        this.workOrders = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching work orders:', error);
      }
    );
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

  loadLocations(): void {
    this.entityService.getLocations().subscribe(
      (data) => {
        this.locations = data;
      },
      (error) => {
        console.error('Error fetching locations:', error);
      }
    );
  }

  openModal(template: any): void {
    this.modalRef = this.modalService.open(template);
  }

  addLocationToWorkOrder(): void {
    if (this.selectedLocation) {
      this.newWorkOrder.locations.push({
        locationName: this.selectedLocation.name,
        locationId: this.selectedLocation._id,
        rate: null,
        quantity: null
      });
      this.selectedLocation = null; // Reset the selection after adding
    }
  }

  removeLocation(location: any): void {
    this.newWorkOrder.locations = this.newWorkOrder.locations.filter(
      (loc) => loc.locationId !== location.locationId
    );
  }

  saveWorkOrder(): void {
    if (this.newWorkOrder.contractor && this.newWorkOrder.paymentTerms && this.newWorkOrder.dueDate) {
      const newWorkOrder = {
        contractorId: this.newWorkOrder.contractor,
        paymentTerms: this.newWorkOrder.paymentTerms,
        dueDate: this.newWorkOrder.dueDate,
        locations: this.newWorkOrder.locations.map((loc) => ({
          locationId: loc.locationId,
          rate: loc.rate,
          quantity: loc.quantity
        }))
      };

      this.workOrderService.addWorkOrder(newWorkOrder).subscribe(
        (response) => {
          this.loadWorkOrders();
          this.modalRef?.close(); // Close modal
        },
        (error) => {
          console.error('Error adding work order:', error);
        }
      );
    } else {
      alert('Please fill out all fields');
    }
  }

  closeModal(): void {
    this.modalRef?.close(); // Close the modal
  }

  logout(): void {
    this.authService.logout();
  }

  goBackToDashboard(): void {
    this.router.navigate(['/dashboard']);  // Adjust this route to match your actual dashboard route
  }
}
