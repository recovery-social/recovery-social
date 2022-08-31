import { Injectable } from '@angular/core';
import LSP11RecoveryServiceContract from 'src/app/artifacts/LSP11RecoveryService.json';
import Web3 from 'web3';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class RecoveryserviceService {
  public recoveryProcessID?: string

  public suggestedGuardiansInfos: { [rsAddress: string]: any } = {}

  public myRsGuardiansInfo: { [rsAddress: string]: any } = {}

  constructor(private authService: AuthService) { }

  getInfosRecoveryServiceforAddress = (rsAddress: string, lsp11Address: string) => new Promise((resolve, reject) => {

    Promise.all([
      this.getApiEndpoint(rsAddress),
      this.getRecoveryServiceName(rsAddress),
      this.getRecoveryServiceImageUrl(rsAddress),
      this.getCurrentPriceToRecover(rsAddress),
      this.getPriceforAddress(rsAddress, lsp11Address),
    ]).then(value => {
      console.log('PROMISED ALL', value)
      resolve({
        name: value[1],
        endpoint: value[0],
        imageUrl: value[2],
        price: Web3.utils.fromWei(value[3] as any, 'ether'),
        priceforAddress: Web3.utils.fromWei(value[4] as any, 'ether')
      })
    });
  })



  getInfosRecoveryServiceGeneral = (rsAddress: string) => new Promise((resolve, reject) => {
    Promise.all([
      this.getApiEndpoint(rsAddress),
      this.getRecoveryServiceName(rsAddress),
      this.getRecoveryServiceImageUrl(rsAddress),
      this.getCurrentPriceToRecover(rsAddress),
    ]).then(value => {
      console.log('PROMISED ALL', value)

      resolve({
        name: value[1],
        endpoint: value[0],
        imageUrl: value[2],
        price: Web3.utils.fromWei(value[3] as any, 'ether')
      })
    });
  })


  getApiEndpoint = (contractAddress: string): Promise<string> => new Promise((resolve, reject) => {

    var LSP11RecoveryService = new this.authService.web3.eth.Contract(LSP11RecoveryServiceContract.abi as any, contractAddress);

    LSP11RecoveryService.methods.getApiEndpoint().call()
      .then((valueStored: string) => {
        console.log('getApiEndpoint', valueStored)
        resolve(valueStored)
      })

  })


  getRecoveryServiceImageUrl = (contractAddress: string): Promise<string> => new Promise((resolve, reject) => {

    var LSP11RecoveryService = new this.authService.web3.eth.Contract(LSP11RecoveryServiceContract.abi as any, contractAddress);

    LSP11RecoveryService.methods.getRecoveryServiceImageUrl().call()
      .then((valueStored: string) => {
        console.log('getRecoveryServiceImageUrl', valueStored)
        resolve(valueStored)
      })

  })

  getRecoveryServiceName = (contractAddress: string) => new Promise((resolve, reject) => {

    var LSP11RecoveryService = new this.authService.web3.eth.Contract(LSP11RecoveryServiceContract.abi as any, contractAddress);

    LSP11RecoveryService.methods.getRecoveryServiceName().call()
      .then((valueStored: any) => {
        console.log('getRecoveryServiceName', valueStored)
        resolve(valueStored)
      })

  })


  getCurrentPriceToRecover = (contractAddress: string) => new Promise((resolve, reject) => {

    var LSP11RecoveryService = new this.authService.web3.eth.Contract(LSP11RecoveryServiceContract.abi as any, contractAddress);

    LSP11RecoveryService.methods.getCurrentPricetoRecover().call()
      .then((valueStored: any) => {
        console.log('getCurrentPricetoRecover', valueStored)
        resolve(valueStored)
      })
  })



  private getPriceforAddress = (contractAddress: string, lsp11contractAddress: string) => new Promise((resolve, reject) => {

    var LSP11RecoveryService = new this.authService.web3.eth.Contract(LSP11RecoveryServiceContract.abi as any, contractAddress);

    LSP11RecoveryService.methods.getPriceforAddress(lsp11contractAddress).call()
      .then((valueStored: any) => {
        console.log('piiceforAddress', valueStored)
        resolve(valueStored)
      })

  })
}
