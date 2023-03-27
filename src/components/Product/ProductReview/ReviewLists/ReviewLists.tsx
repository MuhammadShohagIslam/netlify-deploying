import React, { useState } from "react";
import ReviewList from "./ReviewList";
import { IProduct } from "types/product.type";
import LocalSearch from "@/components/Form/LocalSearch/LocalSearch";
import { ICurrentUser } from "types/user.type";

type ReviewListsPropType = {
    product: IProduct;
    handleReviewShowModal: () => void;
};
const ReviewLists = ({
    product,
    handleReviewShowModal,
}: ReviewListsPropType) => {
    const [keyword, setKeyword] = useState<string>("");

    // search filter
    // const filtering = categories.filter(category => category.name.toLowerCase().includes(keyword));
    const searched =
        (keyword: string) =>
        (c: {
            postedBy: ICurrentUser;
            star: number;
            comment: string;
            _id: string;
        }) =>
            c.comment.toLowerCase().includes(keyword);

    return (
        <div className="p-10 sm:p-5">
            <div className="flex">
                <div className="flex-initial w-2/5 sm:w-1/2">
                    <h2 className="text-3xl sm:text-xl font-bold text-gray-900 ">
                        Reviews
                    </h2>
                </div>
                <div className="flex-initial sm:w-1/2">
                    <label
                        className="text-xl sm:text-sm ml-5 cursor-pointer font-bold text-orange-400"
                        onClick={handleReviewShowModal}
                        htmlFor="my-modal"
                    >
                        Write a Review
                    </label>
                </div>
            </div>
            <div className="flex items-center sm:flex-col space-x-4 mt-12 sm:mt-8">
                <div className="flex-initial w-2/5 sm:w-full">
                    <LocalSearch
                        keyword={keyword}
                        setKeyword={setKeyword}
                        placeholder={"Search Review"}
                    />
                </div>
                {/* <div className="flex-initial relative -top-4 sm:top-3 sm:w-full">
                    <label
                        htmlFor="ratings"
                        className="block mb-2 text-md font-medium text-gray-900 "
                    >
                        Filter Ratings
                    </label>
                    <select
                        id="ratings"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                        <option value="">Choose a Rating</option>
                        <option value="5">Five starts</option>
                        <option value="4">Four starts</option>
                        <option value="3">Three starts</option>
                        <option value="2">Two starts</option>
                        <option value="1">One start</option>
                    </select>
                </div> */}
            </div>
            <div className="mt-10">
                {product.ratings.filter(searched(keyword)).length ? (
                    product.ratings
                        .filter(searched(keyword))
                        .map((rating: any) => (
                            <ReviewList key={rating._id} ratings={rating} />
                        ))
                ) : (
                    <span className="text-gray-500 ml-4">No Review Found</span>
                )}
            </div>
        </div>
    );
};

export default ReviewLists;
