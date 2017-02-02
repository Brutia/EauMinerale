/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/
import frame = require('ui/frame');
import * as app from 'application';
import dialogs = require("ui/dialogs");
// setStatusBarColors();
app.on(app.launchEvent, function (args) {
    if (args.android) {
        var pushPlugin = require("nativescript-push-notifications");
        // pushPlugin.register({ senderID: '205172146080' }, function (token) {
        //     console.log("push_token :", token);
        // }, function () { });

        // pushPlugin.onMessageReceived(function callback(message, data, notification) {
        //     alert("Message reçu");
        //     console.log(message);
        //     console.log(data.message);
        //     console.log(notification);
        //     frame.topmost().navigate({ moduleName: './pages/info-page/info-page' })
        // });  
        var settings = {
            // Android settings
            senderID: '205172146080', // Android: Required setting with the sender/project number
            iOS: {
                badge: true,
                sound: true,
                alert: true
            },
            notificationCallbackIOS: function (userInfo) {
                //Show a dialog with the push notification
                dialogs.alert({
                    title: "Push Notification",
                    message: JSON.stringify(userInfo.alert),
                    okButtonText: "OK"
                }).then(function () {
                    console.log("Dialog closed!");
                });
            },

            notificationCallbackAndroid: function callback(message, data, notification) {
                //Show a dialog with the push notification
                //Remove undeeded quotes
                
                data = JSON.parse(data);
                dialogs.alert({
                    title: data.title,
                    message: data.message,
                    okButtonText: "OK"
                }).then(function () {
                    console.log("Dialog closed!");
                });
            }
        };



        pushPlugin.register(settings,
            // Success callback
            function (token) {

                // if we're on android device we have the onMessageReceived function to subscribe
                // for push notifications
                if (pushPlugin.onMessageReceived) {
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

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
