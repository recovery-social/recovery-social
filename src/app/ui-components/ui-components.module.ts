import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiUpCardComponent } from './ui-up-card/ui-up-card.component';
import { UiRecoveryServiceComponent } from './ui-recovery-service/ui-recovery-service.component';
import { UiLoadingAnimationComponent } from './ui-loading-animation/ui-loading-animation.component';
import { LottieModule } from 'ngx-lottie';



@NgModule({
  declarations: [
    UiUpCardComponent,
    UiRecoveryServiceComponent,
    UiLoadingAnimationComponent
  ],
  exports: [
    UiUpCardComponent,
    UiRecoveryServiceComponent,
    UiLoadingAnimationComponent
  ],
  imports: [
    CommonModule,
    LottieModule
  ]
})
export class UiComponentsModule { }
