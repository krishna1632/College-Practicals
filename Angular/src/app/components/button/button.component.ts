import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  showMessage: boolean = false;

  toggleMessage() {
    this.showMessage = !this.showMessage;
  }

  resetMsg() {
    this.showMessage = false;
  }
}
