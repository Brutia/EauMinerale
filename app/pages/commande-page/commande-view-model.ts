import { Commande } from "../../shared/commande/commande";
import * as appSettings from "application-settings";
import ApiService from '../../shared/api_service/ApiService';
import { User } from "../../shared/user/user";
import { Info } from "./info";
// import { ModalViewComponent } from "../modal/modal-view";
// import { ModalTimeViewComponent } from "../modal-hour/modal-view";
import frame = require('ui/frame');
import drawerModule = require("nativescript-telerik-ui/sidedrawer");
import pageModule = require("nativescript-telerik-ui/sidedrawer/drawerpage");
import { Observable } from 'data/observable';
import { ObservableArray } from 'data/observable-array';
var pushPlugin = require("nativescript-push-notifications");
import * as TimeDatePicker from 'nativescript-timedatepicker';


export class CommandeViewModel extends Observable {

    user: User;
    private isLogged: boolean;
    private showDate: boolean;
    private token: string;
    private _timeD;
    private _timeH;
    private _isLoading;
    private apiService;
    private _listeInfo;
    private _checkProp;
    private _name;
    private _lieu;
    private _nombre;

    constructor() {
        super();
        this._isLoading = true;
        this._checkProp = true;
        this._name="";
        this._lieu="";
        this.apiService = new ApiService();

        this._timeD = this.dateConverter(new Date(), "DD/MM");
        this._timeH = this.dateConverter(new Date(), "HH:MM");
        this._listeInfo = new ObservableArray();
        this.apiService.getInfo().then(
            (data) => {
                for (let i in data) {

                    this._listeInfo.push({ title: data[i].title, message: data[i].message });
                }
                this._isLoading = false;
                this.set("isLoading", false);

                this.notifyPropertyChange("isLoading", this.isLoading);

            },
            (e) => {
                alert("impossible de récupérer les infos de la liste");
            }


        );

    }

    public openLogin() {
        frame.topmost().navigate({ moduleName: './pages/login/login-page' })
    }

    public openRegister() {
        // this.router.navigate(["register"]);
        // this.set("name","kfjdsqm");
        // this.set("isLoading", false);

    }

    get listeInfo(): any {
        return this._listeInfo;
    }

    get isLoading(): any {
        return this._isLoading;
    }

    set isLoading(value) {
        this._isLoading = value;
        super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "isLoading", value: value });
    }

    get checkProp(): any {
        return this._checkProp;

    }

    get timeD(): any {
        return this._timeD;
    }

    set timeD(value) {
        this._timeD = value;
        super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "timeD", value: value });
    }

    get timeH(): any {
        return this._timeH;
    }

    set timeH(value) {
        this._timeH = value;
        super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "timeH", value: value });
    }

    set checkProp(value) {
        this._checkProp = value;
        super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "checkProp", value: value });
    }


    get name():any{
        return this._name;
    }

    set name(value){
        this._name = value;
        super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "name", value: value });
    
    }

    get lieu():any{
        return this._lieu;
    }

    set lieu(value){
        this._lieu = value;
        super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "lieu", value: value });
    
    }

    get nombre():any{
        return this._nombre;
    }

    set nombre(value){
        this._nombre = value;
        super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "nombre", value: value });
    }

    public commander() {
        this.apiService.sendCommande(this._name, this._lieu, this._timeH, this._timeD, this._nombre).then(
            function (data) {
                
                alert("commande envoyée avec succès");
                this._nombre = 0;
            }, function (err) {
                console.log(err);
                alert("impossible d'envoyer la commande, si le problème persiste, merci de contacter le service technique");
            }

        );
    }


    public plusVite() {
        this.showDate = !this.showDate;
    }



    public openDate() {
        let mCallback = ((result) => {
            if (result) {
                this._timeD = this.dateConverter(new Date(result), "DD/MM");
                this.notifyPropertyChange("timeD", this.timeD);
            }
        });

        var minDate = new Date();
        TimeDatePicker.setMinDate(minDate);

        var maxDate = new Date(2017, 3, 1, 12, 0, 0, 0);
        TimeDatePicker.setMaxDate(maxDate);
        TimeDatePicker.init(mCallback, null, null);

        //Show the dialog
        TimeDatePicker.showDatePickerDialog();
    }

    public openTime() {
        let mCallback = ((result) => {
            if (result) {
                
                this._timeH = result.substring(11,16);
                this.notifyPropertyChange("timeH", this.timeH);

            }
        });

        
 
        TimeDatePicker.init(mCallback, null, null);

        //Show the dialog
        TimeDatePicker.showTimePickerDialog();
    }

    dateConverter(value, format) {
        var result = format;
        if (format == "DD/MM") {
            var day = value.getDate();
            result = result.replace("DD", day < 10 ? "0" + day : day);
            var month = value.getMonth() + 1;
            result = result.replace("MM", month < 10 ? "0" + month : month);
        } else {
            var hour = value.getHours();
            result = result.replace("HH", hour < 10 ? "0" + hour : hour);
            var minute = value.getMinutes() + 1;
            result = result.replace("MM", minute < 10 ? "0" + minute : minute);
        }
        return result;
    };

    

}