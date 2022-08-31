import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UiUpCardComponent } from 'src/app/ui-components/ui-up-card/ui-up-card.component';
import { Erc725inspectService } from 'src/app/_services/erc725inspect.service';
import { RecoverService } from 'src/app/_services/recover.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-recover-address',
  templateUrl: './recover-address.component.html',
  styleUrls: ['./recover-address.component.scss']
})
export class RecoverAddressComponent implements OnInit {
  message?: any
  loading = false

  @ViewChild('upCard') upCard?: UiUpCardComponent;

  constructor(
    private router: Router,
    private erc725inspectService: Erc725inspectService,
    public recoverService: RecoverService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
  }


  add() {
    if (!this.recoverService.addressToRecover) {
      this.message = 'You have to enter an address'
      return
    }
    this.loading = true
    this.erc725inspectService.checkIfCanRecover(this.recoverService.addressToRecover).then(res => {
      this.loading = false
      this.message = res
      this.router.navigate(['/recover/process'])
    }).catch(err => {
      this.message = err
      this.toastService.error('there was an error', err)
      this.loading = false
    })
  }

  addressEntered(address: string) {
    this.upCard?.loadERC725(address)
  }

}
