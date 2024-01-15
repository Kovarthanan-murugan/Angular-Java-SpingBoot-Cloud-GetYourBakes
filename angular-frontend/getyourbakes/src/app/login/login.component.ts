import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
import { UserService } from '../login-registration-service/loginregistration.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // Include FormsModule
  template: `
    <section class="sign-in">
      <div class="container">
        <div class="signin-content">
          <div class="signin-image">
            <figure>
              <img
                src="../assets/images/signin-image.jpg"
                alt="sing up image"
              />
            </figure>
            <a routerLink="/registration" class="signup-image-link"
              >Create an account</a
            >
          </div>

          <div class="signin-form">
            <h2 class="form-title">Sign up</h2>
            <form
              method="POST"
              class="register-form"
              id="login-form"
              (ngSubmit)="login()"
            >
              <p *ngIf="loginCredentialStatus" id="wrongcredential">
                Wrong Credential
              </p>
              <div class="form-group">
                <label for="your_name"
                  ><i class="zmdi zmdi-account material-icons-name"></i
                ></label>
                <input
                  type="text"
                  name="your_name"
                  id="your_name"
                  [(ngModel)]="username"
                  placeholder="Your Name"
                />
              </div>
              <div class="form-group">
                <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                <input
                  type="password"
                  name="your_pass"
                  id="your_pass"
                  [(ngModel)]="password"
                  placeholder="Password"
                />
              </div>
              <div class="form-group">
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  class="agree-term"
                />
                <label for="remember-me" class="label-agree-term"
                  ><span><span></span></span>Remember me</label
                >
              </div>
              <div class="form-group form-button">
                <input
                  type="submit"
                  name="signin"
                  id="signin"
                  class="form-submit"
                  value="Log in"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = ''; // Initialize username property
  password: string = ''; // Initialize password property
  loginCredentialStatus: Boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  login() {
    const userData = {
      email: this.username,
      password: this.password,
    };

    this.userService.login(userData).subscribe(
      (response) => {
        console.log('User Login:', response);
        this.router.navigate(['']);
        localStorage.setItem('currentUser', this.username);
      },
      (error) => {
        this.loginCredentialStatus = true;
        console.error('Error login user:', error);
      }
    );
  }
}
