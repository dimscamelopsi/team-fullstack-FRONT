import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  newpasswordForm!:FormGroup

  constructor(
    private _fb: FormBuilder,
    
  ) { }

  ngOnInit(): void {
    this.newpasswordForm = this._fb.group({
      password: this._fb.control("",
        [
          Validators.required,
          
        ]),
      confirmPassword: this._fb.control("",
        [
          Validators.required,
        ]),
        email: this._fb.control("",
        [
          Validators.required,
          Validators.email
        ]),

    });
  }
  onSubmit() {
    
  }

}
