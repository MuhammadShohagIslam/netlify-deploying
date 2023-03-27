import React from "react";
import Image from "next/image";
import { FaUserGraduate, FaProductHunt } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import { SiProducthunt } from "react-icons/si";
import { VscUnverified } from "react-icons/vsc";
import {
    getPaginationRowModel,
    useReactTable,
    ColumnDef,
    flexRender,
    getCoreRowModel,
} from "@tanstack/react-table";
import TablePagination from "@/components/TablePagination/TablePagination";
import { IOrder } from "types/order.types";

type OrdersTablePropType = {
    data: IOrder[];
    handleChangeOrderStatus: (orderId: string, orderStatus: string) => void;
};
const OrdersTable = ({
    data,
    handleChangeOrderStatus,
}: OrdersTablePropType) => {
    const OrdersColumn = [
        {
            header: () => "Profile",
            id: "profile",
            cell: (info: any) => (
                <span className="min-w-max flex">
                    {info.getValue()?.image && info.getValue()?.image?.url ? (
                        <Image
                            width={100}
                            height={100}
                            src={info.getValue().image.url}
                            alt="Apple Watch"
                            className="w-10 h-10 p-1 rounded-full ring-2 ring-green-300"
                        />
                    ) : (
                        <FaUserGraduate className="w-10 h-10 p-1 rounded-full ring-2 ring-green-300" />
                    )}
                </span>
            ),
            accessorKey: "orderedBy",
        },
        {
            header: () => "User Name",
            id: "userName",
            cell: (info: any) => (
                <span className="min-w-max flex">
                    {info.getValue() ? info.getValue()?.fullName : "Null"}
                </span>
            ),
            accessorKey: "orderedBy",
        },
        {
            header: () => "User Email",
            id: "userEmail",
            cell: (info: any) => (
                <span className="min-w-max flex">
                    {info.getValue() ? info.getValue()?.email : "Null"}
                </span>
            ),
            accessorKey: "orderedBy",
        },
        {
            header: () => "Shipping Address",
            id: "shippingAddress",
            cell: (info: any) => (
                <div>
                    {info.getValue() ? (
                        <>
                            <h2>
                                Address: {info.getValue()?.address?.address}
                            </h2>
                            <h2>City: {info.getValue()?.address?.city}</h2>
                            <h2>
                                PostalCode:
                                {info.getValue()?.address?.postalCode}
                            </h2>
                        </>
                    ) : (
                        "Null"
                    )}
                </div>
            ),
            accessorKey: "orderedBy",
        },
        {
            header: () => "Products",
            cell: (info: any) => (
                <span className="min-w-max flex">
                    {info.getValue() ? (
                        <div className="flex">
                            {info.getValue()?.length > 0 &&
                                info.getValue().map((product: any) => (
                                    <div key={product._id} className="relative">
                                        {product?.product &&
                                        product.product?.images[0]?.url ? (
                                            <Image
                                                width={100}
                                                height={100}
                                                src={
                                                    product.product.images[0]
                                                        .url
                                                }
                                                alt="Product image"
                                                className="w-16 h-12 p-1 rounded-full ring-2 ring-green-300"
                                            />
                                        ) : (
                                            <FaProductHunt className="w-10 h-10 p-1 rounded-full ring-2 ring-green-300" />
                                        )}

                                        <span className="absolute px-2  bg-red-400 rounded-lg top-0 left-0 text-white flex items-center justify-center">
                                            {product?.count}
                                        </span>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <SiProducthunt className="w-10 h-10 p-1 rounded-full ring-2 ring-green-300" />
                    )}
                </span>
            ),
            accessorKey: "products",
        },
        {
            header: () => "Total",
            id: "total",
            cell: (info: any) => (
                <span className="min-w-max flex">
                    {`$${info.getValue()?.amount / 100}`}
                </span>
            ),
            accessorKey: "paymentIntents",
        },
        {
            header: () => "Payment Status",
            id: "Payment",
            cell: (info: any) => (
                <span
                    className={`text-lg min-w-max flex ${
                        info.getValue()?.status === "succeeded"
                            ? "text-green-500"
                            : "text-red-500"
                    }`}
                >
                    {info.getValue()?.status === "succeeded" ? (
                        <MdOutlineVerified />
                    ) : (
                        <VscUnverified />
                    )}
                </span>
            ),
            accessorKey: "paymentIntents",
        },
        {
            header: () => "Status",
            id: "Order Status",
            cell: ({ row }: any) => (
                <select
                    name="status"
                    className={`bg-gradient-to-br ${
                        row.original?.orderStatus === "Not Processed"
                            ? "from-red-500"
                            : row.original?.orderStatus === "Processing"
                            ? "from-blue-500"
                            : row.original?.orderStatus === "Dispatched"
                            ? "from-fuchsia-600"
                            : row.original?.orderStatus === "Cash On Delivery"
                            ? "from-green-500"
                            : row.original?.orderStatus === "Completed"
                            ? "from-green-600"
                            : row.original?.orderStatus === "Cancelled"
                            ? "from-red-300"
                            : ""
                    }  to-voilet-500 px-3.6 text-xs rounded-1.8 py-2.5 px-4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white`}
                    defaultValue={row.original?.orderStatus}
                    onChange={(e) =>
                        handleChangeOrderStatus(
                            row.original?._id,
                            e.target.value
                        )
                    }
                >
                    <option className="text-gray-700" value="Not Processed">
                        Not Processed
                    </option>
                    <option className="text-gray-700" value="Cash On Delivery">
                        Cash On Delivery
                    </option>
                    <option className="text-gray-700" value="Processing">
                        Processing
                    </option>
                    <option className="text-gray-700" value="Cancelled">
                        Cancelled
                    </option>
                    <option className="text-gray-700" value="Completed">
                        Completed
                    </option>
                </select>
            ),
            accessor: "_id",
        },
    ];
    const columns = React.useMemo<ColumnDef<IOrder>[]>(() => OrdersColumn, []);
    const table = useReactTable({
        data,
        columns,
        getPaginationRowModel: getPaginationRowModel(),
        getCoreRowModel: getCoreRowModel(),
    });
    return (
        <div className="relative flex flex-col w-full min-w-0 mb-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl shadow-md bg-clip-border">
            <div className="flex justify-between px-4 py-3">
                <div>
                    <h6 className="text-gray-900 text-lg font-bold">
                        All Orders
                    </h6>
                </div>
                <div>
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value));
                        }}
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-32 p-2 text-black font-semibold mt-1"
                    >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="relative overflow-x-auto sm:rounded-lg scrollbar-thin scrollbar-thumb-gray-300  scrollbar-track-gray-100">
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            className="px-6 py-3"
                                            scope="col"
                                        >
                                            {header.isPlaceholder ? null : (
                                                <div>
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext()
                                                    )}
                                                </div>
                                            )}
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => {
                            return (
                                <tr
                                    key={row.id}
                                    className="bg-white border-b hover:bg-gray-50 "
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <td
                                                className="px-6 py-4 font-semibold text-gray-900 "
                                                key={cell.id}
                                                scope="row"
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {/* Pagination table page bottom */}
            <div>
                <TablePagination table={table} />
            </div>
        </div>
    );
};

export default OrdersTable;
