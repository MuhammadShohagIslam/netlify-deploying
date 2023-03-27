import React from "react";
import StarRatings from "react-star-ratings";

const RatingModal = ({
    productName,
    showReviewModal,
    handleReviewSubmit,
    setShowReviewModal,
    handleClickRating,
    setComment,
    comment,
    star,
}: any) => {
    return (
        <>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label
                        onClick={() => setShowReviewModal(!showReviewModal)}
                        htmlFor="my-modal"
                        className="btn btn-sm btn-success hover:btn-primary text-white btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <h3 className="text-lg font-bold text-success text-center">
                        Review The {productName}
                    </h3>
                    <form onSubmit={handleReviewSubmit}>
                        <label
                            htmlFor="message"
                            className="block mb-2 text-sm font-medium text-primary"
                        >
                            Your Comment
                        </label>
                        <textarea
                            id="message"
                            rows={4}
                            className="block p-2.5 w-full text-sm text-primary bg-gray-50 rounded-lg border border-success focus:ring-green-500 focus:border-green-500 focus:outline focus:outline-offset-2 focus:outline-green-600"
                            name="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Leave a comment here"
                        ></textarea>
                        <h6 className="mt-5 mb-2 text-primary">Rating</h6>
                        <StarRatings
                            rating={star}
                            starRatedColor="red"
                            changeRating={handleClickRating}
                            numberOfStars={5}
                            starDimension="30px"
                            name={productName}
                        />
                        <div className="mt-5">
                            <input
                                type="submit"
                                value="Review Submit"
                                className="btn btn-sm capitalize hover:bg-transparent hover:text-primary text-white btn-primary"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RatingModal;
