import React from "react";
import CustomRow from "./CustomRow";

type CustomTablePropType = {
    arrayData: any[];
    dataLabelName: string;
    handleRemoveData: (slug: string) => void;
    handleEditData: (slug: string) => void;
};
const CustomTable = (props: CustomTablePropType) => {
    const { arrayData, dataLabelName, handleRemoveData, handleEditData } =
        props;
    return (
        <div className="relative flex flex-col w-full min-w-0 mb-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl shadow-md  rounded-2xl bg-clip-border ">
            <div className="px-4 py-3">
                <div>
                    <h6 className="text-gray-900 text-lg font-bold">
                        All {dataLabelName}
                    </h6>
                    <p>List Of {dataLabelName}</p>
                </div>
            </div>
            <div className="relative overflow-x-auto sm:rounded-lg scrollbar-thin scrollbar-thumb-gray-300  scrollbar-track-gray-100">
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrayData.length &&
                            arrayData.map((data: any) => (
                                <CustomRow
                                    key={data._id}
                                    data={data}
                                    handleRemoveData={handleRemoveData}
                                    handleEditData={handleEditData}
                                />
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomTable;
