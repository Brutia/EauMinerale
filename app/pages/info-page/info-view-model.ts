
import { Observable } from 'data/observable';
export class InfoViewModel extends Observable{
    private _title;
    private _message;

    constructor(title, message){
        super();
        this._title = title;
        this._message = message;

    }

    get message():any{
        return this._message;

    }

    get title():any{
        return this._title;
    }


}