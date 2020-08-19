import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagementMainComponent } from './management-main/management-main.component';


const routes: Routes = [
  {
    path: "",
    data: {title: "Management"},
    children: [
      {
        path: "",
        component: ManagementMainComponent,
        data: {title: "Main"},
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
