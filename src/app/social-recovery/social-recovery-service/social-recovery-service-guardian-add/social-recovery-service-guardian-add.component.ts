import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from 'src/app/_services/contract.service';

@Component({
  selector: 'app-social-recovery-service-guardian-add',
  templateUrl: './social-recovery-service-guardian-add.component.html'
})
export class SocialRecoveryRecoveryServiceGuardianAddComponent implements OnInit {
  message?: string
  address?: string

  constructor(private contractService: ContractService, private router: Router) { }

  ngOnInit(): void {
  }

  add() {
    if (!this.address) {
      this.message = 'You have to enter an address'
      return
    }
    this.router.navigate([`/social-recovery/recovery-service/${this.address}/show`])
  }

}
