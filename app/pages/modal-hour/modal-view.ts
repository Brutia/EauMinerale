// import { Component, OnInit, NgModule } from "@angular/core";
// import { ModalDialogParams } from "nativescript-angular/modal-dialog";
// import { TimePicker } from "ui/time-picker";
// import { Page } from "ui/page";

// // >> passing-parameters
// @Component({
//     moduleId: module.id,
//     templateUrl: "./modal-view.html",
//     styleUrls: ["./modal-view.css"]
// })
// export class ModalTimeViewComponent implements OnInit {
//     public currentdate: Date;

//     constructor(private params: ModalDialogParams, private page: Page) {
//         this.currentdate = new Date(params.context);
//     }

//     ngOnInit() {
//         let timePicker: TimePicker = <TimePicker>this.page.getViewById<TimePicker>("timePicker");
//         var dateNow = new Date();
//         timePicker.hour = dateNow.getHours();
//         timePicker.minute = dateNow.getMinutes();
//         timePicker.minHour = dateNow.getHours();
//         timePicker.minMinute = dateNow.getMinutes();
//     }

//     public submit() {
//         let timePicker: TimePicker = <TimePicker>this.page.getViewById<TimePicker>("timePicker");
//         this.params.closeCallback(timePicker.time);
//     }
// }
