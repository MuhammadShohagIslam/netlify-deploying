/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { getWishLists, removeWishList } from "@/api/user";
import WishlistProduct from "@/components/Product/WishlistProduct/WishlistProduct";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import Skeleton from "@/components/Skeleton/Skeleton";
import UserDashboard from "@/layouts/DashboardLayout/UserDashboard";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import toast from "react-hot-toast";
import { IProduct } from "types/product.type";
import useCheckUser from "@/hooks/useCheckUser";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";

interface WishListProductType {
    product: IProduct[];
    isWishList: boolean;
}
const UserWishlist = () => {
    const [wishLists, setWishList] = useState([] as WishListProductType[]);
    const [loading, setLoading] = useState<boolean>(false);
    const { state } = useStoreContext();
    const { user } = state;

    useEffect(() => {
        loadingWishList();
    }, []);

    // loading all wishlist
    const loadingWishList = () => {
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
                toast.error("Wish List is Removed!");
                loadingWishList();
            });
        }
    };

    return (
        <>
            <HeadSeo
                title={"User-Wishlist"}
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />
            <UserDashboard>
                <div className="container mt-10">
                    <SectionTitle title={`Wish List By ${user?.fullName}`} />
                    {loading ? (
                        <div className="grid mt-5 gap-5 grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                            <Skeleton numbers={3} />
                        </div>
                    ) : wishLists && wishLists[0]?.product?.length < 1 ? (
                        <p className="text-center text-xl text-primary mt-5">
                            No Wish List Product Found By {user?.fullName}
                        </p>
                    ) : (
                        <div className="grid  mt-5 gap-5 grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                            {wishLists &&
                                wishLists[0]?.product?.length > 0 &&
                                wishLists.map(
                                    (
                                        product: WishListProductType,
                                        index: number
                                    ) => (
                                        <div key={index}>
                                            <WishlistProduct
                                                product={product.product}
                                                handleRemovedToWishList={
                                                    handleRemovedToWishList
                                                }
                                                isUserWishList
                                            />
                                        </div>
                                    )
                                )}
                        </div>
                    )}
                </div>
            </UserDashboard>
        </>
    );
};

export default UserWishlist;
