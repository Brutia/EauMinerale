import { Color } from "color";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";
import { View } from "ui/core/view";

import { User } from "../../shared/user/user";
import { setHintColor } from "../../utils/hint-util";
// import { ApiService } from "../../shared/api_service/ApiService";
import * as appSettings from "application-settings";
import { RegisterViewModel } from "./register-view-model";


export function loaded(args){
  var page = args.object;
  
  page.bindingContext = new RegisterViewModel();
}


