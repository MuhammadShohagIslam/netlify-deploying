import React from "react";
import { AvgRating } from "@/lib/utils/avgRating";
import ReviewProgressBar from "./ReviewProgressBar";
import { IProduct } from "types/product.type";

const ReviewStatistic = ({ product }: { product: IProduct }) => {
    const calculatePercentage = (number: number) => {
        const percentage = product.ratings.reduce((acc, cur) => {
            acc += Number(
                cur.star == Number(number) || cur.star == Number(number) + 0.5
            );
            return acc;
        }, 0);
        return (percentage * 100) / product.ratings.length;
    };
    const ratingsWithPercentageArray = [
        {
            id: "1",
            star: 5,
            percentage: calculatePercentage(5),
        },
        {
            id: "2",
            star: 4,
            percentage: calculatePercentage(4),
        },
        { id: "3", star: 3, percentage: calculatePercentage(3) },
        { id: "4", star: 2, percentage: calculatePercentage(2) },
        { id: "5", star: 1, percentage: calculatePercentage(1) },
    ];

    return (
        <div className="grid grid-cols-4 sm:grid-cols-1">
            <div className="mt-4 sm:mt-3">
                <AvgRating product={product} isTotalReviewRating={true} />
            </div>
            <div className="col-span-3 px-10 sm:px-5 pt-5">
                {ratingsWithPercentageArray.length &&
                    ratingsWithPercentageArray.map((rp) => (
                        <ReviewProgressBar
                            key={rp.id}
                            starNumber={rp.star}
                            percentage={rp.percentage}
                        />
                    ))}
            </div>
        </div>
    );
};

export default ReviewStatistic;
