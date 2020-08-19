import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceiveRoutingModule } from './receive-routing.module';
import { ReceiveMainComponent } from './receive-main/receive-main.component';
import { NgSelect2Module } from 'ng-select2';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    ReceiveMainComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgSelect2Module,
    NgxSpinnerModule,
    ReceiveRoutingModule,
    ButtonsModule.forRoot(),
    PaginationModule.forRoot()
  ],
  schemas: [
    NO_ERRORS_SCHEMA
              ]
})
export class ReceiveModule { }
