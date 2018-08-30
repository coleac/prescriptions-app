import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {

  resetForm: FormGroup;
  errorMessage: string= '';
  public show: boolean = false;
  public buttonName: any = 'Reset Password';

  constructor(
    public authService: AuthService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.resetForm = this.fb.group({
      email: ['', Validators.required ]
    });
  }

  /*
  resetPassword(email: string) {
    this.authService.resetPassword(email)
    .then(res => {
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }*/

  resetPassword(email: string) {
    this.authService.userHasEmail(email)
    .then(res => {
      this.authService.resetPassword(email)
    .then(res => {
      this.showInfo();
    })
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    });
  }

  

  showInfo() {
    this.show = !this.show;

    if(this.show)
      this.buttonName = "Submitted";
    else
      this.buttonName = "Reset Password";
  }

}
