import { UserInput } from './../user-input/user-input';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [UserInput],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
