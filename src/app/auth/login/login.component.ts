import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { RequestResetPasswordComponent } from '../request-reset-password/request-reset-password.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  Message: string = '';
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
  })
  constructor(private _AuthService: AuthService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(data: FormGroup) {
    console.log(data);
    this._AuthService.onLogin(data.value).subscribe({
      next: (res: any) => {
        console.log(res);


        localStorage.setItem('userToken', res.token)
        this._AuthService.getProfile();
      }, error: (err: any) => {

        this.toastr.error('Hello world!', 'Toastr fun!');
      },
      complete: () => {
        this.router.navigate(['/dashboard'])
        this.toastr.success('Hello world!', 'Toastr fun!');
      }

    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RequestResetPasswordComponent, {
      data: {},
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {

        this.onResetRequest(result)
      }

    });
  }

  onResetRequest(data: string) {

    this._AuthService.onRequestResetPassword(data).subscribe({
      next: (res: any) => {
        console.log(res.message);
        this.Message = res.message;

      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error!');

      }, complete: () => {
        this.toastr.success(this.Message, 'Successfully!');

        this.router.navigate(['/auth/resetPassword']);
        localStorage.setItem('email', data)

      }
    })
  }

}
