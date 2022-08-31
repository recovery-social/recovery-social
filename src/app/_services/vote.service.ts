import { Injectable } from '@angular/core';
import LSP11Contract from 'src/app/artifacts/LSP11BasicSocialRecovery.json';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class VoteService {

  public LSP11ContractAddressVote: any
  public recoveryProcessID?: string
  
  constructor(
    private authService: AuthService
  ) { }


  getGuardiansVote = (recoverProcessId: any, address: any) => new Promise((resolve, reject) => {

    let LSP11 = new this.authService.web3.eth.Contract(LSP11Contract.abi as any, this.LSP11ContractAddressVote);

    console.log('getGuardianVote', recoverProcessId, address)

    LSP11.methods.getGuardianVote(this.authService.web3.utils.asciiToHex(recoverProcessId), address).call()
      .then((valueStored: any) => {
        console.log('getGuardianVote', valueStored)
        resolve(valueStored)
      }).catch('error', (error: any) => {
        console.log('error', error)
        reject(error)
      })
  })


  voteToRecover = (recoverProcessId: any, newOwner: any) => new Promise((resolve, reject) => {
    var getHash = '0x'
    try {
      let LSP11 = new this.authService.web3.eth.Contract(LSP11Contract.abi as any, this.LSP11ContractAddressVote);

      LSP11.methods.voteToRecover(this.authService.web3.utils.asciiToHex(recoverProcessId), newOwner).send({
        from: this.authService.user,
        gas: 4000000
      })
        .on('transactionHash', (hash: any) => {
          console.log('hash', hash);
          getHash = hash;
        })
        .on('receipt', (receipt: any) => {
          // receipt example
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
}
