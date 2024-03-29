import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentData, DocumentReference} from "@angular/fire/firestore";
import * as Chance from 'chance';
import {Observable} from "rxjs";
import {TwitterUser, User} from "../models/user";
import {first} from "rxjs/operators";
import firebase from "firebase";
import * as _ from "lodash";
import {Memoize} from "../utils";
import WriteBatch = firebase.firestore.WriteBatch;

@Injectable({
  providedIn: 'root'
})
export class DbService {
  public batchMode: boolean = false;
  public batches: WriteBatch[] = [];

  private chance: Chance.Chance;

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

  @Memoize()
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

    await this.processBatches([batch]);      // todo - Should not commit batches here.  Should commit in the processBatch method
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

    const batches = _.chunk(newTwitterUsers, 500)
      .map(twitterUserBatch => {
        const tUBatch = this.store.firestore.batch();
        twitterUserBatch.forEach(tu => tUBatch.set(tu.docRef, tu.twitterFollower));
        return tUBatch;
      });

    await this.processBatches(batches);

    console.log(`Batch created ${newTwitterUsers.length} Twitter Followers`);
  }

  private generateTwitterFollowers(): TwitterUser[] {
    const users: TwitterUser[] = [];
    const randomFollowerAmount = Math.min(Math.floor(Math.random() * 200), Math.floor(Math.random() * 200));
    for (let i = 0; i < randomFollowerAmount; i++) {
      users.push({
        id: this.store.createId(),
        handle: this.chance.twitter(),
        name: this.chance.name()
      });
    }
    return users;
  }

  async updateRandomUsers(amount: number) {
    const users = await this.users$.pipe(first()).toPromise();
    const randomUsers = this.chance.pickset(users, amount);
    const batch = this.store.firestore.batch();
    const usersRef = this.store.firestore.collection('users');
    randomUsers.forEach(user => {
      const userRef = usersRef.doc(user.id);
      batch.update(userRef, {profession: this.chance.profession()});
      if (this.chance.bool()) {
        batch.update(userRef, {favoriteAnimal: this.chance.animal()});
      }
    });

    await this.processBatches([batch]);
    console.log(`Batch updated ${amount} user(s)`);
  }

  async deleteUsers(amount: number) {
    const batch = this.store.firestore.batch();
    const usersRef = this.store.firestore.collection('users');

    const users = await this.users$.pipe(first()).toPromise();
    const usersToDelete = users.slice(-amount);
    usersToDelete.forEach(user => batch.delete(usersRef.doc(user.id)));

    await this.processBatches([batch]);
    console.log(`Batch deleted ${amount} user(s)`);
  }

  private async processBatches(batches: WriteBatch[]) {
    if (this.batchMode) {
      this.batches = this.batches.concat(batches);
      return;
    }

    try {
      await Promise.all([...batches, ...this.batches].map(batch => batch.commit()));
      this.batches = [];
    } catch (e) {
      console.warn(e);
    }
  }

  completeBatchMode() {
    this.batchMode = false;
    this.processBatches([]);
  }
}
