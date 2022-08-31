import { Injectable } from '@angular/core';
import { ERC725 } from "@erc725/erc725.js";
import { AuthService } from './auth.service';

import { ContractService } from './contract.service';
import LSP3 from '@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json';

import { VoteService } from './vote.service';
import { RecoverService } from './recover.service';
import { ToastService } from './toast.service';
import Web3 from 'web3';


const schemas = [
  {
    "name": "LSP11SocialRecoveryAddress",
    "key": "0xd5dde05f38c08c2b04d7a7b92d0b3705a31ccb653c44c061e41f5169c6ddba03",
    "keyType": "Singleton",
    "valueType": "address",
    "valueContent": "Address"
  },
  {
    "name": "AddressPermissions:Permissions:<address>",
    "key": "0x4b80742de2bf82acb3630000<address>",
    "keyType": "MappingWithGrouping",
    "valueType": "bytes32",
    "valueContent": "BitArray"
  },
]


@Injectable({
  providedIn: 'root'
})
export class Erc725inspectService {

  constructor(
    private authService: AuthService,
    private contractService: ContractService,
    private recoverService: RecoverService,
    private toastService: ToastService,
    private voteService: VoteService,
  ) { }


  public provider = new Web3.providers.HttpProvider(
    'https://rpc.l16.lukso.network',
  );
  public config = {
    ipfsGateway: 'https://2eff.lukso.dev/ipfs/',
  };

  findLSP11 = (contractAddress: any) => new Promise((resolve, reject) => {

    console.log('this.authService.user, FINDLSP11', contractAddress)

    var erc725LSP11 = new ERC725(schemas as any, contractAddress, this.provider, this.config);

    erc725LSP11.getData('LSP11SocialRecoveryAddress').then(value => {

      if (value.value) {

        if ('0xFe1D8072C259b7Dfa1Adae5d7e6C9De6ace958F0' == value.value) {
          resolve(false)
        } else {
          this.contractService.LSP11ContractAddress = value.value
          console.log('LSP11ContractAddress', this.contractService.LSP11ContractAddress)
          resolve(true)
        }
      } else {
        resolve(false)
      }


    }).catch(err => {
      console.log(err);
      this.toastService.error('there was an error', err)

      reject(err)
    });

  })


  checkIfCanVoteForFriend = (contractAddress: any) => new Promise<boolean>((resolve, reject) => {

    console.log('contractAddress', contractAddress)

    var erc725LSP11 = new ERC725(schemas as any, contractAddress, this.provider, this.config);

    erc725LSP11.getData('LSP11SocialRecoveryAddress').then(value => {

      if (value.value) {

        this.voteService.LSP11ContractAddressVote = value.value
        this.contractService.getGuardians(value.value as string).then((guardians: any) => {

          if (guardians.includes(this.authService.user)) {
            console.log('You can vote')
            resolve(true)
          } else {
            console.log('You are not allowed to vote')
            resolve(false)
          }
        }).catch(err => {
          this.toastService.error('there was an error', err)
          resolve(false)
        })
      } else {
        console.log('CONTRACT ADDRESS HAS NO RECOVERY CONTRACT')
        this.toastService.error('there was an error', 'contract address has no recovery contract')
        resolve(false)
      }

    }).catch(err => {
      console.log(err);
      this.toastService.error('there was an error', err)
      reject(err)
    });
  })



  checkIfCanRecover = (contractAddress: any) => new Promise<boolean>((resolve, reject) => {

    console.log('contractAddress', contractAddress)

    var erc725LSP11 = new ERC725(schemas as any, contractAddress, this.provider, this.config);

    erc725LSP11.getData('LSP11SocialRecoveryAddress').then(value => {

      if (value.value) {
        this.recoverService.LSP11ContractRecover = value.value
        resolve(true)
      } else {
        console.log('CONTRACT ADDRESS HAS NO RECOVERY CONTRACT')
        resolve(false)
      }

    }).catch(err => {
      console.log(err);
      this.toastService.error('there was an error', err)
      reject(err)
    });
  })




  getUPData = (contractAddress: string): Promise<any> => new Promise((resolve, reject) => {

    console.log('FINDLSP11', contractAddress)
    var erc725 = new ERC725(LSP3 as any, contractAddress, this.provider, this.config);

    erc725.fetchData('LSP3Profile').then(value => {
      console.log('LSP3Profile', value)
      resolve(value)

    }).catch(err => {
      console.log('LSP3Profile', err);
      this.toastService.error('there was an error', err)
      reject(err)
    });

  })


  getIPFSURL(url: string) {
    console.log('IPFS ', url)
    var splitted = String(url).split("//", 2);

    return 'https://2eff.lukso.dev/ipfs/' + splitted[1]
  }
}



