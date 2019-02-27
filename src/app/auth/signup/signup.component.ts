import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../shared/auth.service";
import { NotificationService } from "src/app/shared/notification.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html"
})
export class SignupComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationservice: NotificationService
  ) {}

  ngOnInit() {}
  onSignup(form: NgForm) {
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signupUser(firstName, lastName, email, password);
    this.notificationservice.success(":: Submitted Successfully");
    this.router.navigate(["/signin"]);
  }
}
