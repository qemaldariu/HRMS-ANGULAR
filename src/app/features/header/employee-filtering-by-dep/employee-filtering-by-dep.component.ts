import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmployeeModel } from "../../../shared/models/employee.model";
import { EmployeeService } from "../../../shared/services/EmployeeService";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-employee-filtering-by-dep',
  templateUrl: './employee-filtering-by-dep.component.html',
  styleUrls: ['./employee-filtering-by-dep.component.css']
})
export class EmployeeFilteringByDepComponent implements OnInit {
  employees: EmployeeModel[] = [];

  @Input('employee') employee!: EmployeeModel;
  @Output() departmentWasSelected = new EventEmitter<number>();
  protected employeenumber: number;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.employeenumber = 0;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const departmentId = +params['departmentId'];
      this.fetchEmployeesByDepartment(departmentId);
    });
  }

  fetchEmployeesByDepartment(departmentId: number) {
    this.employeeService.getEmployeesByDepartment(departmentId).subscribe(data => {
      this.employees = data.results;
      this.employeenumber = this.employees.length;



    });
  }


}
