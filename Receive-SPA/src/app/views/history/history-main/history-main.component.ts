import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../../../_core/_services/history.service';
import { Pagination, PaginatedResult } from '../../../_core/_models/pagination';
import { ReceiveInfomationModel } from '../../../_core/_models/receiveInfomation-model';
import { AlertifyService } from '../../../_core/_services/alertify.service';

@Component({
  selector: 'app-history-main',
  templateUrl: './history-main.component.html',
  styleUrls: ['./history-main.component.scss']
})
export class HistoryMainComponent implements OnInit {
  historys: ReceiveInfomationModel[];
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  };
  constructor(private historyService: HistoryService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.historyService.getListAll(this.pagination.currentPage, this.pagination.itemsPerPage)
    .subscribe((res: PaginatedResult<ReceiveInfomationModel[]>) => {
      this.historys = res.result;
      this.pagination = res.pagination;
    }, (error) => {
      this.alertify.error(error);
    });
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadData();
  }
}
