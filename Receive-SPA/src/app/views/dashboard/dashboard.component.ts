import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    const user: any = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    if(user.roleID === 2) {
      this.router.navigate(['/approval/manager'])
    } else if(user.roleID === 3) {
      this.router.navigate(['/receive/manager'])
    } else {
      
    }
  }
}
