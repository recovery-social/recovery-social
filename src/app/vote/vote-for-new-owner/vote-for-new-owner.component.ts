import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UiUpCardComponent } from 'src/app/ui-components/ui-up-card/ui-up-card.component';
import { ToastService } from 'src/app/_services/toast.service';
import { VoteService } from 'src/app/_services/vote.service';

@Component({
  selector: 'app-vote-for-new-owner',
  templateUrl: './vote-for-new-owner.component.html',
  styleUrls: ['./vote-for-new-owner.component.scss']
})
export class VoteForNewOwnerComponent implements OnInit {
  loading = false
  voteForAddress?: string

  @ViewChild('upCard') upCard?: UiUpCardComponent;

  constructor(
    private voteService: VoteService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  vote() {
    this.loading = true
    this.voteService.voteToRecover(this.voteService.recoveryProcessID, this.voteForAddress).then(res => {
      this.loading = false
      if (res) {
        console.log('VOTE MADE! CELEBRATE')
      }
      this.router.navigate(['/vote/success'])
    }).catch(err => {
      this.toastService.error('there was an error', err)
      this.loading = false
    })

  }




  addressEntered(address: string) {
    this.upCard?.loadERC725(address)
  }

}
