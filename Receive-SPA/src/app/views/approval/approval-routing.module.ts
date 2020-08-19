import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApprovalMainComponent } from './approval-main/approval-main.component';


const routes: Routes = [
  {
    path: "",
    data: {title: "Approval Data"},
    children: [
      {
        path: "",
        component: ApprovalMainComponent,
        data: {title: "Main"},
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalRoutingModule { }
