import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.scss']
})
export class UpdatepopupComponent implements OnInit {

  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    private dialog: MatDialogRef<UpdatepopupComponent>
  ) { }

  editdata: any;
  rolelist: any;

  registerForm = this.builder.group({
    id: [''],
    name: [''],
    password: [''],
    email: [''],
    gender: ['male'],
    role: ['', Validators.required],
    isactive: [false],
  });

  ngOnInit(): void {
    this.service.GetAllRole().subscribe({
      next: res => {
        this.rolelist = res;
        if (this.data.usercode != null && this.data.usercode !== '') {
          this.service.GetByCode(this.data.usercode).subscribe({
            next: res => {
              this.editdata = res;
              this.registerForm.setValue({
                id: this.editdata?.id ?? '',
                name: this.editdata?.name ?? '',
                email: this.editdata?.email ?? '',
                password: this.editdata?.password ?? '',
                role: this.editdata?.role ?? '',
                gender: this.editdata?.gender ?? 'male',
                isactive: this.editdata?.isactive ?? false
              });
            },
            error: err => {
              console.error('Error fetching user data by code:', err);
              this._coreService.openSnackBar('Error fetching user data', 'Close', '');
            }
          });
        }
      },
      error: err => {
        console.error('Error fetching roles:', err);
        this._coreService.openSnackBar('Error fetching roles', 'Close', '');
      }
    });
  }

  updateuser() {
    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;

      // Ensure the values are of type string and handle potential null or undefined values
      const userId = formValues.id || '';
      const userData = {
        id: userId,
        name: formValues.name || '',
        email: formValues.email || '',
        password: formValues.password || '',
        gender: formValues.gender || 'male',
        role: formValues.role || '',
        isactive: formValues.isactive || false,
      };

      console.log('Updating user with data:', userData); // Debugging step

      this.service.Updateuser(userId, userData).subscribe({
        next: res => {
          this._coreService.openSnackBar('Updated successfully', 'Close', '');
          this.dialog.close();
        },
        error: err => {
          console.error('Error updating user:', err);
          this._coreService.openSnackBar('Error updating user', 'Close', '');
        }
      });
    } else {
      this._coreService.openSnackBar('Please Enter', 'Role', '');
    }
  }
}
