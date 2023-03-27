import Link from "next/link";
import RecentOrderRow from "./RecentOrderRow";
import { RecentOrderType } from "./RecentOrders.types";

const RecentOrder = (props: RecentOrderType) => {
    const { orders } = props;
    return (
        <div className="relative flex flex-col w-full min-w-0 mb-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl shadow-md  rounded-2xl bg-clip-border ">
            <div className="flex justify-between px-4 py-3">
                <div>
                    <h6 className="text-gray-900 text-lg font-bold">
                        Recent Orders
                    </h6>
                </div>
                <div className="text-gray-500 text-sm font-bold hover:text-green-500 transition-all cursor-pointer">
                    <Link href="/dashboard/admin/orders">View All</Link>
                </div>
            </div>
            <div className="relative overflow-x-auto sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Payment Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Payment Method
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Order Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length &&
                            orders
                                .slice(0, 6)
                                .map((order) => (
                                    <RecentOrderRow
                                        key={order._id}
                                        order={order}
                                    />
                                ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentOrder;
