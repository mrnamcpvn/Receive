import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryMainComponent } from './history-main/history-main.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HistoryMainComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    HistoryRoutingModule,
    NgxSpinnerModule,
    ButtonsModule.forRoot(),
    PaginationModule.forRoot()
  ]
})
export class HistoryModule { }
