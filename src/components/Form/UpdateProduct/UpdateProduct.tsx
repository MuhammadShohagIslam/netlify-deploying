import { DefaultValues, useForm } from "react-hook-form";
import { ISubCategories } from "types/sub-category.type";
import FormGroup from "../FormGroup";
import ImageFileUploadForm from "../ImageFileUploadForm/ImageFileUploadForm";
import MultiSelect from "../MultiSelect";
import SelectInput from "../SelectInput";
import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { IFormInput } from "../CreateProduct/FormInput.types";
const animatedComponents = makeAnimated();

const customStyles = {
    option: (provided: any, state: any) => ({
        ...provided,
        borderBottom: "1px solid transparent",
        color: state.isSelected ? "#fff" : "black",
    }),
};

const UpdateProductForm = ({
    handleSubmitProduct,
    handleCategoryChange,
    setArraySubCategories,
    setValues,
    values,
    loading,
    // categories,
    subCategories,
    selectedCategory,
    arraySubCategories,
    setLoading,
    multiSelectSubCategories,
    setMultiSelectSubCategories,
    multiSelectSizes,
    setMultiSelectSizes,
    multiSelectColors,
    setMultiSelectColors,
}: any) => {
    const {
        title,
        description,
        price,
        discount,
        shipping,
        colors,
        color,
        brands,
        sizesData,
        sizes,
        brand,
        category,
        quantity,
        brandData,
        colorsData,
        categories,
    } = values;

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = useForm<IFormInput>();

    return (
        <form
            onSubmit={handleSubmit((data) => handleSubmitProduct(data))}
            className="mt-5"
        >
            <div className="grid grid-cols-2">
                <ImageFileUploadForm
                    values={values}
                    setValues={setValues}
                    setLoading={setLoading}
                    errorField={""}
                    register={register}
                    isUpdateImage
                />
            </div>
            <div className="grid gap-6 mb-6 grid-cols-2">
                <div>
                    {title && (
                        <FormGroup
                            register={register}
                            isDefaultValue
                            defaultValue={title}
                            inputName={"productName"}
                            labelName={"Product Name"}
                            errorField={errors.productName}
                            inputType={"text"}
                            placeholder={"Enter Your Product Name"}
                            required="Product Title Is Required!"
                        />
                    )}
                </div>

                <div>
                    {price && (
                        <FormGroup
                            register={register}
                            inputName={"price"}
                            labelName={"Price"}
                            isDefaultValue
                            defaultValue={price}
                            errorField={errors.price}
                            inputType={"number"}
                            placeholder={"Enter Your Product Price"}
                            required="Product Price Is Required!"
                        />
                    )}
                </div>
                <div>
                    {discount && (
                        <FormGroup
                            register={register}
                            inputName={"discount"}
                            labelName={"Discount"}
                            isDefaultValue
                            defaultValue={discount}
                            errorField={errors.discount}
                            inputType={"number"}
                            placeholder={"Enter Your Product Discount"}
                            required="Product Price Discount Is Required!"
                        />
                    )}
                </div>
                <div>
                    {quantity && (
                        <FormGroup
                            register={register}
                            inputName={"quantity"}
                            labelName={"Quantity"}
                            isDefaultValue
                            defaultValue={quantity}
                            errorField={errors.quantity}
                            inputType={"number"}
                            placeholder={"Enter Your Product Quantity"}
                            required="Product Price Quantity Is Required!"
                        />
                    )}
                </div>
            </div>
            <div className="mb-6">
                {(selectedCategory || category?._id) && (
                    <SelectInput
                        register={register}
                        dataArray={categories}
                        labelName={"Product Category"}
                        inputName={"productCategory"}
                        isDefaultValue
                        defaultValue={
                            selectedCategory ? selectedCategory : category._id
                        }
                        errorField={errors.productCategory}
                        required={{
                            required: "Product Category Is Required!",
                            onChange: (e: any) => handleCategoryChange(e),
                        }}
                    />
                )}
            </div>
            <div className="mb-6">
                <MultiSelect
                    dataArray={subCategories}
                    valueData={arraySubCategories}
                    placeholder={"Select the Sub Category"}
                    multiLabel={"Sub Category"}
                    multiName={"subCategory"}
                    errorFields={""}
                    multiSelectValues={multiSelectSubCategories}
                    setMultiSelectValues={setMultiSelectSubCategories}
                    control={control}
                    isUpdateImage
                />
            </div>
            <div className="mb-6">
                {brand._id && (
                    <SelectInput
                        dataArray={brandData}
                        labelName={"Brand"}
                        inputName={"brand"}
                        register={register}
                        isDefaultValue
                        defaultValue={brand._id}
                        errorField={errors.brand}
                        required={{
                            required: "Product Brand Is Required!",
                        }}
                    />
                )}
            </div>
            <div className="mb-6">
                <MultiSelect
                    dataArray={colorsData}
                    valueData={colors.map((v: any) => {
                        return {
                            label: v.name,
                            value: v._id,
                        };
                    })}
                    multiSelectValues={multiSelectColors}
                    setMultiSelectValues={setMultiSelectColors}
                    placeholder={"Select the Colors"}
                    multiLabel={"Product Colors"}
                    multiName={"colors"}
                    errorFields={""}
                    control={control}
                    isUpdateImage
                />
            </div>
            <div className="mb-6">
                <MultiSelect
                    dataArray={sizesData}
                    valueData={sizes.map((v: any) => {
                        return {
                            label: v.name,
                            value: v._id,
                        };
                    })}
                    multiSelectValues={multiSelectSizes}
                    setMultiSelectValues={setMultiSelectSizes}
                    placeholder={"Select the Sizes"}
                    multiLabel={"Product Sizes"}
                    multiName={"sizes"}
                    errorFields={""}
                    control={control}
                    isUpdateImage
                />
            </div>

            <div className="mb-6">
                <SelectInput
                    dataArray={["Yes", "No"]}
                    labelName={"Shipping"}
                    inputName={"shipping"}
                    isDefaultValue
                    defaultValue={shipping === "Yes" ? "Yes" : "No"}
                    register={register}
                    errorField={errors.shipping}
                    required={{
                        required: "Product Shipping Is Required!",
                    }}
                />
            </div>

            <div>
                {description && (
                    <FormGroup
                        register={register}
                        inputName={"description"}
                        labelName={"Description"}
                        isDefaultValue
                        defaultValue={description}
                        errorField={errors?.description}
                        placeholder={"Provide Product Description Here!"}
                        required="Product Product Description Is Required!"
                    />
                )}
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

export default UpdateProductForm;
