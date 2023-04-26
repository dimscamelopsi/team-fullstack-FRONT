import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent implements OnInit {
  forgottenPasswordFormGroup!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _userService: UserService
  ) { }

  ngOnInit(): void {

    this.forgottenPasswordFormGroup = this._fb.group({
      email: this._fb.control("",
        [
          Validators.required,
          Validators.email
          
        ]),
      answer: this._fb.control("",
        [
          Validators.required,
        
        ]),

    });
  }

  onSubmit(): void {

    this._userService.FindByEmailAndAnswer(this.forgottenPasswordFormGroup.value)
      .subscribe({
        next: (response: HttpResponse<any>) => {
          this._router.navigate(['/newPassword'])
        },
        error: (error: any) => {}
      })
  }

}
