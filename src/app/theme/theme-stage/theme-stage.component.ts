import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-theme-stage',
  templateUrl: './theme-stage.component.html',
  styleUrls: ['./theme-stage.component.scss']
})
export class ThemeStageComponent implements OnInit {
  showBack = false

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('event.url', event.url)
        if (['/', '/login'].includes(event.url)) {
          this.showBack = false
        } else if (event.url.indexOf('success') > -1) {
          this.showBack = false
        } else {
          this.showBack = true
        }
      }
    })
  }

  ngOnInit(): void {
  }

  back() {
    window.history.back()
  }

}
