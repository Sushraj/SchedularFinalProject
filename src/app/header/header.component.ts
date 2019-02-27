import { Component, OnInit } from "@angular/core";
import { AuthService } from "../shared/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {}

  onLogout() {
    this.authService.logout();
  }
}
