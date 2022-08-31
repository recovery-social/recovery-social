import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecoverService } from 'src/app/_services/recover.service';
import { RecoveryserviceService } from 'src/app/_services/recoveryservice.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-recover-secret',
  templateUrl: './recover-secret.component.html',
  styleUrls: ['./recover-secret.component.scss']
})
export class RecoverSecretComponent implements OnInit {
  loading = false
  secret?: string
  newsecret?: string

  constructor(
    private recoverService: RecoverService,
    private recoveryServiceService: RecoveryserviceService,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
  }

  recover() {
    this.loading = true
    this.recoverService.recoverOwnership(this.recoveryServiceService.recoveryProcessID, this.secret, this.newsecret).then(res => {
      this.loading = false

      console.log('YOU NOW HAVE ACCESS TO THE UP')
      this.router.navigate(['/recover/success'])
    }).catch(err => {
      this.toastService.error('there was an error', err)
      this.loading = false
    })
  }
}
