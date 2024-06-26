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
    <section class="signup">
      <div class="container">
        <div class="signup-content">
          <div class="signup-form">
            <p *ngIf="errorMessage.error" id="signup-error">
              {{ errorMessage.message }}
            </p>

            <h2 class="form-title">Sign up</h2>
            <form
              method="POST"
              class="register-form"
              id="register-form"
              (ngSubmit)="register()"
            >
              <div class="form-group">
                <label for="email"><i class="zmdi zmdi-email"></i></label>
                <input
                  type="email"
                  [(ngModel)]="username"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                />
              </div>
              <div class="form-group">
                <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                <input
                  type="password"
                  [(ngModel)]="password"
                  name="pass"
                  id="pass"
                  placeholder="Password"
                />
              </div>

              <div class="form-group form-button">
                <input
                  type="submit"
                  name="signup"
                  id="signup"
                  class="form-submit"
                  value="Register"
                />
              </div>
            </form>
          </div>
          <div class="signup-image">
            <figure>
              <img src="assets/images/signup-image.jpg" alt="sing up image" />
            </figure>
            <a routerLink="/login" class="signup-image-link"
              >I am already member</a
            >
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  username: string = ''; // Initialize username property
  password: string = ''; // Initialize password property
  errorMessage: { error: boolean; message: string } = {
    error: false,
    message: 'Error signing up check your email',
  };
  constructor(private userService: UserService, private router: Router) {}

  register() {
    const userData = {
      email: this.username,
      password: this.password,
    };

    this.userService.registerUser(userData).subscribe(
      (response) => {
        console.log('User registered:', response);
        this.router.navigate(['/confirmcode']);
        localStorage.setItem('email', this.username);
      },
      (error) => {
        this.errorMessage.error = true;
        if (error.error === 'user alreay exists!!') {
          this.errorMessage.message = error.error;
        }
        console.error('Error registering user:', error);
      }
    );
  }
}
