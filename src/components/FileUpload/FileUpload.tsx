import React from "react";
import Resizer from "react-image-file-resizer";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { AiOutlineUser } from "react-icons/ai";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { uploadingImageFile } from "@/api/cloudinary";
import { createOrUpdateUser } from "@/api/auth";
import { FileUploadPropsType } from "./FileUpload.types";

const FileUpload = ({
    values,
    setValues,
    setLoading,
    loading,
}: FileUploadPropsType) => {
    const {
        userProfileUpdate,
        state,
        setLoading: setLoadingForFirebase,
    } = useStoreContext();
    const { user } = state;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        setLoading(true);
        let fileInput = false;
        if (files?.item(0)!) {
            fileInput = true;
        }
        if (fileInput) {
            Resizer.imageFileResizer(
                files?.item(0)!,
                300,
                300,
                "JPEG",
                100,
                0,
                (uri) => {
                    uploadingImageFile(user!.token, uri)
                        .then((res) => {
                            setValues({
                                ...values,
                                image: {
                                    url: res.data?.url,
                                    public_id: res.data?.public_id,
                                },
                            });
                            imageUpdateToDatabase({
                                image: {
                                    url: res.data?.url,
                                    public_id: res.data?.public_id,
                                },
                                email: user!.email,
                            });
                            updateTheProfileToFirebase(
                                values?.fullName!,
                                res?.data?.url
                            );
                            setLoading(false);
                        })
                        .catch((error) => {
                            setLoading(false);
                            console.log(error);
                        });
                },
                "base64"
            );
        }
    };

    const imageUpdateToDatabase = (imageObject: {
        image: {
            public_id: string;
            url: string;
        };
        email: string;
    }) => {
        if (user) {
            createOrUpdateUser(user!.token, imageObject!)
                .then((res) => {
                    toast.success("Profile Image Update Successfully!");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    // const handleImageRemove = (public_id: string) => {
    //     if (user) {
    //         deletingImageFile(user.token, public_id)
    //             .then((res) => {
    //                 setValues({
    //                     ...values,
    //                     image: {
    //                         url: "",
    //                         public_id: "",
    //                     },
    //                 });
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    //     }
    // };

    const updateTheProfileToFirebase = (
        fullName: string,
        photoImage: string
    ) => {
        const profile = {
            displayName: fullName,
            photoURL: photoImage,
        };
        userProfileUpdate(profile)
            .then((result) => {
                setLoadingForFirebase(false);
            })
            .catch((error) => {
                toast.error(error);
            })
            .finally(() => {
                setLoadingForFirebase(false);
            });
    };
    return (
        <>
            <div className="mb-3 relative">
                {values?.image?.url ? (
                    <div className="overflow-hidden h-32 relative mb-2">
                        <Image
                            className="h-full w-[98%] rounded-sm md:w-full sm:w-full"
                            src={values?.image.url}
                            alt={values?.username!}
                            width={100}
                            height={100}
                            priority
                        />
                    </div>
                ) : (
                    <div className="overflow-hidden h-32 relative mb-2">
                        <AiOutlineUser className="h-full w-full rounded-sm  md:w-full sm:w-full" />
                    </div>
                )}
            </div>
            <div className="mb-3">
                <label className="text-white w-full py-2 px-9 bg-gradient-to-br from-green-400 to-voilet-500 px-3.6 text-xs rounded-1.8 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none hover:from-green-600 transition-all">
                    <input
                        hidden
                        accept="image/*"
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                    />
                    {loading ? "Uploading " : "Profile Upload"}
                </label>
            </div>
        </>
    );
};

export default FileUpload;
