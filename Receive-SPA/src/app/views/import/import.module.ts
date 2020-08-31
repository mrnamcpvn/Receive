import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportRoutingModule } from './import-routing.module';
import { ImportDeptComponent } from './import-dept/import-dept.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ImportDeptComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ImportRoutingModule
  ]
})
export class ImportModule { }
