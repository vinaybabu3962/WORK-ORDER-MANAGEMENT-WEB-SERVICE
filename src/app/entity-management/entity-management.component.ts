import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MdbModalService, MdbModalRef, MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { EntityService, Entity, Location } from './../entity.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ContractorService } from './../contractor.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-entity-management',
  templateUrl: './entity-management.component.html',
  styleUrls: ['./entity-management.component.css'],
  imports: [FormsModule, CommonModule, MdbModalModule],
})
export class EntityManagementComponent implements OnInit {
  @ViewChild('contractorModal', { static: true }) contractorModal!: TemplateRef<any>;

  entities: Entity[] = [];
  locations: Location[] = [];
  contractors: any[] = [];
  entityName: string = '';
  locationName: string = '';
  selectedEntity: string = '';
  locationStatus: string = 'Ready';
  selectedContractor: string = '';

  constructor(
    private modalService: MdbModalService,
    private entityService: EntityService,
    private authService: AuthService,
    private router: Router,
    private contractorService: ContractorService
  ) {}

  ngOnInit(): void {
    this.fetchEntities();
    this.fetchLocations();
    this.fetchContractors();
  }

  fetchEntities(): void {
    this.entityService.getEntities().subscribe(
      (data) => { this.entities = data; },
      (error) => { console.error('Error fetching entities:', error); }
    );
  }

  fetchLocations(): void {
    this.entityService.getLocations().subscribe(
      (data) => { this.locations = data; },
      (error) => { console.error('Error fetching locations:', error); }
    );
  }

  fetchContractors(): void {
    this.contractorService.getContractors().subscribe(
      (data) => { this.contractors = data; },
      (error) => { console.error('Error fetching contractors:', error); }
    );
  }

  markAsComplete(location: Location): void {
    const modalRef = this.modalService.open(this.contractorModal);
    modalRef.onClose.subscribe(() => {
      if (this.selectedContractor) {
        this.assignContractorToLocation(location);
      }
    });
  }

  assignContractor(modalRef: MdbModalRef<any>): void {
    if (this.selectedContractor) {
      modalRef.close(); // Close the modal
    } else {
      alert('Please select a contractor.');
    }
  }

  assignContractorToLocation(location: Location): void {
    location.status = 'Completed';
    console.log(`Location ${location.name} marked as complete with contractor ID: ${this.selectedContractor}`);
    this.entityService.updateLocation(location).subscribe(
      () => {
        this.fetchLocations();
        this.locationName = '';
        this.selectedEntity = '';
        this.locationStatus = 'Ready';
      },
      (error) => { console.error('Error adding location:', error); }
    );
  }

  openEntityModal(content: any): void {
    const modalRef = this.modalService.open(content);
    modalRef.onClose.subscribe(() => {
      this.entityName = ''; // Clear input field when modal closes
    });
  }

  openLocationModal(content: any): void {
    const modalRef = this.modalService.open(content);
    modalRef.onClose.subscribe(() => {
      this.locationName = '';
      this.selectedEntity = '';
      this.locationStatus = 'Ready'; // Reset default status
    });
  }

  addEntity(modalRef: any): void {
    if (this.entityName) {
      const newEntity: Entity = {
        _id: new Date().getTime().toString(),
        name: this.entityName,
      };
      this.entityService.addEntity(newEntity).subscribe(
        () => {
          this.fetchEntities();
          this.entityName = '';
          modalRef.close();
        },
        (error) => { console.error('Error adding entity:', error); }
      );
    } else {
      alert('Please enter a valid entity name');
    }
  }

  addLocation(modalRef: any): void {
    if (this.locationName && this.selectedEntity) {
      const newLocation: Location = {
        _id: new Date().getTime().toString(),
        name: this.locationName,
        entity: this.entities.find((e) => e._id === this.selectedEntity)!,
        status: this.locationStatus,
      };
      this.entityService.addLocation(newLocation).subscribe(
        () => {
          this.fetchLocations();
          this.locationName = '';
          this.selectedEntity = '';
          this.locationStatus = 'Ready';
          modalRef.close();
        },
        (error) => { console.error('Error adding location:', error); }
      );
    } else {
      alert('Please fill out all fields');
    }
  }

  logout(): void {
    this.authService.logout();
  }

  goBackToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
