import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from '../../../_core/_models/pagination';
import { ManagerService } from '../../../_core/_services/manager.service';
import { ReceiveInfomationModel } from '../../../_core/_models/receiveInfomation-model';
import { AlertifyService } from '../../../_core/_services/alertify.service';
import { Router } from '@angular/router';

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
              private router: Router,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.pagination.currentPage = 1;
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
    if(this.receiveID === '') {
      this.loadData();
    } else if(this.receiveID.indexOf(' ') >= 0 || this.receiveID.length < 10) {
      this.receives.length = 0;
      this.pagination = {
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 1,
        totalPages: 1,
      }
    } else {
      this.managerService.getReceive(this.receiveID).subscribe(res => {
        if(res !== null) {
          this.receives.length = 0;
          this.receives.push(res);
        } else {
          this.receives.length = 0;
          this.alertify.error('Không có dữ liệu!');
        }
        this.pagination = {
          currentPage: 1,
          itemsPerPage: 10,
          totalItems: 1,
          totalPages: 1,
        };
      })
    }
  }
  editReceive(receive: ReceiveInfomationModel) {
    this.managerService.changeReceive(receive);
    this.router.navigate(['/admin/management/receive-edit']);
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
