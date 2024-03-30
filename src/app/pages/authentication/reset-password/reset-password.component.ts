import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string;
constructor(private authService: AuthServiceService, private formBuilder: FormBuilder, private route: ActivatedRoute,private router:Router){
  this.token = this.route.snapshot.queryParamMap.get('token') || ''; // Or handle token retrieval appropriately

  this.resetPasswordForm = this.formBuilder.group({
    newPassword: ['', [Validators.required]]
  });
}
ngOnInit(): void {
    
}
// In ResetPasswordComponent

submitResetPassword() {
  if (this.resetPasswordForm.valid) {
    const newPassword = this.resetPasswordForm.get('newPassword')?.value;
    this.authService.resetPassword(this.token, newPassword)
      .subscribe({
        next: (response) => {
          // Handle success response
          console.log(response);
          alert('Your password has been reset successfully.');
          this.router.navigate(['/login']); // Or your login route
        },
        error: (error) => {
          // Handle error response
          console.error(error);
          alert('Error: ' + error.error);
        }
      });
  }
}

}
