import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { AiOutlineDollar, AiOutlineCheck } from "react-icons/ai";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { createPaymentIntent } from "@/api/stripe";
import { StoreActionType } from "@/lib/states/storeReducer/storeReducer.type";
import { createOrder } from "@/api/user";
import Link from "next/link";
import Image from "next/image";
import classes from "./StripeCheckout.module.css";
import { StripeCardElementChangeEvent } from "@stripe/stripe-js";
import { IProduct } from "types/product.type";

type ProductType = {
    product: IProduct;
    count: number;
    color: string;
    size: string;
};
const StripeCheckout = () => {
    const [succeeded, setSucceeded] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [processing, setProcessing] = useState<boolean>(false);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState<string>("");
    const [product, setProduct] = useState<ProductType>();
    const [cartTotal, setCartTotal] = useState<number>(0);
    const [totalPriceAfterDiscount, setTotalPriceAfterDiscount] =
        useState<number>(0);
    const [payable, setPayable] = useState<number>(0);
    const stripe = useStripe();
    const elements = useElements();

    // store context
    const { state, dispatch } = useStoreContext();
    const { user, isCouponed } = state;

    useEffect(() => {
        if (user && user.token) {
            createPaymentIntent(user.token, isCouponed).then((res) => {
                setClientSecret(res.data.clientSecret);
                // additional response received on successful payment
                setCartTotal(res.data.cartTotal);
                setTotalPriceAfterDiscount(res.data.totalPriceAfterDiscount);
                setPayable(res.data.payable);
                setProduct(res.data.product);
            });
        }
    }, [user, isCouponed]);

    const handleChange = async (event: StripeCardElementChangeEvent) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty); // button is disabled when pay is error
        setError(event.error ? event.error.message : "");
    };

    const cartStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: "Arial, sans-serif",
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d",
                },
            },
            invalid: {
                fontFamily: "Arial, sans-serif",
                color: "#fa755a",
                iconColor: "#fa755a",
            },
        },
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setProcessing(true);

        const cardElement = elements!.getElement(CardElement);
        if (cardElement !== null) {
            const payload = await stripe!.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (payload.error) {
                setError(`Payment failed ${payload.error.message}`);
                setProcessing(false);
            } else {
                // create order
                const paymentInfoObject = {
                    paymentIntents: payload,
                    paymentBy: "Stripe",
                };
                createOrder(paymentInfoObject, user!.token)
                    .then((res) => {})
                    .catch((error) => {
                        console.log(error);
                    });

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
                // reset coupon from store context
                dispatch({
                    type: StoreActionType.ADD_COUPON,
                    payload: false,
                });
                setError("");
                setProcessing(false);
                setSucceeded(true);
            }
        }
    };

    return (
        <div className="w-1/2 mx-auto mt-5 sm:w-full md:w-full">
            {!succeeded && (
                <div>
                    {isCouponed && totalPriceAfterDiscount !== undefined ? (
                        <p className="text-white bg-success py-2">{`Total after discount: $${totalPriceAfterDiscount}`}</p>
                    ) : (
                        <p className="text-white bg-success py-2">
                            No coupon applied
                        </p>
                    )}
                </div>
            )}

            <div className="w-full bg-white border border-gray-200 rounded-lg shadow my-5">
                <div className="flex flex-col items-center pb-10 rounded-full">
                    {product &&
                    product.product.images &&
                    product.product?.images[0] ? (
                        <Image
                            height={200}
                            width={400}
                            className="w-80 sm:w-60 h-62 mb-3 rounded-full shadow-lg"
                            src={product.product.images[0].url}
                            alt="payment image"
                        />
                    ) : (
                        <img
                            src="../../../../banner/laptop1Banner.jpg"
                            alt="payment image"
                            className="w-80 sm:w-60 h-62 mb-3 rounded-full shadow-lg"
                        />
                    )}

                    <div className="flex sm:block space-x-3 sm:space-x-0 mt-4 md:mt-6 sm:px-10">
                        <button className="flex transition-all items-center justify-center border-2 border-green-400 px-4 py-2 text-sm font-medium text-center text-white bg-success rounded-lg hover:bg-transparent hover:text-primary focus:ring-4 focus:outline-none focus:ring-green-300 sm:w-full ">
                            {" "}
                            <AiOutlineDollar className="text-primary mr-1" />
                            Total: ${cartTotal}
                        </button>
                        <button className="flex transition-all items-center justify-center border-2 border-green-400 px-4 py-2 text-sm font-medium text-center text-white bg-success rounded-lg hover:bg-transparent hover:text-primary focus:ring-4 focus:outline-none focus:ring-green-300 sm:ml-0 sm:mt-2 sm:w-full">
                            <AiOutlineCheck className="text-primary mr-2 " />
                            Total payable : ${(payable / 100).toFixed(2)}
                        </button>
                    </div>
                </div>
            </div>

            <form className={classes.stripe_form} onSubmit={handleSubmit}>
                <CardElement
                    id={classes.card_element}
                    options={cartStyle}
                    onChange={handleChange}
                />
                <button
                    className="w-full btn block hover:bg-transparent hover:text-primary text-white btn-primary disabled:opacity-75 disabled:border-2 disabled:border-primary disabled:text-primary mt-2"
                    disabled={processing || disabled || succeeded}
                >
                    <span className={classes.button_text}>
                        {processing ? (
                            <div className={classes.spinner}></div>
                        ) : (
                            "Pay"
                        )}
                    </span>
                </button>
                <br />
                {error && (
                    <div className={classes.card_error} role="alert">
                        {error}
                    </div>
                )}
                {succeeded && (
                    <p className="text-primary pb-6">
                        Payment Successful.{" "}
                        <Link
                            className="text-green-500 cursor-pointer"
                            href="/dashboard/user/history"
                        >
                            See it in your purchase history.
                        </Link>
                    </p>
                )}
            </form>
        </div>
    );
};

export default StripeCheckout;
