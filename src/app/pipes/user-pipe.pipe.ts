import {Pipe, PipeTransform} from '@angular/core';
import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;
import {User} from "../models/user";

@Pipe({
  name: 'userPipe'
})
export class UserPipePipe implements PipeTransform {
  transform(userProp: any): unknown {
    if (Object.getPrototypeOf(userProp) === Timestamp.prototype) {
      userProp = userProp.toDate().toLocaleDateString();
    }
    return userProp;
  }
}
