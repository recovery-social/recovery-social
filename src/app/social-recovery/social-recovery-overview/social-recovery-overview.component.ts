import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { ContractService } from 'src/app/_services/contract.service';
import { Erc725inspectService } from 'src/app/_services/erc725inspect.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-social-recovery-overview',
  templateUrl: './social-recovery-overview.component.html',
  styleUrls: ['./social-recovery-overview.component.scss']
})
export class SocialRecoveryOverviewComponent implements OnInit {

  constructor(
    public erc725inspectService: Erc725inspectService,
    private authService: AuthService,
    private router: Router,
    private contractService: ContractService,
    private toastService: ToastService
  ) { }


  public guardians: any = []
  public guardiansRecoveryService: any = []
  public guardiansLSP3: any = {}
  currentThreshold?:number

  
  loading: any = {}


  ngOnInit(): void {
    this.getGuardians()
    this.getRecoverServices()
    this.getThreshold()
  }

  getGuardians() {
    this.contractService.getGuardians().then(res => {
      this.guardians = res
    }).catch(err => {
      this.toastService.error('there was an error', err)
    })
  }

  getRecoverServices() {
    this.contractService.getRecoveryServiceGuardians().then(res => {
      console.log('guardiansRecoveryService', res)
      this.guardiansRecoveryService = res
    }).catch(err => {
      this.toastService.error('there was an error', err)
    })
  }

  editPassword() {
    this.router.navigate(['/social-recovery/password/edit'])
  }

  editThreshold() {
    this.router.navigate(['/social-recovery/threshold/edit'])
  }

  getThreshold(){
    this.contractService.getThreshold().then((threshold : any) => {
      this.currentThreshold = threshold
     }).catch(err => {
      this.toastService.error('there was an error' ,err)
       console.log('err', err)
     })
  
  }


  removeGuardian(guardian: any) {
    this.loading[guardian] = true
    this.contractService.removeGuardian(guardian).then(res => {
      console.log('res', res)
      this.loading[guardian] = false
      this.getGuardians()
    }).catch(err => {
      this.loading[guardian] = false
      this.toastService.error('there was an error', err)
    })
  }


  removeRsGuardian(guardian: any) {
    this.loading[guardian] = true
    this.contractService.removeRecoveryServiceGuardian(guardian).then(res => {
      console.log('res', res)
      this.loading[guardian] = false
      this.getRecoverServices()

    }).catch(err => {
      this.toastService.error('there was an error', err)
      this.loading[guardian] = false
    })
  }
}
