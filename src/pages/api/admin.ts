import axios from "axios";

// get all users
export const allUsers = async (token: string) =>
    await axios.get(`${process.env.NEXT_PUBLIC_server_api}/admin/users`, {
        headers: {
            token,
        },
    });

// getting all orders
export const getOrders = async (token: string) =>
    await axios.get(`${process.env.NEXT_PUBLIC_server_api}/admin/orders`, {
        headers: {
            token,
        },
    });

// product summary
export const productSummary = async () =>
    await axios.get(
        `${process.env.NEXT_PUBLIC_server_api}/admin/product-summary`
    );

// updating order status by the admin
export const updateOrderStatus = async (
    token: string,
    orderId: string,
    orderStatus: string
) => {
    return await axios.put(
        `${process.env.NEXT_PUBLIC_server_api}/admin/orders/order-status`,
        {
            orderId,
            orderStatus,
        },
        {
            headers: {
                token,
            },
        }
    );
};
