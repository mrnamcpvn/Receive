import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../../../_core/_services/manager.service';
import { AlertifyService } from '../../../_core/_services/alertify.service';
import { Location } from "@angular/common";
@Component({
  selector: 'app-import-dept',
  templateUrl: './import-dept.component.html',
  styleUrls: ['./import-dept.component.scss']
})
export class ImportDeptComponent implements OnInit {

  constructor(private managerService: ManagerService,
              private alertifyService: AlertifyService,
              private location: Location) { }

  ngOnInit() {
    this.managerService.importExcel().subscribe(res => {
      if(res) {
        this.alertifyService.success('Import dữ liệu thành công!');
      } else {
        this.alertifyService.error('Import lỗi!');
      }
      this.location.back();
    })
  }
}
