import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { User } from '../model/login.model';
import { AuthServiceService } from '../auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-register',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent implements  OnInit {
  options = this.settings.getOptions();
  form:FormGroup
  public user=new User();
  confirmPassword?:String;
  myForm!:FormGroup;
  err:any;

  constructor(private settings: CoreService, private router: Router,private authService:AuthServiceService) { }

  ngOnInit():void {
    this.form = new FormGroup({
      uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, { validators: this.passwordMatchingValidator });
    
  }

  get f() {
    return this.form.controls;
  }

  // submit() {
  //   if (this.form.invalid) {
  //     alert("Please fix the errors in the form.");
  //     return;
  //   }
  //   if (this.form.hasError('passwordsNotMatching')) {
  //     alert("Passwords do not match.");
  //     return;
  //   }
  //   // Proceed with form submission logic here
  //   this.router.navigate(['/authentication/side-two-steps']);
  // }


  onRegister() {
    // Assuming your form's value directly maps to the User model
    this.user.username = this.form.value.uname;
    this.user.email = this.form.value.email;
    this.user.password = this.form.value.password;
    // Additional properties can be set here if needed
  
    this.authService.registerUser(this.user).subscribe({
      next: (res) => {
        this.authService.setRegistredUser(this.user)
        alert("Please confirm your email.");
        this.router.navigate(['/authentication/side-two-steps']);
      },
      error: (err) => {
        if (err.status === 400) {
          this.err = err.error.message;
        }
      }
    });
  }
  
   private passwordMatchingValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsNotMatching: true };
  }
}
