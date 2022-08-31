import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from 'src/app/_services/contract.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-onboarding-set-threshold',
  templateUrl: './onboarding-set-threshold.component.html',
  styleUrls: ['./onboarding-set-threshold.component.scss']
})
export class OnboardingSetThresholdComponent implements OnInit {

  message?: any
  newThreshold?: number
  loading = false
  guardiansCount?: number

  constructor(
    private contractService: ContractService,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.guardiansCount = this.contractService.onboardingGuardians?.length
    if (!this.newThreshold) {
      this.newThreshold = this.contractService.onboardingGuardians?.length
    }
  }



  add() {
    if (!this.newThreshold) {
      this.message = 'You have to enter a Threshold'
      return
    }

    this.loading = true
    this.contractService.setThreshold(this.newThreshold).then((res: any) => {
      this.loading = false
      this.message = res
      this.router.navigate(['/social-recovery'])
    }).catch((err: any) => {
      this.toastService.error('there was an error', err.message)
      this.message = err.message
      this.loading = false
    })
  }

  next() {
    if (!this.newThreshold) {
      this.message = 'You have to enter a Threshold'
      return
    }

    if (!this.contractService.onboardingGuardians) {
      this.contractService.onboardingGuardians = []
    }

    if (this.newThreshold < 1) {
      // if (this.newThreshold > this.contractService.onboardingGuardians?.length || this.newThreshold < 1) {
      this.message = 'Threshold cant be bigger than guardians count or smaller than one'
      return
    } else {
      this.contractService.onboardingThreshold = this.newThreshold
      this.router.navigate(['/onboarding/create-contract'])
    }
  }



}
