import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  newpasswordForm!:FormGroup

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _router: Router
    
  ) { }

  ngOnInit(): void {
    this.newpasswordForm = this._fb.group({
      password: this._fb.control("",
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
          ),
          Validators.minLength(8),
          
        ]),
      confirmPassword: this._fb.control("",
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
          ),
          Validators.minLength(8),
        ]),
        email: this._fb.control("",
        [
          Validators.required,
          Validators.email
        ]),

    });
  }
  onSubmit(): void {

    this._userService.update(this.newpasswordForm.value)
      .subscribe({
        next: (response: HttpResponse<any>) => {
          this._router.navigate(['/login'])
        },
        error: (error: any) => {}
      })
  }

}
