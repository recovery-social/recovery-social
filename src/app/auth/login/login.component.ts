import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.loading = true
    this.authService.login().then(user => {
      console.log('loggedIn')
      this.loading = false
      this.router.navigate(['/'])
    }).catch(error =>{
      this.loading = false
    })
    
  }

}
