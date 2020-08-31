import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImportDeptComponent } from './import-dept/import-dept.component';


const routes: Routes = [
  {
    path: "",
    data: {title: "Management"},
    children: [
      {
        path: "",
        component: ImportDeptComponent,
        data: {title: "Main"},
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportRoutingModule { }
