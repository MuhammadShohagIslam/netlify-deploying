import { BsFillStarFill } from "react-icons/bs";
import { IProduct } from "types/product.type";

type AvgRatingPropType = {
    product: IProduct;
    isTotalReviewRating?: boolean;
};
export const AvgRating = ({
    product,
    isTotalReviewRating = false,
}: AvgRatingPropType) => {
    let avgRating: number | undefined;
    let length: number | undefined;
    if (product && product.ratings.length) {
        let total: number[] = [];
        product.ratings.forEach((rating: any) => total.push(rating.star));
        const highest = product.ratings.length * 5;
        const totalReducer = total.reduce((acc, cur) => acc + cur, 0);
        avgRating = (totalReducer * 5) / highest;
        length = product.ratings.length;
    } else {
        avgRating = 0;
        length = 0;
    }

    return (
        <>
            {!isTotalReviewRating ? (
                <div className="mt-1">
                    <h3 className="sr-only">Reviews</h3>
                    <div className="flex items-center">
                        <div className="flex items-center mr-3">
                            {avgRating ? (
                                [0, 1, 2, 3, 4].map((rating: number) => (
                                    <BsFillStarFill
                                        key={rating}
                                        className={`${
                                            avgRating! > rating
                                                ? "text-rose-600"
                                                : "text-gray-200"
                                        }
             h-4 w-4 flex-shrink-0`}
                                    />
                                ))
                            ) : (
                                <span className="text-rose-600 text-sm">
                                    No Review Yet
                                </span>
                            )}
                        </div>
                        <span className="text-rose-600 text-sm">
                            {length === 1
                                ? `${length} Review`
                                : `${length} reviews`}{" "}
                        </span>
                    </div>
                </div>
            ) : (
                <div className="mt-1">
                    <div className="flex items-center flex-col">
                        <h3 className="text-orange-400 text-7xl font-extrabold">
                            {avgRating && avgRating}
                        </h3>
                        <div className="flex items-center mr-3">
                            {avgRating &&
                                [0, 1, 2, 3, 4].map((rating: number) => (
                                    <BsFillStarFill
                                        key={rating}
                                        className={`${
                                            avgRating! > rating
                                                ? "text-orange-400"
                                                : "text-gray-200"
                                        }
                                    h-4 w-4 flex-shrink-0 mr-1`}
                                    />
                                ))}
                        </div>
                        <p className="text-orange-400 text-md mr-3">
                            Product Rating
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};
