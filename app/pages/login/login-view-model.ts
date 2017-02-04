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
        var push_token = applicationSettings.getString("push_token", "");
        var token = "";
        this.apiService.loginUser(this.email, this.password).then(
            function (response) {
                if (response.statusCode != 200) {
                    alert("Email ou mot de passe incorrect");
                } else {
                    token = response.content.toJSON().token;
                    applicationSettings.setString("token", token);
                    this.apiService.postPushToken(this._token, applicationSettings.getString("push_token")).then(
                        (data) => {
                            console.log(data.statusCode);
                            frame.topmost().navigate({
                                moduleName: './pages/commande-page/commande-page',
                                context: { token: response.content.toJSON().token }
                            });
                        }, (e) => {
                            alert("Une erreur est survenue");
                        }
                    );


                }
            }, function (e) {
                alert("Une erreur s'est produite");
            });
    }

    // register(){
    //     frame.topmost().navigate("")
    // }


}

