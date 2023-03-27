import {
    deleteBrand,
    getListOfBrands,
    getSingleBrand,
    updateBrand,
} from "@/api/brand";
import CustomModal from "@/components/Modal/CustomModal/CustomModal";
import CustomTable from "@/components/Table/CustomTable/CustomTable";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IBrand } from "types/brand.types";

const AllBrands = () => {
    const [updateBrandName, setUpdateBrandName] = useState<string>("");
    const [colorSlug, setBrandSlug] = useState<string>("");
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [colors, setBrands] = useState<IBrand[]>([]);
    // const [keyword, setKeyword] = useState("");
    const { state } = useStoreContext();
    const { user } = state;

    useEffect(() => {
        handleShowBrand();
    }, []);

    // search filter
    // const filtering = categories.filter(category => category.name.toLowerCase().includes(keyword));
    // const searched = (keyword: any) => (c: any) =>
    //     c.name.toLowerCase().includes(keyword);

    const handleShowBrand = () =>
        getListOfBrands()
            .then((res) => {
                setBrands(res.data);
            })
            .catch((error) => console.log(error.message));

    // handle update category
    const closeModal = () => {
        setOpenModal(false);
        setUpdateBrandName("");
    };
    const handleEditBrand = (slug: string) => {
        setOpenModal(true);
        getSingleBrand(slug)
            .then((res) => {
                setUpdateBrandName(res.data.name);
                setBrandSlug(res.data.slug);
            })
            .catch((error) => console.log(error.message));
    };

    const handleUpdateSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        setLoading(true);
        updateBrand(user!.token, updateBrandName, colorSlug)
            .then((res) => {
                toast.success(`${res.data.name} Brand Updated!`);
                setLoading(false);
                handleShowBrand();
                closeModal();
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    toast.error("Brand Updating Failed!");
                    setLoading(false);
                }
            });
    };

    const handleRemoveBrand = async (slug: string) => {
        if (window.confirm("Are You Sure?, Want to Delete Brand!")) {
            deleteBrand(user!.token, slug)
                .then((res) => {
                    toast.success(`${res.data.name} Brand is deleted!`);
                    handleShowBrand();
                })
                .catch((error) => {
                    if (error.response.status === 400) {
                        toast.error("Brand Deleting Failed!");
                    }
                });
        }
    };
    return (
        <>
            <HeadSeo
                title="All Brand"
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />
            <DashboardLayout>
                <div>
                    <CustomTable
                        arrayData={colors}
                        handleRemoveData={handleRemoveBrand}
                        handleEditData={handleEditBrand}
                        dataLabelName={"Brand"}
                    />
                </div>

                {/*Show Update Brand Modal */}
                {openModal && (
                    <CustomModal
                        closeModal={closeModal}
                        handleEditSubmit={handleUpdateSubmit}
                        setUpdateValue={setUpdateBrandName}
                        updateValue={updateBrandName}
                        title={"Update Brand"}
                        labelName={"Brand Name"}
                    />
                )}
            </DashboardLayout>
        </>
    );
};

export default dynamic(() => Promise.resolve(AllBrands), { ssr: false });
