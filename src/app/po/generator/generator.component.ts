import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatComponentsModule } from '@app/mat-components/mat-components.module';

import { Vendor } from '@app/vendor/vendor';
import { VendorService } from '@app/vendor/vendor.service';

import { Product } from '@app/product/product';
import { ProductService } from '@app/product/product.service';

import { PurchaseOrder } from '@app/po/po';
import { PoItem } from '@app/po/po-item';
import { PurchaseOrderService } from '@app/po/po-service';

import { VENDOR_DEFAULT } from '@app/constants';
import { PRODUCT_DEFAULT } from '@app/constants';
import { PDF_URL } from '@app/constants';



@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [CommonModule, MatComponentsModule, ReactiveFormsModule],
  templateUrl: './generator.component.html',
})
export class GeneratorComponent implements OnInit, OnDestroy {


  // To prevent memory leaks
  formSubscription?: Subscription;

  msg: string = '';
   vendors: Vendor[] = [];
   selectedVendor: Vendor = VENDOR_DEFAULT;
   vendorProducts: Product[] = [];
   selectedProduct: Product = PRODUCT_DEFAULT;
   poItems: PoItem[] = [];
  po: PurchaseOrder[] = [];
  generatedPoId: number = 0;
  // total: number = 0;

  vendorForm: FormControl;
  productForm: FormControl;
  quantityForm: FormControl;
  generatorFormGroup: FormGroup;

  constructor(
    private builder: FormBuilder,
    private vendorService: VendorService,
     private productService: ProductService,
     private poService: PurchaseOrderService
  ) {

    this.vendorForm = new FormControl('');
    this.productForm = new FormControl('');
    this.quantityForm = new FormControl('');
    this.generatorFormGroup = this.builder.group({
      vendor: this.vendorForm,
      product: this.productForm,
      quantity: this.quantityForm,
    });
  }

  ngOnInit(): void {
    this.msg = 'Loading vendors from server...';
    this.setupOnVendorPickedEvent();
    this.setupOnProductPickedEvent();
    this.setupOnQuantityPickedEvent();
     this.getAllVendors();
  }

  ngOnDestroy(): void {
    if (this.formSubscription !== undefined) {
      this.formSubscription.unsubscribe();
    }
  }

  setupOnVendorPickedEvent(): void {
    this.formSubscription = this.generatorFormGroup.get('vendor')?.valueChanges.subscribe((vendor) => {
      if (vendor === null) return;
      this.selectedVendor = vendor;
      this.loadVendorProducts();
      this.selectedProduct = Object.assign({}, PRODUCT_DEFAULT);
      this.productForm.reset();
      this.quantityForm.reset();
      this.poItems = [];
      this.msg = 'Choose product for vendor';
      this.generatedPoId = 0;
    });
  }
  viewPdf(): void {
    window.open(`${PDF_URL}${this.generatedPoId}`);
  }


  setupOnProductPickedEvent(): void {
    const productSubscription = this.generatorFormGroup.get('product')?.valueChanges.subscribe(product => {
      if (product === null) return;

        this.selectedProduct = product;

    });

    this.formSubscription?.add(productSubscription);
  }
  setupOnQuantityPickedEvent(): void {
    const quantitySubscription = this.generatorFormGroup.get('quantity')?.valueChanges.subscribe(quantity => {
      if (!quantity) return;

        if (this.isProductAlreadySelected(this.selectedProduct.id)) {
            let item =  this.getPOItem(this.selectedProduct.id)
             if (item){
              item.qty = quantity;
             }
             else{
                console.log("ERROR:");
             }

        }
else {
  let poItem: PoItem = {
    id: 0,
    poid: 0,
    productid: this.selectedProduct.id,
    qty: quantity,
    price: this.selectedProduct.costprice,
  }
  this.poItems.push(poItem);
}
  this.poItems = this.poItems.filter(item => item.qty !== 0);

    });

    this.formSubscription?.add(quantitySubscription);
  }



  getAllVendors(verbose: boolean = true): void {
    this.vendorService.getAll().subscribe({
      next: (vendors: Vendor[]) => this.vendors = vendors,
      error: (e: Error) => this.msg = `Failed to load vendors - ${e.message}`,
      complete: () => verbose ? this.msg = `Vendors loaded!` : null,
    });
  }

  loadVendorProducts(): void {
    this.vendorProducts = [];
    this.productService.getSome(this.selectedVendor.id).subscribe({
      next: (product: Product[]) => this.vendorProducts = product,
      error: (err: Error) => this.msg = `expenses fetch failed! - ${err.message}`
    });
  }

  getPOItem(productid: string): PoItem | undefined {
    return this.poItems.find(item => item.productid === productid);
  }


  isProductAlreadySelected(productid: string): boolean {
    return this.poItems.find(item => item.productid === productid) !== undefined;
  }

 total(): number {
  return this.subTotal() + this.Tax();

 }
 subTotal(): number {
let result = 0;
this.poItems.forEach(item => result += item.price * item.qty);
return result;
 }

Tax():number{
  const TAX_RATIO =0.13;
return this.subTotal() * TAX_RATIO;
}



  createPo(): void {
    const po: PurchaseOrder = {
      id: 0,
      vendorid: this.selectedVendor.id,
      amount: this.total(),
      podate: '',
      items: this.poItems,
    };

    this.poService.create(po).subscribe({
      next: (po: PurchaseOrder) => {
        po.id > 0
          ? (this.msg = `Purchase Order ${po.id} added!`)
          : (this.msg = 'Purchase Order not added! - server error');
          this.generatedPoId = po.id;
      },
      error: (err: Error) => (this.msg = `Purchase Order not added! - ${err.message}`),
      complete: () => this.resetGenerator(),
    });
  }

  resetGenerator(): void {
    this.productForm.reset();
    this.vendorForm.reset();
    this.quantityForm.reset();
    this.selectedVendor = Object.assign({}, VENDOR_DEFAULT);
    this.selectedProduct = Object.assign({}, PRODUCT_DEFAULT);
    this.vendorProducts = [];
    this.poItems = [];
  }
}
