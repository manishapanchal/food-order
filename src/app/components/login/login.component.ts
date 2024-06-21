import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  userType: string = 'customer';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (
      this.authService.login(this.userType, {
        email: this.email,
        password: this.password,
      })
    ) {
      if (this.userType === 'customer') {
        // this.router.navigate(['customer-dashboard']);
        this.router.navigateByUrl('/customer-dashboard');
        console.log('loggin');
      } else {
        this.router.navigate(['restaurant-dashboard']);
      }
      this.router.navigate(['/']);
    } else {
      alert('Invalid credentials');
    }
  }
}
