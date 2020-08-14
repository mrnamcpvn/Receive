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
    console.log(user);
    if(user.roleID === 1) {
      const navItem = {
          name: 'Manage User',
          url: "/admin/user",
          icon: "icon-people"
      };
      this.navItems.push(navItem);
    }
    return this.navItems;
  }
}
