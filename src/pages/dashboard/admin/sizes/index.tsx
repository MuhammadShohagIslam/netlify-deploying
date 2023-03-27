import React, { useEffect, useState } from "react";
import {
    deleteSize,
    getListOfSizes,
    getSingleSize,
    updateSize,
} from "@/api/size";
import CustomModal from "@/components/Modal/CustomModal/CustomModal";
import CustomTable from "@/components/Table/CustomTable/CustomTable";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { ISize } from "types/size.types";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";

const AllSizes = () => {
    const [updateSizeName, setUpdateSizeName] = useState<string>("");
    const [sizeSlug, setSizeSlug] = useState<string>("");
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [sizes, setSizes] = useState<ISize[]>([]);
    // step1
    const [keyword, setKeyword] = useState("");
    const { state } = useStoreContext();
    const { user } = state;

    useEffect(() => {
        handleShowSize();
    }, []);

    // search filter
    // const filtering = categories.filter(category => category.name.toLowerCase().includes(keyword));
    const searched = (keyword: any) => (c: any) =>
        c.name.toLowerCase().includes(keyword);

    const handleShowSize = () =>
        getListOfSizes()
            .then((res) => {
                setSizes(res.data);
            })
            .catch((error) => console.log(error.message));

    // handle update category
    const closeModal = () => {
        setOpenModal(false);
        setUpdateSizeName("");
    };
    const handleEditSize = (slug: string) => {
        setOpenModal(true);
        getSingleSize(slug)
            .then((res) => {
                setUpdateSizeName(res.data.name);
                setSizeSlug(res.data.slug);
            })
            .catch((error) => console.log(error.message));
    };

    const handleUpdateSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        setLoading(true);
        updateSize(user!.token, updateSizeName, sizeSlug)
            .then((res) => {
                toast.success(`${res.data.name} Size Updated!`);
                setLoading(false);
                handleShowSize();
                closeModal();
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    toast.error("Size Updating Failed!");
                    setLoading(false);
                }
            });
    };

    const handleRemoveSize = async (slug: string) => {
        if (window.confirm("Are You Sure?, Want to Delete Size!")) {
            deleteSize(user!.token, slug)
                .then((res) => {
                    toast.success(`${res.data.name} Size is deleted!`);
                    handleShowSize();
                })
                .catch((error) => {
                    if (error.response.status === 400) {
                        toast.error("Size Deleting Failed!");
                    }
                });
        }
    };
    return (
        <>
            <HeadSeo
                title={"All Size"}
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />
            <DashboardLayout>
                <div>
                    <CustomTable
                        arrayData={sizes}
                        handleRemoveData={handleRemoveSize}
                        handleEditData={handleEditSize}
                        dataLabelName={"Size"}
                    />
                </div>

                {/*Show Update Color Modal */}
                {openModal && (
                    <CustomModal
                        closeModal={closeModal}
                        handleEditSubmit={handleUpdateSubmit}
                        setUpdateValue={setUpdateSizeName}
                        updateValue={updateSizeName}
                        title={"Update Size"}
                        labelName={"Size Name"}
                    />
                )}
            </DashboardLayout>
        </>
    );
};

export default dynamic(() => Promise.resolve(AllSizes), { ssr: false });
