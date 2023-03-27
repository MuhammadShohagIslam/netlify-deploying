import axios from "axios";
import { CartType } from "types/cart.types";

export const saveOrder = (carts: CartType[], token: string) => {
    return axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/user/cart`,
        {
            carts,
        },
        {
            headers: {
                token,
            },
        }
    );
};
export const saveShippingAddress = (addressValues: any, token: string) => {
    return axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/user/address`,
        addressValues,
        {
            headers: {
                token,
            },
        }
    );
};
export const getUserShippingAddress = (token: string) => {
    return axios.get(
        `${process.env.NEXT_PUBLIC_server_api}/user/shipping-address`,
        {
            headers: {
                token,
            },
        }
    );
};

export const getUserCart = (token: string) => {
    return axios.get(`${process.env.NEXT_PUBLIC_server_api}/user/cart`, {
        headers: {
            token,
        },
    });
};

export const emptyCart = (token: string) => {
    return axios.delete(`${process.env.NEXT_PUBLIC_server_api}/user/cart`, {
        headers: {
            token,
        },
    });
};

// getting discount price
export const getTotalPriceAfterDiscount = (
    couponName: string,
    token: string
) => {
    return axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/user/cart/coupon`,
        { couponName },
        {
            headers: {
                token,
            },
        }
    );
};

// creating new order with payment intents
export const createOrder = (paymentInfoObject: any, token: string) => {
    return axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/user/carts/order`,
        paymentInfoObject,
        {
            headers: {
                token,
            },
        }
    );
};
// creating new order with cash on delivery
export const createOrderCashOnDelivery = (
    isCashOnDelivery: any,
    isCoupon: any,
    token: string
) => {
    return axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/user/carts/order/cash`,
        { isCashOnDelivery, isCoupon },
        {
            headers: {
                token,
            },
        }
    );
};

// getting all orders by user
export const getOrdersByUser = async (token: string) => {
    return await axios.get(
        `${process.env.NEXT_PUBLIC_server_api}/user/carts/orders`,
        {
            headers: {
                token,
            },
        }
    );
};

// add to wishlist
export const addToWishList = async (
    token: string,
    productId: string,
    isWishList: any
) => {
    return await axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/user/wishlists`,
        { productId, isWishList },
        {
            headers: {
                token,
            },
        }
    );
};

// get all wishlist from user
export const getWishLists = async (token: string) => {
    return await axios.get(
        `${process.env.NEXT_PUBLIC_server_api}/user/wishlists`,
        {
            headers: {
                token,
            },
        }
    );
};

// get all wishlist from user
export const getWishList = async (token: string, productId: string) => {
    return await axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/user/wish-lists`,
        { productId },
        {
            headers: {
                token,
            },
        }
    );
};

// remove wishlist
export const removeWishList = async (token: string, productId: string) => {
    return await axios.put(
        `${process.env.NEXT_PUBLIC_server_api}/user/wishlists`,
        { productId },
        {
            headers: {
                token,
            },
        }
    );
};
