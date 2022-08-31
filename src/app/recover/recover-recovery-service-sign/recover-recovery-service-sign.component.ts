import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from 'src/app/_services/contract.service';
import { RecoverService } from 'src/app/_services/recover.service';

import { RecoveryserviceService } from 'src/app/_services/recoveryservice.service';
import { ToastService } from 'src/app/_services/toast.service';
import { AuthService } from 'src/app/_services/auth.service';
import Web3 from 'web3';

@Component({
  selector: 'app-recover-recovery-service-sign',
  templateUrl: './recover-recovery-service-sign.component.html',
  styleUrls: ['./recover-recovery-service-sign.component.scss']
})
export class RecoverRecoveryServiceSignComponent implements OnInit {
  loading = false
  message: string = ''

  public profile: any

  constructor(
    private contractService: ContractService,
    private router: Router,
    private recoverService: RecoverService,
    private recoveryServiceService: RecoveryserviceService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    let rsContractAddress = this.contractService.toSignFromRecoveryService.rsContractAddress
    this.loading = true
    this.recoveryServiceService.getInfosRecoveryServiceforAddress(rsContractAddress, this.recoverService.LSP11ContractRecover).then(result => {
      this.profile = result
      this.loading = false
    })
  }

  async sign() {

    if (!this.recoveryServiceService.recoveryProcessID) {
      this.message = 'You have to select or create a new Process ID'
      return
    }

    this.loading = true

    console.log(' this.contractService.toSignFromRecoveryService', this.contractService.toSignFromRecoveryService)

    let ticket = this.contractService.toSignFromRecoveryService.ticket

    console.log('ticket', ticket)
    console.log('serializeCoupon', { r: ticket.r.data, s: ticket.s.data, v: ticket.v })

    let ticket_new = { r: ticket.r.data, s: ticket.s.data, v: ticket.v }

    let value = Web3.utils.toWei(this.getRecoverPrice(), 'ether')

    this.recoverService.voteToRecoverRecoveryService(this.contractService.toSignFromRecoveryService.rsContractAddress, this.recoveryServiceService.recoveryProcessID, ticket_new, value).then(res => {
      this.loading = false

      console.log('You have successfully voted for yourself')
      this.router.navigate(['/recover/recovery-service/success'])

    }).catch(err => {
      this.toastService.error('there was an error', 'do you have enough lxyt?')
      this.loading = false
    })
  }



  getRecoverPrice() {

    if (this.profile) {
      if (!this.profile.price) {
        return this.profile.priceforAddress
      }

      if (!this.profile.priceforAddress) {
        return this.profile.price
      }

      if (this.profile.price >= this.profile.priceforAddress) {
        return this.profile.priceforAddress
      } else {
        return this.profile.price
      }
    }

  }

}
