import { Component, OnInit } from "@angular/core";
import { NavItem } from "../../_nav";
import { AuthService } from "../../_core/_services/auth.service";
import { AlertifyService } from "../../_core/_services/alertify.service";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html",
})
export class DefaultLayoutComponent implements OnInit {
  isVN: boolean = false;
  isEN: boolean = false;
  public sidebarMinimized = false;
  public navItems = [];
  currentUser: any = JSON.parse(localStorage.getItem("user"));
  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private nav: NavItem,
    public translate: TranslateService
  ) {
    translate.addLangs(["vi", "zh"]);
    translate.setDefaultLang("vi");
  }
  ngOnInit() {
    this.navItems = this.nav.getNav();
  }
  switchLang(lang: string) {
    this.translate.use(lang);
    this.navItems = [];
    // Người chủ quản
    if (this.currentUser.roleID === 2) {
      if (lang === "vi") {
        const navItem1 = {
          name: "Xét duyệt",
          url: "/approval/manager",
          icon: "icon-people",
        };
        this.navItems.push(navItem1);
        const navItem2 = {
          name: "Lịch sử",
          url: "/history/main",
          icon: "icon-hourglass",
        };
        this.navItems.push(navItem2);
      } else {
        const navItem1 = {
          name: "審核",
          url: "/approval/manager",
          icon: "icon-people",
        };
        this.navItems.push(navItem1);
        const navItem2 = {
          name: "記錄",
          url: "/history/main",
          icon: "icon-hourglass",
        };
        this.navItems.push(navItem2);
      }
    }
    // Người xin lãnh
    else if (this.currentUser.roleID === 3) {
      if (lang === "vi") {
        const navItem1 = {
          name: "Lãnh tạp phẩm",
          url: "/receive/manager",
          icon: "icon-people",
        };
        this.navItems.push(navItem1);
        const navItem2 = {
          name: "Lịch sử",
          url: "/history/main",
          icon: "icon-hourglass",
        };
        this.navItems.push(navItem2);
      } else {
        const navItem1 = {
          name: "領料單",
          url: "/receive/manager",
          icon: "icon-people",
        };
        this.navItems.push(navItem1);
        const navItem2 = {
          name: "記錄",
          url: "/history/main",
          icon: "icon-hourglass",
        };
        this.navItems.push(navItem2);
      }
    } else if (this.currentUser.roleID === 1) {
      if (lang === "vi") {
        const navItem1 = {
          name: "Quản lý người dùng",
          url: "/admin/user",
          icon: "icon-people",
        };
        this.navItems.push(navItem1);
        const navItem2 = {
          name: "Xét duyệt",
          url: "/admin/management",
          icon: "cui-settings",
        };
        this.navItems.push(navItem2);
        const navItem3 = {
          name: "Lịch sử",
          url: "/history/main",
          icon: "icon-hourglass",
        };
        this.navItems.push(navItem3);
        const navItem4 = {
          name: "Quản lý sản phẩm",
          url: "/product/manager",
          icon: "icon-wallet",
        };
        this.navItems.push(navItem4);
      } else {
        const navItem1 = {
          name: "用户管理",
          url: "/admin/user",
          icon: "icon-people",
        };
        this.navItems.push(navItem1);
        const navItem2 = {
          name: "審核",
          url: "/admin/management",
          icon: "cui-settings",
        };
        this.navItems.push(navItem2);
        const navItem3 = {
          name: "記錄",
          url: "/history/main",
          icon: "icon-hourglass",
        };
        this.navItems.push(navItem3);
        const navItem4 = {
          name: "产品管理",
          url: "/product/manager",
          icon: "icon-wallet",
        };
        this.navItems.push(navItem4);
      }
    }
    // Người có full quyền(Xin lãnh + Duyệt 2 bậc)
    else if (this.currentUser.roleID === 0) {
      if (lang === "vi") {
        const navItem1 = {
          name: "Quản lý người dùng",
          url: "/admin/user",
          icon: "icon-people",
        };
        this.navItems.push(navItem1);

        const navItem2 = {
          name: "Quản lý sản phẩm",
          url: "/product/manager",
          icon: "icon-wallet",
        };
        this.navItems.push(navItem2);

        const navItem3 = {
          name: "Lãnh tạp phẩm",
          url: "/receive/manager",
          icon: "icon-people",
        };
        this.navItems.push(navItem3);

        const navItem4 = {
          name: "Xét duyệt lãnh",
          url: "/approval/manager",
          icon: "icon-people",
        };
        this.navItems.push(navItem4);

        const navItem5 = {
          name: "Xét duyệt đơn",
          url: "/admin/management",
          icon: "cui-settings",
        };
        this.navItems.push(navItem5);
        const navItem6 = {
          name: "Lịch sử",
          url: "/history/main",
          icon: "icon-hourglass",
        };
        this.navItems.push(navItem6);
      } else {
        const navItem1 = {
          name: "用户管理",
          url: "/admin/user",
          icon: "icon-people",
        };
        this.navItems.push(navItem1);

        const navItem2 = {
          name: "产品管理",
          url: "/product/manager",
          icon: "icon-wallet",
        };
        this.navItems.push(navItem2);

        const navItem3 = {
          name: "領料單",
          url: "/receive/manager",
          icon: "icon-people",
        };
        this.navItems.push(navItem3);

        const navItem4 = {
          name: "審核收據",
          url: "/approval/manager",
          icon: "icon-people",
        };
        this.navItems.push(navItem4);

        const navItem5 = {
          name: "審核單",
          url: "/admin/management",
          icon: "cui-settings",
        };
        this.navItems.push(navItem5);
        const navItem6 = {
          name: "記錄",
          url: "/history/main",
          icon: "icon-hourglass",
        };
        this.navItems.push(navItem6);
      }
    }
  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message("Logged out");
    this.router.navigate(["/login"]);
  }
}
