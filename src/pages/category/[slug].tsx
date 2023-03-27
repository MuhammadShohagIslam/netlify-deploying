import { useEffect, useState } from "react";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import Skeleton from "@/components/Skeleton/Skeleton";
import React from "react";
import { IProduct } from "types/product.type";
import Product from "@/components/Product/Product";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import { ICategories } from "types/category.type";
import { getSingleCategory } from "@/api/category";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";

type ProductByCategoryParamsType = {
    params: {
        slug: string;
    };
};

type ProductByCategoryPropsType = {
    products: IProduct[];
    category: ICategories;
};

const ProductByCategory = ({
    products,
    category,
}: ProductByCategoryPropsType) => {
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
                title={category?.name}
                content={`Product by ${category?.name}`}
            />
            <MainLayout>
                <div className="container mt-12">
                    <SectionTitle
                        title={`${
                            productsData?.length > 1 ? "Products" : "Product"
                        } By The Category of "${category?.name}"`}
                    />
                    {loading ? (
                        <div className="grid mt-5 gap-5 grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                            <Skeleton numbers={3} />
                        </div>
                    ) : productsData && productsData?.length < 1 ? (
                        <div className="h-80 flex items-center justify-center">
                            <p className="text-center text-xl text-primary">
                                No Product Found By The {category.name}
                            </p>
                        </div>
                    ) : (
                        <div className="grid  mt-5 gap-5 grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                            {productsData &&
                                productsData?.length &&
                                productsData?.map((product: IProduct) => (
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
}: ProductByCategoryParamsType) {
    const { data } = await getSingleCategory(params.slug);
    return {
        props: {
            products: data.products,
            category: data.category,
        },
    };
}

export default ProductByCategory;
