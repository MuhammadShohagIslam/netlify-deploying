/* eslint-disable react-hooks/exhaustive-deps */
import { getListOfBrands } from "@/api/brand";
import { getListOfCategory, subCategoryOnCategory } from "@/api/category";
import { getListOfColor } from "@/api/color";
import { getProduct, updateProduct } from "@/api/products";
import { getListOfSizes } from "@/api/size";
import { IFormInput } from "@/components/Form/CreateProduct/FormInput.types";
import UpdateProductForm from "@/components/Form/UpdateProduct/UpdateProduct";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IColor } from "types/color.types";
import { ISize } from "types/size.types";
import { ISubCategories } from "types/sub-category.type";

type CustomReactSelectValue = {
    label: string;
    value: string;
};

const initialValues = {
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
    brandData: [],
    sizes: [],
    brand: "",
    brands: [],
    category: "",
    categories: [],
    subCategory: [],
};

const UpdateProduct = ({
    categories,
    colorsData,
    sizesData,
    brandsData,
}: any) => {
    const [values, setValues] = useState<any>({
        ...initialValues,
        categories: categories,
        brandData: brandsData,
        colorsData: colorsData,
        sizesData: sizesData,
    });
    const [selectedCategory, setSelectedCategory] = useState<any>();
    const [subCategories, setSubCategories] = useState<
        CustomReactSelectValue[]
    >([]);
    const [arraySubCategories, setArraySubCategories] = useState<any[]>([]);
    const [multiSelectSubCategories, setMultiSelectSubCategories] = useState<
        readonly CustomReactSelectValue[]
    >([]);
    const [multiSelectSizes, setMultiSelectSizes] = useState<
        readonly CustomReactSelectValue[]
    >([]);
    const [multiSelectColors, setMultiSelectColors] = useState<
        readonly CustomReactSelectValue[]
    >([]);
    const [loading, setLoading] = useState<boolean>(false);

    const {
        state: { user },
    } = useStoreContext();

    const router = useRouter();
    const { query } = router;
    const slug = router.query.slug;

    useEffect(() => {
        loadingProduct();
    }, [slug]);

    const loadingProduct = () => {
        getProduct(slug)
            .then((res) => {
                setValues({ ...values, ...res.data });
                subCategoryOnCategory(user!.token, res.data.category._id).then(
                    (res) => {
                        let modifyArraySC: CustomReactSelectValue[] = [];
                        res.data.map((d: ISubCategories) => {
                            return modifyArraySC.push({
                                label: d.name,
                                value: d._id,
                            });
                        });
                        setSubCategories(modifyArraySC);
                    }
                );
                // customize sub categories for react multi select
                let subCategoriesArray = customizeForReactSelect(
                    res.data.subCategory
                );
                setArraySubCategories((prev) => subCategoriesArray);
                setMultiSelectSubCategories(subCategoriesArray);
                // customize sizes for react multi select
                let sizesArray = customizeForReactSelect(res.data?.sizes);
                setMultiSelectSizes(sizesArray);
                // customize colors for react multi select
                let colorsArray = customizeForReactSelect(res.data?.colors);
                setMultiSelectColors(colorsArray);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleCategoryChange = (event: any) => {
        setValues({
            ...values,
            subCategory: [],
        });
        setSelectedCategory(event.target.value);
        subCategoryOnCategory(user!.token, event.target.value)
            .then((res) => {
                const modifySubCategories = customizeForReactSelect(res.data);
                setSubCategories(modifySubCategories);
            })
            .catch((error) => {
                console.log(error);
            });

        if (values.category === event.target.value) {
            loadingProduct();
        }
        setArraySubCategories([]);
    };

    const customizeForReactSelect = (data: any[]) => {
        let modifyArray: CustomReactSelectValue[] = [];
        data.map((d: any) => {
            return modifyArray.push({ label: d.name, value: d._id });
        });
        return modifyArray;
    };

    const handleSubmitProduct = (data: IFormInput) => {
        let updateSubCategory;
        let updateColors;
        let updateSizes;
        if (
            Array.isArray(multiSelectSubCategories) &&
            Array.isArray(multiSelectSizes) &&
            Array.isArray(multiSelectColors)
        ) {
            updateSubCategory = multiSelectSubCategories.map(
                (sc: { value: string; label: string }) => sc.value
            );
            updateSizes = multiSelectSizes.map(
                (c: { value: string; label: string }) => c.value
            );
            updateColors = multiSelectColors.map(
                (s: { value: string; label: string }) => s.value
            );
        }
        const updatedValues = {
            ...values,
            category: selectedCategory
                ? selectedCategory
                : data.productCategory,
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
        };
        setLoading(true);
        updateProduct(user!.token, slug, updatedValues)
            .then((res) => {
                toast.success(`${res.data.title} Product Is Updated!`);
                setLoading(false);
                router.push("/dashboard/admin/products");
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    toast.error(error.response.error.message);
                }
                setLoading(false);
            });
    };
    return (
        <>
            <HeadSeo
                title={values?.title}
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />
            <DashboardLayout>
                <div>
                    <div className="bg-secondary p-6 rounded-lg">
                        <h2 className="text-center font-semibold text-primary text-2xl">
                            Update Product
                        </h2>
                        <UpdateProductForm
                            values={values}
                            setValues={setValues}
                            subCategories={subCategories}
                            arraySubCategories={arraySubCategories}
                            setArraySubCategories={setArraySubCategories}
                            selectedCategory={selectedCategory}
                            loading={loading}
                            setLoading={setLoading}
                            handleSubmitProduct={handleSubmitProduct}
                            handleCategoryChange={handleCategoryChange}
                            multiSelectSubCategories={multiSelectSubCategories}
                            setMultiSelectSubCategories={
                                setMultiSelectSubCategories
                            }
                            multiSelectSizes={multiSelectSizes}
                            setMultiSelectSizes={setMultiSelectSizes}
                            multiSelectColors={multiSelectColors}
                            setMultiSelectColors={setMultiSelectColors}
                        />
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default dynamic(() => Promise.resolve(UpdateProduct), { ssr: false });

export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await getListOfCategory();
    const { data: colorsData } = await getListOfColor();
    const { data: sizesData } = await getListOfSizes();
    const { data: brandsData } = await getListOfBrands();
    return {
        props: {
            categories: data,
            colorsData:
                colorsData &&
                colorsData.map((c: IColor) => {
                    return {
                        label: c.name,
                        value: c._id,
                    };
                }),
            sizesData:
                sizesData &&
                sizesData.map((s: ISize) => {
                    return {
                        label: s.name,
                        value: s._id,
                    };
                }),
            brandsData,
        },
    };
};

{
    /*
    
    // validation
        // if (multiSelectSubCategories.length < 1) {
        //     setMultiSelectErrors({
        //         ...multiSelectErrors,
        //         multiSubCategoriesError: "Sub Categories Is Required!",
        //     });
        //     return;
        // }else{
        //     setMultiSelectErrors((prev) => ({...prev, multiSubCategoriesError:""})); 
        // }
        // if (multiSelectSizes.length < 1) {
        //     console.log("si")
        //     setMultiSelectErrors({
        //         ...multiSelectErrors,
        //         multiSizesError: "Size Is Required!",
        //     });
        //     console.log(multiSelectErrors, "si");
        //     return;
        // }else{
        //     console.log("s")
        //     setMultiSelectErrors((prev) =>  ({...prev, multiSizesError:""})); 
        //     console.log(multiSelectErrors, "s");
        // }
        // if (multiSelectColors.length < 1) {
        //     setMultiSelectErrors({
        //         ...multiSelectErrors,
        //         multiColorsError: "Colors Is Required!",
        //     });
        //     return;
        // }else{
        //     setMultiSelectErrors({
        //         ...multiSelectErrors,
        //         multiColorsError: "",
        //     }); 
        // }
        // if (values.images < 1) {
        //     setMultiSelectErrors({
        //         ...multiSelectErrors,
        //         imagesError: "Image Is Required!",
        //     });
        //     return;
        // }else{
        //     setMultiSelectErrors({
        //         ...multiSelectErrors,
        //         imagesError: "",
        //     }); 
        // }
        // setLoading(true);
    
    */
}
