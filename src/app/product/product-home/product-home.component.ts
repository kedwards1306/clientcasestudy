import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { MatComponentsModule } from '@app/mat-components/mat-components.module';
import { Product } from '@app/product/product';
import { ProductService } from '@app/product/product.service';
import { Vendor } from '@app/vendor/vendor';
import { VendorModule } from '@app/vendor/vendor.module';
import { VendorService } from '@app/vendor/vendor.service';
import { PRODUCT_DEFAULT } from '@app/constants';
import { ProductDetailComponent } from '@app/product/product-detail/product-detail.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-product-home',
  standalone: true,
  imports: [CommonModule, MatComponentsModule, VendorModule, ProductDetailComponent],
  templateUrl: './product-home.component.html',
})
export class ProductHomeComponent implements OnInit {
  products: Product[] = [];
  msg: string = '';
  showDetails: boolean = false;
  displayedColumns: string[] = ['id', 'name', 'vendorid'];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>();
  vendors: Vendor[] = [];
  productInDetail: Product = PRODUCT_DEFAULT;
  element: any;
  pageSize = 5;
  @ViewChild(MatPaginator, { static: false }) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  constructor(
    public productService: ProductService,
    public vendorService: VendorService
  ) {

  }
  ngOnInit(): void {
    this.getAllVendors();
    this.getAllProducts();
  }
  getAllVendors(verbose: boolean = true): void {
    this.vendorService.getAll().subscribe({
      next: (vendors: Vendor[]) => (this.vendors = vendors),
      error: (e: Error) => (this.msg = `Failed to load vendors - ${e.message}`),
      complete: () => (verbose ? (this.msg = `Vendors loaded!`) : null),
    });
  }
  getAllProducts(verbose: boolean = true): void {
    this.productService.getAll().subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.dataSource.data = products;
      },
      error: (e: Error) =>
        (this.msg = `Failed to load products - ${e.message}`),
      complete: () => (verbose ? (this.msg = `Products loaded!`) : null),
    });
  }
  select(selectedProduct: Product): void {
    this.productInDetail = selectedProduct;
    this.msg = `Product ${selectedProduct.id} selected`;
    this.showDetails = true;
  }
  save(product: Product): void {
    this.productAlreadyExists(product) ? this.update(product) : this.create(product);
  }
  cancel(): void {
    this.msg = 'Operation cancelled';
    this.showDetails = false;
  }
  create(product: Product): void {
    this.msg = 'Creating product...';
    this.productService.create(product).subscribe({
      next: (p: Product) => {
        this.msg =
          p.id !== '' ? `Product ${p.id} added!` : `Product ${p.id} not added!`;
        this.getAllProducts(false); // Refresh table - Not verbose
      },
      error: (e: Error) => (this.msg = `Create failed! - ${e.message}`),
      complete: () => (this.showDetails = false),
    });
  }
  update(product: Product): void {
    this.msg = 'Updating product...';
    this.productService.update(product).subscribe({
      next: (e: Product) => {
        this.msg = `Product ${e.id} updated!`;
        this.getAllProducts(false); // Refresh table - Not verbose
      },
      error: (e: Error) => (this.msg = `Update failed! - ${e.message}`),
      complete: () => (this.showDetails = false),
    });
  }
  delete(product: Product): void {
    this.productService.delete(product.id).subscribe({
      next: (rowsUpdated: number) => {
        this.msg =
          rowsUpdated === 1
            ? `Product ${product.id} deleted!`
            : `Product ${product.id} not deleted!`;
        this.getAllProducts(false); // Refresh table - Not verbose
      },
      error: (e: Error) => (this.msg = `Delete failed! - ${e.message}`),
      complete: () => (this.showDetails = false),
    });
  }
  startNewProduct(): void {
    this.productInDetail = Object.assign({}, PRODUCT_DEFAULT);
    this.msg = 'New product';
    this.showDetails = true;
  }
  sortProductsWithObjectLiterals(sort: Sort): void {
    const literals = {
      id: () =>
        (this.dataSource.data = this.dataSource.data.sort(
          (a: Product, b: Product) =>
            sort.direction === 'asc'
              ? a.id < b.id
                ? -1
                : 1
              : b.id < a.id
              ? -1
              : 1
        )),
      name: () =>
        (this.dataSource.data = this.dataSource.data.sort(
          (a: Product, b: Product) =>
            sort.direction === 'asc'
              ? a.name < b.name
                ? -1
                : 1
              : b.name < a.name
              ? -1
              : 1
        )),
      vendorid: () =>
        (this.dataSource.data = this.dataSource.data.sort(
          (a: Product, b: Product) =>
            sort.direction === 'asc'
              ? a.vendorid - b.vendorid
              : b.vendorid - a.vendorid
        )),
    };
    literals[sort.active as keyof typeof literals]();
  }

  productAlreadyExists(product: Product): boolean {
    let products: Product[] = this.dataSource.data;
    console.log(products);
    if (products && products.length > 0) {
      console.log("test");
      return products.some(p => p.id === product.id);
  }
    return false;
  }


}