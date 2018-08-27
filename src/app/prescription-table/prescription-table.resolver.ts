import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { UserService } from '../core/user.service';
import { FirebaseUserModel } from '../core/user.model';

@Injectable()
export class PrescriptionTableResolver implements Resolve<FirebaseUserModel> {

    constructor(public userService: UserService, private router: Router) { }
  
    resolve(route: ActivatedRouteSnapshot) : Promise<FirebaseUserModel> {
  
      let user = new FirebaseUserModel();
  
      return new Promise((resolve, reject) => {
        this.userService.getCurrentUser()
        .then(res => {
          if(res.providerData[0].providerId == 'password'){
            user.name = res.displayName;
            user.email = res.email;
            user.provider = res.providerData[0].providerId;
            //console.log("UserResolver Email:" + user.email);
            return resolve(user);
          }
          else{
            user.name = res.displayName;
            user.email = res.email;
            user.provider = res.providerData[0].providerId;
            //console.log("UserResolver Email:" + user.email);
            return resolve(user);
          }
        }, err => {
          this.router.navigate(['/login']);
          return reject(err);
        })
      })
    }
  }