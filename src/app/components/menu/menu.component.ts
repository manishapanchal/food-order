import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  menuItems: any[] = [];
  newItem: any = { name: '', description: '', price: 0, image: '', restaurantId: '' };

  constructor(private authService: AuthService, private menuService: MenuService) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.newItem.restaurantId = currentUser.id;
      this.loadMenuItems(currentUser.id);
    }
  }

  loadMenuItems(restaurantId: string) {
    this.menuService.getMenuItems(restaurantId).subscribe((data: any) => {
      this.menuItems = data;
    });
  }

  addMenuItem() {
    this.menuService.addMenuItem(this.newItem).subscribe(() => {
      this.loadMenuItems(this.newItem.restaurantId);
    });
  }

  updateMenuItem(item: any) {
    this.menuService.updateMenuItem(item.id, item).subscribe(() => {
      this.loadMenuItems(this.newItem.restaurantId);
    });
  }

  deleteMenuItem(item: any) {
    this.menuService.deleteMenuItem(item.id).subscribe(() => {
      this.loadMenuItems(this.newItem.restaurantId);
    });
  }
}
