import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FormModuleBuilderService } from '../../services/course-handler/form-module-builder.service';

@Component({
  selector: 'app-module-add',
  templateUrl: './module-add.component.html',
  styleUrls: ['./module-add.component.scss']
})
export class ModuleAddComponent implements OnInit {

  public form: FormGroup

  constructor(
    private _formBuilder: FormModuleBuilderService,
    public dialogRef: MatDialogRef<ModuleAddComponent>
  ) {
    this.form = this._formBuilder.form
  }

  ngOnInit(): void {
  }

  get c(): {[key: string]: AbstractControl} {
    return this.form.controls
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  onSubmit(): void {
    this.dialogRef.close(this.form.value)
  }
}
