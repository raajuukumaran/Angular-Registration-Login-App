import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreService } from '../core/core.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userdata: any;

  constructor(
    private builder: FormBuilder,
    private _coreService: CoreService,
    private service: AuthService,
    private router: Router
  ) { 
    sessionStorage.clear(); // Clear session storage on component initialization
  }

  loginform = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });

  proceedlogin() {
    if (this.loginform.valid) {
      const usernameValue = this.loginform.get('username')?.value;
      if (usernameValue) {
        this.service.GetByCode(usernameValue).subscribe(
          (res: any) => {
            this.userdata = res;
            console.log('User data:', this.userdata);
            if (this.userdata.password === this.loginform.value.password) {
              if (this.userdata.isActive) {
                sessionStorage.setItem('username', this.userdata.id);
                sessionStorage.setItem('userrole', this.userdata.role);
                console.log('Logged in as:', this.userdata.id, 'with role:', this.userdata.role);
                this.router.navigate(['']); // Navigate to home page on successful login
              } else {
                this._coreService.openSnackBar('Inactive user. Please contact admin.', 'Dismiss', 'error');
              }
            } else {
              this._coreService.openSnackBar('Invalid credentials.', 'Dismiss', 'error');
            }
          },
          (error: any) => {
            console.error('Error fetching user data:', error);
            this._coreService.openSnackBar('Error fetching user data', 'Dismiss', 'error');
          }
        );
      }
    } else {
      this._coreService.openSnackBar('Please fill out all required fields correctly', 'Dismiss', 'error');
    }
  }
  
}
