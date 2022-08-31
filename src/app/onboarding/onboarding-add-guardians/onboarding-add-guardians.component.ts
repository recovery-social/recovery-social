import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UiUpCardComponent } from 'src/app/ui-components/ui-up-card/ui-up-card.component';
import { ContractService } from 'src/app/_services/contract.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-onboarding-add-guardians',
  templateUrl: './onboarding-add-guardians.component.html',
  styleUrls: ['./onboarding-add-guardians.component.scss']
})
export class OnboardingAddGuardiansComponent implements OnInit {
  address?: string
  message?: string

  @ViewChild('upCard') upCard?: UiUpCardComponent;

  constructor(
    private router: Router,
    private contractService: ContractService,
    private toastService: ToastService
  ) { }


  public guardians: any = []


  ngOnInit(): void { }


  add() {
    if (!this.address) {
      this.message = 'You have to enter an address'
      return
    }
    if (!this.contractService.onboardingGuardians) {
      this.contractService.onboardingGuardians = []
    } else if (this.contractService.onboardingGuardians?.find(x => x === this.address)) {
      this.message = 'This address is already a guardian'
      return
    }

    this.contractService.onboardingGuardians?.push(this.address)
    this.toastService.success('Guardian added successfully')
    this.router.navigate(['/onboarding/guardians'])
  }

  addressEntered(address: string) {
    this.upCard?.loadERC725(address)
  }

}
