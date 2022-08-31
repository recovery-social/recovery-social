import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ThemeStageComponent } from './theme/theme-stage/theme-stage.component';

const routes: Routes = [
  {
    path: 'login', component: ThemeStageComponent, children: [
      { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    ]
  },
  {
    path: '', component: ThemeStageComponent, canActivate: [AuthGuard], children: [
      { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: 'onboarding', loadChildren: () => import('./onboarding/onboarding.module').then(m => m.OnboardingModule) },
      { path: 'recover', loadChildren: () => import('./recover/recover.module').then(m => m.RecoverModule) },
      { path: 'social-recovery', loadChildren: () => import('./social-recovery/social-recovery.module').then(m => m.SocialRecoveryModule) },
      { path: 'vote', loadChildren: () => import('./vote/vote.module').then(m => m.VoteModule) },
    ]
  },
  {
    path: '**', redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
