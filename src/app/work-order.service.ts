// work-order.service.ts

import { Injectable } from '@angular/core';
import { ApiService } from './../../api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkOrderService {
  constructor(private apiService: ApiService) {}

  // Fetch a list of work orders
  getWorkOrders(): Observable<any> {
    return this.apiService.get('/workorders/getAllWorkOrders');
  }

  addWorkOrder(workOrderData: any): Observable<any> {
    return this.apiService.post('/workorders/addWorkOrder', workOrderData);
  }

  // Create a new work order
  createWorkOrder(workOrderData: any): Observable<any> {
    return this.apiService.post('work-orders', workOrderData);
  }

  // Update an existing work order
  updateWorkOrder(workOrderId: string, workOrderData: any): Observable<any> {
    return this.apiService.put(`work-orders/${workOrderId}`, workOrderData);
  }

  // Delete a work order
  deleteWorkOrder(workOrderId: string): Observable<any> {
    return this.apiService.delete(`work-orders`, workOrderId);
  }
}
