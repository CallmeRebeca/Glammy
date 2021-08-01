import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private router: Router, private http: HttpClient) { }

  public login(email: string, password: string): void {
    this.http.post<any>(`${environment.serverUrl}/login`, { email: email, password: password }).subscribe(data => {
      console.log(data);
      if (data.status === 'ok') {
        // User logged in. Redirect to main page
        console.log('User logged in. Redirect to main page');
        localStorage.setItem("glammy_user", data.id);
        console.log('Saved user id: ' + localStorage.getItem('glammy_user'));
        this.router.navigate(["home"], { replaceUrl: true });
      }
    });
  }

  public register(firstName: string, lastName: string, email: string, password: string): void {
    this.http.post<any>(`${environment.serverUrl}/register`, { first_name: firstName, last_name: lastName, email: email, password: password }).subscribe(data => {
      if (data === 'ok') {
        // User logged in. Redirect to login page
        console.log('User registered. Redirect to login.');
        this.router.navigate(["cont"], { replaceUrl: true });
      }
    });
  }
}
