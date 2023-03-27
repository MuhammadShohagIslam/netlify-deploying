/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { getFilterRelatedProducts, getProductsByCount } from "@/api/products";
import { getListOfCategory } from "@/api/category";
import { getAllSubCategories } from "@/api/sub-categories";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { StoreActionType } from "@/lib/states/storeReducer/storeReducer.type";
import Star from "@/components/UI/Star/Star";
import FilterMenu from "@/components/FilterMenu/FilterMenu";
import Product from "@/components/Product/Product";
import SortingMenu from "@/components/SortingMenu/SortingMenu";
import RangeSlider from "@/components/UI/RangeSlider/RangeSlider";
import Skeleton from "@/components/Skeleton/Skeleton";
import FilterMobileMenu from "@/components/FilterMenu/FilterMobileMenu/FilterMobileMenu";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import { IProduct } from "types/product.type";
import { ISubCategories } from "types/sub-category.type";
import { ICategories } from "types/category.type";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";

const brandArray = ["Apple", "Life-Digital", "Samsung", "ASUS", "Lenovo", "HP"];
const colorArray = ["Green", "Black", "Red", "White"];
const shippingArray = ["No", "Yes"];

const Shop = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [openSortingMenu, setOpenSortingMenu] = useState<boolean>(false);
    const [openFilterMobileMenu, setOpenFilterMobileMenu] =
        useState<boolean>(false);
    const [gridColumn, setGridColumn] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [price, setPrice] = useState<number[]>([0, 0]);
    const [ok, setOk] = useState<boolean>(false);
    const [categories, setCategories] = useState<ICategories[]>([]);
    const [categoriesId, setCategoriesId] = useState<string[]>([]);
    const [subCategories, setSubCategories] = useState<ISubCategories[]>([]);
    const [subCategoryId, setSubCategoryId] = useState<string[]>([]);
    const [brand, setBrand] = useState<string>("");
    const [color, setColor] = useState<string>("");
    const [shipping, setShipping] = useState<string>("");
    const { state, dispatch } = useStoreContext();
    const { text } = state;

    useEffect(() => {
        // loading products
        loadingProducts();
        // loading categories
        loadingCategories();
        // loading sub-categories
        loadingSubCategories();
    }, []);

    const fetchProducts = (arg: any) => {
        setLoading(true);
        getFilterRelatedProducts(arg)
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };
    // 1. loading products
    const loadingProducts = () => {
        setLoading(true);
        getProductsByCount(10)
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    // 1.1 loading categories
    const loadingCategories = () => {
        getListOfCategory()
            .then((res) => {
                setCategories(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    // 1.2 loading sub-categories
    const loadingSubCategories = () => {
        getAllSubCategories()
            .then((res) => {
                setSubCategories(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // 2. fetching or filtering products based on searching query
    useEffect(() => {
        const delayed = setTimeout(() => {
            setPrice([0, 0]);
            setCategoriesId([]);
            setBrand("");
            setColor("");
            setSubCategoryId([]);
            setShipping("");
            fetchProducts({ searchQuery: text });
            if (!text) {
                loadingProducts();
            }
        }, 300);
        return () => clearTimeout(delayed);
    }, [text]);

    // 3. fetching or filtering products based on price range
    useEffect(() => {
        fetchProducts({ price });
    }, [ok]);

    // 4. fetching or filtering products based on price values
    const showRange = () => (
        <div className="pt-6" id="filter-section-0">
            <div className="space-y-4">
                <div className="flex items-center">
                    <RangeSlider
                        onAfterChange={(v: number[]) =>
                            onAfterPriceChangeHandler(v)
                        }
                        className="w-64 h-8"
                        min={0}
                        max={3000}
                        defaultValue={[100, 2000]}
                    />
                </div>
            </div>
        </div>
    );

    const onAfterPriceChangeHandler = (value: number[]) => {
        dispatch({
            type: StoreActionType.SEARCH_FILTER_VALUE,
            payload: "",
        });
        setCategoriesId([]);
        setSubCategoryId([]);
        setBrand("");
        setColor("");
        setShipping("");
        setTimeout(() => {
            setPrice(value);
            setOk(!ok);
        }, 400);
    };

    // 4. fetching or filtering products based on categories
    const showCategories = () =>
        categories.map((category: ICategories) => (
            <div key={category?._id} className="pt-6" id="filter-section-0">
                <div className="space-y-4">
                    <div className="flex items-center">
                        <input
                            name="category"
                            type="checkbox"
                            onChange={handleCheck}
                            value={category._id}
                            checked={categoriesId.includes(category?._id)}
                            className="h-4 w-4 rounded checkbox checkbox-success"
                        />
                        <label
                            htmlFor={`filter-category-${category.name}`}
                            className="ml-3 text-sm text-gray-600"
                        >
                            {category.name}
                        </label>
                    </div>
                </div>
            </div>
        ));

    // handle check for categories
    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        // reset
        dispatch({
            type: StoreActionType.SEARCH_FILTER_VALUE,
            payload: "",
        });
        setPrice([0, 0]);
        setBrand("");
        setColor("");
        setShipping("");

        // console.log(e.target.value);
        let inTheState = [...categoriesId];
        let justChecked = e.target.value;
        let foundInTheState = inTheState.indexOf(justChecked); // index or -1

        // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
        if (foundInTheState === -1) {
            inTheState.push(justChecked);
        } else {
            // if found pull out one item from index
            inTheState.splice(foundInTheState, 1);
        }

        setCategoriesId(inTheState);
        if (inTheState && inTheState.length > 0) {
            fetchProducts({ category: inTheState });
        } else {
            if (subCategoryId && subCategoryId.length > 0) {
                fetchProducts({ subCategory: subCategoryId });
            } else {
                loadingProducts();
            }
        }
    };
    // 5. fetching or filtering products based on color
    const starRatingFilter = () => (
        <div className="pl-4 pr-4">
            <Star numberOfStars={5} clickRating={clickRating} />
            <Star numberOfStars={4} clickRating={clickRating} />
            <Star numberOfStars={3} clickRating={clickRating} />
            <Star numberOfStars={2} clickRating={clickRating} />
            <Star numberOfStars={1} clickRating={clickRating} />
        </div>
    );
    const clickRating = (num: number) => {
        // reset
        dispatch({
            type: StoreActionType.SEARCH_FILTER_VALUE,
            payload: "",
        });
        setPrice([0, 0]);
        setCategoriesId([]);
        setSubCategoryId([]);
        setBrand("");
        setColor("");
        setShipping("");
        fetchProducts({ star: num });
    };

    // 6. fetching or filtering products based on sub-categories
    const checkboxSubCategories = () =>
        subCategories &&
        subCategories.length > 0 &&
        subCategories.map((subCategory: ISubCategories) => (
            <div key={subCategory._id} className="pt-6">
                <div className="space-y-4">
                    <div className="flex items-center">
                        <input
                            name="subCategory"
                            type="checkbox"
                            value={subCategory._id}
                            onChange={changeHandlerSubCategory}
                            checked={subCategoryId.includes(subCategory._id)}
                            className="h-4 w-4 rounded checkbox checkbox-success"
                        />
                        <label
                            htmlFor={`filter-sub-category-${subCategory.name}`}
                            className="ml-3 text-sm text-gray-600"
                        >
                            {subCategory.name}
                        </label>
                    </div>
                </div>
            </div>
        ));

    // check for sub-categories
    const changeHandlerSubCategory = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        // reset
        dispatch({
            type: StoreActionType.SEARCH_FILTER_VALUE,
            payload: "",
        });
        setPrice([0, 0]);
        setBrand("");
        setColor("");
        setShipping("");
        let inTheState = [...subCategoryId];
        let justChecked = e.target.value;

        let foundTheState = inTheState.indexOf(justChecked);
        if (foundTheState === -1) {
            inTheState.push(justChecked);
        } else {
            inTheState.splice(foundTheState, 1);
        }
        setSubCategoryId(inTheState);

        if (inTheState && inTheState.length > 0) {
            fetchProducts({ subCategory: inTheState });
        } else {
            if (categoriesId && categoriesId.length > 0) {
                fetchProducts({ category: categoriesId });
            } else {
                loadingProducts();
            }
        }
    };
    // 7. fetching or filtering products based on brand
    const checkboxBrands = () =>
        brandArray &&
        brandArray.length &&
        brandArray.map((b: string, i: number) => (
            <div key={i} className="pt-6">
                <div className="space-y-4">
                    <div className="flex items-center">
                        <input
                            name="brand"
                            type="checkbox"
                            onChange={handleBrandChange}
                            value={b}
                            checked={brand === b}
                            className="h-4 w-4 rounded checkbox checkbox-success"
                        />
                        <label
                            htmlFor={`filter-brand-${b}`}
                            className="ml-3 text-sm text-gray-600"
                        >
                            {b}
                        </label>
                    </div>
                </div>
            </div>
        ));

    // check for brand
    const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // reset
        dispatch({
            type: StoreActionType.SEARCH_FILTER_VALUE,
            payload: "",
        });
        setPrice([0, 0]);
        setCategoriesId([]);
        setSubCategoryId([]);
        setShipping("");
        setColor("");
        setBrand(event.target.value);
        setTimeout(() => {
            fetchProducts({ brand: event.target.value });
        }, 300);
    };

    // 8. fetching or filtering products based on color
    const checkboxColor = () =>
        colorArray &&
        colorArray.length &&
        colorArray.map((c: string, i: number) => (
            <div key={i} className="pt-6">
                <div className="space-y-4">
                    <div className="flex items-center transition-all group:hover:text-green-500">
                        <input
                            name="color"
                            type="checkbox"
                            onChange={handleColorChange}
                            value={c}
                            checked={color === c}
                            className="h-4 w-4 rounded checkbox checkbox-success"
                        />
                        <label
                            htmlFor={`filter-color-${c}`}
                            className="ml-3 cursor-pointer text-sm text-gray-600 "
                        >
                            {c}
                        </label>
                    </div>
                </div>
            </div>
        ));

    // check for brand
    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // reset
        dispatch({
            type: StoreActionType.SEARCH_FILTER_VALUE,
            payload: "",
        });
        setPrice([0, 0]);
        setCategoriesId([]);
        setSubCategoryId([]);
        setBrand("");
        setShipping("");
        setColor(event.target.value);
        setTimeout(() => {
            fetchProducts({ color: event.target.value });
        }, 300);
    };

    // 9. fetching or filtering products based on shipping
    const checkboxShipping = () =>
        shippingArray &&
        shippingArray.length &&
        shippingArray.map((s: string, index: number) => (
            <div key={index} className="pt-6">
                <div className="space-y-4">
                    <div className="flex items-center">
                        <input
                            name="shopping"
                            type="checkbox"
                            onChange={handleShipping}
                            value={s}
                            checked={shipping === s}
                            className="h-4 w-4 rounded checkbox checkbox-success"
                        />
                        <label
                            htmlFor={`filter-shipping-${s}`}
                            className="ml-3 text-sm text-gray-600"
                        >
                            {s}
                        </label>
                    </div>
                </div>
            </div>
        ));
    // check shipping
    const handleShipping = (e: React.ChangeEvent<HTMLInputElement>) => {
        // reset
        dispatch({
            type: StoreActionType.SEARCH_FILTER_VALUE,
            payload: "",
        });
        setPrice([0, 0]);
        setCategoriesId([]);
        setSubCategoryId([]);
        setBrand("");
        setColor("");
        setShipping(e.target.value);
        setTimeout(() => {
            fetchProducts({ shipping: e.target.value });
        }, 300);
    };
    // sorting products
    const handleSortingProducts = (sort: string, order: number | string) => {
        fetchProducts({
            sortingObject: {
                sort,
                order,
            },
        });
    };
    return (
        <>
            <HeadSeo
                title="Shopping"
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />
            <MainLayout>
                {/* Filter Mobile Side Bar Menu */}
                <FilterMobileMenu
                    checkboxColor={checkboxColor}
                    checkboxShipping={checkboxShipping}
                    checkboxBrands={checkboxBrands}
                    checkboxSubCategories={checkboxSubCategories}
                    starRatingFilter={starRatingFilter}
                    showCategories={showCategories}
                    showRange={showRange}
                    openFilterMobileMenu={openFilterMobileMenu}
                    setOpenFilterMobileMenu={setOpenFilterMobileMenu}
                />
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                            Filter Products
                        </h1>
                        {/* Filter Sorting Menu */}
                        <SortingMenu
                            handleSortingProducts={handleSortingProducts}
                            openSortingMenu={openSortingMenu}
                            setOpenSortingMenu={setOpenSortingMenu}
                            setGridColumn={setGridColumn}
                            gridColumn={gridColumn}
                            openFilterMobileMenu={openFilterMobileMenu}
                            setOpenFilterMobileMenu={setOpenFilterMobileMenu}
                        />
                    </div>
                    <section
                        aria-labelledby="products-heading"
                        className="pt-6 pb-24"
                    >
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid sm:grid-cols-1 md:grid-cols-1 gap-x-8 gap-y-10 grid-cols-4">
                            {/* Filter Side Bar Menu */}
                            <FilterMenu
                                openFilterMobileMenu={openFilterMobileMenu}
                                checkboxColor={checkboxColor}
                                checkboxShipping={checkboxShipping}
                                checkboxBrands={checkboxBrands}
                                checkboxSubCategories={checkboxSubCategories}
                                starRatingFilter={starRatingFilter}
                                showCategories={showCategories}
                                showRange={showRange}
                            />

                            {/* Filter Products */}
                            <div className="col-span-3">
                                <div className="sm:h-96 h-full">
                                    {loading ? (
                                        <div
                                            className={`grid gap-5 ${
                                                gridColumn
                                                    ? `grid-cols-2 md:grid-cols-1 sm:grid-cols-1`
                                                    : `grid-cols-1`
                                            }`}
                                        >
                                            <Skeleton numbers={2} />
                                        </div>
                                    ) : products && products.length < 1 ? (
                                        <p className="text-center text-xl text-primary">
                                            No Product Found
                                        </p>
                                    ) : (
                                        <div
                                            className={`grid gap-5 ${
                                                gridColumn
                                                    ? `grid-cols-2 md:grid-cols-1 sm:grid-cols-1`
                                                    : `grid-cols-1`
                                            }`}
                                        >
                                            {products &&
                                                products.length &&
                                                products.map((product: any) => (
                                                    <div key={product._id}>
                                                        <Product
                                                            product={product}
                                                        />
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </MainLayout>
        </>
    );
};

export default Shop;
