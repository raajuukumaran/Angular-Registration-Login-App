// register.component.ts

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CoreService } from '../core/core.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm = this.builder.group({
    id: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
    name: ['', Validators.required],
    password: ['', Validators.compose([Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')])],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    gender: ['male'],
    role: [''],
    isActive: [false], // Use 'isActive' here
  });

  constructor(
    private builder: FormBuilder,
    private _coreService: CoreService,
    private authService: AuthService,
    private router: Router
  ) { }

  proceedRegistration() {
    if (this.registerForm.valid) {
      this.authService.proceedregister(this.registerForm.value).subscribe({
        next: (res) => {
          this._coreService.openSnackBar('Registration successful', '', 'p0');
          this.router.navigate(['login']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
          this._coreService.openSnackBar('Error while registering user', 'Error', 'p0');
        }
      });
    } else {
      this._coreService.openSnackBar('Please fill out all required fields correctly', 'Error', 'p0');
    }
  }

  // Helper method to access form controls in the template
  get formControls() {
    return this.registerForm.controls;
  }
}
