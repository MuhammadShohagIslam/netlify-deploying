/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import {
    createOrderCashOnDelivery,
    emptyCart,
    getTotalPriceAfterDiscount,
    getUserCart,
    getUserShippingAddress,
    saveShippingAddress,
} from "@/api/user";
import { StoreActionType } from "@/lib/states/storeReducer/storeReducer.type";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import ShippingAddressForm from "@/components/Form/ShippingAddressForm";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import useCheckUser from "@/hooks/useCheckUser";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";

type AddressType = {
    fullName?: string;
    address?: string;
    country?: string;
    city?: string;
    postalCode?: string;
};
const initialAddressValue = {
    fullName: "",
    address: "",
    country: "",
    city: "",
    postalCode: "",
};
const Checkout = () => {
    useCheckUser();
    const [products, setProducts] = useState([]);
    const [cartTotal, setCartTotal] = useState<number>(0);
    const [addressValues, setAddressValues] =
        useState<AddressType>(initialAddressValue);
    const [isAddressSave, setIsAddressSave] = useState<boolean>(false);
    const [validationError, setValidationError] = useState<AddressType | null>(
        null
    );
    const [couponName, setCouponName] = useState<string>("");
    const [inValidCouponName, setInValidCouponName] = useState<string>("");
    const [totalPriceAfterDiscount, setTotalPriceAfterDiscount] =
        useState<number>(0);
    const [loading, setLoading] = useState({
        shippingAddressLoading: false,
        emptyingCartLoading: false,
        processingOrderLoading: false,
        couponLoading: false,
    });
    const { state, dispatch } = useStoreContext();
    const { carts, user, isCashOnDelivery, isCouponed } = state;
    const router = useRouter();
    if(user){
        
    }

    useEffect(() => {
        if (user && user.token) {
            getUserCart(user.token).then((res) => {
                if (res.data[0]) {
                    setProducts(res.data[0].products);
                    setCartTotal(res.data[0].cartTotal);
                }
            });
        }
    }, [user]);

    useEffect(() => {
        if (user && user.token) {
            getUserShippingAddress(user.token).then((res) => {
                if (res.data.address) {
                    setAddressValues(res.data.address);
                    if (typeof window !== "undefined") {
                        window.localStorage.setItem(
                            "shippingAddress",
                            JSON.stringify(res.data.address)
                        );
                    }
                    dispatch({
                        type: StoreActionType.ADD_SHIPPING_ADDRESS,
                        payload: res.data.address,
                    });
                    if (res.data.address) {
                        setIsAddressSave(true);
                    }
                }
            });
        }
    }, [user]);

    const handleEmptyCart = () => {
        // remove cart window local storage
        if (typeof window !== "undefined") {
            window.localStorage.removeItem("carts");
        }
        // remove cart from store context
        dispatch({
            type: StoreActionType.ADD_TO_CART,
            payload: [],
        });
        // remove cart from database
        if (user && user!.token) {
            setLoading({
                ...loading,
                emptyingCartLoading: true,
            });
            emptyCart(user.token)
                .then((res) => {
                    setProducts([]);
                    setCartTotal(0);
                    setCouponName("");
                    setTotalPriceAfterDiscount(0);
                    // store to the context
                    dispatch({
                        type: StoreActionType.ADD_COUPON,
                        payload: false,
                    });
                    toast.success("Cart Is Empty! Continue Shopping");
                    setLoading({
                        ...loading,
                        emptyingCartLoading: false,
                    });
                    setTimeout(() => {
                        router.push("/cart");
                    }, 5000);
                })
                .catch((error) => {
                    setLoading({
                        ...loading,
                        emptyingCartLoading: false,
                    });
                    console.log(error);
                });
        }
    };
    const handleAddressValueChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setAddressValues({
            ...addressValues,
            [e.target.name]: e.target.value,
        });
    };
    // save address to the database
    const submitShippingAddressToDb = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { error, isValid } = validator();

        if (isValid) {
            if (user && user.token) {
                setLoading({
                    ...loading,
                    shippingAddressLoading: true,
                });
                saveShippingAddress(addressValues, user!.token)
                    .then((res) => {
                        setIsAddressSave(true);
                        toast.success("Save Address!");

                        if (typeof window !== "undefined") {
                            window.localStorage.setItem(
                                "shippingAddress",
                                JSON.stringify(res.data.address)
                            );
                        }
                        dispatch({
                            type: StoreActionType.ADD_SHIPPING_ADDRESS,
                            payload: res.data.address,
                        });
                        setLoading({
                            ...loading,
                            shippingAddressLoading: false,
                        });

                        setValidationError(null);
                    })
                    .catch((error) => {
                        setLoading({
                            ...loading,
                            shippingAddressLoading: false,
                        });
                        console.log(error);
                    });
            }
        } else {
            setValidationError(error);
        }
    };

    const validator = () => {
        const { fullName, address, country, city, postalCode } = addressValues;
        let error: AddressType = {};

        if (!fullName || fullName.trim() === "") {
            error.fullName = "Enter Your Valid Name !";
        }
        if (!address || address.trim() === "") {
            error.address = "Enter Your Valid Address !";
        }
        if (!country || country.trim() === "") {
            error.country = "Enter Your Valid Country !";
        }
        if (!city || city.trim() === "") {
            error.city = "Enter Your Valid City !";
        }
        if (!postalCode || postalCode.trim() === "") {
            error.postalCode = "Enter Your Valid Postal-Code !";
        }
        const isValid = Object.keys(error).length === 0;

        return {
            isValid,
            error,
        };
    };

    const couponForm = () => (
        <form onSubmit={handleCouponSubmit}>
            <div>
                <label
                    htmlFor="coupon"
                    className="block mb-2 text-sm font-medium text-primary"
                >
                    Coupon:
                </label>
                <input
                    type="text"
                    name="couponName"
                    value={couponName}
                    onChange={(e) => setCouponName(e.target.value)}
                    className="input input-bordered input-success w-1/2 text-primary"
                    id="coupon"
                    placeholder="Enter Coupon"
                    autoFocus
                />
            </div>
            <button
                className="btn block hover:bg-transparent hover:text-primary text-white btn-primary disabled:opacity-75 disabled:border-2 disabled:border-primary disabled:text-primary mt-2"
                disabled={carts.length === 0 || loading.couponLoading}
            >
                {loading.couponLoading ? "Saving..." : "Save"}
            </button>
        </form>
    );

    const handleCouponSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading({
            ...loading,
            couponLoading: true,
        });
        getTotalPriceAfterDiscount(couponName, user!.token).then((res) => {
            if (res.data.totalPriceAfterDiscount) {
                setTotalPriceAfterDiscount(res.data.totalPriceAfterDiscount);
                setLoading({
                    ...loading,
                    couponLoading: false,
                });
                // store to the context
                dispatch({
                    type: StoreActionType.ADD_COUPON,
                    payload: true,
                });
                setInValidCouponName("");
            }
            if (res.data.error) {
                setInValidCouponName(res.data.error);
                setTotalPriceAfterDiscount(0);
                setLoading({
                    ...loading,
                    couponLoading: false,
                });
            }
        });
    };

    const handleCashOrderDelivery = () => {
        setLoading({
            ...loading,
            processingOrderLoading: true,
        });
        if (user && user.token) {
            createOrderCashOnDelivery(isCashOnDelivery, isCouponed, user.token)
                .then((res) => {
                    // reset carts from window local storage
                    if (typeof window !== "undefined") {
                        if (window.localStorage.getItem("carts")) {
                            window.localStorage.removeItem("carts");
                        }
                    }
                    // reset carts from store context
                    dispatch({
                        type: StoreActionType.ADD_TO_CART,
                        payload: [],
                    });
                    emptyCart(user.token);
                    // reset coupon from store context
                    dispatch({
                        type: StoreActionType.ADD_COUPON,
                        payload: false,
                    });
                    // reset cash on delivery store context
                    dispatch({
                        type: StoreActionType.CASH_ON_DELIVERY,
                        payload: false,
                    });
                    setLoading({
                        ...loading,
                        processingOrderLoading: false,
                    });
                    setTimeout(() => {
                        router.push("/user/history");
                    }, 300);
                })
                .catch((error) => {
                    setLoading({
                        ...loading,
                        processingOrderLoading: false,
                    });
                });
        }
    };
    return (
        <>
            <HeadSeo
                title="Checkout"
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />
            <MainLayout>
                <div className="container mt-10 px-40">
                    <div className="grid grid-cols-12 gap-16 sm:grid-cols-1 sm:gap-0 md:grid-cols-1 md:gap-0">
                        <div className="col-span-7 sm:col-span-0 md:col-span-0">
                            <h4 className="text-xl mb-5 font-semibold text-left text-green-500 bg-white">
                                Delivery Address
                            </h4>

                            {/* Shipping Address Form*/}
                            <ShippingAddressForm
                                addressValues={addressValues}
                                validationError={validationError}
                                loading={loading.shippingAddressLoading}
                                handleAddressValueChange={
                                    handleAddressValueChange
                                }
                                submitShippingAddressToDb={
                                    submitShippingAddressToDb
                                }
                            />
                            <hr className="my-4" />

                            {/* Coupon Form*/}
                            <h4 className="text-green-400">Got Coupon?</h4>
                            {inValidCouponName && (
                                <div className="bg-success text-center">
                                    <h6 className="text-white p-2">
                                        {inValidCouponName}
                                    </h6>
                                </div>
                            )}
                            {couponForm()}
                        </div>

                        {/* Order Summary Card */}
                        <div className="col-span-5 sm:col-span-0 md:col-span-0">
                            <div className="bg-gray-100 p-5  rounded-lg mt-16 md:mt-5 sm:mt-5">
                                <h4 className="text-xl font-semibold text-green-400 mb-3">
                                    Order Summary
                                </h4>
                                <h4 className="text-lg font-semibold text-primary">
                                    Product
                                </h4>
                                <hr className="mb-2" />
                                {carts &&
                                    carts.map((product: any) => (
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
                                    Total Price = {`$${cartTotal}`}
                                </p>
                                <hr />
                                {totalPriceAfterDiscount > 0 && (
                                    <div className="bg-success mb-2">
                                        <p className="text-lg font-semibold text-primary">
                                            Total Price After Discount : $
                                            {totalPriceAfterDiscount}
                                        </p>
                                    </div>
                                )}

                                <hr />

                                {isCashOnDelivery ? (
                                    <button
                                        className="btn hover:bg-transparent hover:text-primary text-white btn-primary mt-2 w-full disabled:opacity-75 disabled:border-2 disabled:border-primary disabled:text-primary"
                                        disabled={
                                            !isAddressSave ||
                                            products.length < 1 ||
                                            loading.processingOrderLoading
                                        }
                                        onClick={handleCashOrderDelivery}
                                    >
                                        {loading.processingOrderLoading
                                            ? "Processing..."
                                            : "Place Order"}
                                    </button>
                                ) : (
                                    <button
                                        className="btn hover:bg-transparent hover:text-primary text-white btn-primary mt-2 w-full disabled:opacity-75 disabled:border-2 disabled:border-primary disabled:text-primary"
                                        disabled={
                                            !isAddressSave ||
                                            products.length < 1 ||
                                            loading.processingOrderLoading
                                        }
                                        onClick={() => {
                                            setLoading({
                                                ...loading,
                                                processingOrderLoading: true,
                                            });
                                            router.push(
                                                "/cart/checkout/payment"
                                            );
                                        }}
                                    >
                                        {loading.processingOrderLoading
                                            ? "Processing..."
                                            : "Place Order"}
                                    </button>
                                )}

                                <button
                                    className="btn hover:bg-transparent hover:text-primary text-white btn-primary mt-2 w-full disabled:opacity-75 disabled:border-2 disabled:border-primary disabled:text-primary"
                                    disabled={
                                        products.length < 1 ||
                                        loading.emptyingCartLoading
                                    }
                                    onClick={handleEmptyCart}
                                >
                                    {loading && loading.emptyingCartLoading
                                        ? "Removing..."
                                        : "Empty Cart"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    );
};

export default dynamic(() => Promise.resolve(Checkout), { ssr: false });
