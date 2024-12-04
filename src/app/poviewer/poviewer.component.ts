import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatComponentsModule } from '@app/mat-components/mat-components.module';
import { Vendor } from '@app/vendor/vendor';
import { VENDOR_DEFAULT, PRODUCT_DEFAULT, PO_DEFAULT, PDF_URL } from '@app/constants';
import { VendorService } from '@app/vendor/vendor.service';
import { Product } from '@app/product/product';
import { ProductService } from '@app/product/product.service';
import { PurchaseOrderService } from '@app/po/po-service';
import { PurchaseOrder } from '@app/po/po';
import { MatOptionSelectionChange } from '@angular/material/core';
import { PoItem } from '@app/po/po-item';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-poviewer',
  standalone: true,
  imports: [MatComponentsModule, CommonModule],
  templateUrl: './poviewer.component.html',
  styles: ``
})
export class PoviewerComponent implements OnInit {
  formSubscription?: Subscription;
  msg: string = '';
  vendors: Vendor[] = [];
  selectedVendor: Vendor = VENDOR_DEFAULT;
  vendorProducts: Product[] = [];
  vendorPos: PurchaseOrder[] = [];
  selectedProduct: Product = PRODUCT_DEFAULT;
  selectedPo: PurchaseOrder = PO_DEFAULT;
  generatedPoId: number = 0;
  poItems: PoItem[] = [];
  quantityForm: FormControl;
  generatorFormGroup: FormGroup;
  constructor(
    private builder: FormBuilder,
    private vendorService: VendorService,
    private productService: ProductService,
    private poService: PurchaseOrderService
  ) {
    this.quantityForm = new FormControl('');
    this.generatorFormGroup = this.builder.group({

      quantity: this.quantityForm,
    });
  }

  ngOnInit(): void {
    this.msg = 'Loading vendors from server...';
    this.getAllVendors();
  }


  getAllVendors(): void {

    this.vendorService.getAll().subscribe({
      next: (vendors: Vendor[]) => this.vendors = vendors,
      error: (e: Error) => this.msg = `Failed to load vendors - ${e.message}`,
      complete: () => this.msg = `Vendors loaded!`,
    });
  }
  loadVendorProducts(id: number): void {
    this.msg = `loading vendors...`;
    this.productService
      .getSome(id)
      .subscribe((products) => (this.vendorProducts = products));
}
  onVendors(event: MatOptionSelectionChange) {
    if (!event.isUserInput) return;
    this.selectedVendor = event.source.value;
    this.selectedPo = Object.assign({}, PO_DEFAULT);

    this.poService.getSome(this.selectedVendor.id).subscribe({
      next: (pos: PurchaseOrder[]) => this.vendorPos = pos,
      error: (e: Error) => this.msg = `Failed to load purchase order - ${this.selectedVendor.name}`,
      complete:()=> this.msg =`Purchase Order loaded!`
    })

    this.productService.getSome(this.selectedVendor.id).subscribe({
      next: (products: Product[]) => this.vendorProducts = products,
      error: (e: Error) => this.msg = `Failed to load products for vendor - ${this.selectedVendor.name}`,
      complete: () => this.msg = `Products loaded!`
})
  }



  getPOItem(productid: string): PoItem | undefined {
    return this.poItems.find(item => item.productid === productid);
  }


  isProductAlreadySelected(productid: string): boolean {
    return this.poItems.find(item => item.productid === productid) !== undefined;
  }

  poProducts(): Product[] {
    console.log(this.vendorProducts);
    return this.vendorProducts.filter(product =>
      this.selectedPo.items.some(item => item.productid === product.id)
    );

  }
  onPoPicked(event: MatOptionSelectionChange) {
    if (!event.isUserInput) return;
    this.selectedPo = event.source.value;
    console.log(this.selectedPo);
  }
  getProductQuantity(productId: string): number {
    const item = this.selectedPo?.items?.find(item => item.productid === productId);
    return item ? item.qty : 0;
  }

  getProductExtendedCost(productId: string, costPrice: number): number {
    const quantity = this.getProductQuantity(productId);
    return quantity * costPrice;
  }
total(): number {
  return this.subTotal() + this.Tax();

  }
 subTotal(): number {
  let result = 0;
  this.poProducts().forEach(item => result += item.costprice * this.getProductQuantity(item.id));
  return result;
 }

Tax():number{
  const TAX_RATIO =0.13;
return this.subTotal() * TAX_RATIO;
  }

  viewPdf(): void {
    window.open(`${PDF_URL}${this.generatedPoId}`);
  }
}
