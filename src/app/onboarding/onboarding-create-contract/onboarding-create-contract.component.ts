import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from 'src/app/_services/contract.service';

import { AuthService } from 'src/app/_services/auth.service';
import { ToastService } from 'src/app/_services/toast.service';


@Component({
  selector: 'app-onboarding-create-contract',
  templateUrl: './onboarding-create-contract.component.html',
  styleUrls: ['./onboarding-create-contract.component.scss']
})
export class OnboardingCreateContractComponent implements OnInit {
  loading = false
  error?: string

  constructor(private router: Router, private contractService: ContractService, private authService: AuthService, private toastService: ToastService) { }

  ngOnInit(): void { }

  deploy() {
    this.loading = true
    this.contractService.createContract().then(res => {
      console.log('Deploy DONE!')
      this.loading = false
      this.router.navigate(['/onboarding/rights'])
    }).catch(err => {
      console.log('ERROR', err)
      this.toastService.error('there was an error', err?.message ?? err)
      this.error = err?.message ?? err
      this.loading = false
    })
  }
}
