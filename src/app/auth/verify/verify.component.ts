import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {


  verifyForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    code: new FormControl(null, [Validators.required])
  })
  constructor(public dialogRef: MatDialogRef<VerifyComponent>, private _AuthService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  onClose() {
    this.dialogRef.close();
  }

  onSubmit(data: FormGroup) {
    console.log(data.value);
    this._AuthService.onVerifyAccount(data.value).subscribe({
      next: (res) => {
        console.log(res);

      }, error: (err) => {

      }, complete: () => {
        this.onClose()
        this.router.navigate(['/auth/login'])
      }
    })
  }


}
