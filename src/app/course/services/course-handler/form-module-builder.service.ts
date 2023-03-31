import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormModuleBuilderService {
  private _form: FormGroup | null = null

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  get form(): FormGroup {
    if (this._form === null) {
      this._buildForm()
    }
    return this._form!
  }

  private _buildForm(): void {
    this._form = this._formBuilder.group({
        name: [
            '',
            [Validators.required]
        ],
        objective: [
            ''
        ]
    })
}
}
