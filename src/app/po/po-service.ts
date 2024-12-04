import { Injectable } from '@angular/core';
import { GenericHttpService } from '@app/generic-http.service';
import { PurchaseOrder } from './po';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService extends GenericHttpService<PurchaseOrder> {
  constructor(http:HttpClient) {
    super(http, 'purchaseorders');
}
}
