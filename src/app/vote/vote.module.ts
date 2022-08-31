import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoteAddressComponent } from './vote-address/vote-address.component';
import { VoteProcessComponent } from './vote-process/vote-process.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UiComponentsModule } from '../ui-components/ui-components.module';
import { VoteForNewOwnerComponent } from './vote-for-new-owner/vote-for-new-owner.component';
import { VoteSuccessComponent } from './vote-success/vote-success.component';
import { LottieModule } from 'ngx-lottie';

const routes: Routes = [
  { path: 'address', component: VoteAddressComponent },
  { path: 'process', component: VoteProcessComponent },
  { path: 'for-new-owner', component: VoteForNewOwnerComponent },
  { path: 'success', component: VoteSuccessComponent },
]

@NgModule({
  declarations: [
    VoteAddressComponent,
    VoteProcessComponent,
    VoteForNewOwnerComponent,
    VoteSuccessComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    UiComponentsModule,
    LottieModule
  ]
})
export class VoteModule { }
