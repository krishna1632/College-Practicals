import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ButtonComponent } from './components/button/button.component';
import { ListComponent } from './components/list/list.component';
import { DataBindingComponent } from './components/data-binding/data-binding.component';
import { FormsComponent } from './components/forms/forms.component';
import { CounterComponent } from './components/counter/counter.component';
import { TodoComponent } from './components/todo/todo.component';

@Component({
  selector: 'app-root',
  imports: [
    WelcomeComponent,
    ButtonComponent,
    ListComponent,
    DataBindingComponent,
    FormsComponent,
    CounterComponent,
    TodoComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Angular';
}
