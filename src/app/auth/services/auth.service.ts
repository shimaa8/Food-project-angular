import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { ILogin } from 'src/app/models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  role: string | null = '';
  constructor(private _HttpClient: HttpClient) {

    if (localStorage.getItem('userToken') !== null) {
      this.getProfile()
    }
  }

  getProfile() {

    let encoded: any = localStorage.getItem('userToken');
    let decoded: any = jwtDecode(encoded);
    console.log(decoded.userGroup);
    console.log(decoded.userName);
    localStorage.setItem('role', decoded.userGroup)
    localStorage.setItem('userName', decoded.userName)
    this.getRole();
  }

  getRole() {
    if (localStorage.getItem('userToken') !== null && localStorage.getItem('role')) {
      this.role = localStorage.getItem('role');
    }
  }
  onLogin(data: ILogin) {
    return this._HttpClient.post('Users/Login', data)
  }
  onRegister(data: any) {
    return this._HttpClient.post('Users/Register', data)
  }
  onVerifyAccount(data: any) {
    return this._HttpClient.put('Users/verify', data)
  }

  onRequestResetPassword(data: string) {
    return this._HttpClient.post('Users/Reset/Request', { email: data })
  }
  onResetPassword(data: string) {
    return this._HttpClient.post('Users/Reset', data)
  }

}
