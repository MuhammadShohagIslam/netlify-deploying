import React from "react";
import { Tab } from "@headlessui/react";
import ReviewStatistic from "./ReviewStatistic/ReviewStatistic";
import ReviewLists from "./ReviewLists/ReviewLists";

const ProductReview = ({ product, handleReviewShowModal }: any) => {
    return (
        <Tab.Panel>
            <ReviewStatistic product={product} />
            <ReviewLists
                product={product}
                handleReviewShowModal={handleReviewShowModal}
            />
        </Tab.Panel>
    );
};

export default ProductReview;
