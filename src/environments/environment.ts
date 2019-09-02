// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  network: {
    id: '3',
    name: 'Ropsten',
    explorer: {
      address: 'https://ropsten.etherscan.io/address/',
      tx: 'https://ropsten.etherscan.io/tx/${tx}'
    },
    provider: 'https://ropsten.infura.io/v3/f6427a6723594cdd8affb596d357d268'
  },
  contracts: {
    registryContract: '0xeA940D4ea125Fb5274d35e9C835064655c0E0d53',
    multiCallAddress: '0xA457b5B859573e8eB758B6C2BFD4aE3042B422FD'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
