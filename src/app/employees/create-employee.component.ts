import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../models/departments.model';
import { Employee } from '../models/employee.model';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employees/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  @ViewChild('employeeForm') public createEmployeeForm: NgForm;
  panelTitle: string;
  gender = 'male';
  previewPhoto = false;

  employee: Employee; // = {
  //   id: null,
  //   name: null,
  //   gender: null,
  //   contactPreference: null,
  //   phoneNumber: null,
  //   email: '',
  //   dateOfBirth: null,
  //   department: "select",
  //   isActive: null,
  //   photoPath: null
  // };

  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' }
  ];

  constructor(private _employeeService: EmployeeService,
    private _router: Router, private _route: ActivatedRoute) { }
  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }

  ngOnInit() {
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getEmployee(id);
    })
  }

  getEmployee(id: number) {
    if (id === 0) {
      this.employee = {
        id: null,
        name: null,
        gender: null,
        contactPreference: null,
        phoneNumber: null,
        email: '',
        dateOfBirth: null,
        department: "select",
        isActive: null,
        photoPath: null
      };
      this.createEmployeeForm.reset();

      this.panelTitle = 'Create Employee';
    }
    else {
      this.panelTitle = 'Edit Employee';
      this.employee = Object.assign({}, this._employeeService.getEmployee(id));
    }
  }

  saveEmployee(): void {
    const newEmployee = Object.assign({}, this.employee);
    this._employeeService.save(newEmployee);
    this.createEmployeeForm.reset();
    //empForm.reset();
    this._router.navigate(['list']);
  }

  // saveEmployee(): void {
  //   this._employeeService.save(this.employee);
  //   this._router.navigate(['list']);
  // }
}
