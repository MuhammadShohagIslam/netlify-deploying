import { getListOfCategory } from "@/api/category";
import { createSubCategory } from "@/api/sub-categories";
import FormGroup from "@/components/Form/FormGroup";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { ICategories } from "types/category.type";
import { useRouter } from "next/router";
import ImageFileUploadForm from "@/components/Form/ImageFileUploadForm/ImageFileUploadForm";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";

interface IFormInputs {
    subCategory: string;
    parentCategory: any;
    productImg: string;
}
const initialValues = {
    images: [],
};
const AddSubCategory = () => {
    const [values, setValues] = useState(initialValues);
    const [loading, setLoading] = useState<boolean>(false);
    const [categories, setCategories] = useState<ICategories[]>([]);
    const { state } = useStoreContext();
    const { user } = state;
    const router = useRouter();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<IFormInputs>();

    useEffect(() => {
        getAllCategories();
    }, []);

    const getAllCategories = async () => {
        getListOfCategory()
            .then((res) => {
                setCategories(res.data);
            })
            .catch((error) => console.log(error.message));
    };
    const handleCreateSubCSubmit: SubmitHandler<IFormInputs> = async (data) => {
        setLoading(true);
        const subCategoryObject = {
            images: values.images,
            name: data.subCategory,
            parent: data.parentCategory,
        };
        createSubCategory(user!.token, subCategoryObject)
            .then((res) => {
                toast.success(`${res.data.name} Sub-Category Created!`);
                setLoading(false);
                router.push("/dashboard/admin/subCategories");
                setValues({ images: [] });
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    toast.error(`Sub-Category Creating is Failed!`);
                }
                setLoading(false);
            });
    };

    return (
        <>
            <HeadSeo
                title={"Add Sub-Category"}
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />
            <DashboardLayout>
                <div className="bg-secondary p-6 rounded-lg w-3/4 sm:w-full md:w-full">
                    <h2 className="text-center font-semibold text-primary text-2xl sm:text-lg md:text-xl">
                        Add New Sub Category
                    </h2>
                    <form onSubmit={handleSubmit(handleCreateSubCSubmit)}>
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
                            inputName={"subCategory"}
                            labelName={"Sub Category"}
                            errorField={errors.subCategory}
                            inputType={"text"}
                            placeholder={"Enter Your Sub Category"}
                            required="Please Enter Sub Category"
                        />
                        <div className="mb-3">
                            <label
                                htmlFor="parentCategory"
                                className="block mb-2 text-sm font-medium text-primary"
                            >
                                Add Category
                            </label>
                            <select
                                className=" rounded-lg border border-success focus:ring-green-500 focus:border-green-500 focus:outline focus:outline-offset-2 focus:outline-green-600 w-3/4 p-2 text-gray-700 font-semibold mt-1"
                                {...register("parentCategory", {
                                    required: "Select Any Category",
                                })}
                            >
                                {categories &&
                                    categories.length > 0 &&
                                    categories.map((category) => (
                                        <option
                                            key={category._id}
                                            value={category._id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                            </select>
                            {errors.parentCategory && (
                                <p className="text-red-600">
                                    <>{errors?.parentCategory}</>
                                </p>
                            )}
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="btn block hover:bg-transparent hover:text-primary text-white btn-primary disabled:opacity-75 disabled:border-2 disabled:border-primary disabled:text-primary mt-2"
                        >
                            {loading ? "Loading" : "Submit"}
                        </button>
                    </form>
                </div>
            </DashboardLayout>
        </>
    );
};

export default AddSubCategory;
