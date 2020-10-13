import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../_core/_services/product.service';
import { Select2OptionData } from 'ng-select2';
import { AlertifyService } from '../../../_core/_services/alertify.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-change',
  templateUrl: './product-change.component.html',
  styleUrls: ['./product-change.component.scss']
})
export class ProductChangeComponent implements OnInit {
  disable = false;
  flag: string;
  product: any = {};
  public categories: Array<Select2OptionData>;
  optionsCategory = { 
    allowClear: true,
    width: "100%"
  };
  constructor(private router: Router,
              private alertify: AlertifyService,
              private translate: TranslateService,
              private productService: ProductService) { }

  ngOnInit() {
    this.productService.currentFlag.subscribe(res => this.flag = res);
    this.productService.currentProduct.subscribe(res => this.product = JSON.parse(JSON.stringify(res)));
    this.getAllCategory();
  }
  back() {
    this.router.navigate(['/product/manager/']);
  }
  getAllCategory() {
    this.productService.getAllCategories().subscribe(res => {
      this.categories = res.map(obj => {
        return {id: obj.id.toString(), text:obj.name_LL}
      })
    })
  }
  changedCategory(e: any): void {
    this.product.catID = e;
  }
  save() {
    this.product.catID = parseInt(this.product.catID);
    if(this.flag === '0') {
      this.productService.add(this.product).subscribe(res => {
        if(res.result === 'exist') {
          this.alertify.error("Mã sản phẩm này đã tồn tại!")
        } else if(res.result === 'ok') {
          this.alertify.success('Thêm sản phẩm thành công!');
          this.router.navigate(['/product/manager/']);
        } else {
          this.alertify.error('Có lỗi xảy ra!');
        }
      })
    } else {
      this.productService.update(this.product).subscribe(res => {
        if(res.result) {
          this.alertify.success("Đã update thành công!")
          this.router.navigate(['/product/manager/']);
        } else{
          this.alertify.error('Update không thành công!');
        }
      })
    }
  }
  saveAndNext() {
    this.product.catID = parseInt(this.product.catID);
    this.productService.add(this.product).subscribe(res => {
      if(res.result === 'exist') {
        this.alertify.error("Mã sản phẩm này đã tồn tại!")
      } else if(res.result === 'ok') {
        this.alertify.success('Thêm sản phẩm thành công!');
      } else {
        this.alertify.error('Có lỗi xảy ra!');
      }
    })
  }
  cancel() {
    if(this.flag === '0') {
      this.product = {};
    } else {
      this.productService.currentProduct.subscribe(res => this.product = JSON.parse(JSON.stringify(res)));
    }
  }
  ngAfterContentChecked() {
    if(this.translate.currentLang === 'vi' || this.translate.currentLang === undefined) {
      this.productService.getAllCategories().subscribe((res) => {
        this.categories = res.map((obj) => {
          return { id: obj.id.toString(), text: obj.name_LL };
        });
      });
    } else if(this.translate.currentLang === 'zh') {
      this.productService.getAllCategories().subscribe((res) => {
        this.categories = res.map((obj) => {
          return { id: obj.id.toString(), text: obj.name_ZW };
        });
      });
    }
  }
}
