import {Component} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <mat-icon>local_fire_department</mat-icon>
      <span>My Super App</span>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(
    private store: AngularFirestore
  ) {
  }
}
