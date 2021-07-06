import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentData, DocumentReference} from "@angular/fire/firestore";
import * as Chance from 'chance';
import {Observable} from "rxjs";
import {TwitterUser, User} from "../models/user";
import {first} from "rxjs/operators";
import firebase from "firebase";
import CollectionReference = firebase.firestore.CollectionReference;
import * as _ from "lodash";

@Injectable({
  providedIn: 'root'
})
export class DbService {
  chance;

  constructor(
    private store: AngularFirestore
  ) {
    this.chance = new Chance();
  }

  get users$(): Observable<User[]> {
    return this.store
      .collection('users')
      .valueChanges() as Observable<User[]>;
  }

  getTwitterFollowers$(id: string): Observable<TwitterUser[]> {
    return this.store
      .collection('users')
      .doc(id)
      .collection('twitterFollowers')
      .valueChanges() as Observable<TwitterUser[]>;
  }

  async createRandomUsers(amount: number) {
    let batch = this.store.firestore.batch();
    const usersRef = this.store.firestore.collection('users');

    const newUsers = Array(amount).fill(null).map(() => ({
      id: this.store.createId(),
      first: this.chance.first(),
      last: this.chance.last(),
      birthday: this.chance.birthday(),
      profession: this.chance.profession(),
      favoriteAnimal: this.chance.animal(),
    }));

    newUsers.forEach(user => batch.set(usersRef.doc(user.id), user));

    try {
      await batch.commit();
    } catch (e) {
      console.warn(e);
    }
    console.log(`Batch created ${amount} user(s)`);


    const newTwitterUsers: { docRef: DocumentReference<DocumentData>, twitterFollower: TwitterUser }[] = [];
    newUsers.forEach(user => {
      const collectionRef = usersRef.doc(user.id).collection('twitterFollowers');
      const twitterFollowers = this.generateTwitterFollowers();
      twitterFollowers.forEach(tf => {
        const docRef = collectionRef.doc(tf.id);
        newTwitterUsers.push({docRef, twitterFollower: tf});
      });
    });

    const batches = _.chunk(newTwitterUsers, 500).map(twitterUserBatch => {
      const tUBatch = this.store.firestore.batch();
      twitterUserBatch.forEach(tu => tUBatch.set(tu.docRef, tu.twitterFollower));
      return tUBatch.commit();
    });

    try {
      await Promise.all(batches);
    } catch (e) {
      console.warn(e);
    }

    console.log(`Batch created ${newTwitterUsers.length} Twitter Followers`);
  }

  private generateTwitterFollowers(): TwitterUser[] {
    const users: TwitterUser[] = [];
    const randomFollowerAmount = Math.floor(Math.random() * 200);
    for (let i = 0; i < randomFollowerAmount; i++) {
      users.push({
        id: this.store.createId(),
        handle: this.chance.twitter(),
        name: this.chance.name()
      });
    }
    return users;
  }

  updateRandomUsers(amount: number) {
    //
  }

  async deleteUsers(amount: number) {
    const batch = this.store.firestore.batch();
    const usersRef = this.store.firestore.collection('users');

    const users = await this.users$.pipe(first()).toPromise();
    const usersToDelete = users.slice(-amount);
    usersToDelete.forEach(user => batch.delete(usersRef.doc(user.id)));
    batch.commit()
      .then(() => console.log(`Batch deleted ${amount} user(s)`))
      .catch(console.warn);
  }
}
