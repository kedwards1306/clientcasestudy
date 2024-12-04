/**
* expense - interface for expenses
*/
export interface Product {
    id: string;
    vendorid: number;
    name: string;
    costprice: number;
    msrp: number;
    rop: number;
    eoq: number;
    qoh: number;
    qoo: number;
    qrcode: number[];
    qrcodetxt: string;
    }
