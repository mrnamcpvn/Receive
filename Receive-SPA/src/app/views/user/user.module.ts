import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { UserChangeComponent } from './user-change/user-change.component';
import { UserMainComponent } from './user-main/user-main.component';


@NgModule({
  declarations: [
    UserMainComponent,
    UserChangeComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    UserRoutingModule,
    NgxSpinnerModule,
    ButtonsModule.forRoot(),
    PaginationModule.forRoot()

  ]
})
export class UserModule { }
