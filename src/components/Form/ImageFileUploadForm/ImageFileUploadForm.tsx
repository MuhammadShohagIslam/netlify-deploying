import { deletingImageFile, uploadingImageFile } from "@/api/cloudinary";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import React, { Fragment } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Resizer from "react-image-file-resizer";


type ImageFileUploadFormPropType = {
    values: any;
    setValues: any;
    setLoading: any;
    errorField: any;
    register?: any;
    isUpdateImage?: boolean;
};
const ImageFileUploadForm = ({
    values,
    setValues,
    setLoading,
    register,
    errorField,
    isUpdateImage = false,
}: ImageFileUploadFormPropType) => {
    const { state } = useStoreContext();
    const { user } = state;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        let allImageUploadedFiles = values.images;
        if (files) {
            setLoading(true);
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                    files[i],
                    300,
                    300,
                    "JPEG",
                    100,
                    0,
                    (uri) => {
                        setLoading(true);
                        uploadingImageFile(user!.token, uri)
                            .then((res) => {
                                allImageUploadedFiles.push(res.data);
                                setValues({
                                    ...values,
                                    images: allImageUploadedFiles,
                                });
                                setLoading(false);
                            })
                            .catch((error) => {
                                setLoading(false);
                                console.log(error);
                            }).finally(() => {
                                setLoading(false);
                            });
                    },
                    "base64"
                );
            }
        }
    };
    const handleImageRemove = (public_id: string) => {
        if (user) {
            setLoading(true);
            deletingImageFile(user.token, public_id)
                .then((res) => {
                    const { images } = values;
                    let filteredImages = images.filter((item: any) => {
                        return item.public_id !== public_id;
                    });
                    setValues({ ...values, images: filteredImages });
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                    console.log(error);
                });
        }
    };
    return (
        <Fragment>
            <div className="my-5">
                <div className="my-5">
                    {values.images &&
                        values.images.map((image: any) => (
                            <span key={image.public_id}>
                                <button
                                    type="button"
                                    key={image.public_id}
                                    className="relative inline-flex items-center rounded-lg mb-2 transition-all mr-2"
                                >
                                    <img src={image.url} alt={"Image File"} className="h-32 w-36" />

                                    <div
                                        onClick={() =>
                                            handleImageRemove(image.public_id)
                                        }
                                        className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 "
                                    >
                                        <AiOutlineClose />
                                    </div>
                                </button>
                            </span>
                        ))}
                </div>
                <div>
                    {!isUpdateImage && (
                        <input
                            type="file"
                            multiple
                            accept="images/*"
                            {...register("productImg", {
                                required: "Product Image Is Required!",
                                onChange: (
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => handleFileChange(e),
                            })}
                            files={values.images}
                            className="file-input file-input-bordered file-input-success w-full max-w-xs"
                        />
                    )}
                    {!isUpdateImage && errorField && (
                        <p className="text-red-600 sm:text-sm md:text-sm">{errorField?.message}</p>
                    )}

                    {isUpdateImage && (
                        <input
                            type="file"
                            multiple
                            accept="images/*"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileChange(e)}
                            className="file-input file-input-bordered file-input-success w-full max-w-xs"
                        />
                    )}
                    {isUpdateImage && errorField && (
                        <p className="text-red-600 sm:text-sm md:text-sm">{errorField}</p>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default ImageFileUploadForm;
