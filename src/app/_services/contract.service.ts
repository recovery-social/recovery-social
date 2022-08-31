import { Injectable } from '@angular/core';
import LSP11Contract from 'src/app/artifacts/LSP11BasicSocialRecovery.json';

import { AuthService } from './auth.service';
import { ERC725 } from "@erc725/erc725.js";
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { ethers } from "ethers";

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
export class ContractService {
  public onboardingPassword?: string
  public onboardingGuardians?: string[]
  public onboardingThreshold = 0

  public LSP11ContractAddress?: any
  public LSP11ContractAddressVote?: any


  public toSignFromRecoveryService: any


  constructor(
    private authService: AuthService,
  ) { }

  createContract = () => new Promise((resolve, reject) => {

    let code = LSP11Contract.bytecode;
    let lsp11Contract = new this.authService.web3.eth.Contract(LSP11Contract.abi as any);

    let secretHash_keccak = ethers.utils.keccak256(ethers.utils.keccak256(this.authService.web3.utils.asciiToHex(this.onboardingPassword!)))

    console.log('ADDRESS', this.authService.user)
    let contractAddress = lsp11Contract.deploy({
      data: code,
      arguments: [this.authService.user, secretHash_keccak, this.authService.web3.utils.toBN(this.onboardingThreshold), this.onboardingGuardians],
    })
      .send({
        from: this.authService.user,
        gas: 1500000,
      }, (error, transactionHash) => {
        console.log('error', error)
      })
      .on('error', (error: any) => {
        console.log('error', error)
        reject(error)
      })
      .on('transactionHash', (transactionHash) => {
        console.log('transactionHash', transactionHash)
      })
      .on('receipt', (receipt) => {
        console.log(receipt.contractAddress) // contains the new contract address

        this.LSP11ContractAddress = String(receipt.contractAddress)
        resolve(true)
      })

    console.log('contractAddress', contractAddress)

  })

  //setRights to KeyManager and set LSP11 as Contract
  setRights = () => new Promise((resolve, reject) => {

    let erc725Schemas = new ERC725(schemas as any);

    const beneficiaryPermissions = erc725Schemas.encodePermissions({
      ADDPERMISSIONS: true,
      CHANGEPERMISSIONS: true
    });

    // step 2.2 - encode the data key-value pairs of the permissions to be set for the beneficiary address
    const beneficiaryAddress = this.LSP11ContractAddress; // EOA address of an exemplary person
    const permissionData = erc725Schemas.encodeData([
      {
        keyName: "AddressPermissions:Permissions:<address>",
        dynamicKeyParts: beneficiaryAddress,
        value: beneficiaryPermissions,
      },
      {
        keyName: '0xd5dde05f38c08c2b04d7a7b92d0b3705a31ccb653c44c061e41f5169c6ddba03',
        value: beneficiaryAddress,
      }
    ]);


    const myUP = new this.authService.web3.eth.Contract(UniversalProfile.abi as any, this.authService.user);

    myUP.methods["setData(bytes32[],bytes[])"](permissionData.keys, permissionData.values).send({
      from: this.authService.user,
      gas: 40000000,
    }).on('transactionHash', (hash: any) => {
      console.log('hash', hash);
    })
      .on('receipt', (receipt: any) => {
        console.log(receipt)
        resolve(true)
      })
      .on('error', (error: any) => {
        console.log('error', error)
        reject(error)
      })
  })

  getThreshold = (contractAddress?: any) => new Promise((resolve, reject) => {

    var LSP11 = new this.authService.web3.eth.Contract(LSP11Contract.abi as any, this.LSP11ContractAddress);
    if (contractAddress) {
      LSP11 = new this.authService.web3.eth.Contract(LSP11Contract.abi as any, contractAddress);
    }

    LSP11.methods.getGuardiansThreshold().call()
      .then((valueStored: any) => {
        console.log('currentThreshold', valueStored)
        resolve(valueStored)
      })
  })



  setThreshold = (newThreshold: any) => new Promise((resolve, reject) => {
    var getHash = '0x'
    try {

      let LSP11 = new this.authService.web3.eth.Contract(LSP11Contract.abi as any, this.LSP11ContractAddress);

      LSP11.methods.setThreshold(newThreshold).send({
        from: this.authService.user,
        gas: 4000000
      })
        .on('transactionHash', (hash: any) => {
          console.log('hash', hash);
          getHash = hash;
        })
        .on('receipt', (receipt: any) => {
          console.log(receipt)
          resolve(true)
        })
        .on('error', (error: any) => {
          console.log('error', error)
          reject(error)
        })
    } catch (e: any) {
      console.log('e', e)
      reject(e)
    }
  })



  getGuardians = (contractAddress?: string) => new Promise((resolve, reject) => {

    var LSP11 = new this.authService.web3.eth.Contract(LSP11Contract.abi as any, this.LSP11ContractAddress);
    if (contractAddress) {
      LSP11 = new this.authService.web3.eth.Contract(LSP11Contract.abi as any, contractAddress);
    }
    console.log('LSP11ContractAddress', this.LSP11ContractAddress)


    LSP11.methods.getGuardians().call()
      .then((guardians: any) => {
        console.log('getGuardians', guardians)


        resolve(guardians)

      })

  })


  getRecoveryServiceGuardians = (contractAddress?: string) => new Promise((resolve, reject) => {

    var LSP11 = new this.authService.web3.eth.Contract(LSP11Contract.abi as any, this.LSP11ContractAddress);
    if (contractAddress) {
      LSP11 = new this.authService.web3.eth.Contract(LSP11Contract.abi as any, contractAddress);
    }

    LSP11.methods.getRecoveryServiceGuardians().call()
      .then((guardians: any) => {
        console.log('getGuardians RS', guardians)
        resolve(guardians)
      }).catch((error: any) => {
        console.log('error', error)
        reject(error)
      })
  })


  addGuardian = (newGuardian: any) => new Promise<boolean>((resolve, reject) => {
    var getHash = '0x'
    try {

      let LSP11 = new this.authService.web3.eth.Contract(LSP11Contract.abi as any, this.LSP11ContractAddress);

      LSP11.methods.addGuardian(newGuardian).send({
        from: this.authService.user,
        gas: 4000000
      })
        .on('transactionHash', (hash: any) => {
          console.log('hash', hash);
          getHash = hash;
        })
        .on('receipt', (receipt: any) => {
          console.log(receipt)
          resolve(true)
        })
        .on('error', (error: any) => {
          console.log('error', error)
          reject(error)
        })
    } catch (e: any) {
      console.log('e', e)
      reject(e)
    }
  })



  removeGuardian = (deleteGuardian: any) => new Promise((resolve, reject) => {
    var getHash = '0x'
    try {

      let LSP11 = new this.authService.web3.eth.Contract(LSP11Contract.abi as any, this.LSP11ContractAddress);

      LSP11.methods.removeGuardian(deleteGuardian).send({
        from: this.authService.user,
        gas: 4000000
      })
        .on('transactionHash', (hash: any) => {
          console.log('hash', hash);
          getHash = hash;
        })
        .on('receipt', (receipt: any) => {
          console.log(receipt)
          resolve(true)
        })
        .on('error', (error: any) => {
          console.log('error', error)
          reject('You have to lower the threshold first')
        })
    } catch (e: any) {
      console.log('e', e)
      reject(e)
    }
  })


  removeRecoveryServiceGuardian = (deleteGuardian: any) => new Promise((resolve, reject) => {
    var getHash = '0x'
    try {

      let LSP11 = new this.authService.web3.eth.Contract(LSP11Contract.abi as any, this.LSP11ContractAddress);

      LSP11.methods.removeRecoveryServiceGuardian(deleteGuardian).send({
        from: this.authService.user,
        gas: 4000000
      })
        .on('transactionHash', (hash: any) => {
          console.log('hash', hash);
          getHash = hash;
        })
        .on('receipt', (receipt: any) => {
          console.log(receipt)
          resolve(true)
        })
        .on('error', (error: any) => {
          console.log('error', error)
          reject(error)
        })
    } catch (e: any) {
      console.log('e', e)
      reject(e)
    }
  })




  addRecoveryServiceGuardian = (srsContractAddress: string, publicKey: string) => new Promise((resolve, reject) => {
    var getHash = '0x'
    try {

      let LSP11 = new this.authService.web3.eth.Contract(LSP11Contract.abi as any, this.LSP11ContractAddress);

      LSP11.methods.addRecoveryServiceGuardian(srsContractAddress, publicKey).send({
        from: this.authService.user,
        gas: 4000000
      })
        .on('transactionHash', (hash: any) => {
          console.log('hash', hash);
          getHash = hash;
        })
        .on('receipt', (receipt: any) => {
          console.log(receipt)
          resolve(true)
        })
        .on('error', (error: any) => {
          console.log('error', error)
          reject(error)
        })
    } catch (e: any) {
      console.log('e', e)
      reject(e)
    }
  })

  setSecret = (secret: any) => new Promise((resolve, reject) => {

    let secretHash_keccak = ethers.utils.keccak256(ethers.utils.keccak256(this.authService.web3.utils.asciiToHex(secret)))

    var getHash = '0x'
    try {

      let LSP11 = new this.authService.web3.eth.Contract(LSP11Contract.abi as any, this.LSP11ContractAddress);

      LSP11.methods.setSecret(secretHash_keccak).send({
        from: this.authService.user,
        gas: 4000000
      })
        .on('transactionHash', (hash: any) => {
          console.log('hash', hash);
          getHash = hash;
        })
        .on('receipt', (receipt: any) => {
          console.log(receipt)
          resolve(true)
        })
        .on('error', (error: any) => {
          console.log('error', error)
          reject(error)
        })
    } catch (e: any) {
      console.log('e', e)
      reject(e)
    }
  })

  getRecoverProcessesIds = (contractAddress?: any) => new Promise((resolve, reject) => {

    var LSP11 = new this.authService.web3.eth.Contract(LSP11Contract.abi as any, this.LSP11ContractAddress);
    console.log('getRecoverProcessesIds', contractAddress)

    if (contractAddress) {
      LSP11 = new this.authService.web3.eth.Contract(LSP11Contract.abi as any, contractAddress);
    }

    LSP11.methods.getRecoverProcessesIds().call()
      .then((valueStored: any) => {
        console.log('getRecoverProcessesIds', valueStored)
        resolve(valueStored)
      }).catch((error: any) => {
        console.log('error', error)
        reject(error)
      })
  })

}
