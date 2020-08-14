import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../../_core/_services/alertify.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination, PaginatedResult } from '../../../_core/_models/pagination';
import { UsersService } from '../../../_core/_services/users.service';
import { UserModel } from '../../../_core/_models/user-model';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.scss']
})
export class UserMainComponent implements OnInit {
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  };
  users: UserModel[];
  constructor(private alertify: AlertifyService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private userService: UsersService) { }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.userService.getListAll(this.pagination.currentPage, this.pagination.itemsPerPage)
    .subscribe((res: PaginatedResult<UserModel[]>) => {
      this.users = res.result;
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
