/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { AiOutlineUserAdd } from "react-icons/ai";
import { SlHandbag } from "react-icons/sl";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import DashWidget from "@/components/Dashboard/Admin/Dashboard/DashWidget/DashWidget";
import { GetServerSideProps } from "next";
import { getProductsBySort } from "@/api/products";
import { allUsers, getOrders, productSummary } from "@/api/admin";
import { IProduct } from "types/product.type";
import RecentOrder from "@/components/Dashboard/Admin/Dashboard/RecentOrder/RecentOrders";
import RecentProduct from "@/components/Dashboard/Admin/Dashboard/RecentProduct/RecentProducts";
import RecentUsers from "@/components/Dashboard/Admin/Dashboard/RecentUsers/RecentUsers";
import LineChart from "@/components/Dashboard/Admin/Dashboard/LineChart/LineChart";
import useCheckAdmin from "@/hooks/useCheckAdmin";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";

type DashboardPropType = {
    products: IProduct[];
    productSummary: {
        users: number;
        orders: number;
        products: number;
        totalEarnings: number;
    };
};
export default function Dashboard({
    products,
    productSummary,
}: DashboardPropType) {
    useCheckAdmin();
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState<any[]>([]);
    const { state } = useStoreContext();
    const { user } = state;

    useEffect(() => {
        loadingAllUsers();
        loadingOrders();
    }, [user]);

    // loading all users
    const loadingAllUsers = async () => {
        try {
            if (user !== null && user.token) {
                const data = await allUsers(user.token);
                setUsers(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    // loading all orders
    const loadingOrders = async () => {
        try {
            if (user !== null && user.token) {
                const data = await getOrders(user.token);
                setOrders(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <HeadSeo
                title={"Aladin-Dashboard"}
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />
            <DashboardLayout>
                <div>
                    {/* Dash Widget Card */}
                    <section>
                        <div className="grid grid-cols-4 gap-3 sm:grid-cols-1 md:grid-cols-3">
                            <DashWidget
                                icon={<AiOutlineUserAdd />}
                                title={"Users"}
                                account={productSummary?.users}
                            />
                            <DashWidget
                                icon={<SlHandbag />}
                                title={"Orders"}
                                account={productSummary?.orders}
                            />
                            <DashWidget
                                icon={<MdOutlineProductionQuantityLimits />}
                                title={"Products"}
                                account={productSummary?.products}
                            />
                            <DashWidget
                                icon={<GiTakeMyMoney />}
                                title={"Total Earnings"}
                                account={productSummary?.totalEarnings}
                            />
                        </div>
                    </section>

                    {/* Recent Order And Product Table */}
                    <section className="mt-10">
                        <div className="grid grid-cols-12 space-x-3 sm:grid-cols-1 md:grid-cols-1 sm:space-x-0 md:space-y-4 sm:space-y-4">
                            <div className="col-span-8">
                                <RecentOrder orders={orders} />
                            </div>
                            <div className="col-span-4">
                                <RecentProduct products={products} />
                            </div>
                        </div>
                    </section>

                    {/* Recent Users And Line Chart */}
                    <section className="mt-10 sm:mt-5">
                        <div className="grid grid-cols-12 space-x-3 sm:grid-cols-1 md:grid-cols-1 sm:space-x-0 sm:space-y-4 md:space-y-4">
                            <div className="col-span-6">
                                <LineChart data={productSummary} />
                            </div>
                            <div className="col-span-6">
                                <RecentUsers users={users} />
                            </div>
                        </div>
                    </section>
                </div>
            </DashboardLayout>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await getProductsBySort("createdAt", "desc");
    const productSummaryData = await productSummary();
    return {
        props: {
            products: data,
            productSummary: productSummaryData.data,
        },
    };
};
