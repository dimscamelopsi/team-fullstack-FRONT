import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrls: ['./add-media.component.scss']


})
export class AddMediaComponent implements OnInit {

  public form!: MatFormFieldModule;
  public mediaFormGroup!: FormGroup;
  public formModule!: FormsModule;
  public router!: Router;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.mediaFormGroup = this.formBuilder.group({
    });
}

onSubmitForm() {
  console.log(this.mediaFormGroup.value);
}

}
