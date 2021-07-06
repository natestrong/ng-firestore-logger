import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TwitterDialogData} from "../../../models/user";

@Component({
  selector: 'app-twitter-follower-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div mat-dialog-content>
          <h1 mat-dialog-title>Twitter Followers for: {{data.name}}</h1>

      <table class="table-headers">
        <tr>
          <th>Handle</th>
          <th>Name</th>
        </tr>
      </table>
      <table>
        <tr *ngFor="let twitterUser of data.twitterFollowers$ | async">
          <td>{{twitterUser.handle}}</td>
          <td>{{twitterUser.name}}</td>
        </tr>
      </table>
    </div>
  `,
  styleUrls: ['./twitter-follower-dialog.scss']
})
export class TwitterFollowerDialog {

  constructor(
    public dialogRef: MatDialogRef<TwitterFollowerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: TwitterDialogData
  ) {
  }
}
