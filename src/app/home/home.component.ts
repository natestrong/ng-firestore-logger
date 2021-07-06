import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div fxLayout="column" fxLayoutGap="40px">
      <app-actions></app-actions>
      <app-users></app-users>
    </div>
  `,
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
}
