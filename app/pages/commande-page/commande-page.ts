
import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { CommandeViewModel } from "./commande-view-model";
import appModule = require("application");
let page;
let drawer;

export function loaded(args) {
    page = <Page>args.object;

    drawer = page.getViewById("drawer");
    page.bindingContext = new CommandeViewModel();


};

export function toggleDrawer() {

    drawer.toggleDrawerState();
}



