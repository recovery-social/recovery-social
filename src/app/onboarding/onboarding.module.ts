import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingCreateContractComponent } from './onboarding-create-contract/onboarding-create-contract.component';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingPasswordComponent } from './onboarding-password/onboarding-password.component';
import { OnboardingRightsComponent } from './onboarding-rights/onboarding-rights.component';
import { FormsModule } from '@angular/forms';
import { OnboardingSuccessComponent } from './onboarding-success/onboarding-success.component';
import { OnboardingAddGuardiansComponent } from './onboarding-add-guardians/onboarding-add-guardians.component';
import { OnboardingSetThresholdComponent } from './onboarding-set-threshold/onboarding-set-threshold.component';
import { LottieModule } from 'ngx-lottie';
import { UiComponentsModule } from '../ui-components/ui-components.module';
import { OnboardingGuardiansComponent } from './onboarding-guardians/onboarding-guardians.component';

const routes: Routes = [
  { path: 'create-contract', component: OnboardingCreateContractComponent },
  { path: 'password', component: OnboardingPasswordComponent },
  { path: 'guardians', component: OnboardingGuardiansComponent },
  { path: 'guardians/add', component: OnboardingAddGuardiansComponent },
  { path: 'threshold', component: OnboardingSetThresholdComponent },
  { path: 'rights', component: OnboardingRightsComponent },
  { path: 'success', component: OnboardingSuccessComponent },
]

@NgModule({
  declarations: [
    OnboardingCreateContractComponent,
    OnboardingPasswordComponent,
    OnboardingRightsComponent,
    OnboardingSuccessComponent,
    OnboardingAddGuardiansComponent,
    OnboardingSetThresholdComponent,
    OnboardingGuardiansComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    LottieModule,
    UiComponentsModule
  ]
})
export class OnboardingModule { }
