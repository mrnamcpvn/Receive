import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReceiveService } from '../../../_core/_services/receive.service';

@Component({
  selector: 'app-receive-print',
  templateUrl: './receive-print.component.html',
  styleUrls: ['./receive-print.component.scss']
})
export class ReceivePrintComponent implements OnInit {
  receiveID: string;
  constructor(private router: Router,
              private receiveService: ReceiveService) { }

  ngOnInit() {
    this.receiveService.currentReceiveID.subscribe(res => this.receiveID = res);
  }
  back() {
    this.router.navigate(['/receive/manager']);
  }
}
