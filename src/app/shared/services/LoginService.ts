import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://127.0.0.1:8000/login_panel/api';
  loginEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private http: HttpClient,
              private router:Router,
              private route:ActivatedRoute,) { }

  login(username: string, password: string): Observable<{ token: string }> {
    const loginUrl = `${this.apiUrl}/login/`;

    return this.http.post<{ token: string }>(loginUrl, { username, password })
      .pipe(
        tap(res => {
          this.saveToken(res.token);
          this.loginEvent.emit();
          this.router.navigate(['employee']).then();
        }),
        catchError(error => {
          console.error('Login failed:', error);
          return throwError('Invalid credentials');
        })
      );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate([''],{relativeTo:this.route}).then()
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;

  }

}
