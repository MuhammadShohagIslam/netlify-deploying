import { getListOfBrands } from "@/api/brand";
import { getListOfCategory, subCategoryOnCategory } from "@/api/category";
import { getListOfColor } from "@/api/color";
import { createProduct } from "@/api/products";
import { getListOfSizes } from "@/api/size";
import CreateProductForm from "@/components/Form/CreateProduct/CreateProductForm";
import { IFormInput } from "@/components/Form/CreateProduct/FormInput.types";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { UseFormReset, UseFormSetValue } from "react-hook-form";
import toast from "react-hot-toast";
import { IBrand } from "types/brand.types";
import { ICategories } from "types/category.type";
import { IColor } from "types/color.types";
import { ISize } from "types/size.types";

type a = {
    title: string;
    description: string;
    images: any[];
    price: number;
    shipping: string;
    quantity: number;
    discount: number;
    colors: any[];
    colorsData: any[];
    sizesData: any[];
    sizes: any[];
    brand: string;
    brands: any[];
    category: string;
    categories: any[];
    subCategory: any[];
};
const initialValues: a = {
    title: "",
    description: "",
    images: [],
    price: 0,
    shipping: "",
    quantity: 0,
    discount: 0,
    colors: [],
    colorsData: [],
    sizesData: [],
    sizes: [],
    brand: "",
    brands: [],
    category: "",
    categories: [],
    subCategory: [],
};

type AddProductPropType = {
    categories: ICategories[];
    colorsData: IColor[];
    sizesData: ISize[];
    brandsData: IBrand[];
};

const AddProduct = ({
    categories,
    colorsData,
    sizesData,
    brandsData,
}: AddProductPropType) => {
    const [values, setValues] = useState({
        ...initialValues,
        categories: categories,
        colorsData: colorsData,
        sizesData: sizesData,
        brands: brandsData,
    });
    const [subCategories, setSubCategories] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [subCategoryRef, setSubCategoryRef] = useState<any>(null);
    const [colorRef, setColorRef] = useState<any>(null);
    const [sizeRef, setSizeRef] = useState<any>(null);
    const { state } = useStoreContext();
    const { user } = state;

    const handleChangeCategory = (event: any) => {
        setValues({
            ...values,
            subCategory: [],
            category: event.target.value,
        });
        if (event.target.value === "Select Category") {
            setIsShow(false);
        } else {
            console.log(event.target.value, "target");
            subCategoryOnCategory(user!.token, event.target.value)
                .then((res) => {
                    setSubCategories(res.data);
                })
                .catch((error) => {
                    console.log(error);
                    setIsShow(false);
                });
            setIsShow(true);
        }
    };

    const handleAddProduct = (
        data: IFormInput,
        reset: UseFormReset<IFormInput>,
        setValue: UseFormSetValue<IFormInput>
    ) => {
        // setLoading(true);
        let updateSubCategory;
        let updateColors;
        let updateSizes;
        if (
            Array.isArray(data.subCategory) &&
            Array.isArray(data.colors) &&
            Array.isArray(data.sizes)
        ) {
            updateSubCategory = data.subCategory.map(
                (sc: { value: string; label: string }) => sc.value
            );
            updateColors = data.colors.map(
                (c: { value: string; label: string }) => c.value
            );
            updateSizes = data.sizes.map(
                (s: { value: string; label: string }) => s.value
            );
        }
        const updatedValues = {
            ...values,
            subCategory: updateSubCategory,
            title: data.productName,
            description: data.description,
            price: data.price,
            quantity: data.quantity,
            colors: updateColors,
            sizes: updateSizes,
            brand: data.brand,
            shipping: data.shipping,
            discount: data.discount,
            category: data.productCategory,
        };
        createProduct(user!.token, updatedValues)
            .then((res) => {
                setLoading(false);
                toast.success(`${res.data.title} Product Created!`);
                subCategoryRef.clearValue();
                sizeRef.clearValue();
                colorRef.clearValue();
                // window.location.reload();
                reset();
                setValues({ ...values, images: [] });
            })
            .catch((error: any) => {
                if (error.response.status === 400) {
                    toast.error(`${error.data.error}`);
                }
                setLoading(false);
            });
    };

    return (
        <>
            <HeadSeo
                title={"Add Product"}
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />
            <DashboardLayout>
                <div>
                    <div className="bg-secondary p-6 rounded-lg">
                        <h2 className="text-center font-semibold text-primary text-2xl">
                            Add New Product
                        </h2>
                        <CreateProductForm
                            handleAddProduct={handleAddProduct}
                            handleChangeCategory={handleChangeCategory}
                            subCategories={subCategories}
                            values={values}
                            setValues={setValues}
                            isShow={isShow}
                            loading={loading}
                            setLoading={setLoading}
                            setSubCategoryRef={setSubCategoryRef}
                            setColorRef={setColorRef}
                            setSizeRef={setSizeRef}
                        />
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default AddProduct;

export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await getListOfCategory();
    const { data: colorsData } = await getListOfColor();
    const { data: sizesData } = await getListOfSizes();
    const { data: brandsData } = await getListOfBrands();
    return {
        props: {
            categories: data,
            colorsData,
            sizesData,
            brandsData,
        },
    };
};
