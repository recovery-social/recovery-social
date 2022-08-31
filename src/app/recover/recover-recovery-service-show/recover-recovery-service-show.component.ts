import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { ContractService } from 'src/app/_services/contract.service';
import { RecoverService } from 'src/app/_services/recover.service';
import { RecoveryserviceService } from 'src/app/_services/recoveryservice.service';

@Component({
  selector: 'app-recover-recovery-service-show',
  templateUrl: './recover-recovery-service-show.component.html',
  styleUrls: ['./recover-recovery-service-show.component.scss']
})
export class RecoverRecoveryServiceShowComponent implements OnInit {
  id?: string
  endpoint?: string

  recoveryServiceWindow: Window | null = null

  constructor(
    public recoveryServiceService: RecoveryserviceService,
    private contractService: ContractService,
    private recoverService: RecoverService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {
    this.id = this.route.snapshot.params.id


    window.onmessage = (event) => {
      if (event.data?.lsp11RecoveryService) {
        const body = event.data.lsp11RecoveryService
        console.log('body', body)
        if (body.success) {
          this.verify(body.data)
          this.recoveryServiceWindow?.close()
        }
      }
    }
  }

  ngOnInit(): void {
    console.log('this.recoveryServiceService.myRsGuardiansInfo', this.recoveryServiceService.myRsGuardiansInfo)
    console.log('id', this.id)
    if (this.id) {
      this.endpoint = `${this.recoveryServiceService.myRsGuardiansInfo[this.id].endpoint}/recover?LSP11ContractAddress=${this.recoverService.LSP11ContractRecover}&newOwner=${this.authService.user}`
    }
  }

  open() {
    this.recoveryServiceWindow = window.open(this.endpoint, '_blank')
  }

  verify(data: any) {
    console.log('verify', data)
    data.rsContractAddress = this.id
    this.contractService.toSignFromRecoveryService = data
    this.router.navigate(['/recover/recovery-service/process'])
  }
}
