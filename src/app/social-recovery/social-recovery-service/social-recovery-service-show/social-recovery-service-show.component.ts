import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { ContractService } from 'src/app/_services/contract.service';
import { RecoveryserviceService } from 'src/app/_services/recoveryservice.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-social-recovery-service-show',
  templateUrl: './social-recovery-service-show.component.html',
  styleUrls: ['./social-recovery-service-show.component.scss']
})
export class SocialRecoveryRecoveryServiceShowComponent implements OnInit {
  id?: string
  endpoint?: string
  url?: SafeResourceUrl

  recoveryServiceWindow: Window | null = null

  constructor(
    public recoveryServiceService: RecoveryserviceService,
    private contractService: ContractService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private toastService: ToastService
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

    if (this.id) {
      
      this.recoveryServiceService.getApiEndpoint(this.id).then((res) => {
      
        this.endpoint = `${res}/onboarding?LSP11ContractAddress=${this.contractService.LSP11ContractAddress}`, '_blank'

      }).catch(err => {
        this.toastService.error('there was an error', err)
        console.log('error get Information about RS', err)
      })
    }
  }

  open() {
    this.recoveryServiceWindow = window.open(this.endpoint, '_blank')
  }

  verify(data: any) {
    console.log('verify', data)
    data.rsContractAddress = this.id
    this.contractService.toSignFromRecoveryService = data
    this.router.navigate(['/social-recovery/recovery-service/sign'])
  }
}
