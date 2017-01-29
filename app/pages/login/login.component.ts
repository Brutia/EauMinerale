// import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
// import { Router } from "@angular/router";
// import { Color } from "color";
// import { Page } from "ui/page";
// import { TextField } from "ui/text-field";
// import { View } from "ui/core/view";

// import { User } from "../../shared/user/user";
// import { setHintColor } from "../../utils/hint-util";
// import { ApiService } from "../../shared/api_service/ApiService";
// import * as appSettings from "application-settings";


// @Component({
//   selector: "login-component",
//   providers: [ApiService],
//   templateUrl: "pages/login/login.html",
//   styleUrls: ["pages/login/login-common.css", "pages/login/login.css"],
// })
// export class LoginComponent implements OnInit {
//   user: User;
//   // isLoggingIn = true;
//   // public items: Array<DataItem>;
//   // public hasSelection: boolean;


//   @ViewChild("container") container: ElementRef;
//   @ViewChild("email") email: ElementRef;
//   @ViewChild("password") password: ElementRef;
//   @ViewChild("loading") loading: ElementRef;

//   constructor(private router: Router, private apiService: ApiService, private page: Page) {//) {
//     this.user = new User();


//   }

//   ngOnInit() {
//     // this.page.actionBarHidden = true;
//     // this.page.backgroundImage = this.page.ios ? "res://bg_login.jpg" : "res://bg_login";
//   }



//   login() {
    

//     let emailField = <TextField>this.email.nativeElement;
//     emailField.dismissSoftInput();
//     let passwordField = <TextField>this.password.nativeElement;
//     passwordField.dismissSoftInput();
//     this.apiService.loginUser(this.user.email, this.user.password)
//       .subscribe(
//       data => {
//         appSettings.setString("token", data.token);
//         this.router.navigate(["/"]);
//       },
//       err => {
//         console.log(err);
//         alert("Email et/ou mot de passe incorrect");

//       }
//       );
//   }


// }
