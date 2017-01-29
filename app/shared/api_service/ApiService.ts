import http = require("http");

export default class ApiService {

    public url: string;
    constructor() {//public http: Http
        this.url = "http://listebde.ddns.net/api/";

    }

    loginUser(email, password) {
        // return http.request(this.url + "login", { "email": email, "password": password },{ headers: headers });//, options)
        return http.request({
            url: this.url + "login",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ email: email, password: password })
        });

    }

    registerUser(email, password, password_confirm, name, chambre) {

        return http.request({
            url: this.url + "register",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ email: email, password: password, password_confirmation: password_confirm, name: name, chambre: chambre })
        });


    }

    getUserInfo(token) {
        return http.getJSON(this.url + 'getUserInfo?token=' + token);
    }

    postPushToken(token, push_token) {
        return http.request({
            url: this.url + "push_token?token=" + token,
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ push_token: push_token })
        })

    }

    sendCommande(name, lieu, heure, jour, nombre) {
        heure = "2016-12-12 12:12:12";
        jour = "2016-12-12 12:12:12";
        return http.request({
            url: this.url + "sendCommande",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ name:name, lieu:lieu, heure:heure, jour:jour, nombre:nombre })
        });
    }

    getInfo() {
        return http.getJSON(this.url + 'getInfo');

    }
}