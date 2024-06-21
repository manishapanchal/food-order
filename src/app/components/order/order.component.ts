import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {
  orders: any[] = [];
  newOrder: any = { restaurantId: '', customerId: '', items: [], status: 'Pending' };

  constructor(public authService: AuthService, private orderService: OrderService) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      if (currentUser.type === 'restaurant') {
        this.loadOrders(currentUser.id, undefined);
      } else {
        this.loadOrders(undefined, currentUser.id);
      }
    }
  }

  loadOrders(restaurantId: string | undefined, customerId: string | undefined) {
    this.orderService.getOrders(restaurantId, customerId).subscribe((data: any) => {
      this.orders = data;
    });
  }

  addOrder() {
    const currentUser = this.authService.getCurrentUser();
    this.newOrder.customerId = currentUser.id;
    this.orderService.addOrder(this.newOrder).subscribe(() => {
      this.loadOrders(undefined, this.newOrder.customerId);
    });
  }

  updateOrder(order: any) {
    this.orderService.updateOrder(order.id, order).subscribe(() => {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser.type === 'restaurant') {
        this.loadOrders(currentUser.id, undefined);
      } else {
        this.loadOrders(undefined, currentUser.id);
      }
    });
  }

  deleteOrder(order: any) {
    this.orderService.deleteOrder(order.id).subscribe(() => {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser.type === 'restaurant') {
        this.loadOrders(currentUser.id, undefined);
      } else {
        this.loadOrders(undefined, currentUser.id);
      }
    });
  }
}
