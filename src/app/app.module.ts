import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeStageComponent } from './theme/theme-stage/theme-stage.component';
import { LottieModule } from 'ngx-lottie';
import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './auth/auth.guard';

export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}

@NgModule({
  declarations: [
    AppComponent,
    ThemeStageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory }),
    ToastNoAnimationModule.forRoot(),

  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
