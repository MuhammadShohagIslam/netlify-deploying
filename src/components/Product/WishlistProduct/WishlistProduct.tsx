import React from "react";
import { BsFillHeartFill } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import _ from "lodash";
import { FaShoppingCart } from "react-icons/fa";
import { MdPageview } from "react-icons/md";

const WishlistProduct = ({
    product,
    handleRemovedToWishList,
    handleAddCart,
    isUserWishList = false,
}: any) => {
    const { _id, slug, title, images, description, price, discount } = product;
    return (
        <div className="rounded-lg shadow-md group cursor-pointer">
            <div className="h-72 relative">
                <div className="absolute top-3 rounded-full left-3 w-14 h-14 bg-success flex justify-center items-center flex-col">
                    <span className="text-white -mb-2">Off</span>
                    <span className="flex justify-center items-center text-white">
                    {discount ? discount : "0"}%
                    </span>
                </div>
                <ul className="transition duration-300 ease-in-out invisible flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 group-hover:visible">
                    {isUserWishList && (
                        <li
                            className={`py-3 flex items-center px-3 rounded-lg ml-2 border-2 border-success hover:bg-primary hover:border-primary hover:text-white  text-white bg-success transition ease-in-out delay-15 cursor-pointer tooltip tooltip-primary`}
                            data-tip={"Add To Cart"}
                            onClick={() => handleAddCart(product)}
                        >
                            <FaShoppingCart />
                        </li>
                    )}
                    <li
                        className={`py-3 flex items-center px-3 rounded-lg ml-2 border-2 border-success hover:bg-primary hover:border-primary hover:text-white  text-white bg-success transition ease-in-out delay-15 cursor-pointer tooltip tooltip-primary`}
                        data-tip={"Removed From WishList"}
                        onClick={() => handleRemovedToWishList(_id)}
                    >
                        <BsFillHeartFill />
                    </li>

                    <label htmlFor="my-modal-3">
                        <Link href={`products/${slug}`}>
                            <li
                                className={`py-3 flex items-center px-3 rounded-lg ml-2 border-2 border-success hover:bg-primary hover:border-primary hover:text-white  text-white bg-success transition ease-in-out delay-15 cursor-pointer tooltip tooltip-primary`}
                                data-tip={"Details Product"}
                            >
                                <MdPageview fill="#fff" />
                            </li>
                        </Link>
                    </label>
                </ul>
                {images && images.length && images[0]?.url && (
                    <Image
                        className="h-full w-full object-contain"
                        src={`${images && images.length && images[0].url}`}
                        alt={title}
                        width={100}
                        height={100}
                    />
                )}
            </div>
            <div className="p-5">
                <h5 className="my-2 text-xl font-semibold tracking-tight text-primary">
                    {title}
                </h5>

                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {description?.length > 90
                        ? `${description.slice(0, 90)} ...`
                        : description}
                </p>
                <div className="flex items-center gap-2 top-2 mb-1">
                <span className="font-bold text-gray-700">
                    USD{" "}
                    {(price - ((price * discount) / 100)).toFixed(2)}{" "}
                    $
                </span>
                <span className="font-bold line-through text-sm text-gray-600">
                    - USD{" "}
                    {(price).toFixed(2)}{" "}
                    $
                </span>
            </div>
            </div>
        </div>
    );
};

export default WishlistProduct;
