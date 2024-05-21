import { Component } from '@angular/core';
import {EmployeeService} from "../../shared/services/EmployeeService";
import {EmployeeModel} from "../../shared/models/employee.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  name:string='';
  address:string='';
  department:string='';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {

  }
  employee!:EmployeeModel

  navigateToDetails($event: EmployeeModel) {
    this.router.navigate(['details', $event.id]).then()
  }
}
