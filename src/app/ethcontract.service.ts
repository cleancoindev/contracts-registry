import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { environment } from '../environments/environment';
import { aggregate, createWatcher } from '@makerdao/multicall';


declare let require: any;
const REGISTRY_CONTRACT = environment.contracts.registryContract;

// // Preset can be 'mainnet', 'kovan', 'rinkeby', 'goerli' or 'xdai'
// // const config = { preset: 'ropsten' };

// Alternatively the rpcUrl and multicallAddress can be specified manually
const config = {
  rpcUrl: environment.network.provider,
  multicallAddress: environment.contracts.multiCallAddress
};


class ContractDetail {
  id: number;
  contractName: string;
  address: string;
  etherScanLink: string;

  constructor(id: number, contractName: string, address: string, ethScanLink: string) {
    this.id = id;
    this.contractName = contractName;
    this.address = address;
    this.etherScanLink = ethScanLink;
  }
}


const registryAbi = require('./registry.json');


@Injectable({
  providedIn: 'root'
})

export class EthcontractService {

  private web3: any;
  private aggregate: any;
  private callsArrray = [];
  private contractsDetails = [];

  constructor() {

    this.web3 = this.buildWeb3();
    this.aggregate = aggregate;

  }

  async getContractsRegistryMulticall() {
    try {
      const registryContract = await this.web3.eth.Contract(registryAbi, environment.contracts.registryContract);

      const keysLength = await registryContract.methods.getKeysLength().call();

      for (let i = 0; i < parseInt(keysLength, 10); i++) {
        let individualCall;

        individualCall = {
          target: REGISTRY_CONTRACT,
          call: ['getEntry(uint256)(string,address)', i],
          returns: [['KEY' + i],
          [i]]
        };

        this.callsArrray.push(individualCall);
      }

      const response = await this.aggregate(this.callsArrray, config);

      const returnedValues = response.results;

      for (let i = 0; i < parseInt(keysLength, 10); i++) {
        const contractDetail = new ContractDetail(
          i,
          returnedValues['KEY' + i],
          returnedValues[i],
          environment.network.explorer.address + returnedValues[i]);
        this.contractsDetails.push(contractDetail);

      }

      const reverseContracts = this.contractsDetails.reverse();

      return reverseContracts;


    } catch (error) {
      console.log(error);

      return error;
    }
  }

  private buildWeb3(): any {
    return new Web3(environment.network.provider);
  }

}

