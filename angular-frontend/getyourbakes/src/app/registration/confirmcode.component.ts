import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
import { UserService } from '../login-registration-service/loginregistration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule], // Include FormsModule
  template: `
    <div class="container">
      <h2>Enter the confirmation code</h2>
      <form (ngSubmit)="confirmCode()">
        <div class="form-group">
          <p *ngIf="confirmCodeError" id="confirm-code-error">Wrong Code</p>
          <label for="confirmcodeinput" id="confirm-code">ConfirmCode:</label>
          <input
            type="text"
            id="username"
            [(ngModel)]="confirmcode"
            name="confirmcodeinput"
            class="form-control"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">ConfirmCode</button>
      </form>
    </div>
  `,
  styleUrls: ['./registration.component.css'],
})
export class ConfirmCode {
  confirmcode: string = ''; // Initialize username property
  confirmCodeError: Boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  confirmCode() {
    const userData = {
      email: localStorage.getItem('email'),
      ConfirmationCode: this.confirmcode,
    };

    this.userService.confirmCode(userData).subscribe(
      (response) => {
        console.log('Code Confirmed', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        this.confirmCodeError = true;
        console.error('Error Code Confirmed:', error);
      }
    );
  }
}
