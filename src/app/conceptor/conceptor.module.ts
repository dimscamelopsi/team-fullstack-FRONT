import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConceptorRoutingModule } from './conceptor-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UiModule } from '../ui/ui.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddModuleComponent } from './modules/add-module/add-module.component';
import { CourseModule } from '../course/course.module';
import { AddMediaComponent } from './add-media/add-media.component';
import { MediaDialogComponent } from './modules/media-dialog/media-dialog.component';
import { ModuleDialogComponent } from './modules/module-dialog/module-dialog.component';
import { DndDirective } from '../directives/dnd.directive';
import { ProgressComponent } from './progress/progress.component';


@NgModule({
  declarations: [
    SidebarComponent,
    AddModuleComponent,
    MediaDialogComponent,
    AddMediaComponent,
    ModuleDialogComponent,
    DndDirective,
    ProgressComponent
  ],
  imports: [
    CommonModule,
    ConceptorRoutingModule,
    SharedModule,
    UiModule,
    CourseModule,
  ]
})
export class ConceptorModule { }
