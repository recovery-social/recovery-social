import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { ContractService } from 'src/app/_services/contract.service';
import { RecoverService } from 'src/app/_services/recover.service';

import { RecoveryserviceService } from 'src/app/_services/recoveryservice.service';
import { ToastService } from 'src/app/_services/toast.service';


@Component({
  selector: 'app-recover-process',
  templateUrl: './recover-process.component.html',
  styleUrls: ['./recover-process.component.scss']
})


export class RecoverProcessComponent implements OnInit {
  public recoveryProcessIDs = []
  public address?: string
  public loading = false
  public secret?: string

  public lengthRecoveryServiceGuardians = 0
  public canRecoverMap: { [key: string]: boolean } = {}

  constructor(
    private recoverService: RecoverService,
    private router: Router,
    private contractService: ContractService,
    private authService: AuthService,
    public recoveryServiceService: RecoveryserviceService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {

    this.loading = true

    this.contractService.getRecoverProcessesIds(this.recoverService.LSP11ContractRecover).then((res: any) => {
      var processIds_: any = []

      for (let id of res) {
        const idConverted = this.authService.web3.utils.hexToAscii(id)
        processIds_.push(idConverted)


        this.recoverService.checkifRecoverPossible(idConverted, this.authService.user).then((res: any) => {
          this.canRecoverMap[idConverted] = res
        }).catch(err => {
          this.toastService.error('there was an error', err)

        })
      }
      this.recoveryProcessIDs = processIds_
    }).catch(err => {
      this.toastService.error('there was an error', err)
    })

    this.contractService.getRecoveryServiceGuardians(this.recoverService.LSP11ContractRecover).then((rsGuardians: any) => {

      this.recoveryServiceService.myRsGuardiansInfo = {}

      this.lengthRecoveryServiceGuardians = rsGuardians.length
      for (let g of rsGuardians) {
        this.recoveryServiceService.getInfosRecoveryServiceGeneral(g).then(res => {

          this.recoveryServiceService.myRsGuardiansInfo[g] = res
          this.loading = false
          console.log('res', res)
        }).catch(err => {
          this.toastService.error('there was an error', err)
          console.log('error get Information about RS', err)
        })
      }
    }).catch(err => {
      this.toastService.error('there was an error', err)

    })

  }

  select(process: any) {
    this.recoveryServiceService.recoveryProcessID = process

    if (this.canRecoverMap[process]) {
      this.router.navigate([`/recover/secret`])
    } else {
      this.toastService.error('you can not recover this process yet', 'there are more votes needed')
    }
  }


  selectRecoveryService(rsAddress: any) {
    this.router.navigate([`/recover/recovery-service/${rsAddress}/show`])
  }

}
