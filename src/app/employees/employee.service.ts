import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable, observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
@Injectable()
export class EmployeeService {
    constructor(private httpClient: HttpClient) { }
    private listEmployees: Employee[] = [
        {
            id: 1,
            name: 'Mark',
            gender: 'Male',
            contactPreference: 'Email',
            email: 'mark@pragimtech.com',
            dateOfBirth: new Date('10/25/1988'),
            department: '3',
            isActive: true,
            photoPath: 'assets/images/mark.png'
        },
        {
            id: 2,
            name: 'Mary',
            gender: 'Female',
            contactPreference: 'Phone',
            phoneNumber: 2345978640,
            dateOfBirth: new Date('11/20/1979'),
            department: '2',
            isActive: true,
            photoPath: 'assets/images/mary.png'
        },
        {
            id: 3,
            name: 'John',
            gender: 'Male',
            contactPreference: 'Phone',
            phoneNumber: 5432978640,
            dateOfBirth: new Date('3/25/1976'),
            department: '3',
            isActive: false,
            photoPath: 'assets/images/john.png'
        },
    ];

    getEmployees(): Observable<Employee[]> {
        // return of(this.listEmployees).pipe(delay(2000));
        return this.httpClient.get<Employee[]>('http://localhost:3000/employees')//;
            .pipe(catchError(this.handleError));
    }

    

    // save(employee: Employee) {
    //     this.listEmployees.push(employee);
    // } 

    addEmployee(employee: Employee): Observable<Employee> {
        if (employee.id === null) {

            return this.httpClient.post<Employee>('http://localhost:3000/employees',
                employee, {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json'
                    })
                })
                .pipe(catchError(this.handleError));

            //   const maxId = this.listEmployees.reduce(function (e1, e2) {
            //     return (e1.id > e2.id) ? e1 : e2;
            //   }).id;
            //   employee.id = maxId + 1;

            //   this.listEmployees.push(employee);
        }

        // else {
        //   const foundIndex = this.listEmployees.findIndex(e => e.id === employee.id);
        //   this.listEmployees[foundIndex] = employee;
        // }
    }


    baseUrl = 'http://localhost:3000/employees';

    // When an update is peformed our server side service does not return anything
    // So we have set the return type to void.
    updateEmployee(employee: Employee): Observable<void> {
        // We are using the put() method to issue a PUT request
        // We are using template literal syntax to build the url to which
        // the request must be issued. To the base URL we are appending
        // id of the employee we want to update. In addition to the URL,
        // we also pass the updated employee object, and Content-Type header
        // as parameters to the PUT method
        return this.httpClient.put<void>(`${this.baseUrl}/${employee.id}`, employee, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
            .pipe(catchError(this.handleError));
    }

    getEmployee(id: number): Observable<Employee>  {
        // return this.listEmployees.find(e => e.id === id);

        return this.httpClient.get<Employee>(`${this.baseUrl}/${id}`)
        .pipe(catchError(this.handleError));
    }

    deleteEmployee(id: number) {
        const i = this.listEmployees.findIndex(e => e.id === id);
        if (i !== -1) {
            this.listEmployees.splice(i, 1);
        }
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('Client Side Error :', errorResponse.error.message);
        } else {
            console.error('Server Side Error :', errorResponse);
        }
        // return an observable with a meaningful error message to the end user
        return throwError('There is a problem with the service.  We are notified & working on it. Please try again later.');
    }
}