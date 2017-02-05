/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/
import frame = require('ui/frame');
import * as app from 'application';
import dialogs = require("ui/dialogs");
import ApiService from './shared/api_service/ApiService';
import * as appSettings from "application-settings";
// setStatusBarColors();
app.on(app.launchEvent, function (args) {
    if (args.android) {
        var pushPlugin = require("nativescript-push-notifications");
        var settings = {
            // Android settings
            senderID: '205172146080', // Android: Required setting with the sender/project number
            iOS: {
                badge: true,
                sound: true,
                alert: true
            },
            notificationCallbackIOS: function (message) {
                //Show a dialog with the push notification
                console.log( JSON.parse(message));
                // dialogs.alert({
                //     title: data.title,
                //     message: data.message,
                //     okButtonText: "OK"
                // }).then(function () {
                //     frame.topmost().navigate({
                //         moduleName: "./pages/info-page/info-page",
                //         context: { title: data.title, message: data.message }
                //     });
                // });
            },

            notificationCallbackAndroid: function callback(message, data, notification) {
                //Show a dialog with the push notification
                //Remove undeeded quotes
                console.log("notification received");
                data = JSON.parse(data);
                dialogs.alert({
                    title: data.title,
                    message: data.message,
                    okButtonText: "OK"
                }).then(function () {
                    frame.topmost().navigate({
                        moduleName: "./pages/info-page/info-page",
                        context: { title: data.title, message: data.message }
                    });
                });
            }
        };



        pushPlugin.register(settings,
            // Success callback
            function (token) {

                var apiService = new ApiService();
                apiService.postPushToken("", token).then(
                    (data) => {
                    },
                    (e) => {
                        console.log("erreur push_token")
                    });

                appSettings.setString("push_token", token);
                // if we're on android device we have the onMessageReceived function to subscribe
                // for push notifications
                if (pushPlugin.onMessageReceived) {
                    // console.log("notification received");
                    pushPlugin.onMessageReceived(settings.notificationCallbackAndroid);
                }

                console.log(token);
            },
            // Error Callback
            function (error) {
                alert(error.message);
            }
        );
    }
});


app.start({ moduleName: './pages/commande-page/commande-page' });
