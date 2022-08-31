import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { ContractService } from 'src/app/_services/contract.service';
import { ToastService } from 'src/app/_services/toast.service';
import { VoteService } from 'src/app/_services/vote.service';

@Component({
  selector: 'app-vote-process',
  templateUrl: './vote-process.component.html',
  styleUrls: ['./vote-process.component.scss']
})
export class VoteProcessComponent implements OnInit {
  recoveryProcessIDs = []
  loading = false
  addNew = false

  constructor(
    public voteService: VoteService,
    private contractService: ContractService,
    private authService: AuthService,
    private toastService: ToastService,
  ) { }


  ngOnInit(): void {

    this.contractService.getRecoverProcessesIds(this.voteService.LSP11ContractAddressVote).then((res: any) => {
      var processIds_: any = []

      for (let id of res) {
        processIds_.push(this.authService.web3.utils.hexToAscii(id))
      }
      this.recoveryProcessIDs = processIds_
    }).catch(err => {
      this.toastService.error('there was an error', err)

    })
  }

  select(process: any) {
    this.addNew = false
    this.voteService.recoveryProcessID = process
    console.log('get g vote')
    this.voteService.getGuardiansVote(this.voteService.recoveryProcessID, this.authService.user).then((res: any) => {

      console.log('already voted for', res)

    }).catch(err => {
      this.toastService.error('there was an error', err)

    })
  }


}
