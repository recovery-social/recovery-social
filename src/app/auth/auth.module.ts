import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { LottieModule } from 'ngx-lottie';
import { UiComponentsModule } from '../ui-components/ui-components.module';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
]

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LottieModule,
    UiComponentsModule
  ]
})
export class AuthModule { }
