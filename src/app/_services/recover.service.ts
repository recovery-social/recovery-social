import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

import LSP11Contract from 'src/app/artifacts/LSP11BasicSocialRecovery.json';
import { ContractService } from './contract.service';
import { ethers } from "ethers";
import { ToastService } from './toast.service';


@Injectable({
  providedIn: 'root'
})
export class RecoverService {
  public LSP11ContractRecover: any
  public addressToRecover?: string

  constructor(
    private authService: AuthService,
    private contractService: ContractService,
    private toastService: ToastService
  ) { }


  private getGuardiansVote = (recoverProcessId: any, address: any) => new Promise((resolve, reject) => {

    let LSP11 = new this.authService.web3.eth.Contract(LSP11Contract.abi as any, this.LSP11ContractRecover);

    console.log('getGuardianVote', 'hmmm', recoverProcessId, address)

    LSP11.methods.getGuardianVote(this.authService.web3.utils.asciiToHex(recoverProcessId), address).call()
      .then((valueStored: any) => {
        console.log('getGuardianVote', valueStored)
        resolve(valueStored)
      }).catch((err: any) => {
        console.log('error getGuardiansVote', err)
        this.toastService.error('there was an error', err)
        resolve(false)
      })
  })


  checkifRecoverPossible = (recoverProcessId: any, address: any) => new Promise((resolve, reject) => {

    this.contractService.getGuardians(this.LSP11ContractRecover).then((guardians: any) => {

      this.contractService.getRecoveryServiceGuardians(this.LSP11ContractRecover).then((guardiansRecoveryService: any) => {

        guardians = [...guardians, ...guardiansRecoveryService];

        console.log('All Guardians', guardians)

        this.contractService.getThreshold(this.LSP11ContractRecover).then((threshold: any) => {
          console.log('getThreshold', threshold)

          const promises = []
          var votesforAddres = 0

          for (let guardian of guardians) {
            promises.push(this.getGuardiansVote(recoverProcessId, guardian))
          }

          console.log('votesforAddres', votesforAddres)

          Promise.all(promises).then((results) => {
            console.log('results', results)
            for (let result of results) {
              if (result == address) {
                votesforAddres++;
              }
            }
            resolve(votesforAddres >= threshold)
          }).catch(err => {
            console.log('error getGuardiansVote', err)
            this.toastService.error('there was an error', err)
            resolve(false)
          })
        }).catch(err => {
          console.log('error getThreshold', err)
          this.toastService.error('there was an error', err)
          resolve(false)
        })
      }).catch(err => {
        console.log('error getRecoveryServiceGuardians', err)
        this.toastService.error('there was an error', err)
        resolve(false)
      })
    }).catch(err => {
      this.toastService.error('there was an error', err)
      resolve(false)
    })
  })



  recoverOwnership = (recoverProcessesId: any, currentSecret: any, newSecret: any) => new Promise((resolve, reject) => {

    let LSP11 = new this.authService.web3.eth.Contract(LSP11Contract.abi as any, this.LSP11ContractRecover);

    let secretNewHash_keccak = ethers.utils.keccak256(ethers.utils.keccak256(this.authService.web3.utils.asciiToHex(newSecret)))

    try {
      LSP11.methods.recoverOwnership(this.authService.web3.utils.asciiToHex(recoverProcessesId), this.hashPassword(currentSecret), secretNewHash_keccak).send({
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

    } catch (e: any) {
      console.log('error', e)
      reject(e)
    }
  })


  voteToRecoverRecoveryService = (srsContractAddress: string, recoverProcessId: any, ticket: any, value: any) => new Promise((resolve, reject) => {

    console.log('recover ownnsership', srsContractAddress, 'pID: ', recoverProcessId, 'ticket: ', ticket, 'value: ', value)

    console.log('THING TO RECOVER', this.LSP11ContractRecover)
    let LSP11 = new this.authService.web3.eth.Contract(LSP11Contract.abi as any, this.LSP11ContractRecover);

    this.authService.web3.eth.getBalance(this.authService.user).then((valueStored: any) => {
      console.log('getBalance', valueStored)
    });

    try {
      LSP11.methods.voteToRecoverRecoveryService(srsContractAddress, this.authService.web3.utils.asciiToHex(recoverProcessId), ticket).send({
        from: this.authService.user,
        gas: 40000000,
        value: value
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

    } catch (e: any) {
      console.log('error', e)
    }
  })

  private hashPassword(hash: any) {
    return ethers.utils.keccak256(this.authService.web3.utils.asciiToHex(hash))
  }

}
