import React from "react";
import { useForm } from "react-hook-form";
import { ISubCategories } from "types/sub-category.type";
import FormGroup from "../FormGroup";
import ImageFileUploadForm from "../ImageFileUploadForm/ImageFileUploadForm";
import MultiSelect from "../MultiSelect";
import SelectInput from "../SelectInput";
import { IFormInput } from "./FormInput.types";

type CreateProductFormType = {
    handleAddProduct: any;
    setLoading: any;
    handleChangeCategory: any;
    values: any;
    setValues: any;
    subCategories: ISubCategories[];
    isShow: boolean;
    loading: boolean;
    setSubCategoryRef: any;
    setColorRef: any;
    setSizeRef: any;
};

const CreateProductForm = (props: CreateProductFormType) => {
    const {
        handleAddProduct,
        handleChangeCategory,
        values,
        setValues,
        subCategories,
        isShow,
        loading,
        setLoading,
        setSubCategoryRef,
        setColorRef,
        setSizeRef,
    } = props;

    const {
        sizes,
        colors,
        brands,
        categories,
        subCategory,
        sizesData,
        colorsData,
    } = values;

    const {
        handleSubmit,
        register,
        control,
        setValue,
        formState: { errors },
        reset,
    } = useForm<IFormInput>();
    return (
        <form
            onSubmit={handleSubmit((data) =>
                handleAddProduct(data, reset, setValue)
            )}
            className="mt-5 md:mt-0 sm:mt-0"
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
            <div className="grid gap-6 mb-6 grid-cols-2 sm:grid-cols-1 md:grid-cols-1 sm:mb-2 md:mb-0 sm:gap-3">
                <div>
                    <FormGroup
                        register={register}
                        inputName={"productName"}
                        labelName={"Product Name"}
                        errorField={errors.productName}
                        inputType={"text"}
                        placeholder={"Enter Your Product Name"}
                        required="Product Title Is Required!"
                    />
                </div>

                <div>
                    <FormGroup
                        register={register}
                        inputName={"price"}
                        labelName={"Price"}
                        errorField={errors.price}
                        inputType={"number"}
                        placeholder={"Enter Your Product Price"}
                        required="Product Price Is Required!"
                    />
                </div>
                <div>
                    <FormGroup
                        register={register}
                        inputName={"discount"}
                        labelName={"Discount"}
                        errorField={errors.discount}
                        inputType={"number"}
                        placeholder={"Enter Your Product Discount"}
                        required="Product Price Discount Is Required!"
                    />
                </div>
                <div>
                    <FormGroup
                        register={register}
                        inputName={"quantity"}
                        labelName={"Quantity"}
                        errorField={errors.quantity}
                        inputType={"number"}
                        placeholder={"Enter Your Product Quantity"}
                        required="Product Price Quantity Is Required!"
                    />
                </div>
            </div>
            <div className="mb-6 sm:mb-3 md:mb-3">
                <SelectInput
                    dataArray={categories}
                    labelName={"Product Category"}
                    inputName={"productCategory"}
                    register={register}
                    errorField={errors.productCategory}
                    required={{
                        required: "Product Category Is Required!",
                        onChange: (e: any) => handleChangeCategory(e),
                    }}
                />
            </div>
            {isShow && (
                <div className="mb-6 sm:mb-3 md:mb-3">
                    <MultiSelect
                        dataArray={subCategories}
                        valueData={subCategory}
                        placeholder={"Select the Sub Category"}
                        multiLabel={"Sub Category"}
                        multiName={"subCategory"}
                        required={"Sub Category Is Required!"}
                        errorFields={errors.subCategory}
                        control={control}
                        setValueRef={setSubCategoryRef}
                    />
                </div>
            )}
            <div className="mb-6 sm:mb-3 md:mb-3">
                <SelectInput
                    dataArray={brands}
                    labelName={"Brand"}
                    inputName={"brand"}
                    register={register}
                    errorField={errors.brand}
                    required={{
                        required: "Product Brand Is Required!",
                    }}
                />
            </div>
            <div className="mb-6 sm:mb-3 md:mb-3">
                <MultiSelect
                    dataArray={colorsData}
                    valueData={colors}
                    placeholder={"Select the Colors"}
                    multiLabel={"Product Colors"}
                    multiName={"colors"}
                    required={"Color Is Required!"}
                    errorFields={errors.colors}
                    control={control}
                    setValueRef={setColorRef}
                />
            </div>
            <div className="mb-6 sm:mb-3 md:mb-3">
                <MultiSelect
                    dataArray={sizesData}
                    valueData={sizes}
                    placeholder={"Select the Sizes"}
                    multiLabel={"Product Sizes"}
                    multiName={"sizes"}
                    required={"Size Is Required!"}
                    errorFields={errors.sizes}
                    control={control}
                    setValueRef={setSizeRef}
                />
            </div>

            <div className="mb-6 sm:mb-3 md:mb-3">
                <SelectInput
                    dataArray={["Yes", "No"]}
                    labelName={"Shipping"}
                    inputName={"shipping"}
                    register={register}
                    errorField={errors.shipping}
                    required={{
                        required: "Product Shipping Is Required!",
                    }}
                />
            </div>

            <div>
                <FormGroup
                    register={register}
                    inputName={"description"}
                    labelName={"Description"}
                    errorField={errors?.description}
                    placeholder={"Provide Product Description Here!"}
                    required="Product Product Description Is Required!"
                />
            </div>
            <button
                disabled={loading}
                type="submit"
                value="Add Product"
                className="btn hover:bg-transparent hover:text-primary text-white btn-primary disabled:opacity-75 disabled:border-2 disabled:border-primary disabled:text-primary mt-2"
            >
                {loading ? "Loading" : "Add Product"}
            </button>
        </form>
    );
};

export default CreateProductForm;
