import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../../_core/_services/alertify.service';
import { ReceiveService } from '../../../_core/_services/receive.service';
import { Select2OptionData } from 'ng-select2';
import { Pagination, PaginatedResult } from '../../../_core/_models/pagination';
import { ReceiveInfomationModel } from '../../../_core/_models/receiveInfomation-model';
import { Router } from '@angular/router';

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
  cateID = '';
  disable = false;
  public products: Array<Select2OptionData>;
  public categories: Array<Select2OptionData>;
  optionsProduct = {
    placeholder: "Select Product...",
    allowClear: true,
    width: "100%"
  };
  optionsCategory = {
    placeholder: "Select Category...",
    allowClear: true,
    width: "100%"
  }
  constructor(private alertify: AlertifyService,
              private receiveService: ReceiveService,
              private router: Router) { }

  ngOnInit() {
    this.loadData();
    this.getAllCategory();
  }

  loadData() {
    this.receiveService.getListAll(this.pagination.currentPage, this.pagination.itemsPerPage)
    .subscribe((res: PaginatedResult<ReceiveInfomationModel[]>) => {
      console.log(res);
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
  changeProduct(e: any): void {
    this.receive.productID = e;
  }
  changeCategory(e: any): void {
    this.cateID = e;
    this.getProductByCatID();
  }
  getAllCategory() {
    this.receiveService.getAllCategory().subscribe(res => {
      this.categories = res.map(obj => {
        return  {id: obj.id.toString(), text: obj.name}
      });
    });
  }
  getProductByCatID() {
    if(this.cateID !== '') {
      this.receiveService.getProductByCatID(this.cateID).subscribe(res => {
        this.products = res.map(obj => {
          return  {id: obj.id.toString(), text: obj.name}
        });
      });
    }
  }

  // Kiểm tra xem disable hay show button Add
  ngAfterContentChecked() {
    if( this.receive.productID === undefined ||
        this.receive.qty === undefined || 
        this.receive.qty === null ||
        this.receive.qty === 0) {
      this.isAdd = false;
    } else {
      this.isAdd = true;
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
  // printQrCode(e: any) {
  //   this.qrCode = e.id;
  // }
}
