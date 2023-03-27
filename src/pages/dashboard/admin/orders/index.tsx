/* eslint-disable react-hooks/exhaustive-deps */
import { getOrders, updateOrderStatus } from "@/api/admin";
import OrdersTable from "@/components/Dashboard/Admin/OrdersTable/OrdersTable";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Orders = () => {
    const [fetching, setFetching] = useState(true);
    const [orders, setOrders] = useState([]);
    const { state } = useStoreContext();
    const { user } = state;
    useEffect(() => {
        loadingOrders();
        setFetching(false);
    }, [user]);

    // loading all orders
    const loadingOrders = async () => {
        try {
            setFetching(true);
            if (user !== null && user.token) {
                const data = await getOrders(user.token);
                setOrders(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleChangeOrderStatus = (orderId: string, orderStatus: string) => {
        if (user) {
            updateOrderStatus(user.token, orderId, orderStatus)
                .then((res) => {
                    toast.success("Status is Updating!");
                    loadingOrders();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    return (
        <>
            <HeadSeo
                title="Orders"
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />
            <DashboardLayout>
                <div>
                    <OrdersTable
                        data={orders}
                        handleChangeOrderStatus={handleChangeOrderStatus}
                    />
                </div>
            </DashboardLayout>
        </>
    );
};

export default Orders;
