import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../../_core/_services/alertify.service';
import { ReceiveService } from '../../../_core/_services/receive.service';
import { Select2OptionData } from 'ng-select2';
import { Pagination, PaginatedResult } from '../../../_core/_models/pagination';
import { ReceiveInfomationModel } from '../../../_core/_models/receiveInfomation-model';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-receive-main',
  templateUrl: './receive-main.component.html',
  styleUrls: ['./receive-main.component.scss']
})
export class ReceiveMainComponent implements OnInit {
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  };
  receives: ReceiveInfomationModel[];
  receive: any = {};
  isAdd = false;
  warehouseID: '';
  cateID = '';
  disable = false;
  public warehouses: Array<Select2OptionData>;
  public products: Array<Select2OptionData>;
  public categories: Array<Select2OptionData>;
  optionsWarehouse = {
    allowClear: true,
    width: "100%"
  };
  optionsProduct = {
    allowClear: true,
    width: "100%"
  };
  optionsCategory = {
    allowClear: true,
    width: "100%"
  }
  constructor(private alertify: AlertifyService,
              private receiveService: ReceiveService,
              public translate: TranslateService,
              private router: Router) { 
                translate.addLangs(["vi", "zh"]);
                translate.setDefaultLang("vi");
              }

  ngOnInit() {
    this.loadData();
    this.getAllWarehouse();
  }
  switchLang(lang: string) {
    debugger
  }
  loadData() {
    this.receiveService.getListAll(this.pagination.currentPage, this.pagination.itemsPerPage)
    .subscribe((res: PaginatedResult<ReceiveInfomationModel[]>) => {
      this.receives = res.result;
      this.pagination = res.pagination;
    }, (error) => {
      this.alertify.error(error);
    });
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadData();
  }
  changeWarehouse(e: any): void {
    this.warehouseID = e;
    this.getAllCategory();
  }
  changeCategory(e: any): void {
    this.cateID = e;
    this.getProductByCatID();
  }
  changeProduct(e: any): void {
    this.receive.productID = e;
  }
  getAllWarehouse(){
    this.receiveService.getAllWarehouse().subscribe(res => {
      this.warehouses = res.map(obj => {
        return {id: obj.id.toString(), text: obj.name_LL};
      });
    });
  }
  getAllCategory() {
    if(this.warehouseID !== '' && this.warehouseID !== undefined) {
      this.receiveService.getAllCategory(this.warehouseID).subscribe(res => {
        this.categories = res.map(obj => {
          if(this.translate.currentLang === undefined || this.translate.currentLang === 'vi') {
            return {id: obj.id.toString(), text: obj.name_LL};
          } else if(this.translate.currentLang === 'zh') {
            return {id: obj.id.toString(), text: obj.name_ZW};
          }
        });
      });
    }
  }
  getProductByCatID() {
    if(this.cateID !== '' && this.cateID !== undefined) {
      this.receiveService.getProductByCatID(this.cateID).subscribe(res => {
        this.products = res.map(obj => {
          return  {id: obj.id.toString(), text: obj.id + "-" + obj.name}
        });
      });
    }
  }

  // Kiểm tra xem disable hay show button Add
  ngAfterContentChecked() {
    if(this.receive.productID === undefined ||
        this.receive.qty === undefined || 
        this.receive.qty === null ||
        this.receive.qty === 0) {
      this.isAdd = false;
    } else {
      this.isAdd = true;
    }

    if(this.translate.currentLang === undefined || this.translate.currentLang === 'vi') {
      this.receiveService.getAllWarehouse().subscribe(res => {
        this.warehouses = res.map(obj => {
          return {id: obj.id.toString(), text: obj.name_LL};
        });
      });

    } else if(this.translate.currentLang === 'zh') {
      this.receiveService.getAllWarehouse().subscribe(res => {
        this.warehouses = res.map(obj => {
          return {id: obj.id.toString(), text: obj.name_ZW};
        });
      });
    }
  }
  print(e) {
    this.receiveService.changeReceiveID(e.id);
    this.router.navigate(['/receive/manager/print']);
  }
  add() {
    this.receiveService.receiveRegister(this.receive).subscribe(res => {
      if(res.result) {
        this.alertify.success('Receive Successfuly!');
        this.loadData();
      }
    })
  }
}
