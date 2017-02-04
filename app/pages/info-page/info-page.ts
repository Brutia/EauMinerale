import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { InfoViewModel } from "./info-view-model";

let page;

export function loaded(args) {
    page = <Page>args.object;
    var gotData=page.navigationContext;
    
    page.bindingContext = new InfoViewModel(gotData.title, gotData.message);

    
};
