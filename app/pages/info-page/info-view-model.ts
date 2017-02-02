
import { Observable } from 'data/observable';
export class InfoViewModel extends Observable{
    private _title;
    private _message;

    constructor(message){
        super();
        this._title = "Nouvelle info!";
        this._message = message;
    }


}