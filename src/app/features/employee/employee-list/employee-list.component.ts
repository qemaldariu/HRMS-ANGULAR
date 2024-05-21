import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DepartmentModel, EmployeeModel } from "../../../shared/models/employee.model";
import { EmployeeService } from "../../../shared/services/EmployeeService";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  @Output() employeeWasSelected = new EventEmitter<EmployeeModel>();
  employees: EmployeeModel[] = [];
  currentPage: number = 1;
  filterInput: string = '';

  protected employeenumber: any;
  constructor(
    private employeeService: EmployeeService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.getEmployees(this.currentPage);
  }

  getEmployees(page: number) {
    let departments: DepartmentModel[] = [];
    this.employeeService.getDepartments().subscribe(data => {
      departments = data;
      console.log('Departments:', departments);
    });

    this.employeeService.getEmployees(page).subscribe(data => {
      this.employees = data.results;
      this.employeenumber = this.employees.length;
      console.log('Employees:', this.employees);
    });


  }
  onEditClick(employee: EmployeeModel) {
    this.employeeWasSelected.emit(employee);
    console.log('Selected employee:', employee);
    this.router.navigate(['employee', 'details', employee.id]).then(() => {});
  }


  deleteEmployee(employee: EmployeeModel) {
    const confirmDelete = confirm(`Are you sure you want to delete ${employee.name}?`);
    if (confirmDelete) {
      this.employeeService.deleteEmployee(employee.id as string).subscribe(() => {
        alert(`Employee ${employee.name} was successfully deleted!`);
        this.getEmployees(this.currentPage);
      }, error => {
        alert("An error occurred while deleting the employee.");
      });
    }
  }

  backward() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getEmployees(this.currentPage);
    }
  }

  forward() {
    this.currentPage++;
    this.getEmployees(this.currentPage);
  }
}
