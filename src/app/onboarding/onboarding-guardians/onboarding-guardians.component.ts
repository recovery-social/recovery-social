import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from 'src/app/_services/contract.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-onboarding-guardians',
  templateUrl: './onboarding-guardians.component.html',
  styleUrls: ['./onboarding-guardians.component.scss']
})
export class OnboardingGuardiansComponent implements OnInit {


  constructor(
    public contractService: ContractService,
    private router: Router,
    private toastService: ToastService
  ) { }




  ngOnInit(): void {
    if(!this.contractService.onboardingGuardians){
      this.contractService.onboardingGuardians = []
    }
  }

  next() {
    if (!this.contractService.onboardingGuardians || this.contractService.onboardingGuardians?.length < 1) {
      this.router.navigate(['/onboarding/create-contract'])
    } else {
      this.router.navigate(['/onboarding/threshold'])
    }
  }


  removeGuardian(guardian: any) {
    this.contractService.onboardingGuardians = this.contractService.onboardingGuardians?.filter((x: any) => x !== guardian)
  }
}
