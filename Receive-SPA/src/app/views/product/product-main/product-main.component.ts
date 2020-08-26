import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from '../../../_core/_models/pagination';
import { Router } from '@angular/router';
import { ProductService } from '../../../_core/_services/product.service';
import { AlertifyService } from '../../../_core/_services/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductModel } from '../../../_core/_models/product-model';

@Component({
  selector: 'app-product-main',
  templateUrl: './product-main.component.html',
  styleUrls: ['./product-main.component.scss']
})
export class ProductMainComponent implements OnInit {
  products: ProductModel[];
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  };
  constructor(private router: Router,
              private productService: ProductService,
              private alertify: AlertifyService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loadData();
  }
  add(){
    this.productService.changeFlag('0');
    this.productService.changProduct({});
    this.router.navigate(['/product/manager/change']);
  }
  loadData() {
    this.productService.getListAll(this.pagination.currentPage, this.pagination.itemsPerPage)
    .subscribe((res: PaginatedResult<ProductModel[]>) => {
      this.products = res.result;
      this.pagination = res.pagination;
    }, (error) => {
      this.alertify.error(error);
    });
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadData();
  }
  edit(product: any){
    this.productService.changProduct(product);
    this.productService.changeFlag('1');
    this.router.navigate(['/product/manager/change']);
  }
  delete(productID: string) {
    this.alertify.confirm('Xóa sản phẩm!', 'Bạn có chắc chắn muốn xóa không?', () => {
      this.productService.remove(productID).subscribe(() => {
        this.loadData();
        this.alertify.success('Xóa sản phẩm thành công');
      }, error => {
        this.alertify.error('Xóa không thành công!');
      });
    });
  }
}
