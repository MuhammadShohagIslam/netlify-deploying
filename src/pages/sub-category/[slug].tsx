import { getSubCategory } from "@/api/sub-categories";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import Skeleton from "@/components/Skeleton/Skeleton";
import React from "react";
import { IProduct } from "types/product.type";
import { useEffect, useState } from "react";
import Product from "@/components/Product/Product";
import { ISubCategories } from "types/sub-category.type";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";

type ProductBySubCategoryParamsType = {
    params: {
        slug: string;
    };
};

type ProductBySubCategoryPropsType = {
    products: IProduct[];
    subCategory: ISubCategories;
};

const ProductBySubCategory = ({
    products,
    subCategory,
}: ProductBySubCategoryPropsType) => {
    const [productsData, setProductsData] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setProductsData(products);
            setLoading(false);
        }, 500);
    }, [products]);

    return (
        <>
            <HeadSeo
                title={subCategory?.name}
                content={`Product by ${subCategory?.name}`}
            />

            <MainLayout>
                <div className="container mt-10">
                    <SectionTitle
                        title={`${
                            productsData?.length > 1 ? "Products" : "Product"
                        } By The Sub Category of "${subCategory.name}"`}
                    />
                    {loading ? (
                        <div className="grid mt-5 gap-5 grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                            <Skeleton numbers={3} />
                        </div>
                    ) : productsData && productsData.length < 1 ? (
                        <div className="h-80 flex item-center">
                            <p className="text-center text-xl text-primary">
                                No Product Found By The {subCategory.name}
                            </p>
                        </div>
                    ) : (
                        <div className="grid  mt-5 gap-5 grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                            {productsData &&
                                productsData.length &&
                                productsData.map((product: IProduct) => (
                                    <Product
                                        key={product._id}
                                        product={product}
                                    />
                                ))}
                        </div>
                    )}
                </div>
            </MainLayout>
        </>
    );
};

export async function getServerSideProps({
    params,
}: ProductBySubCategoryParamsType) {
    const { data } = await getSubCategory(params.slug);
    return {
        props: {
            products: data.subCategoryProduct,
            subCategory: data.subCategory,
        },
    };
}

export default ProductBySubCategory;
