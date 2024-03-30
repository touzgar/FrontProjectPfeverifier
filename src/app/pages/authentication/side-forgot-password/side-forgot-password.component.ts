import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { AuthServiceService } from '../auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-forgot-password',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './side-forgot-password.component.html',
})
export class AppSideForgotPasswordComponent {
  options = this.settings.getOptions();
  successMessage:string="you must verifier your email"

  constructor(private settings: CoreService, private router: Router,private authService:AuthServiceService) { }

  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      // Call the service method and subscribe to the observable
      this.authService.forgotPassword(this.form.value.email!)
        .subscribe({
          next: (response) => {
            // If successful, show a success message
            console.log(response);
            alert('Password reset email sent. Please check your inbox.');
            

          },
          error: (error) => {
            // If an error occurs, show an error message
            console.error(error);
            alert('Error: ' + error.error);
          }
        });
    }
    this.router.navigate(['/authentication/side-reset']);
  }
  
}