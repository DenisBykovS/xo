import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../../admin.service";

@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"],
})
export class AdminLayoutComponent implements OnInit {
  constructor(public adminService: AdminService) {}

  ngOnInit() {}

  logout() {
    this.adminService.logout();
  }
}
