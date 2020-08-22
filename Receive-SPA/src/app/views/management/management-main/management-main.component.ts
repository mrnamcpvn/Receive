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
    if(this.receiveID === '' || this.receiveID.indexOf(' ') >= 0) {
      this.loadData();
    } else {
      this.managerService.getReceive(this.receiveID).subscribe(res => {
        if(res !== null) {
          this.receiveID = '';
          this.receives.length = 0;
          this.receives.push(res);
          this.pagination = {
            currentPage: 1,
            itemsPerPage: 10,
            totalItems: 1,
            totalPages: 1,
          };
        } else {
          this.alertify.error('No Data in QrCode!');
        }
      })
    }
  }
  acceptReceive(receiveID: string) {
    this.alertify.confirm('Accept Receive', 'Are you sure you want to Accept this QrCodeID "' + receiveID + '" ?', () => {
      this.managerService.acceptReceive(receiveID).subscribe(res => {
        if(res.result) {
          this.alertify.success('Accept Successed!');
          this.loadData();
        } else {
          this.alertify.error('Accept unsuccessed!')
        }
      });
    });
  }
  delineReceive(receiveID: string){
    this.alertify.confirm('Decline Receive', 'Are you sure you want to Decline this QrCodeID "' + receiveID + '" ?', () => {
      this.managerService.declineReceive(receiveID).subscribe(res => {
        if(res.result) {
          this.alertify.success('Decline Successed!');
          this.loadData();
        } else {
          this.alertify.error('Decline unsuccessed!')
        }
      });
    });
  }
}
