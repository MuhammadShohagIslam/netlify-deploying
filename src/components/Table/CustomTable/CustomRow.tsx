import React from "react";
import Image from "next/image";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";

type CustomRowPropType = {
    data: any;
    handleRemoveData: (slug: string) => void;
    handleEditData: (slug: string) => void;
};

const CustomRow = (props: CustomRowPropType) => {
    const { data, handleRemoveData, handleEditData } = props;
    const { name, slug } = data;

    return (
        <tr className="bg-white border-b hover:bg-gray-50 ">
            <td className="px-6 py-4 font-semibold text-gray-900 ">{name}</td>
            <th
                scope="col"
                className="px-6 py-3 flex items-center justify-start space-x-3"
            >
                <h2 onClick={() => handleRemoveData(slug)}>
                    <MdDeleteOutline className="text-red-500 text-xl hover:text-red-700 transition-all cursor-pointer" />
                </h2>
                <label
                    htmlFor="my-custom-modal"
                    onClick={() => handleEditData(slug)}
                >
                    <AiOutlineEdit className="text-green-400 text-lg  hover:text-green-700 transition-all cursor-pointer" />
                </label>
            </th>
        </tr>
    );
};

export default CustomRow;
