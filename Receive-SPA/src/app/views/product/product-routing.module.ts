import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductMainComponent } from './product-main/product-main.component';
import { ProductChangeComponent } from './product-change/product-change.component';


const routes: Routes = [
  {
    path: "",
    data: {title: "Product Data"},
    children: [
      {
        path: "",
        component: ProductMainComponent,
        data: {title: "Main"},
      },
      {
        path: "change",
        component: ProductChangeComponent,
        data: {title: "Change Product"},
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
