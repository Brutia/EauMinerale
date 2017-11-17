import * as appSettings from "application-settings";
import ApiService from '../../shared/api_service/ApiService';
import { User } from "../../shared/user/user";
import frame = require('ui/frame');
import drawerModule = require("nativescript-telerik-ui/sidedrawer");
import pageModule = require("nativescript-telerik-ui/sidedrawer/drawerpage");
import { Observable } from 'data/observable';
import { ObservableArray } from 'data/observable-array';
var pushPlugin = require("nativescript-push-notifications");
import * as TimeDatePicker from 'nativescript-timedatepicker';
import dialogs = require("ui/dialogs");


export class CommandeViewModel extends Observable {

    user: User;
    private _isLogged: boolean;
    private showDate: boolean;
    private _timeD;
    private _timeH;
    private _isLoading;
    private apiService;
    private _listeInfo;
    private _checkProp;
    private _name;
    private _lieu;
    private _nombre;
    private _items;
    private _selectedIndex;
    private _token;
    private _helloText;
    private _mesCommandes;
    private _isAdmin;
    private _commentaire;

    constructor(token = "") {
        super();
        this._isLoading = true;
        this._checkProp = true;
        this._name = "";
        this._lieu = "";
        this._commentaire ="";
        this._isAdmin = false;

        this._isLogged = false;

        this.apiService = new ApiService();

        this._timeD = this.dateConverter(new Date(), "DD/MM");
        this._timeH = this.dateConverter(new Date(), "HH:MM");
        this._listeInfo = new ObservableArray();
        this._items = new ObservableArray();
        this._mesCommandes = new ObservableArray();

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

        this.apiService.getFilRouge().then(


            (data) => {
                data = data.fil_rouges;
                for (let i in data) {
                    this._items.push(data[i].nom);
                }
                this._selectedIndex = 0;
                super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "selectedIndex", value: this._selectedIndex });
            },
            (e) => {
                alert("une erreur est survenue");
            }
        );


        if ((this._token = token) != "" || (this._token = appSettings.getString("token", "")) != "") {
            this.apiService.getUserInfo(this._token).then(
                (data) => {
                    if (data.statusCode != 200) {
                        alert("Merci de vous reconnecter");
                    } else {
                        this._isAdmin = data.content.toJSON().isAdmin;
                        var user = data.content.toJSON().user;
                        this._lieu = user.chambre;
                        this._name = user.name;
                        this._isLogged = true;
                        this._helloText = "Bonjour, " + user.name;

                        super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "lieu", value: user.chambre });
                        super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "name", value: user.name });
                        super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "isLogged", value: true });
                        super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "helloText", value: this._helloText });

                    }
                },
                (e) => {
                    alert("une erreur est survenue");
                }
            )


        }

        this.apiService.getCommandes(appSettings.getString("push_token")).then(
            (data) => {
                for (let i in data) {
                    this._mesCommandes.push({ "id": data[i].id, "commande": "Commande de " + data[i].number + " " + data[i].nom, "nomLieu": "pour " + data[i].name + " lieu: " + data[i].lieu, "commentaire": "Commentaire: " + data[i].commentaire });
                }
            }, (e) => {
                alert("Impossible de récupérer tes commandes");
            }

        );


    }

    public openLogin() {
        frame.topmost().navigate({ moduleName: './pages/login/login-page' });
    }

    public openRegister() {

        frame.topmost().navigate({ moduleName: './pages/register/register-page' });

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

    get mesCommandes(): any {
        return this._mesCommandes;
    }

    get timeD(): any {
        return this._timeD;
    }

    set timeD(value) {
        this._timeD = value;
        super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "timeD", value: value });
    }

    get commentaire(): any {
        return this._commentaire;
    }

    set commentaire(value) {
        this._commentaire = value;
        super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "_commentaire", value: value });
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


    get name(): any {
        return this._name;
    }

    get helloText(): any {
        return this._helloText;
    }

    set name(value) {
        this._name = value;
        super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "name", value: value });

    }

    get lieu(): any {
        return this._lieu;
    }

    get items(): any {
        return this._items;
    }

    set lieu(value) {
        this._lieu = value;
        super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "lieu", value: value });

    }

    set token(value) {
        this._token = value;
        super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "token", value: value });

    }

    get nombre(): any {
        return this._nombre;
    }

    get isLogged(): any {
        return this._isLogged;
    }

    set isLogged(value) {
        this._isLogged = value;
        super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "isLogged", value: value });
    }

    set nombre(value) {
        this._nombre = value;
        super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "nombre", value: value });
    }

    get selectedIndex() {
        return this._selectedIndex;
    }

    set selectedIndex(value) {
        this._selectedIndex = value;
        super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "selectedIndex", value: value });
    }



    public commander() {

        if (this._checkProp) {

            this._timeD = this.dateConverter(new Date(), "DD/MM");
            this._timeH = this.dateConverter(new Date(), "HH:MM");
        }
        if (this._name == "" || this._lieu == "" || this._nombre == 0 || this._nombre == undefined || this._name == undefined || this._lieu == undefined) {
            alert("merci de remplir tout les champs")
        } else {

            this.apiService.sendCommande(this._name, this._lieu, this._timeH, this._timeD, this._nombre, this._selectedIndex, appSettings.getString("push_token"), this._commentaire).then(
                (data) => {
                    if (data.statusCode == 200) {
                        alert("commande envoyée avec succès");
                        this._nombre = 0;
                        this._commentaire = "";
                        super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "nombre", value: this._nombre });
                        super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "commentaire", value: this._commentaire });

                    } else if (data.statusCode == 440) {
                        alert("ce fil rouge n'est plus disponible");
                    } else {
                        console.log(data.statusCode);
                        alert("impossible d'envoyer la commande, si le problème persiste, merci de contacter le service technique");
                    }

                    this.apiService.getFilRouge().then(
                        (data) => {
                            data = data.fil_rouges;
                            this._items = new ObservableArray();
                            for (let i in data) {
                                this._items.push(data[i].nom);
                            }
                            this._selectedIndex = 0;
                            super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "selectedIndex", value: this._selectedIndex });
                            super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "items", value: this._items });
                        },
                        (e) => {
                            alert("une erreur est survenue");
                        }
                    );

                },
                (e) => {
                    console.log(e);
                    alert("impossible d'envoyer la commande, si le problème persiste, merci de contacter le service technique");
                }

            );
        }
    }
    public openDate() {
        let mCallback = ((result) => {
            if (result) {
                this._timeD = "";
                this._timeD = result.substring(0, 2) + "/" + result.substring(3, 5);

                super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "timeD", value: this._timeD });
            }
        });

        var minDate = new Date();
        TimeDatePicker.setMinDate(minDate);

        var maxDate = new Date(2017, 4, 1, 0, 0, 0, 0);

        TimeDatePicker.setMaxDate(maxDate);
        TimeDatePicker.init(mCallback, null, null);

        //Show the dialog
        TimeDatePicker.showDatePickerDialog();
    }

    public openTime() {
        let mCallback = ((result) => {
            if (result) {

                this._timeH = result.substring(11, 16);
                super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "timeH", value: this._timeH });
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

    public refreshList(args) {
        var pullRefresh = args.object;
        this.selectedIndex = 0;
        this.apiService.getInfo().then(
            (data) => {
                this._listeInfo = new ObservableArray();
                for (let i in data) {
                    this._listeInfo.push({ title: data[i].title, message: data[i].message });
                }
                pullRefresh.refreshing = false;
                super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "listeInfo", value: this._listeInfo });
            },
            (e) => {
                pullRefresh.refreshing = false;
                alert("impossible de récupérer les infos de la liste");
            }
        );
    }

    public refreshCommandes(args) {
        var pullRefresh = args.object;
        this.apiService.getCommandes(appSettings.getString("push_token")).then(
            (data) => {
                this._mesCommandes = new ObservableArray();
                for (let i in data) {

                    // this._mesCommandes.push({ "id": data[i].id, "commande": "Commande de " + data[i].number + " " + data[i].nom });
                    this._mesCommandes.push({ "id": data[i].id, "commande": "Commande de " + data[i].number + " " + data[i].nom, "nomLieu": "pour " + data[i].name + " lieu: " + data[i].lieu, "commentaire": "Commentaire: " + data[i].commentaire });
                }
                pullRefresh.refreshing = false;
                super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "mesCommandes", value: this._mesCommandes });
            },
            (e) => {
                pullRefresh.refreshing = false;
                alert("impossible de récupérer vos commandes");
            }
        );
    }

    public commandeTap(args) {
        var itemIndex = args.index;
        if (this._isAdmin) {
            dialogs.confirm({
                title: "Voulez-vous prendre la commande?",
                okButtonText: "OK",
                cancelButtonText: "Annuler",

            }).then((result) => {
                if (result) {
                    this.apiService.takeCommande(this._token, this._mesCommandes.getItem(itemIndex).id).then(
                        (data) => {
                            if (data.statusCode == 200) {
                                alert("Commande prise avec succès");
                                this._mesCommandes = new ObservableArray();
                                this.apiService.getCommandes(appSettings.getString("push_token")).then(
                                    (data) => {
                                        for (let i in data) {

                                            // this._mesCommandes.push({ "id": data[i].id, "commande": "Commande de " + data[i].number + " " + data[i].nom });
                                            this._mesCommandes.push({ "id": data[i].id, "commande": "Commande de " + data[i].number + " " + data[i].nom, "nomLieu": "pour " + data[i].name + " lieu: " + data[i].lieu, "commentaire": "Commentaire: " + data[i].commentaire });
                                        }
                                        super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "mesCommandes", value: this._mesCommandes });
                                    }, (e) => {
                                        alert("une erreur est survenue");
                                    });
                            } else {
                                alert("une erreur s'est produite");
                            }
                        }, (e) => {
                            alert("Une erreur s'est produite");
                        });
                }
            });
        }
    }

    public logout() {
        this.isLogged = false;
        this.token = "";
        appSettings.setString("token", "");
        this.name = "";
        this.lieu = "";
        this._isAdmin = false;
        this.apiService.disconnect(appSettings.getString("push_token"));
        this.apiService.getCommandes(appSettings.getString("push_token")).then(
            (data) => {
                for (let i in data) {

                    // this._mesCommandes.push({ "id": data[i].id, "commande": "Commande de " + data[i].number + " " + data[i].nom });
                    this._mesCommandes.push({ "id": data[i].id, "commande": "Commande de " + data[i].number + " " + data[i].nom, "nomLieu": "pour " + data[i].name + " lieu: " + data[i].lieu, "commentaire": "Commentaire: " + data[i].commentaire });
                }
                super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "mesCommandes", value: this._mesCommandes });
            }, (e) => {
                alert("une erreur est survenue");
            });
        alert("déconnexion réussie");

    }

    public openInfo(args) {
        var itemIndex = args.index;
        frame.topmost().navigate({
            moduleName: "./pages/info-page/info-page",
            context: { title: this._listeInfo.getItem(itemIndex).title, message: this._listeInfo.getItem(itemIndex).message }
        });
    }



}