import { Component, Inject, OnInit } from '@angular/core';
import { ModuleType } from '../../types/module-type';
import { ModuleService } from 'src/app/conceptor/services/module.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseHandlerComponent } from '../../course-handler/course-handler.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-module-dialog',
  templateUrl: './module-dialog.component.html',
  styleUrls: ['./module-dialog.component.scss']
})
export class ModuleDialogComponent implements OnInit {

  public modules: Array<ModuleType> = []

  constructor(
    private _moduleService: ModuleService,
    public dialogRef: MatDialogRef<CourseHandlerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this._moduleService.findAllModules()
    .pipe(
      take(1)
    )
    .subscribe((response: any) => {
      this.modules = response
      console.log(response)
    })
  }

  revealOrHide(module: ModuleType): void {
    module.selected = !module.selected
    if (module.selected) {
      this.modules.filter((inModule: ModuleType) => inModule.selected).forEach((inModule: ModuleType) => {
        if (module.id !== inModule.id) {
          inModule.selected = false
        }
      })
    }
  }

}
