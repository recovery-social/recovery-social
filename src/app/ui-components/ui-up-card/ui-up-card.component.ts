import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { ContractService } from 'src/app/_services/contract.service';
import { Erc725inspectService } from 'src/app/_services/erc725inspect.service';
import { RecoveryserviceService } from 'src/app/_services/recoveryservice.service';

@Component({
  selector: 'app-ui-up-card',
  templateUrl: './ui-up-card.component.html',
  styleUrls: ['./ui-up-card.component.scss']
})
export class UiUpCardComponent implements OnInit {
  @Input() address?: string
  @Input() loading = false
  @Input() showDelete = false
  @Input() recoveryService = false

  @Output() onDelete = new EventEmitter()

  profile?: any
  profileImage?: string


  constructor(
    public erc725inspectService: Erc725inspectService,
    public contractService: ContractService,
    public authService: AuthService,
    public recoveryServiceService: RecoveryserviceService,
  ) { }

  ngOnInit(): void {
    if (this.address) {
      if (this.recoveryService) {

        this.recoveryServiceService.getInfosRecoveryServiceforAddress(this.address, this.contractService.LSP11ContractAddress).then(result => {
          this.profile = result
          console.log('this.image', this.profile)
          this.profileImage = this.profile.imageUrl
        })
      } else {
        this.loadERC725(this.address)
      }
    }
  }

  loadERC725(address: string) {
    this.address = address
    this.erc725inspectService.getUPData(address).then(result => {
      this.profile = result?.value?.LSP3Profile

      if (this.profile?.profileImage?.[0]?.url) {
        this.profileImage = this.erc725inspectService.getIPFSURL(this.profile.profileImage[0].url)
      } else {
        this.profileImage = '/assets/img/placeholder.svg'
      }
    })
  }


  getRecoverPrice(profile: any) {

    if (!profile.price) {
      return profile.priceforAddress
    }

    if (!profile.priceforAddress) {
      return profile.price
    }


    if (profile.price >= profile.priceforAddress) {
      return profile.priceforAddress
    } else {
      return profile.price
    }
  }

}
