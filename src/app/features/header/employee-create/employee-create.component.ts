import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {EmployeeModel} from "../../../shared/models/employee.model";
import {EmployeeService} from "../../../shared/services/EmployeeService";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit{
  // name:string = '';
  // address:string='';
  // department:string='';
  @ViewChild('myForm') myForm!: NgForm;

  name: string = '';
  address: string = '';
  department: string = '';

  employeeCreateReactiveForm !: FormGroup;
  forbiddenNames = ['view', 'window']
  currentPage: number = 1;




  constructor(
    private employeeService: EmployeeService,
    private http: HttpClient,private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.employeeCreateReactiveForm = new FormGroup({
      'name': new FormControl(
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(5),
          this.customValidator.bind(this)
        ]),
      'surname':new FormControl,
      'birthplace':new FormControl,
      'birthday':new FormControl,

      'address': new FormControl,
      'salary': new FormControl,

      'department': new FormControl(null, Validators.required),
    })
  }



  customValidator(control: FormControl): { [s: string]: boolean } | null {
    if (this.forbiddenNames.indexOf(control.value) >= 0) {
      return {'nameIfForbidden': true}
    }
    return null;
  }

  onSubmit() {
    const formValues = this.employeeCreateReactiveForm.value;

    this.employeeService.postNewEmployee(
      formValues.name,
      formValues.surname,
      formValues.address,

      formValues.birthplace,
      formValues.birthday,
      formValues.datejoined,

      formValues.salary,


      formValues.department
    ).subscribe(data => {
      this.employeeService.reloadData(this.currentPage);
      this.employeeCreateReactiveForm.reset();
      this.router.navigate(['dashboard']).then(() => {
        this.router.navigate(['employee']).then();
      });
    });

    console.log(this.employeeCreateReactiveForm.controls['name'].valid);
  }

}
