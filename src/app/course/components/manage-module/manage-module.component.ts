import { Component, OnInit } from '@angular/core';
import { CourseManageType } from '../../types/course-manage-type';
import { CourseService } from '../../services/course.service';
import { take } from 'rxjs';
import { ModuleService } from 'src/app/conceptor/services/module.service';
import { ModuleManageType } from 'src/app/conceptor/types/module-manage-type';
import { ModuleType } from 'src/app/conceptor/types/module-type';

@Component({
  selector: 'app-manage-module',
  templateUrl: './manage-module.component.html',
  styleUrls: ['./manage-module.component.scss']
})
export class ManageModuleComponent implements OnInit {
    public modules: Array<ModuleType> = []
    public coursesByAutors: Array<CourseManageType> = []

  constructor(
    private _moduleService: ModuleService,
    private _courseByAutorService: CourseService) { }
  
  ngOnInit(): void {
    this._courseByAutorService.findListCourse()
      .pipe(take(1)).subscribe(
        (response: CourseManageType[]) => {this.coursesByAutors = response })

    this._moduleService.findAllModules()
      .pipe(take(1)).subscribe(
        (response: any[]) => {this.modules = response })
  }

}
