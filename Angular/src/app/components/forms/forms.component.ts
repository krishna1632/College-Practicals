import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent {
  myForm: FormGroup;
  currentStep = 1;
  showPassword = false;
  passwordStrength = 0;
  passwordStrengthText = 'Weak';
  showSuccessMessage = false;
  showEmailConfirmation = false;
  isSubmitting = false;

  constructor() {
    this.myForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordField = document.querySelector(
      '[formControlName="password"]'
    ) as HTMLInputElement;
    if (passwordField) {
      passwordField.type = this.showPassword ? 'text' : 'password';
    }
  }

  checkPasswordStrength() {
    const password = this.myForm.get('password')?.value;
    if (!password) {
      this.passwordStrength = 0;
      return;
    }

    let strength = 0;

    // Length check
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;

    // Complexity checks
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    // Cap at 4 for our meter
    this.passwordStrength = Math.min(4, strength);

    // Set strength text
    switch (this.passwordStrength) {
      case 1:
        this.passwordStrengthText = 'Very Weak';
        break;
      case 2:
        this.passwordStrengthText = 'Weak';
        break;
      case 3:
        this.passwordStrengthText = 'Good';
        break;
      case 4:
        this.passwordStrengthText = 'Strong';
        break;
      default:
        this.passwordStrengthText = 'Very Weak';
    }
  }

  sendConfirmationEmail() {
    this.showEmailConfirmation = true;
    setTimeout(() => {
      this.showEmailConfirmation = false;
    }, 3000);
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.isSubmitting = true;

      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        this.showSuccessMessage = true;
        this.myForm.reset();
        this.currentStep = 1;

        // Hide success message after 5 seconds
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 5000);
      }, 2000);
    }
  }
}
