import observableModule = require("data/observable");

import frame = require("ui/frame");
import ApiService from '../../shared/api_service/ApiService';
var applicationSettings = require("application-settings");

export class LoginViewModel extends observableModule.Observable {
    private email: string;
    private password: string;
    private apiService;
    constructor() {
        super();
        this.apiService = new ApiService();
    }
    login() {
        console.log("login");
        this.apiService.loginUser(this.email, this.password).then(
            function (response) {
                if (response.statusCode != 200) {
                    alert("Email ou mot de passe incorrect");
                } else {

                    applicationSettings.setString("token", response.content.toJSON().token);
                    frame.topmost().navigate({ moduleName: './pages/commande-page/commande-page' ,
                        context: { info: response.content.toJSON().token }
                });
                }




            }, function (e) {
                alert("Une erreur s'est produite");
            });
    }

    // register(){
    //     frame.topmost().navigate("")
    // }


}

