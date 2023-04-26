import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { SharedModule } from '../shared/shared.module';
import { InitialsPipe } from './pipes/initials.pipe';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { StudentFormComponent } from './dialogs/student-form/student-form.component';

@NgModule({
  declarations: [
    ListComponent,
    InitialsPipe,
    AddComponent,
    UpdateComponent,
    StudentFormComponent,
  ],
  imports: [SharedModule],
})
export class StudentModule {}
