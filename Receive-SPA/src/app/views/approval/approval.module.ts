import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovalRoutingModule } from './approval-routing.module';
import { ApprovalMainComponent } from './approval-main/approval-main.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ApprovalMainComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ApprovalRoutingModule,
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
    TranslateModule,
  ]
})
export class ApprovalModule { }

