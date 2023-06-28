import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/accounts/login';

  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private router: Router,
    private toastr: ToastrService
  ) {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  public login(username: string, password: string) {
    const body = { username, password };
    return this.http.post(this.apiUrl, body).pipe(
      map((response: any) => {
        if (response.msg === 'Login Success') {
          const token = response.access;
          // const decodedToken = jwt_decode(token);
          // console.log(decodedToken);
          this.setToken(token);
          this.router.navigate(['/home']);
          this.toastr.success('Logged in Successfully!!');
          return response;
        }
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  public isLoggedIn(): boolean {
    const res = this.jwtService.getToken() !== null;
    return res;
  }

  public setToken(token: string): void {
    this.jwtService.setToken(token);
  }

  public isAuthenticated(): boolean {
    return !this.jwtService.isTokenExpired();
  }

  public logout(): void {
    this.jwtService.removeToken();
    this.router.navigate(['/login']);
  }

  public handleAuthTimeOut(): void {
    if (this.jwtService.isTokenExpired()) {
      this.logout();
      this.toastr.error('Token expired, Please login again');
    }
  }
}
