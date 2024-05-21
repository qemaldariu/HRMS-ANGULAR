import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {DepartmentModel, EmployeeModel} from "../models/employee.model";
import {LoginService} from "./LoginService";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private authToken: string | null = null;

  private apiUrl = 'http://127.0.0.1:8000/employee';
  private dataSubject = new Subject<EmployeeModel[]>();
  data$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient, private loginService: LoginService) {
    this.authToken = localStorage.getItem('token');

    this.loginService.loginEvent.subscribe(() => {
      this.reloadData();
    });


  }




  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (this.authToken) {
      headers = headers.append('Authorization', `Token ${this.authToken}`);
    }
    return headers;
  }
  getDepartments(): Observable<DepartmentModel[]> {
    const url = `${this.apiUrl}/create_department_list/`;
    const headers = this.getHeaders();
    console.log('Getting departments', url, { headers })
    return this.http.get<DepartmentModel[]>(url, { headers });
  }


  getEmployees(page?: number): Observable<any> {
    const url = `${this.apiUrl}/create_employee_list/`;
    const headers = this.getHeaders();
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page.toString());
    }
    return this.http.get<EmployeeModel[]>(url, { headers, params });
  }



  deleteEmployee(id: string): Observable<any> {
    const url = `${this.apiUrl}/modify_employee/${id}/`;
    const headers = this.getHeaders();
    return this.http.delete(url, { headers });
  }

  updateEmployee(updatedEmployee: EmployeeModel): Observable<any> {
    const url = `${this.apiUrl}/modify_employee/${updatedEmployee.id}/`;
    const headers = this.getHeaders();
    return this.http.put(url, updatedEmployee, { headers });
  }

  postNewEmployee(name: string,surname:string, address: string,birthplace:string,birthday:Date,datejoined:Date, salary:number,department: string): Observable<any> {
    const url = `${this.apiUrl}/new_employee/`;
    const newEmployee = {
      name: name,
      surname:surname,
      address: address,
      birthplace:birthplace,
      birthday:birthday,
      datejoined:datejoined,
      salary:salary,
      department: department,


    };
    const headers = this.getHeaders();
    return this.http.post(url, newEmployee, { headers });
  }

  reloadData(page?: number): void {
    this.getEmployees(page).subscribe(data => {
      this.dataSubject.next(data);
    });
  }
  getEmployeesByDepartment(departmentId: number): Observable<any> {
    const url = `${this.apiUrl}/create_employee_list/?department=${departmentId}`;
    const headers = this.getHeaders();
    return this.http.get<EmployeeModel[]>(url, { headers });}


}
