import { Injectable } from '@angular/core';
import { ApiService } from './../../api.service';  // Import your ApiService
import { Observable } from 'rxjs';
import {  Contractor } from './contractor.service';

export interface Entity {
  _id: string;
  name: string;
}

export interface Location {
  _id: string;
  name: string;
  entity: Entity;
  status: string;
  contractor?: Contractor; 
}

@Injectable({
  providedIn: 'root',
})
export class EntityService {

  constructor(private apiService: ApiService) {}

  // Fetch all entities from the backend
  getEntities(): Observable<Entity[]> {
    return this.apiService.get('/entities/getEntities');  // Example API endpoint
  }

  // Fetch all locations from the backend
  getLocations(): Observable<Location[]> {
    return this.apiService.get('/entities/getLocations');  // Example API endpoint
  }

  // Add a new entity via the API
  addEntity(entity: Entity): Observable<Entity> {
    return this.apiService.post('/entities/addEntity', entity);  // Example API endpoint
  }

  // Add a new location via the API
  addLocation(location: Location): Observable<Location> {
    return this.apiService.post('/entities/addLocation', location);  // Example API endpoint
  }

  updateLocation(location: Location): Observable<Location> {
    return this.apiService.put('/entities/updateLocation', location); 
  }
  
}
