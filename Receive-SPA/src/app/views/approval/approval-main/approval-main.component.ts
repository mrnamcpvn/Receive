import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from '../../../_core/_models/pagination';
import { ReceiveInfomationModel } from '../../../_core/_models/receiveInfomation-model';
import { AlertifyService } from '../../../_core/_services/alertify.service';
import { Router } from '@angular/router';
import { ApprovalService } from '../../../_core/_services/approval.service';

@Component({
  selector: 'app-approval-main',
  templateUrl: './approval-main.component.html',
  styleUrls: ['./approval-main.component.scss']
})
export class ApprovalMainComponent implements OnInit {
  userReceive = "";
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  };
  receives: ReceiveInfomationModel[];
  constructor(private alertify: AlertifyService,
              private approvalService: ApprovalService) { }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.approvalService.getListAll(this.pagination.currentPage, this.pagination.itemsPerPage)
    .subscribe((res: PaginatedResult<ReceiveInfomationModel[]>) => {
      this.receives = res.result;
      this.pagination = res.pagination;
    }, (error) => {
      this.alertify.error(error);
    });
  }
  search() {
    this.pagination.currentPage = 1;
    if(this.userReceive === '' || this.userReceive.indexOf(' ') >= 0) {
      this.loadData()
    } else {
      this.approvalService.search(this.pagination.currentPage, this.pagination.itemsPerPage, this.userReceive)
      .subscribe((res: PaginatedResult<ReceiveInfomationModel[]>) => {
        this.receives = res.result;
        this.pagination = res.pagination;
      }, (error) => {
        this.alertify.error(error);
      });
    }
  }
  acceptReceive(receiveID: string) {
    this.approvalService.acceptReceive(receiveID).subscribe(res => {
      if(res.result) {
        this.alertify.success('Accept Receive Successfully!')
        this.loadData();
      } else {
        this.alertify.error('Error');
      }
    })
  }
  delineReceive(receiveID: string) {
    this.approvalService.delineReceive(receiveID).subscribe(res => {
      if(res.result) {
        this.alertify.success('Accept Receive Successfully!')
        this.loadData();
      } else {
        this.alertify.error('Error');
      }
    })
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadData();
  }
}
