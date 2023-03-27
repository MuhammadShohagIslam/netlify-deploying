import React from "react";
import { ISubCategories } from "types/sub-category.type";
import SubCategoryRow from "./SubCategoryRow";

type SubCategoryTablePropType = {
    subCategories: ISubCategories[];
    handleRemoveSubCategory: (slug: string) => void;
    handleEditSubCategory: (slug: string) => void;
};
const SubCategoryTable = (props: SubCategoryTablePropType) => {
    const { subCategories, handleRemoveSubCategory, handleEditSubCategory } =
        props;

    return (
        <div className="relative flex flex-col w-full min-w-0 mb-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl shadow-md  rounded-2xl bg-clip-border ">
            <div className="px-4 py-3">
                <div>
                    <h6 className="text-gray-900 text-lg font-bold">
                        All Sub Category
                    </h6>
                    <p>List Of Sub Category</p>
                </div>
            </div>
            <div className="relative overflow-x-auto sm:rounded-lg scrollbar-thin scrollbar-thumb-gray-300  scrollbar-track-gray-100">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Images
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {subCategories?.length &&
                            subCategories?.map((subCategory) => (
                                <SubCategoryRow
                                    key={subCategory._id}
                                    subCategory={subCategory}
                                    handleRemoveSubCategory={
                                        handleRemoveSubCategory
                                    }
                                    handleEditSubCategory={
                                        handleEditSubCategory
                                    }
                                />
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SubCategoryTable;
