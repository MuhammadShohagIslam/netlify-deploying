import React from "react";
import { MdOutlineVerified } from "react-icons/md";
import { VscUnverified } from "react-icons/vsc";

const RecentOrderRow = (props: any) => {
    const { orderedBy, paymentIntents, orderStatus, paymentBy } = props.order;

    return (
        <tr className="bg-white border-b hover:bg-gray-50 ">
            <td scope="row" className="w-32 p-4">
                <span className="min-w-max flex">{orderedBy?.fullName}</span>
            </td>
            <td scope="row" className="px-6 py-4 font-semibold text-gray-900 ">
                <span className="min-w-max flex">
                    ${paymentIntents.amount / 100}
                </span>
            </td>

            <td scope="row" className="px-6 py-4 font-semibold text-gray-900">
                <span
                    className={`text-lg min-w-max flex ${
                        paymentIntents.status === "succeeded"
                            ? "text-green-500"
                            : "text-red-500"
                    }`}
                >
                    {paymentIntents.status === "succeeded" ? (
                        <MdOutlineVerified />
                    ) : (
                        <VscUnverified />
                    )}
                </span>
            </td>
            <td scope="row" className="px-6 py-4 font-semibold text-gray-900 ">
                <span className="min-w-max flex">
                    {paymentBy ? paymentBy : "Null"}
                </span>
            </td>
            <td scope="row" className="px-6 py-4 font-semibold text-gray-900 ">
                <span
                    className={`min-w-max flex bg-gradient-to-br ${
                        orderStatus === "Not Processed"
                            ? "from-red-500"
                            : orderStatus === "Processing"
                            ? "from-blue-500"
                            : orderStatus === "Dispatched"
                            ? "from-fuchsia-600"
                            : orderStatus === "Cash On Delivery"
                            ? "from-green-500"
                            : orderStatus === "Completed"
                            ? "from-green-700"
                            : orderStatus === "Cancelled"
                            ? "from-red-300"
                            : ""
                    }  to-voilet-500 px-3.6 text-xs rounded-1.8 py-2.5 px-4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white`}
                >
                    {orderStatus}
                </span>
            </td>
        </tr>
    );
};

export default RecentOrderRow;
