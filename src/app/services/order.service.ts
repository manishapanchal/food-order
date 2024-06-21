import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) {}

  getOrders(restaurantId?: string, customerId?: string) {
    let query = '';
    if (restaurantId) {
      query = `?restaurantId=${restaurantId}`;
    } else if (customerId) {
      query = `?customerId=${customerId}`;
    }
    return this.http.get(`${this.apiUrl}${query}`);
  }

  addOrder(order: any) {
    return this.http.post(this.apiUrl, order);
  }

  updateOrder(id: string, order: any) {
    return this.http.put(`${this.apiUrl}/${id}`, order);
  }

  deleteOrder(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
