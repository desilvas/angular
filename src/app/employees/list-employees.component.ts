import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../employees/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StaticInjector } from '@angular/core/src/di/injector';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  filtereEmployees(searchString: string): Employee[] {

    return this.employees.filter(employee =>
      employee.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);

  }
  employees: Employee[];
  filteredEmployees: Employee[];
  dataFromChild: Employee;

  private _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.filtereEmployees(value);
  }

  //employeeToDisplay: Employee;

  constructor(private _employeeService: EmployeeService, private _router: Router, private _route: ActivatedRoute) {
   this.employees =   _route.snapshot.data['employeeList'];

   if (this._route.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
    } else {
      this.filteredEmployees = this.employees;
    }
  }

  // onClick(employeeId: number) {
  //   // this._router.navigate(['/employees', employeeId]);
  //   this._router.navigate(['employees', employeeId], {
  //     queryParams: { 'searchTerm': this.searchTerm, 'testParam': 'testValue' }
  //   });



  // }

  ngOnInit() {
    // this._employeeService.getEmployees().subscribe((empList) => {
    //   this.employees = empList;

    //   this._route.queryParamMap.subscribe(params => {
    //     if (params.has('searchTerm')) {
    //       this.searchTerm = params.get('searchTerm');
    //     } else {
    //       this.filteredEmployees = this.employees;
    //       // console.log(this.employees.length);
    //     }
    //   });

    // });
    //this.filteredEmployees = this.employees;
    // this.employeeToDisplay = this.employees[0];



    // if (this._route.snapshot.queryParamMap.has('searchTerm')) {
    //   this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
    // } else {
    //   this.filteredEmployees = this.employees;
    // }
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
