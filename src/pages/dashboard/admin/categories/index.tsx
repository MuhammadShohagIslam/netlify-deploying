import {
    getListOfCategory,
    deleteCategory,
    getSingleCategory,
    updateCategory,
} from "@/api/category";
import CategoryTable from "@/components/Dashboard/Admin/CategoryTable/CategoryTable";
import CustomModal from "@/components/Modal/CustomModal/CustomModal";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ICategories } from "types/category.type";

const AllCategory = () => {
    const [values, setValues] = useState({ images: [] });
    const [updateCategoryName, setUpdateCategoryName] = useState<string>("");
    const [categorySlug, setCategorySlug] = useState<string>("");
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [categories, setCategories] = useState<ICategories[]>([]);
    // step1
    const [keyword, setKeyword] = useState("");
    const { state } = useStoreContext();
    const { user } = state;

    useEffect(() => {
        handleShowCategory();
    }, []);

    // search filter
    // const filtering = categories.filter(category => category.name.toLowerCase().includes(keyword));
    const searched = (keyword: any) => (c: any) =>
        c.name.toLowerCase().includes(keyword);

    const handleShowCategory = () =>
        getListOfCategory()
            .then((res) => {
                setCategories(res.data);
            })
            .catch((error) => console.log(error.message));

    // handle update category
    const closeModal = () => {
        setOpenModal(false);
        setUpdateCategoryName("");
    };
    const handleEditCategory = (slug: string) => {
        setOpenModal(true);
        getSingleCategory(slug)
            .then((res) => {
                setUpdateCategoryName(res.data.category.name);
                setCategorySlug(res.data.category.slug);
                setValues({ ...values, images: res.data.category.images });
            })
            .catch((error) => console.log(error.message));
    };

    const handleUpdateSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        setLoading(true);
        const updateCategoryObj = {
            name: updateCategoryName,
            images: values.images,
        };
        updateCategory(user!.token, updateCategoryObj, categorySlug)
            .then((res) => {
                toast.success(`${res.data.name} Category Updated!`);
                setLoading(false);
                handleShowCategory();
                closeModal();
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    toast.error("Category Updating Failed!");
                    setLoading(false);
                }
            });
    };

    const handleRemoveCategory = async (slug: string) => {
        if (window.confirm("Are You Sure?, Want to Delete Category!")) {
            deleteCategory(user!.token, slug)
                .then((res) => {
                    toast.success(`${res.data.name} is deleted!`);
                    handleShowCategory();
                })
                .catch((error) => {
                    if (error.response.status === 400) {
                        toast.error("Category Deleting Failed!");
                    }
                });
        }
    };

    return (
        <>
            <HeadSeo
                title="All Category"
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />
            <DashboardLayout>
                <div>
                    <CategoryTable
                        categories={categories}
                        handleRemoveCategory={handleRemoveCategory}
                        handleEditCategory={handleEditCategory}
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
                        setUpdateValue={setUpdateCategoryName}
                        updateValue={updateCategoryName}
                        title={"Update Category"}
                        labelName={"Category Name"}
                    />
                )}
            </DashboardLayout>
        </>
    );
};

export default dynamic(() => Promise.resolve(AllCategory), { ssr: false });
