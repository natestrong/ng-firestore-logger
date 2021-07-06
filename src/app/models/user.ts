import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;
import {Observable} from "rxjs";

export interface User {
  id: string,
  first: string,
  last: string,
  birthday: Date | Timestamp,
  profession: string,
  favoriteAnimal: string,
}

export interface TwitterUser {
  id: string,
  handle: string,
  name: string,
}

export interface TwitterDialogData {
  twitterFollowers$: Observable<TwitterUser[]>,
  name: string,
}
