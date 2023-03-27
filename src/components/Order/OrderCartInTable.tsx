import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";

const OrderCartInTable = ({ order }: any) => {
    return (
        <div className="relative overflow-x-auto sm:rounded-lg scrollbar-thin scrollbar-thumb-gray-300  scrollbar-track-gray-100">
            <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th className="px-6 py-3" scope="col">
                            Title
                        </th>
                        <th className="px-6 py-3" scope="col">
                            Price
                        </th>
                        <th className="px-6 py-3" scope="col">
                            Color
                        </th>
                        <th className="px-6 py-3" scope="col">
                            Count
                        </th>
                        <th className="px-6 py-3" scope="col">
                            Shipping
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {order.products &&
                        order.products.map((item: any) => (
                            <tr
                                key={item._id}
                                className="bg-white border-b hover:bg-gray-50 "
                            >
                                <td
                                    scope="row"
                                    className="px-6 py-4 font-semibold text-gray-900 "
                                >
                                    {" "}
                                    <span className="min-w-max flex">
                                        {item.product?.title}
                                    </span>
                                </td>
                                <td
                                    scope="row"
                                    className="px-6 py-4 font-semibold text-gray-900 "
                                >
                                    {" "}
                                    <span className="min-w-max flex">
                                        {item.product?.price}
                                    </span>
                                </td>

                                <td
                                    scope="row"
                                    className="px-6 py-4 font-semibold text-gray-900 "
                                >
                                    {" "}
                                    <span className="min-w-max flex">
                                        {item?.color}
                                    </span>
                                </td>
                                <td
                                    scope="row"
                                    className="px-6 py-4 font-semibold text-gray-900 "
                                >
                                    {" "}
                                    <span className="min-w-max flex">
                                        {item?.count}
                                    </span>
                                </td>
                                <td
                                    scope="row"
                                    className="px-6 py-4 font-semibold text-gray-900 "
                                >
                                    <span className="min-w-max flex">
                                        {item.product?.shipping === "Yes" ? (
                                            <AiOutlineCheckCircle
                                                style={{ color: "green" }}
                                            />
                                        ) : (
                                            <AiOutlineCheckCircle
                                                style={{ color: "red" }}
                                            />
                                        )}
                                    </span>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderCartInTable;
