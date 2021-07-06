import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DbService} from "../../db-service/db.service";
import {TwitterDialogData, User} from "../../models/user";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {TwitterFollowerDialog} from "./twitter-follower-dialog/twitter-follower-dialog";

@Component({
  selector: 'app-users',
  template: `
    <table>
      <tr>
        <th *ngFor="let column of tableColumns">{{column.header}}</th>
        <th>Twitter Followers</th>
      </tr>

      <tr *ngFor="let user of users$ | async">
        <td *ngFor="let column of tableColumns">{{user[column.property] | userPipe}}</td>
        <td>
          <button mat-icon-button (click)="onOpenTwitterFollowers(user)">
            <mat-icon>menu</mat-icon>
          </button>
        </td>
      </tr>

    </table>
  `,
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
  users$: Observable<User[]>;
  tableColumns: { property: keyof User, header: string }[] = [
    // {property: 'id', header: 'id'},
    {property: 'first', header: 'Fist'},
    {property: 'last', header: 'Last'},
    {property: 'birthday', header: 'Birthdate'},
    {property: 'profession', header: 'Profession'},
    {property: 'favoriteAnimal', header: 'Favorite Animal'},
  ];


  constructor(
    public db: DbService,
    public dialog: MatDialog,
  ) {
    this.users$ = this.db.users$;

  }

  onOpenTwitterFollowers(user: User) {
    const data: TwitterDialogData = {
      twitterFollowers$: this.db.getTwitterFollowers$(user.id),
      name: `${user.first} ${user.last}`
    };
    this.dialog.open(TwitterFollowerDialog, {data});
  }
}
