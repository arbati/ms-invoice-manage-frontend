import { Customer } from "../customers/customers"
import { Product } from "../products/products"

export class Invoice {

    "id": string;
    "customer": Customer;
    "products": Product[];
    "invoiceDate":Date;
    "paymentType":string;
    "discount": number;
}
