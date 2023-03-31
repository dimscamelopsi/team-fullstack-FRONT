import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class FormCourseBuilderService {
    private _form: FormGroup | null = null

    public constructor(
        private _formBuilder: FormBuilder
    ) {}

    public get form(): FormGroup {
        if (this._form === null) {
            this._buildForm()
        }
        return this._form!
    }

    private _buildForm(): void {
        this._form = this._formBuilder.group({
            title: [
                '',
                [Validators.required]
            ],
            objective: [
                ''
            ]
        })
    }

}