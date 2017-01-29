// import { Injectable } from "@angular/core";
// import { Http, Headers, Response } from "@angular/http";
// import { Observable } from "rxjs/Rx";
// import "rxjs/add/operator/do";
// import "rxjs/add/operator/map";


// @Injectable()
// export class ApiService {
//     static get parameters() {
//         return [[Http]];
//     }

//     public url:string;
//     constructor(private http: Http) {//public http: Http
//         this.url = "http://listebde.ddns.net/api/";

//     }

//     loginUser(email, password) {
//         let headers = new Headers();
//         headers.append("Content-Type", "application/json");
//         return this.http.post(this.url + "login", { "email": email, "password": password },{ headers: headers })//, options)
//             .map(data => data.json())
//             .catch(this.handleErrors);

//     }

//     registerUser(email, password, password_confirm, name, chambre) {

//         return this.http.post(this.url + "register", { "email": email, "password": password, "password_confirmation": password_confirm, "name": name, "chambre": chambre })//, options)
//             .map(data => data.json());

//     }

//     getUserInfo(token) {
//         var response = this.http.get(this.url + 'getUserInfo?token=' + token).map(res => res.json());
//         return response;
//     }

//     postPushToken(token, push_token) {
//         return this.http.post(this.url + 'postPushToken?token=' + token, { "push_token": push_token }).map(res => res.json());

//     }

//     sendCommande(name, lieu, heure, jour, nombre) {
//         heure = "2016-12-12 12:12:12";
//         jour = "2016-12-12 12:12:12";
//         return this.http.post(this.url + 'postCommande', { name, lieu, heure, jour, nombre }).map(res => res.json());
//     }

//     getInfo() {
//         var response = this.http.get(this.url + 'getInfo').map(res => res.json());
//         return response;

//     }
//     handleErrors(error: Response) {
//         console.log(JSON.stringify(error.json()));
//         return Observable.throw(error);
//     }
// }