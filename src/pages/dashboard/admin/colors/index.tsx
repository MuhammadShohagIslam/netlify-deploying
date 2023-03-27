import {
    deleteColor,
    getListOfColor,
    getSingleColor,
    updateColor,
} from "@/api/color";
import CustomModal from "@/components/Modal/CustomModal/CustomModal";
import CustomTable from "@/components/Table/CustomTable/CustomTable";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IColor } from "types/color.types";

const AllColors = () => {
    const [updateColorName, setUpdateColorName] = useState<string>("");
    const [colorSlug, setColorSlug] = useState<string>("");
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [colors, setColors] = useState<IColor[]>([]);
    // step1
    const [keyword, setKeyword] = useState("");
    const { state } = useStoreContext();
    const { user } = state;

    useEffect(() => {
        handleShowColor();
    }, []);

    // search filter
    // const filtering = categories.filter(category => category.name.toLowerCase().includes(keyword));
    const searched = (keyword: any) => (c: any) =>
        c.name.toLowerCase().includes(keyword);

    const handleShowColor = () =>
        getListOfColor()
            .then((res) => {
                setColors(res.data);
            })
            .catch((error) => console.log(error.message));

    // handle update category
    const closeModal = () => {
        setOpenModal(false);
        setUpdateColorName("");
    };
    const handleEditColor = (slug: string) => {
        setOpenModal(true);
        getSingleColor(slug)
            .then((res) => {
                setUpdateColorName(res.data.name);
                setColorSlug(res.data.slug);
            })
            .catch((error) => console.log(error.message));
    };

    const handleUpdateSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        setLoading(true);
        updateColor(user!.token, updateColorName, colorSlug)
            .then((res) => {
                toast.success(`${res.data.name} Color Updated!`);
                setLoading(false);
                handleShowColor();
                closeModal();
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    toast.error("Color Updating Failed!");
                    setLoading(false);
                }
            });
    };

    const handleRemoveColor = async (slug: string) => {
        if (window.confirm("Are You Sure?, Want to Delete Color!")) {
            deleteColor(user!.token, slug)
                .then((res) => {
                    toast.success(`${res.data.name} Color is deleted!`);
                    handleShowColor();
                })
                .catch((error) => {
                    if (error.response.status === 400) {
                        toast.error("Color Deleting Failed!");
                    }
                });
        }
    };
    return (
        <>
            <HeadSeo
                title="All Color"
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />
            <DashboardLayout>
                <div>
                    <CustomTable
                        arrayData={colors}
                        handleRemoveData={handleRemoveColor}
                        handleEditData={handleEditColor}
                        dataLabelName={"Color"}
                    />
                </div>

                {/*Show Update Color Modal */}
                {openModal && (
                    <CustomModal
                        closeModal={closeModal}
                        handleEditSubmit={handleUpdateSubmit}
                        setUpdateValue={setUpdateColorName}
                        updateValue={updateColorName}
                        title={"Update Color"}
                        labelName={"Color Name"}
                    />
                )}
            </DashboardLayout>
        </>
    );
};

export default dynamic(() => Promise.resolve(AllColors), { ssr: false });
