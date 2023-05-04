import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentModel } from 'src/app/student/models/student-model';

@Injectable({
  providedIn: 'root',
})
export class FormUserBuilderService {
  private _form: FormGroup | null = null;
  private _student!: StudentModel;

  public constructor(private _formBuilder: FormBuilder) {}

  public buildForm(student: StudentModel): void {
    this._student = student;
    this._buildForm();
  }

  public get form(): FormGroup {
    if (this._form === null) {
      this._buildForm();
    }
    return this._form!;
  }

  private _buildForm(): void {
    this._form = this._formBuilder.group({
      lastName: [this._student.lastName, [Validators.required]],
      firstName: [this._student.firstName],
      email: [
        this._student.email,
        [
          Validators.required,
          Validators.pattern(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
        ],
      ],
      phoneNumber: [this._student.phoneNumber],
      login: [
        this._student.login,
        [
          //Validators.required,
          Validators.minLength(8),
        ],
      ],
      password: [
        '',
        /*  [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
          ),
        ], */
      ],
      passwordConfirm: [
        '',
        /*  [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
          ),
        ], */
      ],
      answer: [''],
    });
  }
}
