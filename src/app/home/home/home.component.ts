import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { Erc725inspectService } from 'src/app/_services/erc725inspect.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: any
  hasContract?: boolean

  profile?: any
  profileImage?: string

  constructor(
    private authService: AuthService,
    private router: Router,
    private erc725inspectService: Erc725inspectService
  ) { }

  ngOnInit(): void {
    this.authService.checkLoggedIn().then(res => {
      this.user = res

      this.erc725inspectService.findLSP11(this.user).then((contractAddress: any) => {
        console.log('contractAddress', contractAddress)


        this.hasContract = false

        if (contractAddress) {
          console.log('GEFUNDEN ES GIT BEREITS EINEN LSP -> EDIT')
          this.hasContract = true
        } else {
          console.log('ES GIBT NOCH KEINEN CONTRACT -> SELBST EINEN DEPLOYEN')
          this.hasContract = false
        }

      })


      this.erc725inspectService.getUPData(this.user).then((result: any) => {
        console.log('UPData ', result)

        this.profile = result?.value?.LSP3Profile

        if (this.profile?.profileImage?.[0]?.url) {
          this.profileImage = this.erc725inspectService.getIPFSURL(this.profile.profileImage[0].url)
        }
      })
    })
  }

  logout() {
    this.authService.logout()
  }

}
