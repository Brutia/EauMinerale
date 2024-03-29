let validator = require("email-validator");

export class User {
  email: string;
  password: string;
  chambre: string;
  name: string;
  isValidEmail() {
    return validator.validate(this.email);
  }
}