import Link from "next/link";
import React from "react";
import RecentProductRow from "./RecentProductRow";
import { RecentProductType } from "./RecentProducts.types";

const RecentProduct = (props: RecentProductType) => {
    const { products } = props;
    return (
        <div className="relative flex flex-col w-full min-w-0 mb-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl shadow-md  rounded-2xl bg-clip-border">
            <div className="flex justify-between px-4 py-3">
                <div>
                    <h6 className="text-gray-900 text-lg font-bold">
                        Recent Products
                    </h6>
                </div>
                <div className="text-gray-500 text-sm font-bold hover:text-green-500 transition-all cursor-pointer">
                    <Link href="/dashboard/admin/products">View All</Link>
                </div>
            </div>
            <div className="relative overflow-x-auto sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length &&
                            products
                                .slice(0, 4)
                                .map((product) => (
                                    <RecentProductRow
                                        key={product._id}
                                        product={product}
                                    />
                                ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentProduct;
