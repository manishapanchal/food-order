import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = 'http://localhost:3000/menuItems';

  constructor(private http: HttpClient) {}

  getMenuItems(restaurantId: string) {
    return this.http.get(`${this.apiUrl}?restaurantId=${restaurantId}`);
  }

  addMenuItem(item: any) {
    return this.http.post(this.apiUrl, item);
  }

  updateMenuItem(id: string, item: any) {
    return this.http.put(`${this.apiUrl}/${id}`, item);
  }

  deleteMenuItem(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
