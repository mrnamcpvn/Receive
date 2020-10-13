import { Component, OnInit } from "@angular/core";
import { Pagination, PaginatedResult } from "../../../_core/_models/pagination";
import { Router } from "@angular/router";
import { ProductService } from "../../../_core/_services/product.service";
import { AlertifyService } from "../../../_core/_services/alertify.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ProductModel } from "../../../_core/_models/product-model";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-product-main",
  templateUrl: "./product-main.component.html",
  styleUrls: ["./product-main.component.scss"],
})
export class ProductMainComponent implements OnInit {
  products: ProductModel[];
  productID: string = '';
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  };
  constructor(
    private router: Router,
    private productService: ProductService,
    private translate: TranslateService,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.loadData();
  }
  add() {
    this.productService.changeFlag("0");
    this.productService.changProduct({});
    this.router.navigate(["/product/manager/change"]);
  }
  loadData() {
    this.productService
      .getListAll(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe(
        (res: PaginatedResult<ProductModel[]>) => {
          this.products = res.result;
          this.changeNameCate();
          this.pagination = res.pagination;
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }
  search() {
    this.pagination.currentPage = 1;
    if (this.productID === '' || (this.productID.indexOf(' ') >= 0)) {
      this.loadData();
    } else {
      this.productService
        .search(
          this.pagination.currentPage,
          this.pagination.itemsPerPage,
          this.productID
        )
        .subscribe(
          (res: PaginatedResult<ProductModel[]>) => {
            this.products = res.result;
            this.pagination = res.pagination;
            this.changeNameCate();
          },
          (error) => {
            this.alertify.error(error);
          }
        );
    }
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadData();
  }
  edit(product: any) {
    this.productService.changProduct(product);
    this.productService.changeFlag("1");
    this.router.navigate(["/product/manager/change"]);
  }
  delete(productID: string) {
    this.alertify.confirm("Delete product!", "You are delete?", () => {
      this.productService.remove(productID).subscribe(
        () => {
          this.loadData();
          this.alertify.success("Delete successed");
        },
        (error) => {
          this.alertify.error("Delete unsuccessed!");
        }
      );
    });
  }

  changeNameCate() {
    if(this.products!== undefined && this.products !== null && this.products.length > 0) {
      if (this.translate.currentLang === undefined || this.translate.currentLang === "vi") {
          this.products = this.products.map((obj) => {
            obj.catNameShow = obj.catName;
            return obj;
          });
      } else if (this.translate.currentLang === "zh") {
          this.products = this.products.map((obj) => {
            obj.catNameShow = obj.catName_ZW;
            return obj;
          });
      }
    }
  }
  ngAfterContentChecked() {
    this.changeNameCate();
  }
}
