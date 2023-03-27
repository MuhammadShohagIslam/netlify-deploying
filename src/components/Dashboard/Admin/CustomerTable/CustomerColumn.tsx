import Image from "next/image";
import { FaUserGraduate } from "react-icons/fa";

export const CustomerColumn = [
    {
        header: () => "Username",
        cell: (info: any) => (
            <span className="min-w-max flex">
                {info.getValue() && info.getValue()}
            </span>
        ),
        accessorKey: "username",
    },
    {
        header: () => "Profile",
        cell: (info: any) => (
            <span className="min-w-max flex">
                {info.getValue()?.url ? (
                    <Image
                        width={100}
                        height={100}
                        src={info.getValue().url}
                        alt="Apple Watch"
                        className="w-10 h-10 p-1 rounded-full ring-2 ring-green-300"
                    />
                ) : (
                    <FaUserGraduate className="w-10 h-10 p-1 rounded-full ring-2 ring-green-300" />
                )}
            </span>
        ),
        accessorKey: "image",
    },
    {
        header: () => "Name",
        cell: (info: any) => (
            <span className="min-w-max flex">
                {info.getValue() && info.getValue()}
            </span>
        ),
        accessorKey: "name",
    },
    {
        header: () => "Email",
        cell: (info: any) => (
            <span className="min-w-max flex">
                {info.getValue() && info.getValue()}
            </span>
        ),
        accessorKey: "email",
    },
    {
        header: () => "Country",
        id: "country",
        cell: (info: any) => (
            <span className="min-w-max flex">
                {info.getValue() ? `${info.getValue()?.country}` : "Null"}
            </span>
        ),
        accessorKey: "address",
    },
    {
        header: () => "City",
        id: "city",
        cell: (info: any) => (
            <span className="min-w-max flex">
                {info.getValue() ? `${info.getValue()?.city}` : "Null"}
            </span>
        ),
        accessorKey: "address",
    },
    {
        header: () => "Postal Code",
        id: "postalCode",
        cell: (info: any) => (
            <span className="min-w-max flex">
                {info.getValue() ? `${info.getValue()?.postalCode}` : "Null"}
            </span>
        ),
        accessorKey: "address",
    },
    {
        header: () => "Role",
        accessorKey: "role",
    },
];
