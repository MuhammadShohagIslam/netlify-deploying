import { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import UserDashboard from "@/layouts/DashboardLayout/UserDashboard";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { getOrdersByUser } from "@/api/user";
import OrderInvoiceDownload from "@/components/Order/OrderInvoiceDownload";
import OrderPaymentInfo from "@/components/Order/OrderPaymentInfo";
import OrderCartInTable from "@/components/Order/OrderCartInTable";
import { UserType } from "@/lib/states/storeReducer/storeReducer.type";
import { IOrder } from "types/order.types";
import useCheckUser from "@/hooks/useCheckUser";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";

const History = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const { state } = useStoreContext();
    const { user } = state;

    useEffect(() => {
        loadOrders(user!);
    }, [user]);

    // loading all orders from backend
    const loadOrders = (user: UserType) => {
        setLoading(true);
        if (user && user.token) {
            getOrdersByUser(user.token)
                .then((res) => {
                    setOrders(res.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        }
    };

    // show invoice download
    const showDownloadLink = (order: IOrder) => {
        return (
            <div className="mt-2">
                <div className="">
                    <PDFDownloadLink
                        document={<OrderInvoiceDownload order={order} />}
                        fileName="invoice.pdf"
                        className="btn btn-sm btn-block btn-outline-info text-gray-900 hover:text-white"
                        style={{ width: "100%" }}
                    >
                        DownLoad PDF
                    </PDFDownloadLink>
                </div>
            </div>
        );
    };
    return (
        <>
            <HeadSeo
                title={"History"}
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />
            <UserDashboard>
                <div>
                    {loading ? (
                        <h4 className="text-center">Loading...</h4>
                    ) : (
                        <>
                            <h4 className="text-center text-lg text-green-400 mt-2 mb-0">
                                {orders && orders.length > 0
                                    ? "User Purchase Order"
                                    : "No Purchase Order"}
                            </h4>
                            <hr />
                            {orders &&
                                orders.length > 0 &&
                                orders.reverse().map((order: IOrder) => (
                                    <div
                                        className="mx-5 my-3 p-3 card"
                                        key={order._id}
                                    >
                                        <OrderPaymentInfo order={order} />
                                        <OrderCartInTable order={order} />
                                        {showDownloadLink(order)}
                                    </div>
                                ))}
                        </>
                    )}
                </div>
            </UserDashboard>
        </>
    );
};

export default History;
