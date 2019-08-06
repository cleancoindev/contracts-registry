// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  network: {
    id: '1',
    name: 'Main',
    explorer: {
      address: 'https://etherscan.io/address/${address}',
      tx: 'https://etherscan.io/tx/${tx}'
    },
    provider: 'https://node.rcn.loans/'
  },
  contracts: {
    registryContract: '',
    multiCallAddress: ''
  }
};
