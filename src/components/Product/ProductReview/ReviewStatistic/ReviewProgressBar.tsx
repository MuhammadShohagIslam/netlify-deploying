import React from "react";
import { BsFillStarFill } from "react-icons/bs";

type ReviewProgressBarPropsType = {
    starNumber: number;
    percentage: number;
};

const ReviewProgressBar = ({
    starNumber,
    percentage,
}: ReviewProgressBarPropsType) => {
    return (
        <div className="grid grid-cols-5 gap-2">
            <div className="w-full relative top-1 col-span-3 bg-gray-300  h-2.5">
                <div
                    className="bg-success h-2.5 sm:h-2 sm:w-2  dark:bg-success"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            <ul className="flex">
                {Array.from(Array(starNumber).keys()).map((rating: number) => (
                    <li key={rating}>
                        <BsFillStarFill
                            className={`${
                                5 > rating ? "text-orange-400" : "text-gray-200"
                            }
                        h-4 w-4 sm:h-3 sm:w-3 flex-shrink-0`}
                        />
                    </li>
                ))}
                <span className="ml-1 text-blue-400 relative -top-1">
                    {percentage}%
                </span>
            </ul>
        </div>
    );
};

export default ReviewProgressBar;
