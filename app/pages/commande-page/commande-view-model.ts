
import { View } from "ui/core/view";
import { RadSideDrawer } from "nativescript-telerik-ui/sidedrawer";
import { Page } from "ui/page";
import { ActionItem } from "ui/action-bar";
import { Commande } from "../../shared/commande/commande";
import * as appSettings from "application-settings";
import { CheckBox } from 'nativescript-checkbox';
import { DatePicker } from "ui/date-picker";
import { TimePicker } from "ui/time-picker";
import { ScrollView } from "ui/scroll-view";
// import { ApiService } from "../../shared/api_service/ApiService";
import { User } from "../../shared/user/user";
import { Info } from "./info";
import { TextField } from "ui/text-field";
// import { ModalViewComponent } from "../modal/modal-view";
// import { ModalTimeViewComponent } from "../modal-hour/modal-view";
import frame = require('ui/frame');
import drawerModule = require("nativescript-telerik-ui/sidedrawer");
import pageModule = require("nativescript-telerik-ui/sidedrawer/drawerpage");
import observableModule = require("data/observable");

import view = require("ui/core/view");

export class CommandeViewModel extends observableModule.Observable{

    commande: Commande;
    user: User;
    private isLogged: boolean;
    private showDate: boolean;
    private token: string;
    private timeD: DatePicker;
    private timeH: TimePicker;
    public listeInfo: Array<Info>;
    private listLoaded: boolean;
    private isLoading: boolean;

    constructor() {
        super();
        this.commande = new Commande();
        this.showDate = false;
        this.listLoaded = false;
        this.isLoading = true;
        this.listeInfo = [];
        this.set("mainContentText", "SideDrawer for NativeScript can be easily setup in the XML definition of your page by defining main- and drawer-content. The component"
            + " has a default transition and position and also exposes notifications related to changes in its state. Swipe from left to open side drawer.");
        // const pushPlugin = require("nativescript-push-notifications");
        // pushPlugin.onMessageReceived(function callback(data) {
        //     console.log('Message received');
        // });

        // this.apiService.getInfo().subscribe(

        //     data => {
        //         for (let i in data) {
        //             this.listeInfo.push({ title: data[i].title, message: data[i].message });
        //         }
        //         this.isLoading = false;
        //     },
        //     err => {
        //         alert("impossible de récupérer les infos de la liste");
        //     }

        // );
    }

    public openLogin() {
        // this.router.navigate(["login"]);
    }

    public openRegister() {
        // this.router.navigate(["register"]);
    }

    public commander() {
        // this.modalService.showModal(ModalViewComponent, )
        //     .then((dateresult: Date) => {
        //         console.log("date result " + dateresult);
        //     });

        // this.apiService.sendCommande(this.commande.name, this.commande.lieu, 0, 0, this.commande.nombre).subscribe(
        //     data => {
        //         alert("commande envoyée avec succès");
        //         this.commande.nombre = 0;
        //     },
        //     err => {
        //         console.log(err);
        //         alert("impossible d'envoyer la commande, si le problème persiste, merci de contacter le service technique");
        //     }

        // );
    }


    public plusVite() {
        this.showDate = !this.showDate;
    }

    configureD(datePicker: DatePicker) {
        var dateNow = new Date();
        datePicker.year = dateNow.getFullYear();
        datePicker.month = dateNow.getMonth();
        datePicker.day = dateNow.getDay();
        datePicker.minDate = dateNow;
        datePicker.maxDate = new Date(2017, 3, 5);
        this.timeD = datePicker;

    }
    configureT(timePicker: TimePicker) {
        var dateNow = new Date();
        timePicker.hour = dateNow.getHours();
        timePicker.minute = dateNow.getMinutes();
        timePicker.minHour = dateNow.getHours();
        timePicker.minMinute = dateNow.getMinutes();
        this.timeH = timePicker;
    }

    createModelView(args) {
        let that = this;
        let currentDate = new Date();
        // let options: ModalDialogOptions = {
        //     viewContainerRef: this.vcRef,
        //     context: currentDate.toDateString(),
        //     fullscreen: false
        // };
        // if (args == "date") {
        //     this._modalService.showModal(ModalViewComponent, options)
        //         .then((dateresult: Date) => {
        //             console.log("date result " + dateresult);

        //         });
        // } else {
        //     this._modalService.showModal(ModalTimeViewComponent, options)
        //         .then((dateresult: Date) => {
        //             console.log("date result " + dateresult);

        //         });
        // }

    }

    // public onOpenDrawerTap() {
    //     // console.log("ici");
    //     let sideDrawer: drawerModule.RadSideDrawer = <drawerModule.RadSideDrawer>(frame.topmost().getViewById("sideDrawer"));
        
    //     sideDrawer.toggleDrawerState();
    // }

    public onCloseDrawerTap() {
        let sideDrawer: drawerModule.RadSideDrawer = <drawerModule.RadSideDrawer>(frame.topmost().getViewById("sideDrawer"));
        sideDrawer.closeDrawer();
    }
}