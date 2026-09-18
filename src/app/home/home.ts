import { UserInput } from './../user-input/user-input';
import { Component } from '@angular/core';
import { StatusComponent } from "../status-component/status-component";

@Component({
  selector: 'app-home',
  imports: [UserInput, StatusComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
