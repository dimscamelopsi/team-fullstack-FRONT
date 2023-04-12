import { Component, NgModule } from '@angular/core';
import { OutletContext, RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';

import { AddModuleComponent } from './add-module/add-module.component';

import { ListComponent } from '../course/list/list.component';
import { AddMediaComponent } from './add-media/add-media.component';

@NgModule({
  imports: [RouterModule.forChild(ConceptorRoutingModule.routes)],
  exports: [RouterModule]
})
export class ConceptorRoutingModule {
  public static routes: Routes = [
    {
<<<<<<< HEAD
      path:'',
      component:SidebarComponent
    },
    {
      path:'list',
      component: ListComponent,
      outlet: 'global'
    },
    {
      path: 'addMedia',
      component: AddMediaComponent,
   },
=======
      path: '',
      component: SidebarComponent, children:[
        {
        path: 'addModule',
       component: AddModuleComponent
        },
        {
          path:'list',
          component:ListComponent
        }

      ]
    }
>>>>>>> 0c2dba130ec71e635512eeed3e9ec7c2449a4edb

  ];
}
