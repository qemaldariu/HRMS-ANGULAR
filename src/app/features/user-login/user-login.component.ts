
import { Component } from '@angular/core';
import {LoginService} from "../../shared/services/LoginService";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  username: string = '';
  password: string = '';


  constructor(private loginService: LoginService) { }

  login() {
    this.loginService.login(this.username, this.password)
      .subscribe(
        () => {
          alert('Login successful');
        },
        (error: any) => {
          alert(error)
        }
      );
  }
}
