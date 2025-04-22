import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  names: string[] = [
    'Siya-Ram',
    'Radha-Krishn',
    'Lakshmi-Narayan',
    'Gauri-Shankar',
    'Ardhnareshwar',
  ];
}
