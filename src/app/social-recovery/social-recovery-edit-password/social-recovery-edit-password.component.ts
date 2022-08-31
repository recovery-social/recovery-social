import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from 'src/app/_services/contract.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-social-recovery-edit-password',
  templateUrl: './social-recovery-edit-password.component.html',
  styleUrls: ['./social-recovery-edit-password.component.scss']
})
export class SocialRecoveryEditPasswordComponent implements OnInit {
  message?: any
  newpassword?: string
  loading = false

  constructor(private contractService: ContractService, private router: Router, private toastService: ToastService) { }

  ngOnInit(): void {
  }

  add() {
    if (!this.newpassword) {
      this.message = 'You have to enter a password'
      return
    }
    this.loading = true
    this.contractService.setSecret(this.newpassword).then((res: any) => {
      this.loading = false
      this.message = res
      this.router.navigate(['/social-recovery'])
    }).catch((err: any) => {
      this.toastService.error('there was an error', err)
      this.message = err
      this.loading = false
    })
  }

}
