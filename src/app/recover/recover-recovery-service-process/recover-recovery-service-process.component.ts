import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { ContractService } from 'src/app/_services/contract.service';
import { RecoverService } from 'src/app/_services/recover.service';
import { RecoveryserviceService } from 'src/app/_services/recoveryservice.service';
import { ToastService } from 'src/app/_services/toast.service';


@Component({
  selector: 'app-recover-recovery-service-process',
  templateUrl: './recover-recovery-service-process.component.html',
  styleUrls: ['./recover-recovery-service-process.component.scss']
})
export class RecoverRecoveryServiceProcessComponent implements OnInit {
  public loading = false
  public addNew = false
  public message: string = ''

  public recoveryProcessIDs = []

  public profile: any

  constructor(
    private authService: AuthService,
    private contractService: ContractService,
    private recoverService: RecoverService,
    public recoveryServiceService: RecoveryserviceService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {

    this.contractService.getRecoverProcessesIds(this.recoverService.LSP11ContractRecover).then((res: any) => {
      var processIds_: any = []

      for (let id of res) {
        processIds_.push(this.authService.web3.utils.hexToAscii(id))
      }
      this.recoveryProcessIDs = processIds_
      this.loading = false
    }).catch(err => {
      this.toastService.error('there was an error', err)
    })
  }

  selectProcessId(process: any) {
    this.addNew = false
    this.recoveryServiceService.recoveryProcessID = process
  }

}
