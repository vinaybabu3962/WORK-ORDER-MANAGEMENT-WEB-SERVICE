import { Injectable } from '@angular/core';
import { ApiService } from './../../api.service';  // Import ApiService to make API calls
import { Observable } from 'rxjs';
import { Contractor } from './contractor.service';

export interface Bill {
    _id: string;
    contractor: Contractor;
    billNumber: string;
    totalAmount: number;
    locations: any[]; // Use a more specific type if you have the structure of a location
    dateGenerated: string;
    __v: number;
  }
  
@Injectable({
  providedIn: 'root'
})



export class BillService {

  constructor(private apiService: ApiService) { }

  // Fetch all bills from the database
  getAllBills(): Observable<{ bills: Bill[] }> {
    return this.apiService.get<{ bills: Bill[] }>('/bills/getAllBills'); // Adjust endpoint as needed
  }

  generateAllBills(): Observable<any[]> {
    return this.apiService.post<any[]>('/bills/generateBill',{});  // Endpoint for getting all bills
  }

  // Fetch a specific bill by its ID
  getBillById(billId: string): Observable<any> {
    return this.apiService.get<any>(`/bills/${billId}`);  // Endpoint for getting a bill by ID
  }

  // Create a new bill
  createBill(billData: any): Observable<any> {
    return this.apiService.post<any>('/bills', billData);  // Endpoint for creating a new bill
  }

  // Update a bill (e.g., status update or adding more information)
  updateBill(billId: string, billData: any): Observable<any> {
    return this.apiService.put<any>(`/bills/${billId}`, billData);  // Endpoint for updating a bill
  }

  // Delete a bill by its ID
  deleteBill(billId: string): Observable<any> {
    return this.apiService.delete<any>(`/bills/${billId}`, billId);  // Endpoint for deleting a bill
  }

  // Generate PDF for a specific bill
  generateBillPdf(billId: string): Observable<Blob> {
    return this.apiService.getPdf(`/bills/getBillPdf/${billId}`);  // Fetch PDF for the bill
  }
}
