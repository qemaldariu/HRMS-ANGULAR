export interface EmployeeModel {
  id?: string;
  name: string;

  surname: string;
  address: string;
  birthplace: string;
  birthday:Date;
  datejoined:Date;
  salary:number;
  department: DepartmentModel;
}

export interface DepartmentModel {
  id?: string;
  department: string;
}
