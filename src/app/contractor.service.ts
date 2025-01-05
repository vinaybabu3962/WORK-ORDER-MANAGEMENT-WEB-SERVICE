import { Injectable } from '@angular/core';
import { ApiService } from './../../api.service';  // Import ApiService
import { Observable } from 'rxjs';


export interface Contractor {
  _id: string;
  name: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})

export class ContractorService {

  constructor(private apiService: ApiService) { }

  // Get all contractors
  getContractors(): Observable<any[]> {
    return this.apiService.get<any[]>('/contractors/getContractors');  // Use the '/contractors' endpoint
  }

  // Add a new contractor
  addContractor(name: string, phone: string): Observable<any> {
    const contractor = { name, phone };
    return this.apiService.post<any>('/contractors/addContractor', contractor);  // Use the '/add-contractor' endpoint
  }
  deleteContractor(id: any) : Observable<any> {
    return this.apiService.delete<any>('/contractors/deleteContractor', id);  // Use the '/add-contractor' endpoint
  }
}
