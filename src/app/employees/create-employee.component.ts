import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../models/departments.model';
import { Employee } from '../models/employee.model';
import { Router } from '@angular/router';
import { EmployeeService } from '../employees/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  gender = 'male';
  previewPhoto = false;

  employee: Employee = {
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

  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' }
  ];

  constructor(private _employeeService: EmployeeService,
    private _router: Router) { }
  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }

  ngOnInit() {

  }

  saveEmployee(): void {
    this._employeeService.save(this.employee);
    this._router.navigate(['list']);
  }
}
