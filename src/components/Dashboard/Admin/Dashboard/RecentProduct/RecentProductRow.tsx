import React from "react";
import Image from "next/image";

const RecentProductRow = (props: any) => {
    const { title, images, price } = props.product;
    return (
        <tr className="bg-white border-b hover:bg-gray-50 ">
            <td className="p-4">
                <Image
                    width={100}
                    height={100}
                    src={images.length && images[0]?.url}
                    alt={title}
                    priority
                    className="w-18 h-16 p-1 rounded-full ring-2 ring-green-300"
                />
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 ">{title}</td>

            <td className="px-6 py-4 font-semibold text-gray-900 ">${price}</td>
        </tr>
    );
};

export default RecentProductRow;
