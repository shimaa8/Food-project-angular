import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequestResetPasswordComponent } from '../request-reset-password/request-reset-password.component';
import { AuthService } from '../services/auth.service';
import { VerifyComponent } from '../verify/verify.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  imgSrc: any;
  Message: string = '';
  registerForm = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    country: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required]),
    profileImage: new FormControl(null),
    password: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
  }, { validators: this.matchPaswwords })
  constructor(private _AuthService: AuthService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private router: Router
  ) { }


  matchPaswwords(form: any) {
    let pass = form.get('password');
    let confirmPass = form.get('confirmPassword');

    if (pass.value == confirmPass.value) {
      return null
    } else {
      confirmPass.setErrors({ invalid: 'pass w repass not match' })
      return { invalid: 'pass w repass not match' }

    }
  }
  ngOnInit() {
  }

  onSubmit(data: FormGroup) {
    let myData = new FormData();
    console.log(data); //object  -> Map -[ k , v ]
    // let myMap = new Map(Object.entries(data.value));
    // console.log(myMap);

    // for (const [key, val] of myMap) {
    //   console.log(key, val);
    //   console.log(data.value[key]);

    //   myData.append(key, data.value[key]);
    //   // myData.append(key, JSON.stringify(val));

    // }


    myData.append('userName', data.value.userName);
    myData.append('email', data.value.email);
    myData.append('phoneNumber', data.value.phoneNumber);
    myData.append('country', data.value.country);
    myData.append('password', data.value.password);
    myData.append('confirmPassword', data.value.confirmPassword);
    myData.append('profileImage', this.imgSrc, this.imgSrc.name);


    this._AuthService.onRegister(myData).subscribe({
      next: (res: any) => {
        console.log(res);


      }, error: (err: any) => {

        this.toastr.error('Hello world!', 'Toastr fun!');
      },
      complete: () => {
        this.openDialog()
        this.toastr.success('Hello world!', 'Toastr fun!');
      }

    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(VerifyComponent, {
      data: {},
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {

        // this.onResetRequest(result)
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
  files: File[] = [];

  onSelect(event: any) {
    console.log(event);
    this.imgSrc = event.addedFiles[0]
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
