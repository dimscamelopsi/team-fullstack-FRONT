import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FormUserBuilderService } from '../services/form-user-builder.service';
import { StudentService } from '../../student/services/student.service';
import { StudentModel } from 'src/app/student/models/student-model';
import { UserService } from '../services/user.service';
import { HttpResponse } from '@angular/common/http';
import { ToastService } from 'src/app/core/toast.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  public student!: StudentModel;

  constructor(
    private _formBuilder: FormUserBuilderService,
    private _studentService: StudentService,
    private _userService: UserService,
    private _toast: ToastService
  ) {}

  ngOnInit(): void {
    console.log(`Go to get the user ${this._userService.user.id}`);
    this._studentService.findOneStudent(this._userService.user.id).subscribe({
      next: (student: StudentModel) => {
        this.student = student;
        this._formBuilder.buildForm(this.student);
        this.form = this._formBuilder.form;
      },
      error: (error: any) => {
        console.log('Something went wrong');
      },
    });
  }

  get c(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this._userService.update(this.form.value).subscribe({
      next: (response: HttpResponse<any>) => {
        this.form.reset();
        this._toast.show('upadte succesfully');
      },
      error: (error: any) => {
        this.form.reset();
        this._toast.show('upadte succesfully');
      },
    });
  }
}
