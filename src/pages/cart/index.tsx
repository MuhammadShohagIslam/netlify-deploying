import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import Link from "next/link";
import CartTable from "@/components/Carts/CartTable/CartTable";
import { saveOrder } from "@/api/user";
import { useRouter } from "next/router";
import { StoreActionType } from "@/lib/states/storeReducer/storeReducer.type";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import { CartType } from "types/cart.types";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";

const Cart = () => {
    const { state, dispatch } = useStoreContext();
    const { carts, user } = state;
    const [loading, setLoading] = useState({
        onlinePaymentCheckOut: false,
        cashOnDelivery: false,
    });

    const router = useRouter();

    /* show table */
    const showCartItems = () => (
        <div className="relative overflow-x-auto sm:rounded-lg scrollbar-thin scrollbar-thumb-gray-300  scrollbar-track-gray-100">
            <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs uppercase bg-gray-50 text-gray-900 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Brand
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Color
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Size
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Count
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Shipping
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Remove
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {carts &&
                        carts.length &&
                        carts.map((cart: CartType) => (
                            <CartTable key={cart._id} product={cart} />
                        ))}
                </tbody>
            </table>
        </div>
    );

    const getTotalPrice = () => {
        const totalPrice =
            carts &&
            carts.reduce((acc, cur: CartType) => {
                return acc + cur.price * cur.count;
            }, 0);
        return totalPrice;
    };

    const savePaymentOrderToDb = () => {
        setLoading({
            ...loading,
            onlinePaymentCheckOut: true,
        });
        if (user !== null) {
            saveOrder(carts, user.token)
                .then((res) => {
                    if (res.data.ok) {
                        setLoading({
                            ...loading,
                            onlinePaymentCheckOut: false,
                        });
                        router.push("/cart/checkout");
                    }
                })
                .catch((error) => {
                    setLoading({
                        ...loading,
                        onlinePaymentCheckOut: false,
                    });
                    console.log(error);
                });
        }
    };
    const saveCashOrderToDb = () => {
        setLoading({
            ...loading,
            cashOnDelivery: true,
        });
        if (user !== null) {
            saveOrder(carts, user.token)
                .then((res) => {
                    if (res.data.ok) {
                        dispatch({
                            type: StoreActionType.CASH_ON_DELIVERY,
                            payload: true,
                        });
                        setLoading({
                            ...loading,
                            cashOnDelivery: false,
                        });
                        router.push("/cart/checkout");
                    }
                })
                .catch((error) => {
                    setLoading({
                        ...loading,
                        cashOnDelivery: false,
                    });
                    console.log(error);
                });
        }
    };
    return (
        <>
            <HeadSeo
                title="Cart"
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />
            <MainLayout>
                <div className="container mt-10">
                    <div className="grid grid-cols-12 gap-5 sm:grid-cols-1 sm:gap-0 md:grid-cols-1 md:gap-0">
                        <div className="col-span-9 sm:col-span-0 md:col-span-0">
                            <h4 className="text-xl mb-5 font-semibold text-left text-green-500 bg-white">
                                Shopping Cart {carts && carts.length}{" "}
                                {carts && carts.length > 1
                                    ? "Products"
                                    : "Product"}
                            </h4>

                            {/* Show Cart Table*/}
                            {!carts.length ? (
                                <h5 className="text-xl mb-5 font-semibold text-left text-primary bg-white">
                                    No Cart Yet{" "}
                                    <Link href="/shop">Continue Shopping</Link>
                                </h5>
                            ) : (
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                    {showCartItems()}
                                </div>
                            )}
                        </div>

                        {/* Order Summary Card */}
                        <div className="col-span-3 sm:col-span-0 md:col-span-0">
                            <div className="bg-gray-100 p-5  rounded-lg mt-12 md:mt-5 sm:mt-5">
                                <h4 className="text-xl font-semibold text-green-400 mb-3">
                                    Order Summary
                                </h4>
                                <h4 className="text-lg font-semibold text-primary">
                                    Product
                                </h4>
                                <hr className="mb-2" />
                                {carts &&
                                    carts.map((product: CartType) => (
                                        <p
                                            className="text-md font-normal text-primary"
                                            key={product._id}
                                        >
                                            {product.title} x {product.count} ={" "}
                                            {`$${
                                                product.price * product.count
                                            }`}
                                        </p>
                                    ))}
                                <hr className="mt-2" />
                                <p className="text-lg font-semibold text-primary">
                                    Total Price = {`$${getTotalPrice()}`}
                                </p>
                                <hr />
                                {user ? (
                                    <>
                                        <button
                                            className="btn hover:bg-transparent hover:text-primary text-white btn-primary mt-2 w-full disabled:opacity-75 disabled:border-2 disabled:border-primary disabled:text-primary"
                                            disabled={
                                                !carts.length ||
                                                loading.onlinePaymentCheckOut
                                            }
                                            onClick={savePaymentOrderToDb}
                                        >
                                            {loading.onlinePaymentCheckOut
                                                ? "Processing..."
                                                : "Proceed To Checkout"}
                                        </button>
                                        <br />
                                        <button
                                            className="btn hover:bg-transparent hover:text-primary text-white btn-primary mt-2 w-full disabled:opacity-75 disabled:border-2 disabled:border-primary disabled:text-primary"
                                            disabled={
                                                !carts.length ||
                                                loading.cashOnDelivery
                                            }
                                            onClick={saveCashOrderToDb}
                                        >
                                            {loading.cashOnDelivery
                                                ? "Processing..."
                                                : "Checkout To Cash On Delivery"}
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        className="btn hover:bg-transparent hover:text-primary text-white btn-primary mt-2 w-full disabled:opacity-75 disabled:border-2 disabled:border-primary disabled:text-primary"
                                        disabled={!carts.length}
                                        onClick={() =>
                                            router.push(
                                                "/auth/login?redirect=/cart"
                                            )
                                        }
                                    >
                                        Login To Checkout
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    );
};

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
