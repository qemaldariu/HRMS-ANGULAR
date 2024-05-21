import { Component } from '@angular/core';
import {LoginService} from "./shared/services/LoginService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(protected loginService: LoginService) {

  }

  title = 'HR_Management';

}
