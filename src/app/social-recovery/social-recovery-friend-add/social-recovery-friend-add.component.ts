import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UiUpCardComponent } from 'src/app/ui-components/ui-up-card/ui-up-card.component';
import { ContractService } from 'src/app/_services/contract.service';
import { Erc725inspectService } from 'src/app/_services/erc725inspect.service';

@Component({
  selector: 'app-social-recovery-friend-add',
  templateUrl: './social-recovery-friend-add.component.html',
  styleUrls: ['./social-recovery-friend-add.component.scss']
})
export class SocialRecoveryFriendAddComponent implements OnInit {
  message?: any
  address?: string
  loading = false

  @ViewChild('upCard') upCard?: UiUpCardComponent;

  constructor(private contractService: ContractService, private erc725inspectService: Erc725inspectService, private router: Router) { }

  ngOnInit(): void {
  }

  add() {
    if (!this.address) {
      this.message = 'You have to enter an address'
      return
    }
    this.loading = true
    this.contractService.addGuardian(this.address).then(res => {
      this.loading = false
      this.message = res
      this.router.navigate(['/social-recovery'])
    }).catch(err => {
      this.message = err
      this.loading = false
    })
  }

  addressEntered(address: string) {
    this.upCard?.loadERC725(address)
  }

}
