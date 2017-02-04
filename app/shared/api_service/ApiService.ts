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
        return http.request({
            url: this.url + 'getUserInfo?token=' + token,
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
    }

    postPushToken(token, push_token) {
        return http.request({
            url: this.url + "postPushToken?token=" + token,
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ push_token: push_token })
        })

    }

    sendCommande(name, lieu, heure, jour, nombre, nrFilRouge) {
        return http.request({
            url: this.url + "postCommande",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ name:name, lieu:lieu, heure:heure, jour:jour, nombre:nombre, nr_fil_rouge:nrFilRouge})
        });
    }

    getInfo() {
        return http.getJSON(this.url + 'getInfo');
    }

    getFilRouge() {
        return http.getJSON(this.url + 'getFilRouges');
    }


}