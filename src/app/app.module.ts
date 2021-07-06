import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {ServiceWorkerModule} from '@angular/service-worker';
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatCardModule} from "@angular/material/card";
import {HomeComponent} from './home/home.component';
import {ActionsComponent} from "./home/actions/actions.component";
import {UsersComponent} from "./home/users/users.component";
import {MatDividerModule} from "@angular/material/divider";
import {MatTableModule} from "@angular/material/table";
import {UserPipePipe} from './pipes/user-pipe.pipe';
import {MatChipsModule} from "@angular/material/chips";
import {TwitterFollowerDialog} from "./home/users/twitter-follower-dialog/twitter-follower-dialog";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    ActionsComponent,
    ActionsComponent,
    AppComponent,
    HomeComponent,
    UsersComponent,
    UsersComponent,
    UserPipePipe,
    TwitterFollowerDialog,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatChipsModule,
  ],
  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true, maxHeight: '75vh'}}],
  bootstrap: [AppComponent],
  entryComponents: [TwitterFollowerDialog]
})
export class AppModule {
}
