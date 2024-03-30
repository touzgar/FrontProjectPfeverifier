import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from './pages/authentication/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Modernize Angular Admin Tempplate';
  constructor(private authService:AuthServiceService ,private router:Router ){}
  ngOnInit() {
    this.authService.loadToken();
    if(this.authService.getToken()==null || this.authService.isTokenExpired())
    this.router.navigate(['side-login']);
    
  }
  onLogout(){
    this.authService.logout();
  }
}
