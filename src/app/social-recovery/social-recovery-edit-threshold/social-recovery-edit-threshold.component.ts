import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from 'src/app/_services/contract.service';
import { Erc725inspectService } from 'src/app/_services/erc725inspect.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-social-recovery-edit-threshold',
  templateUrl: './social-recovery-edit-threshold.component.html',
  styleUrls: ['./social-recovery-edit-threshold.component.scss']
})
export class SocialRecoveryEditThresholdComponent implements OnInit {
  message?:any
  currentThreshold?:number
  newThreshold?:number
  loading = false
  guardiansCount? : number

  constructor(
    private contractService:ContractService,
     private router:Router,
     private erc725inspectService: Erc725inspectService,
     private toastService: ToastService
     ) { }

  ngOnInit(): void {

    this.contractService.getThreshold().then((threshold : any) => {
      this.currentThreshold = threshold
     }).catch(err => {
      this.toastService.error('there was an error' ,err)
       console.log('err', err)
     })

     this.contractService.getGuardians().then((guardians : any) => {
      this.guardiansCount = guardians.length



     }).catch(err => {
      this.toastService.error('there was an error' ,err)
       console.log('err', err)
     })
  }


  add() {
    if (!this.newThreshold) {
      this.message = 'You have to enter a Threshold'
      return
    }

    if(this.guardiansCount){
      if(this.newThreshold > this.guardiansCount || this.newThreshold < 1){
        this.message = 'Threshold cant be bigger than guardians count or smaller than one'
        return
      }else{
        this.loading = true
        this.contractService.setThreshold(this.newThreshold).then((res : any) => {
          this.loading = false
          this.message = res
          this.router.navigate(['/social-recovery'])
        }).catch((err : any) => {
          this.toastService.error('there was an error' ,err.message)
          this.message = err.message
          this.loading = false
        })
      }
    }
  }

}
