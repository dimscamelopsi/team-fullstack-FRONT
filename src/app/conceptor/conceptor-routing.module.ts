import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddModuleComponent } from './add-module/add-module.component';



@NgModule({
  imports: [RouterModule.forChild(ConceptorRoutingModule.routes)],
  exports: [RouterModule]
})
export class ConceptorRoutingModule {
  public static routes: Routes = [
    {
      path:'',
      component:SidebarComponent
    },
    {
      path:'addModule', 
      component:AddModuleComponent,
      outlet:'global'

    }

  ];
 }
