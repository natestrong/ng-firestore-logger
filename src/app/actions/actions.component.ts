import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-actions',
  template: `
    <mat-card>
      <mat-card-title>User Actions</mat-card-title>
      <mat-card-content fxLayout="row" fxLayoutGap="20px">
        <button mat-flat-button color="primary">Primary</button>
        <button mat-flat-button color="primary">Primary</button>
        <button mat-flat-button color="primary">Primary</button>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionsComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
