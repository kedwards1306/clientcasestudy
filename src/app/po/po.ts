import { PoItem } from "./po-item";
export interface PurchaseOrder {
    id: number;
    vendorid: number;
    amount: number;
    podate: string;
    items: PoItem[];
}
