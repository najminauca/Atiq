import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  async login(username: string, password: string){
    const accessToken = await lastValueFrom(this.http.post<any>('http://localhost:3000/auth/login', {
      username,
      password
    }));
    console.log(accessToken);
    localStorage.setItem('username', username)
    localStorage.setItem('role', accessToken.user)
    localStorage.setItem('accessToken', accessToken.jwt);
    localStorage.setItem('id', accessToken.id)
  }

  async signup(username: string, firstname: string, lastname: string, password: string){
    await lastValueFrom(this.http.post('http://localhost:3000/auth/signup',{
      username,
      firstname,
      lastname,
      password
    }));
  }

  public getToken() {
    return localStorage.getItem('accessToken');
  }

  public getId() {
    return localStorage.getItem('id');
  }

  public isSeller(): boolean {
    return localStorage.getItem('role') == 'seller'
  }

  public isLoggedIn() {
    return this.getToken() != null
  }

  public logOut() {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('id');
  }
}
