import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { ContractService } from 'src/app/_services/contract.service';

@Component({
  selector: 'app-onboarding-password',
  templateUrl: './onboarding-password.component.html',
  styleUrls: ['./onboarding-password.component.scss']
})
export class OnboardingPasswordComponent implements OnInit {
  error?: string
  password?: string

  constructor(private router: Router, private contractService: ContractService, private authService: AuthService) { }


  ngOnInit(): void { }


  create() {
    if (!this.password) {
      this.error = 'You have to enter a password'
      return
    }

    this.contractService.onboardingPassword = this.password
    this.router.navigate(['/onboarding/guardians'])
  }

}
