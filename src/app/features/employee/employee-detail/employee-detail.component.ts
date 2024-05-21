import { Component, Input, OnInit } from '@angular/core';
import { DepartmentModel, EmployeeModel } from '../../../shared/models/employee.model';
import { EmployeeService } from '../../../shared/services/EmployeeService';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
})
export class EmployeeDetailComponent implements OnInit {
  alertupdate: boolean = false;
  url = 'http://127.0.0.1:8000/employee';
  isLoading: boolean = true;
  id!: string;
  private myReactiveForm!: FormGroup<{
    name: FormControl<string | null>;
    surname: FormControl<string | null>;
    address: FormControl<string | null>;
    birthplace: FormControl<string | null>;
    birthday: FormControl<Date | null>;

    department: FormControl<DepartmentModel | null>;
  }>;

  @Input() employeeCh!: EmployeeModel;

  constructor(
    private employeeService: EmployeeService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    const departments = this.employeeService.getDepartments()
    console.log('Departments from detail', departments)
    this.http.get<EmployeeModel>(this.url + '/modify_employee/' + id + '/').subscribe(
      (value: EmployeeModel) => {
        console.log(value);
        this.employeeCh = value;
        this.myReactiveForm = new FormGroup({
          'name': new FormControl(value.name, [
            Validators.required,
            Validators.maxLength(10),
            Validators.minLength(5),
          ]),
          'surname': new FormControl(value.surname, Validators.required),
          'address': new FormControl(value.address, Validators.required),
          'birthplace': new FormControl(value.birthplace, Validators.required),
          'birthday': new FormControl(value.birthday, Validators.required),
          'department': new FormControl(value.department, Validators.required),
        });
        this.isLoading = false;
      }
    );
  }

  saveChanges() {
    this.employeeService.updateEmployee(this.employeeCh).subscribe(() => {
      this.employeeService.reloadData();
      this.alertupdate = true;
    });
  }

  closeAlert() {
    this.alertupdate = false;
    this.router.navigate(['employee']).then();
  }
}
