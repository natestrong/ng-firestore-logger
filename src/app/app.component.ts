import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <mat-icon>local_fire_department</mat-icon>
      <span>My Super App</span>
    </mat-toolbar>
    <div class="spacer"></div>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
  }
}
