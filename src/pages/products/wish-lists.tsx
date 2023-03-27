import React, { useEffect, useState } from "react";
import { getWishLists, removeWishList } from "@/api/user";
import _ from "lodash";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import toast from "react-hot-toast";
import SectionTitle from "./../../components/SectionTitle/SectionTitle";
import Skeleton from "@/components/Skeleton/Skeleton";
import {
    StoreActionType,
    UserType,
} from "@/lib/states/storeReducer/storeReducer.type";
import WishlistProduct from "@/components/Product/WishlistProduct/WishlistProduct";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import { IProduct } from "types/product.type";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";

const WishLists = () => {
    const [wishLists, setWishList] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { state, dispatch } = useStoreContext();
    const { user } = state;

    useEffect(() => {
        if (user) {
            loadingWishList(user);
        }
    }, [user]);

    // loading all wishlist
    const loadingWishList = (user: UserType) => {
        if (user && user.token) {
            setLoading(true);
            getWishLists(user.token)
                .then((res) => {
                    setWishList(res.data.wishList);
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                });
        }
    };

    const handleRemovedToWishList = (_id: string) => {
        if (user && user.token) {
            removeWishList(user.token, _id).then((res) => {
                toast.error("Wish-List is Removed!");
                loadingWishList(user);
            });
        }
    };

    const handleAddCart = (product: IProduct) => {
        // create cart array
        let carts = [];
        //checking available window or not
        if (typeof window !== "undefined") {
            // checking already carts to the window localStorage
            let cartsFromLocalStorage: string | null =
                window.localStorage.getItem("carts");
            if (cartsFromLocalStorage !== null) {
                carts = JSON.parse(cartsFromLocalStorage);
            }
        }
        // added cart
        carts.push({
            ...product,
            price: product?.price - product?.price / product?.discount / 100,
            count: 1,
        });
        // remove duplicates
        const uniqueCarts = _.uniqWith(carts, _.isEqual);
        // set cart object in windows localStorage
        window.localStorage.setItem("carts", JSON.stringify(uniqueCarts));

        // added cart in store context
        dispatch({
            type: StoreActionType.ADD_TO_CART,
            payload: uniqueCarts,
        });
        if (user && user?.token) {
            removeWishList(user?.token, product?._id).then((res) => {
                loadingWishList(user);
            });
        }
    };

    return (
        <>
            <HeadSeo
                title={"wish list"}
                content={`Product by ${user?.fullName}`}
            />
            <MainLayout>
                <div className="container mt-10">
                    <SectionTitle title="Wish List" />
                    {loading ? (
                        <div className="grid mt-5 gap-5 grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                            <Skeleton numbers={3} />
                        </div>
                    ) : wishLists && wishLists.length < 1 ? (
                        <p className="text-center text-xl text-primary">
                            No Wish List Product Found
                        </p>
                    ) : (
                        <div className="grid  mt-5 gap-5 grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                            {wishLists &&
                                wishLists.length &&
                                wishLists.map((product: any) => (
                                    <div key={product._id}>
                                        <WishlistProduct
                                            product={product.product}
                                            handleRemovedToWishList={
                                                handleRemovedToWishList
                                            }
                                            handleAddCart={handleAddCart}
                                        />
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </MainLayout>
        </>
    );
};

export default WishLists;
