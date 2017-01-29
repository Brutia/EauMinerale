
import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { CommandeViewModel } from "./commande-view-model";


let page;
let drawer;
export function navigateTo(args: EventData) {

    console.log("fonction navigateTo");

    page = <Page>args.object;
    page.bindingContext = new CommandeViewModel();
    drawer = page.getViewById("drawer");
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