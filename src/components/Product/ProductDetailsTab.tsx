import React, { Fragment } from "react";
import { Tab } from "@headlessui/react";
import ProductDescription from "./ProductDescription/ProductDescription";
import ProductReview from "./ProductReview/ProductReview";
const ProductDetailsTab = ({ product, handleReviewShowModal }: any) => {
    return (
        <Tab.Group>
            <Tab.List className="bg-primary">
                {["Description", "Show Reviews"].map(
                    (tabList: string, i: number) => (
                        <Tab key={i} as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={
                                        selected
                                            ? "bg-white text-primary px-10 rounded-none py-3 border-2 border-primary sm:px-5"
                                            : "btn hover:bg-white hover:text-primary border-0 rounded-none text-white btn-primary px-10 sm:px-5"
                                    }
                                >
                                    {tabList}
                                </button>
                            )}
                        </Tab>
                    )
                )}
            </Tab.List>
            <Tab.Panels className="border-x-2 border-b-2 border-gray-400">
                <ProductDescription product={product} />
                <ProductReview
                    handleReviewShowModal={handleReviewShowModal}
                    product={product}
                />
            </Tab.Panels>
        </Tab.Group>
    );
};

export default ProductDetailsTab;
