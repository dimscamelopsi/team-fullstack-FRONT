import { Component, Input, OnInit } from '@angular/core';
import { CourseManageType } from '../../types/course-manage-type';
import { CourseService } from '../../services/course.service';
import { take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ModuleType } from '../../types/module-type';
import { ModuleService } from 'src/app/conceptor/modules/services/module.service';

@Component({
  selector: 'app-manage-module',
  templateUrl: './manage-module.component.html',
  styleUrls: ['./manage-module.component.scss']
})
export class ManageModuleComponent implements OnInit {
  public modules: Array<ModuleType> = []
  public coursesByAutors: Array<CourseManageType> = []
  @Input() public course!: CourseManageType

  constructor(
    private _moduleService: ModuleService,
    private _courseByAutorService: CourseService,
    private _route: ActivatedRoute) { }


  /**
* Initializes the component.
* Fetches the list of courses by authors and all modules.
*/
  ngOnInit(): void {
    // Fetch the list of courses by authors
    this._courseByAutorService.findListCourse()
      .pipe(take(1)).subscribe(
        (response: CourseManageType[]) => { this.coursesByAutors = response })
    // Fetch all modules
    this._moduleService.findAllModules()
      .pipe(take(1)).subscribe(
        (response: any[]) => { this.modules = response })
  }

}
