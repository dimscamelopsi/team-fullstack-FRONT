import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModuleService } from '../services/module.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.scss']
})
export class AddModuleComponent implements OnInit {
  moduleFormGroup!: FormGroup;

  constructor(

    private fb: FormBuilder,
    private _moduleService: ModuleService
  ) { }

  ngOnInit(): void {

    this.moduleFormGroup = this.fb.group({
      title: this.fb.control(null,
      [
        Validators.required,
        Validators.minLength(4)
      ]),
      objective: this.fb.control("", 
      [
        Validators.required,
        Validators.minLength(4)
      ])

    });
  }

  addModule(){
    //console.log(this.courseFormGroup.value)
    this._moduleService.add(this.moduleFormGroup.value)
    .pipe(
      take(1)
      ).subscribe()
    

  }

}
