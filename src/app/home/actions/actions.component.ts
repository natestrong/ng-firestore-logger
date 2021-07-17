import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {DbService} from "../../db-service/db.service";

type Action = 'Create' | 'Update' | 'Delete';

@Component({
  selector: 'app-actions',
  template: `
    <div fxLayout="column"
         fxLayoutGap="20px"
         class="action-container">
      <mat-card>
        <mat-card-title fxLayout='row' fxLayoutAlign='space-between'>
            <span>Users</span>
            <button mat-raised-button color='accent' (click)='onTurnOnBatchMode()'>Turn on Batch Mode</button>
        </mat-card-title>
          
        <mat-card-content>
          <div *ngFor="let action of actions; let i = index">
            <div fxLayoutGap="10px"
                 fxLayoutAlign="start center"
                 class="button-row">
              <span>{{action}}:</span>
              <button *ngFor="let amount of increments"
                      mat-raised-button color="primary"
                      (click)="onAction(action, amount)">
                {{amount}}
              </button>
            </div>
            <mat-divider *ngIf="i !== 2"></mat-divider>

          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ['./actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionsComponent {
  actions: Action[] = ['Create', 'Update', 'Delete'];
  increments: number[] = [1, 10, 100, 500];

  constructor(
    private db: DbService
  ) {
  }

  onAction(action: Action, amount: number) {
    switch (action) {
      case "Create":
        this.db.createRandomUsers(amount);
        break;
      case "Update":
        this.db.updateRandomUsers(amount);
        break;
      case "Delete":
        this.db.deleteUsers(amount);
        break;
    }
  }

    onTurnOnBatchMode() {
        this.db.batchMode = true;
    }
}
