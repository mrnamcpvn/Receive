import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from '../../../_core/_models/pagination';
import { ManagerService } from '../../../_core/_services/manager.service';
import { ReceiveInfomationModel } from '../../../_core/_models/receiveInfomation-model';
import { AlertifyService } from '../../../_core/_services/alertify.service';

@Component({
  selector: 'app-management-main',
  templateUrl: './management-main.component.html',
  styleUrls: ['./management-main.component.scss']
})
export class ManagementMainComponent implements OnInit {
  receiveID = '';
  receives: ReceiveInfomationModel[];
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  };
  constructor(private managerService: ManagerService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.managerService.getListAll(this.pagination.currentPage, this.pagination.itemsPerPage)
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
  getReceive(e: any) {
    debugger
    if(this.receiveID === '' || this.receiveID.indexOf(' ') >= 0 || this.receiveID.length < 10) {
      this.loadData();
    } else {
      debugger
      this.managerService.getReceive(this.receiveID).subscribe(res => {
        if(res !== null) {
          console.log(res);
          this.receives.length = 0;
          this.receives.push(res);
          this.pagination = {
            currentPage: 1,
            itemsPerPage: 10,
            totalItems: 1,
            totalPages: 1,
          };
        } else {
          this.alertify.error('Không có dữ liệu!');
        }
      })
    }
  }
  acceptReceive(receiveID: string) {
    this.alertify.confirm('Duyệt đơn', 'Bạn có chắc chắn duyệt đơn không?', () => {
      this.managerService.acceptReceive(receiveID).subscribe(res => {
        if(res.result) {
          this.alertify.success('Duyệt đơn thành công!');
          this.loadData();
        } else {
          this.alertify.error('Duyệt đơn không thành công')
        }
      });
    });
  }
  delineReceive(receiveID: string){
    this.alertify.confirm('Hủy đơn', 'Bạn có chắc chắn muốn hủy đơn không?', () => {
      this.managerService.declineReceive(receiveID).subscribe(res => {
        if(res.result) {
          this.alertify.success('Hủy đơn thành công');
          this.loadData();
        } else {
          this.alertify.error('Hủy đơn không thành công')
        }
      });
    });
  }
  clear() {
    this.receiveID = '';
    this.loadData();
  }
}
