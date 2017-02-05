import observableModule = require("data/observable");

import frame = require("ui/frame");
import ApiService from '../../shared/api_service/ApiService';
var applicationSettings = require("application-settings");

export class RegisterViewModel extends observableModule.Observable {
    private name: string;
    private email: string;
    private password: string;
    private password_confirm;
    private chambre;
    private apiService;
    constructor() {
        super();
        this.apiService = new ApiService();
    }
    register() {
        var push_token = applicationSettings.getString("push_token", "");
        var token = "";
        this.apiService.registerUser(this.email, this.password, this.password_confirm, this.name, this.chambre).then( //registerUser(email, password, password_confirm, name, chambre)
            (response) => {
                console.log(response.statusCode);
                if (response.statusCode != 200) {
                    alert("Le compte existe déjà!");
                } else {
                    token = response.content.toJSON().token;
                    applicationSettings.setString("token", token);
                    this.apiService.postPushToken(token, push_token).then(
                        (data) => {
                            console.log(data.statusCode);
                            alert("compte créé avec succès");
                            frame.topmost().navigate({
                                moduleName: './pages/commande-page/commande-page',
                                context: { token: response.content.toJSON().token }
                            });
                        }, (e) => {
                            alert("Une erreur est survenue");
                        }
                    );


                }
            }, (e) => {
                alert("Une erreur s'est produite");
            });
    }


}

