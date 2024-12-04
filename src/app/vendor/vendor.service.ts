import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../constants';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Vendor } from './vendor';
@Injectable({
providedIn: 'root',
})
export class VendorService {
resourceURL: string;
status: string;
constructor(public http: HttpClient) {
this.resourceURL = `${BASE_URL}/vendors`;

this.status = '';
} // constructor
/**
* Retrieves the vendor JSON, then returns the array to a subscriber
*/
getAll(): Observable<Vendor[]> {
return this.http
.get<Vendor[]>(this.resourceURL)
.pipe(retry(1), catchError(this.handleError));
} // get
// Error handling
handleError(error: any) {
    let errorMessage = error.message;
    console.log(error);
    console.log(errorMessage);
    return throwError(() => errorMessage);
    }
/**
* Update an vendor on the server using http put, server returns
* updated vendor, then return it as Observable to caller
*/
update(vendor: Vendor): Observable<Vendor> {
    return this.http
    .put<Vendor>(`${this.resourceURL}`, vendor)
    .pipe(retry(1), catchError(this.handleError));
    } // update

/**
* add an employee on the server via POST, return Observable
*/
add(vendor: Vendor): Observable<Vendor> {
    vendor.id = 0;
    return this.http
    .post<Vendor>(this.resourceURL, vendor)
    .pipe(retry(1), catchError(this.handleError));
    } // add

    /**
* delete an employee on the server, return Observable
*/
delete(id: number): Observable<number> {
    return this.http
    .delete<number>(`${this.resourceURL}/${id}`)
    .pipe(retry(1), catchError(this.handleError));
    } // delete
} // VendorService