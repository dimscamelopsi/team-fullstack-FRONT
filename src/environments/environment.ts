// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import packageInfo from 'package.json';

import { UserService } from "src/app/user/services/user.service";

export const environment = {
  
  production: false,
  version: packageInfo.version,
  apiRootUri: 'http://127.0.0.1:5000/api/v1/',
  storage: {
    auth: {
      strategy: 'session',
      key: 'auth',
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
