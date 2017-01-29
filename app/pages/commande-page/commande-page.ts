
import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { CommandeViewModel } from "./commande-view-model";
import drawerModule = require("nativescript-telerik-ui/sidedrawer");
import pageModule = require("nativescript-telerik-ui/sidedrawer/drawerpage");
import frame = require('ui/frame');
import view = require("ui/core/view");


let page;
let drawer;
export function navigateTo(args: EventData) {

    console.log("fonction navigateTo");

    page = <Page>args.object;
    page.bindingContext = new CommandeViewModel();
    drawer = page.getViewById("drawer");
    // pageLoaded(args) {
    //     console.log("Page loaded");
    //     var page = args.object;
    //     page.bindingContext = this;
    // }
    // public toggleDrawer() {
    //     this.drawer.toggleDrawerState();
    // }
}
export function loaded(args) {
    page = <Page>args.object;
    page.bindingContext = new CommandeViewModel();
    drawer = page.getViewById("drawer");
};

export function toggleDrawer() {
    console.log("ici");

    drawer.toggleDrawerState();
}