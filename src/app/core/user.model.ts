export class FirebaseUserModel {
    name: string;
    email: string;
    provider: string;
  
    constructor(){
      this.name = "";
      this.email = "";
      this.provider = "";
    }
  }