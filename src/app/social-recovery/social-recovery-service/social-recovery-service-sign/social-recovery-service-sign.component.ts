import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from 'src/app/_services/contract.service';
import { RecoveryserviceService } from 'src/app/_services/recoveryservice.service';
import { ToastService } from 'src/app/_services/toast.service';
import Web3 from 'web3';


@Component({
  selector: 'app-social-recovery-service-sign',
  templateUrl: './social-recovery-service-sign.component.html',
  styleUrls: ['./social-recovery-service-sign.component.scss']
})
export class SocialRecoveryRecoveryServiceSignComponent implements OnInit {
  loading = false
  public pricetoRecover?: string
  constructor(
    private contractService: ContractService,
    private router: Router,
    private recoveryServiceService: RecoveryserviceService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {

    let rsContractAddress = this.contractService.toSignFromRecoveryService.rsContractAddress
    this.loading = true
    this.recoveryServiceService.getCurrentPriceToRecover(rsContractAddress).then(currentPrice => {
      this.loading = false
      this.pricetoRecover = Web3.utils.fromWei(currentPrice as string)
      console.log('res', currentPrice)
    }).catch(err => {
      this.toastService.error('there was an error', err)
      this.loading = false
    })


  }

  sign() {
    this.loading = true

    console.log(this.contractService.toSignFromRecoveryService)

    console.log(this.contractService.toSignFromRecoveryService.pubKeyString)
    this.contractService.addRecoveryServiceGuardian(this.contractService.toSignFromRecoveryService.rsContractAddress, this.contractService.toSignFromRecoveryService.pubKeyString).then(res => {
      this.loading = false
      console.log('res', res)
      this.router.navigate(['/social-recovery/recovery-service/success'])
    }).catch(err => {
      this.toastService.error('there was an error', err)
      this.loading = false
    })
  }

}
