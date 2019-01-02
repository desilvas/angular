import { Component, OnInit, Input, OnChanges, SimpleChanges , Output, EventEmitter } from '@angular/core';
import { Employee } from '../models/employee.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})

export class DisplayEmployeeComponent implements OnInit {
  @Input()
  employee: Employee;
  selectedEmployeeId: number;
  
  getNameAndGender(): string {
    return this.employee.name + ' ' + this.employee.gender;
  }
  
  // Parent Child Component 
  // @Output() notify: EventEmitter<Employee> = new EventEmitter<Employee>();

  // handleClick() {
  //   this.notify.emit(this.employee);
  // }
  
  // set employee(val: Employee) {
  //   // console.log('Previous : ' + (this._employee ? this._employee.name : 'NULL'));
  //   // console.log('Current : ' + val.name);
  //   this._employee = val;
  // }

  // This getter is called when reading and displaying data
  // get employee(): Employee {
  //   return this._employee;
  // }

  //@Input()
  //employee: Employee;
  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    this.selectedEmployeeId = +this._route.snapshot.paramMap.get('id');
  }

  // This life cycle hook receives SimpleChanges as an Input parameter
  // We can use it to retrieve previous and current values as shown below
  // ngOnChanges(changes: SimpleChanges) {
  //   const previousEmployee = <Employee>changes.employee.previousValue;
  //   const currentEmployee = <Employee>changes.employee.currentValue;

  //   console.log('Previous : ' + (previousEmployee ? previousEmployee.name : 'NULL'));
  //   console.log('Current : ' + currentEmployee.name);
  // }

}
