import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Select2OptionData } from "ng-select2";
import { ReceiveInfomationModel } from "../../../_core/_models/receiveInfomation-model";
import { AlertifyService } from "../../../_core/_services/alertify.service";
import { ManagerService } from "../../../_core/_services/manager.service";
import { ProductService } from "../../../_core/_services/product.service";
import { ReceiveService } from "../../../_core/_services/receive.service";

@Component({
  selector: "app-management-edit",
  templateUrl: "./management-edit.component.html",
  styleUrls: ["./management-edit.component.scss"],
})
export class ManagementEditComponent implements OnInit {
  receive: ReceiveInfomationModel;
  receiveConst: ReceiveInfomationModel;
  isSave: boolean = false;
  public categories: Array<Select2OptionData>;
  public products: Array<Select2OptionData>;
  optionsCategory = {
    allowClear: true,
    width: "100%",
  };
  optionsProduct = {
    allowClear: true,
    width: "100%",
  };
  disable = false;
  constructor(
    private managerService: ManagerService,
    private productService: ProductService,
    private receiveService: ReceiveService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllCategory();
    this.managerService.currentReceive.subscribe((res) => (this.receive = res));
    this.receiveConst = JSON.parse(JSON.stringify(this.receive));
  }
  getAllCategory() {
    this.productService.getAllCategories().subscribe((res) => {
      this.categories = res.map((obj) => {
        return { id: obj.id.toString(), text: obj.name_LL };
      });
    });
  }
  changedCategory(e: any): void {
    this.receive.categoryID = e;
    this.getProductByCatID();
  }
  changeProduct(e: any): void {
    this.receive.productID = e;
  }
  getProductByCatID() {
    this.receiveService
      .getProductByCatID(this.receive.categoryID)
      .subscribe((res) => {
        this.products = res.map((obj) => {
          return { id: obj.id.toString(), text: obj.id + "-" + obj.name };
        });
      });
  }
  save() {
    let param = {
      id: this.receive.id,
      productID : this.receive.productID,
      qty: this.receive.qty
    }
    this.managerService.editReceive(param).subscribe(res => {
      if(res) {
        this.alertify.success('Edit Receive successfuly!');
        this.back();
      } else {
        this.alertify.error('Edit unsuccessfuly!')
      }
    })
  }
  cancel() {
    debugger
    this.receive.qty = this.receiveConst.qty;
    this.receive.categoryID = this.receiveConst.categoryID;
    this.receive.productID = this.receiveConst.productID;
  }
  back() {
    this.router.navigate(["/admin/management"]);
  }
  ngAfterContentChecked() {
    if (
      this.receive.productID === undefined ||
      this.receive.qty === undefined ||
      this.receive.qty === null ||
      this.receive.qty === 0
    ) {
      this.isSave = false;
    } else {
      this.isSave = true;
    }
  }
}
