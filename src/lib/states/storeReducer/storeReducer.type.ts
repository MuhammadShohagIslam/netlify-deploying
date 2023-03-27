import { CartType } from "types/cart.types";

export enum StoreActionType {
    LOGGED_IN_USER = "LOGGED_IN_USER",
    LOGOUT_USER = "LOGOUT_USER",
    ADD_TO_CART = "ADD_TO_CART",
    SEARCH_FILTER_VALUE = "SEARCH_FILTER_VALUE",
    CASH_ON_DELIVERY = "CASH_ON_DELIVERY",
    ADD_SHIPPING_ADDRESS = "ADD_SHIPPING_ADDRESS",
    ADD_COUPON = "ADD_COUPON",
}

export interface UserType {
    email: string;
    fullName: string;
    role: string;
    token: string;
    image: string;
    _id: string;
}

export type StoreDataType = {
    user: UserType | null;
    carts: CartType[];
    text: string;
    isCashOnDelivery: boolean;
    isCouponed: boolean;
    shippingAddress: {};
};

export interface StoreAction {
    type: StoreActionType;
    payload: any;
}
