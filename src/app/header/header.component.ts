import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from '../service/auth.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild(MatMenuTrigger, { static: true }) menuTrigger!: MatMenuTrigger;
  @ViewChild('accountCircle', { static: true }) accountCircleRef!: ElementRef;

  role: string | undefined;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
    const token = localStorage.getItem('access_token') || '';
    const decodedToken: any = jwt_decode(token);
    // console.log(decodedToken);
    this.role = decodedToken.role;
    console.log(this.role);
  }

  onMouseEnter(): void {
    this.menuTrigger.openMenu();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.toastr.info('Log Out, Successfully');
  }
}
