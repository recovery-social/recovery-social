import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { ContractService } from 'src/app/_services/contract.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-onboarding-rights',
  templateUrl: './onboarding-rights.component.html',
  styleUrls: ['./onboarding-rights.component.scss']
})
export class OnboardingRightsComponent implements OnInit {
  loading = false
  error?: string

  constructor(private router: Router, private contractService: ContractService, private authService: AuthService, private toastService: ToastService) { }

  ngOnInit(): void {
  }

  create() {
    this.loading = true
    this.contractService.setRights().then(res => {
      this.loading = false
      this.router.navigate(['/onboarding/success'])
    }).catch(err => {
      this.error = err
      this.toastService.error('there was an error', err)
      this.loading = false
    })
  }
}
