import ImageFileUploadForm from "@/components/Form/ImageFileUploadForm/ImageFileUploadForm";
import React from "react";

type CustomModalPropType = {
    labelName: string;
    title: string;
    closeModal: () => void;
    handleEditSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    updateValue: string;
    setUpdateValue: React.Dispatch<React.SetStateAction<string>>;
    children?: React.ReactNode;
    values?: any;
    setValues?: any;
    setLoading?: any;
    isUpdateImages?: boolean;
};
const CustomModal = (props: CustomModalPropType) => {
    const {
        closeModal,
        handleEditSubmit,
        setUpdateValue,
        updateValue,
        title,
        labelName,
        children,
        values,
        setValues,
        setLoading,
        isUpdateImages = false,
    } = props;
    return (
        <>
            <input
                type="checkbox"
                id="my-custom-modal"
                className="modal-toggle"
            />
            <div className="modal">
                <div className="modal-box relative">
                    <label
                        onClick={closeModal}
                        htmlFor="my-modal"
                        className="btn btn-sm btn-success hover:btn-primary text-white btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <h3 className="text-lg font-bold text-success text-center">
                        {title}
                    </h3>
                    <form onSubmit={handleEditSubmit}>
                        {isUpdateImages && (
                            <div className="grid grid-cols-2">
                                <ImageFileUploadForm
                                    values={values}
                                    setValues={setValues}
                                    setLoading={setLoading}
                                    errorField={""}
                                    isUpdateImage
                                />
                            </div>
                        )}

                        <label
                            htmlFor="message"
                            className="block mb-2 text-sm font-medium text-primary"
                        >
                            {labelName}
                        </label>
                        <input
                            className="block p-2.5 w-full text-sm text-primary bg-gray-50 rounded-lg border border-success focus:ring-green-500 focus:border-green-500 focus:outline focus:outline-offset-2 focus:outline-green-600"
                            name={labelName}
                            defaultValue={updateValue}
                            onChange={(e) => setUpdateValue(e.target.value)}
                            placeholder="Leave a update here"
                        />
                        {children}
                        <div className="mt-5">
                            <input
                                type="submit"
                                value="Submit"
                                className="btn btn-sm capitalize hover:bg-transparent hover:text-primary text-white btn-primary"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CustomModal;
