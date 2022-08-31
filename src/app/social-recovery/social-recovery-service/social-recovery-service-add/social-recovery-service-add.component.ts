import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from 'src/app/_services/contract.service';
import { RecoveryserviceService } from 'src/app/_services/recoveryservice.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-social-recovery-service-add',
  templateUrl: './social-recovery-service-add.component.html',
  styleUrls: ['./social-recovery-service-add.component.scss']
})
export class SocialRecoveryRecoveryServiceAddComponent implements OnInit {

  suggestedGuardiansAddresses = [
    "0x5e0d67B951b6C3e0B54e9B81C4d97EFbfAC1c702", //TOTP
    "0x966c6378bf80F95E317D9a31eFb5F3383e23e6E9" //Passykey
  ]

  constructor(
    private contractService: ContractService,
    private router: Router,
    public recoveryServiceService: RecoveryserviceService, private toastService: ToastService
  ) { }

  ngOnInit(): void {

    for (let suggestedGuardianAddress of this.suggestedGuardiansAddresses) {
      this.recoveryServiceService.getInfosRecoveryServiceGeneral(suggestedGuardianAddress).then(res => {

        this.recoveryServiceService.suggestedGuardiansInfos[suggestedGuardianAddress] = res

        console.log('res', res)
      }).catch(err => {
        this.toastService.error('there was an error', err)
        console.log('error get Information about RS', err)
      })
    }
  }

  select(guardian: any) {
    this.router.navigate([`/social-recovery/recovery-service/${guardian.key}/show`])
  }

  addRecoveryService() {
    let LSP11tointeractwith = '0x3340ae62aA1Ec5ad5e68132C6bc88D43616Fe154'
    let socialRecoveryServiceContracAddress = '0xda74bDCac37Fe1a32cCFdd88514dEcc24657f522'
    let publicKey = '0xBd42A62719b76C75aD8272bDEcE90919736561Cc'
    this.contractService.addRecoveryServiceGuardian(socialRecoveryServiceContracAddress, publicKey).then(res => {
      console.log('res', res)
    }).catch(err => {
      this.toastService.error('there was an error', err)
    })
  }


}
