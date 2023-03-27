import { IProduct } from "types/product.type";
import { ICustomers } from "./customers.type";

export interface IOrder {
    _id: string;
    products: {
        product: IProduct;
        count: number;
        color: string;
        size: string;
    }[];
    paymentIntents: any;
    orderStatus: string;
    orderedBy: any;
    paymentBy?: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
