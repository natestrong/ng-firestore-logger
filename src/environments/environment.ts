// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  useEmulators: true,
  firebase: {
    apiKey: "AIzaSyAwSNNvsSHJJL4U_2jnmlB-CSMhV38ecVc",
    authDomain: "firestore-logger.firebaseapp.com",
    projectId: "firestore-logger",
    storageBucket: "firestore-logger.appspot.com",
    messagingSenderId: "1025032333247",
    appId: "1:1025032333247:web:042606bc41f38e6e49230a",
    measurementId: "G-3EX8130N6D"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
