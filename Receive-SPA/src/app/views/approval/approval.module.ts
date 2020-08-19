import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovalRoutingModule } from './approval-routing.module';
import { ApprovalMainComponent } from './approval-main/approval-main.component';


@NgModule({
  declarations: [
    ApprovalMainComponent
  ],
  imports: [
    CommonModule,
    ApprovalRoutingModule
  ]
})
export class ApprovalModule { }
