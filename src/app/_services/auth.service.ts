import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { rejects } from 'assert';
import { ToastService } from './toast.service';
import Web3 from 'web3';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: any | null;
  public userObservable = new ReplaySubject<any | null>(1);


  public ethereum: any = window['ethereum' as any];
  public web3 = new Web3(this.ethereum)


  public loading = true;
  public typLoading = false;


  constructor(
    public toastService: ToastService,
  ) { }

  checkLoggedIn = () => new Promise<any | null>(resolve => {
    if (this.user) {
      return resolve(this.user)
    } else {
      return resolve(null)
    }
  })

  logout = (redirect = true): Promise<void> =>
    new Promise((resolve) => {
      if (redirect) {
        window.location.href = "/login";
      }
      resolve()
    });

  login = () => new Promise<any>((resolve) => {
    this.connectToUP().then(value => {
      this.user = value
      resolve(this.user)
    }).catch(err => {
      console.log(err);
      this.toastService.error('there was an error', err)
      rejects(err)
    });
  })

  private connectToUP = () => new Promise<string>((resolve, reject) => {
    if (typeof this.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    }
    if (this.ethereum) {

      this.ethereum.request({ method: 'eth_requestAccounts' }).then((address: string[]) => {
        console.log('addresses', address)
        console.log("Account connected: ", address[0]); // Account address that you had imported

        return resolve(address[0])
      }).catch((err: any) => {
        console.log(err);
        this.toastService.error('access was denied')
        reject(err)
      })
    } else {
      reject('no ethereum')
    }
  })
}