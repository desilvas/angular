import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../employees/employee.service'; 

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees : Employee[];
  dataFromChild : Employee;
  //employeeToDisplay: Employee;

  constructor(private _employeeService: EmployeeService) {
    
   }

  ngOnInit() {
    this.employees = this._employeeService.getEmployees();
    // this.employeeToDisplay = this.employees[0];
  }

  handleNotify(eventData: Employee) {
    this.dataFromChild = eventData;
  } 
  // nextEmployee(): void {
  //   if (this.employeeToDisplay.id <= 2) {
  //     this.employeeToDisplay = this.employees[this.employeeToDisplay.id];
  //   } else {
  //     this.employeeToDisplay = this.employees[0];
  //   }
  // }
}
