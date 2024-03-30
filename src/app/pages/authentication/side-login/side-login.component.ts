import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { AuthServiceService } from '../auth-service.service';
import { User } from '../model/login.model';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule, FormsModule, ReactiveFormsModule,MatSidenavModule],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent implements  OnInit {
  options = this.settings.getOptions();
  user: User = new User();
  err: number = 0; // Define erreur variable
  message:string="login ou mot de passe erronés..";
  constructor(private settings: CoreService, private router: Router ,private authService:AuthServiceService ) { }

  ngOnInit(): void {
      
  }

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  
  onLoggedin() {
    this.user.username = this.form.get('uname')?.value!;
    this.user.password = this.form.get('password')?.value!;
    
    this.authService.login(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/dashboards/dashboard1']);
        this.err = 0; // Reset error on successful login
      },
      error: (err: any) => {
        this.err = 1; // Set error state
        // Check if err.error exists before trying to access err.error.message
        this.message = err.error ? err.error.message : "Username or password is incorrect.";
      }
      
      
    });
  }
   
}
