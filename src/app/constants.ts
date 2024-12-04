export const BASE_URL = '/api';
export const PDF_URL = '/POPDF?poid=';
// export const BASE_URL: string = 'http://localhost:8080/api';
// export const PDF_URL = 'http://localhost:8080/POPDF?poid=';

export const VENDOR_DEFAULT = {
    id: 0,
    title: '',
    name: '',
    phone: '',
    email: '',
    city: '',
    province: '',
    postalcode: '',
    address1: '',
    type: '',
}
export const PRODUCT_DEFAULT = {
    id: '',
    vendorid:0,
    name: '',
    costprice: 0.0,
    msrp: 0.0,
    rop: 0.0,
    eoq: 0.0,
    qoh: 0.0,
    qoo: 0.0,
    qrcode: [],
    qrcodetxt: '',
}

export const PO_DEFAULT = {
    id: 0,
    vendorid: 0,
    amount: 0.0,
    podate: '',
    items: [],
}
