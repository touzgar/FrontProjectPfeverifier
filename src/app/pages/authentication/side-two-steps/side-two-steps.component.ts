import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { MaterialModule } from '../../../material.module';
import { AuthServiceService } from '../auth-service.service';
import { User } from '../model/login.model';

@Component({
  selector: 'app-side-two-steps',
  standalone: true,
  imports: [RouterModule, MaterialModule,FormsModule,CommonModule],
  templateUrl: './side-two-steps.component.html',
})
export class AppSideTwoStepsComponent implements OnInit {
  options = this.settings.getOptions();
  code:string="";
  user:User=new User();
  err="";

  
  constructor(private settings: CoreService,private authService:AuthServiceService,private router:Router,private route:ActivatedRoute) {}
  ngOnInit(): void {
    this.user=this.authService.regitredUser;
  }
  onValidateEmail() {
    this.authService.validateEmail(this.code).subscribe({
      next: (res) => {
        // Assuming successful validation
        alert('Verification successful. Your account is now active.');
        this.authService.login(this.user).subscribe({
          next: (data) => {
            const jwToken = data.headers.get('Authorization')!;
            this.authService.saveToken(jwToken);
            this.router.navigate(['/dashboards/dashboard1']); // Adjust the route as necessary
          },
          error: (loginError) => {
            console.error("Error during login:", loginError);
            this.err = "Login failed. Please try again.";
          }
        });
      },
      error: (err) => {
        // Handle validation errors
        console.error("Error during validation:", err);
        this.err = "Invalid or expired code. Please try again.";
        // Do NOT navigate; display an error message instead.
      }
    });
  }
    
}
