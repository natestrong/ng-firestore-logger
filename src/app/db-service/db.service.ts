import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(
    private store: AngularFirestore
  ) {
  }

  get users$(): Observable<User[]> {
    return this.store
      .collection('users')
      .valueChanges() as Observable<User[]>;
  }
}
