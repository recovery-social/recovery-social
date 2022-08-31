import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecoverAddressComponent } from './recover-address/recover-address.component';
import { RecoverProcessComponent } from './recover-process/recover-process.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UiComponentsModule } from '../ui-components/ui-components.module';
import { RecoverRecoveryServiceShowComponent } from './recover-recovery-service-show/recover-recovery-service-show.component';
import { RecoverRecoveryServiceSignComponent } from './recover-recovery-service-sign/recover-recovery-service-sign.component';
import { RecoverRecoveryServiceSuccessComponent } from './recover-recovery-service-success/recover-recovery-service-success.component';
import { LottieModule } from 'ngx-lottie';
import { RecoverRecoveryServiceProcessComponent } from './recover-recovery-service-process/recover-recovery-service-process.component';
import { RecoverSecretComponent } from './recover-secret/recover-secret.component';
import { RecoverSuccessComponent } from './recover-success/recover-success.component';

const routes: Routes = [
  { path: '', component: RecoverAddressComponent },
  { path: 'secret', component: RecoverSecretComponent },
  { path: 'success', component: RecoverSuccessComponent },
  { path: 'process', component: RecoverProcessComponent },
  { path: 'recovery-service/:id/show', component: RecoverRecoveryServiceShowComponent },
  { path: 'recovery-service/process', component: RecoverRecoveryServiceProcessComponent },
  { path: 'recovery-service/sign', component: RecoverRecoveryServiceSignComponent },
  { path: 'recovery-service/success', component: RecoverRecoveryServiceSuccessComponent },
]

@NgModule({
  declarations: [
    RecoverAddressComponent,
    RecoverProcessComponent,
    RecoverRecoveryServiceShowComponent,
    RecoverRecoveryServiceSignComponent,
    RecoverRecoveryServiceSuccessComponent,
    RecoverRecoveryServiceProcessComponent,
    RecoverSecretComponent,
    RecoverSuccessComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LottieModule,
    RouterModule.forChild(routes),
    UiComponentsModule,
  ]
})
export class RecoverModule { }