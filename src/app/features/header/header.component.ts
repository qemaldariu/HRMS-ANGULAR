import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoginService } from "../../shared/services/LoginService";
import { Router } from "@angular/router";
import {EmployeeModel} from "../../shared/models/employee.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() departmentSelected = new EventEmitter<number>();

  clicked: boolean = false;

  constructor(
    protected loginService: LoginService,
    private router: Router
  ) {}

  @Input('employee') employee!: EmployeeModel;

  Logout() {
    const confirmDelete = confirm('Are you sure you want to logout?');
    if (confirmDelete) {
      this.loginService.logout();
      alert('Logout successful');
    }
  }

  navigatetoEmployee() {
    if (this.loginService.isAuthenticated()) {
      this.router.navigate(['employee']).then();
    } else {
      alert('You should login first to proceed...');
      this.router.navigate(['user-login']).then();
    }
  }

  navigateToDepartment(departmentId: number) {
    this.router.navigate(['filterbydepartment', departmentId]).then();
  }
}
