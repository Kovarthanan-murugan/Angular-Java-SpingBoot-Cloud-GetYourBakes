import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import {UserService} from './login-registration-service/loginregistration.service'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent,RouterModule,],
  template: `
  <main>
      <header class="brand-name">
      <ul>
      <li><a href="" (click)="signOut()">Signout</a></li>
      <li><a routerLink="/cart">Cart</a></li>
      <li><a routerLink="">Home</a></li>

      
    </ul>   
      </header>
    <section class="content">
      <router-outlet></router-outlet>
    </section>
  </main>
`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'homes';

  constructor(private userService:UserService){
    
  }

  signOut(){

    this.userService.signOut()
    localStorage.setItem("currentUser","");

  }
}

// <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
// <button (click) = "signOut()">SignOut</button>