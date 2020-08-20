import { INavData } from "@coreui/angular";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // <- ADD THIS
})
export class NavItem {
  navItems: INavData[] = [];
  constructor() {}
  getNav() {
    this.navItems = [];
    const user: any = JSON.parse(localStorage.getItem('user'));
    if(user.roleID === 1) {
      const navItem1 = {
          name: 'Quản lý người dùng',
          url: "/admin/user",
          icon: "icon-people"
      };
      this.navItems.push(navItem1);
      const navItem2 = {
        name: 'Quản lý sản phẩm',
        url: "/admin/management",
        icon: "icon-people"
      }
      this.navItems.push(navItem2);
    } else if(user.roleID === 2) {
      const navItem = {
        name: 'Approval',
        url: "/approval/manager",
        icon: "icon-people"
      };
      this.navItems.push(navItem);
    }
    else if(user.roleID === 3) {
      const navItem = {
        name: 'Receive',
        url: "/receive/manager",
        icon: "icon-people"
      };
      this.navItems.push(navItem);
    }
    return this.navItems;
  }
}
