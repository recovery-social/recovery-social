import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialRecoveryOverviewComponent } from './social-recovery-overview/social-recovery-overview.component';
import { RouterModule, Routes } from '@angular/router';
import { SocialRecoveryFriendAddComponent } from './social-recovery-friend-add/social-recovery-friend-add.component';
import { SocialRecoveryRecoveryServiceAddComponent } from './social-recovery-service/social-recovery-service-add/social-recovery-service-add.component';
import { FormsModule } from '@angular/forms';
import { SocialRecoveryRecoveryServiceGuardianAddComponent } from './social-recovery-service/social-recovery-service-guardian-add/social-recovery-service-guardian-add.component';
import { SocialRecoveryEditPasswordComponent } from './social-recovery-edit-password/social-recovery-edit-password.component';
import { SocialRecoveryEditThresholdComponent } from './social-recovery-edit-threshold/social-recovery-edit-threshold.component';
import { UiComponentsModule } from '../ui-components/ui-components.module';
import { SocialRecoveryRecoveryServiceShowComponent } from './social-recovery-service/social-recovery-service-show/social-recovery-service-show.component';
import { SocialRecoveryRecoveryServiceSuccessComponent } from './social-recovery-service/social-recovery-service-success/social-recovery-service-success.component';
import { SocialRecoveryRecoveryServiceSignComponent } from './social-recovery-service/social-recovery-service-sign/social-recovery-service-sign.component';
import { LottieModule } from 'ngx-lottie';

const routes: Routes = [
  { path: '', component: SocialRecoveryOverviewComponent },
  { path: 'friend/add', component: SocialRecoveryFriendAddComponent },
  { path: 'password/edit', component: SocialRecoveryEditPasswordComponent },
  { path: 'threshold/edit', component: SocialRecoveryEditThresholdComponent },
  { path: 'recovery-service/add', component: SocialRecoveryRecoveryServiceAddComponent },
  { path: 'recovery-service/guardian/add', component: SocialRecoveryRecoveryServiceGuardianAddComponent },
  { path: 'recovery-service/:id/show', component: SocialRecoveryRecoveryServiceShowComponent },
  { path: 'recovery-service/sign', component: SocialRecoveryRecoveryServiceSignComponent },
  { path: 'recovery-service/success', component: SocialRecoveryRecoveryServiceSuccessComponent },
]


@NgModule({
  declarations: [
    SocialRecoveryOverviewComponent,
    SocialRecoveryFriendAddComponent,
    SocialRecoveryEditPasswordComponent,
    SocialRecoveryEditThresholdComponent,
    SocialRecoveryRecoveryServiceAddComponent,
    SocialRecoveryRecoveryServiceGuardianAddComponent,
    SocialRecoveryRecoveryServiceShowComponent,
    SocialRecoveryRecoveryServiceSuccessComponent,
    SocialRecoveryRecoveryServiceSignComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    UiComponentsModule,
    LottieModule
  ]
})
export class SocialRecoveryModule { }
