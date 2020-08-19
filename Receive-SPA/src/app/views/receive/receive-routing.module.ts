import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceiveMainComponent } from './receive-main/receive-main.component';


const routes: Routes = [
  {
    path: "",
    data: {title: "Receive Data"},
    children: [
      {
        path: "",
        component: ReceiveMainComponent,
        data: {title: "Main"},
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceiveRoutingModule { }
