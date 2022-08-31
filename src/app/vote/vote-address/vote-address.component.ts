import { Component, OnInit, ViewChild } from '@angular/core';
import { UiUpCardComponent } from 'src/app/ui-components/ui-up-card/ui-up-card.component';
import { Erc725inspectService } from 'src/app/_services/erc725inspect.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-vote-address',
  templateUrl: './vote-address.component.html',
  styleUrls: ['./vote-address.component.scss']
})

export class VoteAddressComponent implements OnInit {
  message?: string
  address?: string
  loading = false
  showNext = false

  @ViewChild('upCard') upCard?: UiUpCardComponent;

  constructor(
    private erc725inspectService: Erc725inspectService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
  }

  add() {
    if (!this.address) {
      this.message = 'You have to enter an address'
      return
    }
    this.loading = true
    this.erc725inspectService.checkIfCanVoteForFriend(this.address).then(res => {
      console.log('res', res)
      this.loading = false
      if (res) {
        this.showNext = true
      } else {
        this.message = 'You can not vote for this address'
      }
    }).catch(err => {
      this.toastService.error('there was an error', err)
      this.message = err
      this.loading = false
    })
  }

  addressEntered(address: string) {
    this.upCard?.loadERC725(address)
  }
}