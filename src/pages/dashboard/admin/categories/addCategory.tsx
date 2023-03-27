import { createCategory } from "@/api/category";
import FormGroup from "@/components/Form/FormGroup";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import ImageFileUploadForm from "@/components/Form/ImageFileUploadForm/ImageFileUploadForm";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";

interface IFormInputs {
    category: string;
    productImg: string;
}
const initialValues = {
    name: "",
    images: [],
};
const AddCategory = () => {
    const [values, setValues] = useState(initialValues);
    const [loading, setLoading] = useState(false);
    const { state } = useStoreContext();
    const { user } = state;
    const router = useRouter();
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<IFormInputs>();

    const handleCategorySubmit: SubmitHandler<IFormInputs> = async (data) => {
        setLoading(true);
        const updatedValues = {
            ...values,
            name: data.category,
        };
        createCategory(user!.token, updatedValues)
            .then((res) => {
                setLoading(false);
                toast.success(`${res.data.name} Category Created!`);
                reset();
                setValues({ images: [], name: "" });
                router.push("/dashboard/admin/categories");
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    toast.error("Category Creating Failed!");
                    setLoading(false);
                }
                setLoading(false);
            });
    };

    return (
        <>
            <HeadSeo
                title="Add Category"
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />
            <DashboardLayout>
                <div>
                    <div className="bg-secondary p-6 rounded-lg w-3/4 sm:w-full md:w-full">
                        <h2 className="text-center font-semibold text-primary text-2xl">
                            Add New Category
                        </h2>
                        <form
                            className="sm:-mt-2 md:-mt-2"
                            onSubmit={handleSubmit(handleCategorySubmit)}
                        >
                            <div className="grid grid-cols-2">
                                <ImageFileUploadForm
                                    values={values}
                                    setValues={setValues}
                                    setLoading={setLoading}
                                    errorField={errors.productImg}
                                    register={register}
                                />
                            </div>
                            <FormGroup
                                register={register}
                                inputName={"category"}
                                labelName={"Category"}
                                errorField={errors.category}
                                inputType={"text"}
                                placeholder={"Enter Your Category"}
                                required="Please Enter Category"
                            />

                            <button
                                disabled={loading}
                                type="submit"
                                className="btn block hover:bg-transparent hover:text-primary text-white btn-primary disabled:opacity-75 disabled:border-2 disabled:border-primary disabled:text-primary mt-2"
                            >
                                {loading ? "Loading" : "Submit"}
                            </button>
                        </form>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default AddCategory;
