import { useEffect, useState } from 'react';
import AOS from "aos";
import { getListOfCategory } from "@/api/category";
import { getProductsBySort } from "@/api/products";
import Banner from "@/components/Home/Banner/Banner";
import BestSellers from "@/components/Home/BestSellers/BestSellers";
import SubCategories from "@/components/Home/SubCategories/SubCategories";
import NewArrivals from "@/components/Home/NewArrivals/NewArrivals";
import Services from "@/components/Home/Services/Services";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import { GetServerSideProps } from "next";
import { IProduct } from "./../../types/product.type";
import { getAllSubCategories } from "@/api/sub-categories";
import Categories from "@/components/Home/Categories/Categories";
import { ICategories } from "types/category.type";
import { ISubCategories } from "types/sub-category.type";
import FlashDeals from "@/components/Home/FlashDeals/FlashDeals/FlashDeals";
import Blogs from "@/components/Home/Blogs/Blogs";
import { getListOfBlogs } from "@/api/blog";
import { IBlog } from "types/blog.types";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";
import Preloader from '@/components/UI/Preloader/Preloader';

type HomePropType = {
    products: IProduct[];
    bestSellerProducts: IProduct[];
    flashDealsProducts: IProduct[];
    subCategories: ISubCategories[];
    categories: ICategories[];
    blogs: IBlog[];
};

export default function Home({
    products,
    bestSellerProducts,
    subCategories,
    categories,
    flashDealsProducts,
    blogs,
}: HomePropType) {
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        let timeoutId: null | ReturnType<typeof setTimeout> | number = null
        const timeOut = () => {
            timeoutId = window.setTimeout(() => setLoader(false), 1000);
        };
        timeOut();
        AOS.init();
        AOS.refresh();
        return () => window.clearTimeout(timeoutId!);
    }, []);
    return (
        <>
            <HeadSeo
                title="Aladin"
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />
            {loader ? (
                <Preloader />
            ) : (
                <>
                    <MainLayout>
                        <Banner />
                        <Services />
                        <Categories categories={categories} />
                        <SubCategories subCategories={subCategories} />
                        <FlashDeals products={flashDealsProducts} />
                        <NewArrivals products={products} />
                        <BestSellers products={bestSellerProducts} />
                        <Blogs blogs={blogs} />
                    </MainLayout>
                </>
            )}

        </>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await getProductsBySort("createdAt", "desc");
    const { data: bestSellerProductData } = await getProductsBySort(
        "sold",
        "desc"
    );
    const { data: flashDealsProductData } = await getProductsBySort(
        "discount",
        "desc"
    );
    const { data: categoriesData } = await getListOfCategory();
    const { data: subCategoriesData } = await getAllSubCategories();
    const { data: blogsData } = await getListOfBlogs();
    return {
        props: {
            products: data,
            bestSellerProducts: bestSellerProductData,
            flashDealsProducts: flashDealsProductData,
            subCategories: subCategoriesData,
            categories: categoriesData,
            blogs: blogsData,
        },
    };
};
