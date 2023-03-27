import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "@/components/StripeCheckout/StripeCheckout";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import useCheckUser from "@/hooks/useCheckUser";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_stripe_key!);

const Payment = () => {
    useCheckUser();
    return (
        <>
            <HeadSeo
                title="Payment"
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />
            <MainLayout>
                <div className="container text-center">
                    <h4 className="font-bold text-primary text-2xl mt-12">
                        Complete Your Purchase
                    </h4>
                    <Elements stripe={stripePromise}>
                        <StripeCheckout />
                    </Elements>
                </div>
            </MainLayout>
        </>
    );
};

export default Payment;
