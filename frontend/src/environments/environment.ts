// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  server: 'http://localhost:8081/api/v1',
  googleConfig: {
    client_id:
      '49019277959-avvi4dpvmvnv5qntsh2sllok01926bmu.apps.googleusercontent.com',
    project_id: 'license-backend',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    redirect_uris: ['http://localhost:4200', 'http://localhost'],
    javascript_origins: ['http://localhost:4200', 'http://localhost'],
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
