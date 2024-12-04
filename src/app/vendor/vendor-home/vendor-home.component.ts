import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Vendor } from '../vendor';
import { VendorService } from '../vendor.service';
@Component({
templateUrl: 'vendor-home.component.html',
})
export class VendorHomeComponent implements OnInit {
msg: string;
vendors$?: Observable<Vendor[]>;
vendor: Vendor;
hideEditForm: boolean;
initialLoad: boolean;
constructor(public vendorService: VendorService) {
this.vendor = {
id: 0,
title: '',
name: '',
address1: '',
city: '',
province: '',
postalcode: '',
phone: '',
email: '',
type: '',
};
this.msg = '';
this.hideEditForm = true;
this.initialLoad = true;
} // constructor
ngOnInit(): void {
    this.vendors$ = this.vendorService.getAll();
    } // ngOnInit
    select(vendor: Vendor): void {
    this.vendor = vendor;
    this.msg = `${vendor.name} selected`;
    this.hideEditForm = !this.hideEditForm;
    } // select
    /**
    * cancelled - event handler for cancel button
    */
    cancel(msg?: string): void {
    msg ? (this.msg = 'Operation cancelled') : null;
    this.hideEditForm = !this.hideEditForm;
    } // cancel
    /**
    * update - send changed update to service
    */
    update(vendor: Vendor): void {
    this.vendorService.update(vendor).subscribe({
    // Create observer object
    next: (ven: Vendor) => (this.msg = `Vendor ${ven.id} updated!`),
    error: (err: Error) => (this.msg = `Update failed! - ${err.message}`),
    complete: () => (this.hideEditForm = !this.hideEditForm),
    });
    } // update
    /**
    * save - determine whether we're doing and add or an update
    */
    save(vendor: Vendor): void {
    vendor.id ? this.update(vendor) : this.create(vendor);
    } // save
    /**
    * add - send employee to service, receive new employee back
    */
    create(vendor: Vendor): void {
    vendor.id = 0;
    this.vendorService.add(vendor).subscribe({
    // Create observer object
    next: (ven: Vendor) => {
    this.msg = `vendor ${ven.id} added!`;
    },
    error: (err: Error) =>
    (this.msg = `Vendor not added! - ${err.message}`),
    complete: () => (this.hideEditForm = !this.hideEditForm),
    });
    } // add
    /**
    */
    // delete - send employee id to service for deletion
    delete(vendor: Vendor): void {
    this.vendorService.delete(vendor.id).subscribe({
    // Create observer object
    next: (numOfVendorsDeleted: number) => {
    numOfVendorsDeleted === 1
    ? (this.msg = `Vendor ${vendor.name} deleted!`)
    : (this.msg = `vendor not deleted`);
    },
    error: (err: Error) => (this.msg = `Delete failed! - ${err.message}`),
    complete: () => (this.hideEditForm = !this.hideEditForm),
    });
    } // delete
    /**
    */
    newVendor(): void {
    this.vendor = {
    id: 0,
    title: '',
    name: '',
    address1: '',
    city: '',
    province: '',
    postalcode: '',
    phone: '',
    email: '',
    type: '',
    };
    // newVendor - create new vendor instance
    this.hideEditForm = !this.hideEditForm;
    this.msg = 'New Vendor';
    } // newVendor
}// VendorHomeComponent