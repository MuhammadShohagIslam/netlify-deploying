import React, { useState, useEffect } from "react";
import {
    getAllSubCategories,
    deleteSubCategory,
    updateSubCategory,
    getSubCategory,
} from "@/api/sub-categories";
import SubCategoryTable from "@/components/Dashboard/Admin/SubCategoryTable/SubCategoryTable";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { ISubCategories } from "types/sub-category.type";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { getListOfCategory } from "@/api/category";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import CustomModal from "@/components/Modal/CustomModal/CustomModal";
import { ICategories } from "types/category.type";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";

const AllSubCategory = () => {
    const [values, setValues] = useState({ images: [] });
    const [loading, setLoading] = useState<boolean>(false);
    const [updateSubCategoryName, setUpdateSubCategoryName] =
        useState<string>("");
    const [subCategorySlug, setSubCategorySlug] = useState<string>("");
    const [parentCategory, setParentCategory] = useState<string>("");
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [subCategories, setSubCategories] = useState<ISubCategories[]>([]);
    const [categories, setCategories] = useState<ICategories[]>([]);
    // const [keyword, setKeyword] = useState<string>("");

    const { state } = useStoreContext();
    const { user } = state;

    useEffect(() => {
        getAllCategories();
        allSubCategories();
    }, []);

    const getAllCategories = async () => {
        getListOfCategory()
            .then((res) => {
                setCategories(res.data);
            })
            .catch((error) => console.log(error.message));
    };
    const allSubCategories = async () => {
        getAllSubCategories()
            .then((res) => {
                setSubCategories(res.data);
            })
            .catch((error) => console.log(error.message));
    };

    // const searched = (keyword: any) => (c: any) =>
    //     c.name.toLowerCase().includes(keyword);

    // handle update category
    const closeModal = () => {
        setOpenModal(false);
        setUpdateSubCategoryName("");
    };
    const handleEditSubCategory = (slug: string) => {
        setOpenModal(true);
        getSubCategory(slug)
            .then((res) => {
                setUpdateSubCategoryName(res.data.subCategory.name);
                setParentCategory(res.data.subCategory.parent);
                setSubCategorySlug(res.data.subCategory.slug);
                setValues({ images: res.data.subCategory.images });
            })
            .catch((error) => console.log(error.message));
    };
    const handleUpdateSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        setLoading(true);
        const updateSubCategoryObj = {
            name: updateSubCategoryName,
            parent: parentCategory,
            images: values.images,
        };
        updateSubCategory(user!.token, updateSubCategoryObj, subCategorySlug)
            .then((res) => {
                toast.success(`${res.data.name} Sub-Category Updated!`);
                setLoading(false);
                allSubCategories();
                closeModal();
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    toast.error("Sub-Category Updating Failed!");
                }
                setLoading(false);
            });
    };

    // removed Sub Category value
    const handleRemoveSubCategory = async (slug: string) => {
        if (
            window.confirm(
                `Are You Sure? To Remove ${slug.toUpperCase()} Sub-Category!`
            )
        ) {
            deleteSubCategory(user!.token, slug)
                .then((res) => {
                    toast.success(`${res.data.name} Sub-Category Deleted!`);
                    setLoading(false);
                    allSubCategories();
                })
                .catch((error) => {
                    if (error.response.status === 400) {
                        toast.error(`Sub-Category Removing is Failed!`);
                    }
                    setLoading(false);
                });
        }
    };

    return (
        <>
            <HeadSeo
                title={"All Sub-Category"}
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />
            <DashboardLayout>
                <div>
                    <SubCategoryTable
                        subCategories={subCategories}
                        handleRemoveSubCategory={handleRemoveSubCategory}
                        handleEditSubCategory={handleEditSubCategory}
                    />
                </div>
                {/*Show Update Category Modal */}
                {openModal && (
                    <CustomModal
                        isUpdateImages
                        values={values}
                        setValues={setValues}
                        setLoading={setLoading}
                        closeModal={closeModal}
                        handleEditSubmit={handleUpdateSubmit}
                        setUpdateValue={setUpdateSubCategoryName}
                        updateValue={updateSubCategoryName}
                        title={"Update Sub Category"}
                        labelName={" Sub-Category Name"}
                    >
                        <div className="mb-3 mt-2">
                            <label className="block mb-1.5 text-sm font-medium text-primary">
                                Parent Category
                            </label>
                            <select
                                className=" rounded-lg border border-success focus:ring-green-500 focus:border-green-500 focus:outline focus:outline-offset-2 focus:outline-green-600 w-3/4 p-2 text-gray-700 font-semibold mt-1"
                                onChange={(e) =>
                                    setParentCategory(e.target.value)
                                }
                            >
                                {categories &&
                                    categories.length > 0 &&
                                    categories.map((category) => (
                                        <option
                                            key={category._id}
                                            value={category._id}
                                            selected={
                                                category._id === parentCategory
                                            }
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </CustomModal>
                )}
            </DashboardLayout>
        </>
    );
};

export default dynamic(() => Promise.resolve(AllSubCategory), { ssr: false });
