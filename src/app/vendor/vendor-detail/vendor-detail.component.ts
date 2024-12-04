
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {FormControl, FormGroup,FormBuilder, Validators} from '@angular/forms';
import { Vendor } from '../vendor';
import { ValidatePhone } from '@app/validators/phone.validator';
import { ValidatePostalCode } from '@app/validators/postalcode.validator';
import { DeleteDialogComponent } from '@app/delete-dialog/delete-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
@Component({
selector: 'app-vendor-detail',
templateUrl: './vendor-detail.component.html',
})
export class VendorDetailComponent implements OnInit {
@Input() selectedVendor: Vendor = {
  id: 0,
  title: '',
  name: '',
  phone: '',
  email: '',
  city: '',
  province: '',
  postalcode: '',
  address1: '',
  type: ''
};
@Input() vendors: Vendor[] | null = null;
@Output() cancelled = new EventEmitter();
@Output() saved = new EventEmitter();
@Output() deleted = new EventEmitter();
vendorForm: FormGroup;
title: FormControl;
name: FormControl;
phone: FormControl;
email: FormControl;
province: FormControl;
postalcode: FormControl;
address1: FormControl;
city: FormControl;
type: FormControl;

// Add dropdown data for provinces and types
provinces: string[] = ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Manitoba','New Brunswick', 'Nova Scotia','NewFoundland' ];
types: string[] = ['Trusted', 'Untrusted', 'Unknown'];
constructor(private builder: FormBuilder, private dialog: MatDialog) {
this.title = new FormControl('');
this.name = new FormControl('', Validators.compose([Validators.required]));
this.phone = new FormControl('', Validators.compose([Validators.required, ValidatePhone]));
this.email = new FormControl('', Validators.compose([Validators.required, Validators.email]));
this.province = new FormControl('', Validators.compose([Validators.required]));
this.address1 = new FormControl('', Validators.compose([Validators.required]));
this.postalcode = new FormControl('',Validators.compose([Validators.required, ValidatePostalCode]));
this.city = new FormControl('', Validators.compose([Validators.required]));
this.type = new FormControl('', Validators.compose([Validators.required]));

this.vendorForm = new FormGroup({
title: this.title,
name: this.name,
phone: this.phone,
email: this.email,
province: this.province,
postalcode: this.postalcode,
address1: this.address1,
city: this.city,
type: this.type,
});
} // constructor
ngOnInit(): void {
// patchValue doesn’t care if all values present
this.vendorForm.patchValue({
title: this.selectedVendor.title,
name: this.selectedVendor.name,
address1: this.selectedVendor.address1,
phone: this.selectedVendor.phone,
email: this.selectedVendor.email,
province: this.selectedVendor.province,
postalcode: this.selectedVendor.postalcode,
city: this.selectedVendor.city,
type: this.selectedVendor.type,
});
} // ngOnInit
updateSelectedVendor(): void {
this.selectedVendor.title = this.vendorForm.value.title;
this.selectedVendor.name = this.vendorForm.value.name;
this.selectedVendor.city = this.vendorForm.value.city;
this.selectedVendor.phone = this.vendorForm.value.phone;
this.selectedVendor.email = this.vendorForm.value.email;
this.selectedVendor.province = this.vendorForm.value.province;
this.selectedVendor.postalcode = this.vendorForm.value.postalcode;
this.selectedVendor.address1 = this.vendorForm.value.address1;
this.selectedVendor.type = this.vendorForm.value.type;
this.saved.emit(this.selectedVendor);
}
openDeleteDialog(): void {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = false;
  dialogConfig.data = {
    title: `Delete Vendor ${this.selectedVendor.id}`,
    entityname: 'vendor'
  };
  dialogConfig.panelClass = 'customdialog';
  const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.deleted.emit(this.selectedVendor);
    }
  });
}
} // VendorDetailComponent
