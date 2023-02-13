import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  async login(username: string, password: string){
    const accessToken = await lastValueFrom(this.http.post<any>('http://localhost:3000/auth/login', {
      username,
      password
    }));
    console.log(accessToken);
    localStorage.setItem('user', username)
    localStorage.setItem('accessToken', accessToken.jwt);
    this.isLoggedIn = true
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

  public logOut() {
    localStorage.removeItem('accessToken');
    this.isLoggedIn = false;
  }
}
