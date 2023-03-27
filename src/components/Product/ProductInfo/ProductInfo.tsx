import React from "react";
import CustomButton from "@/components/UI/CustomButton/CustomButton";
import { BsHandbagFill, BsFillHeartFill } from "react-icons/bs";
import { RadioGroup } from "@headlessui/react";
import ProductDescriptionItem from "./../ProductDescription/ProductDescriptionItem";
import { AvgRating } from "./../../../lib/utils/avgRating";
import { ProductInfoPropsType } from "./ProductInfo.types";
import { IColor } from "types/color.types";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

const ProductInfo = ({
    product,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    handleAddCart,
    handleAddToWishList,
    heartFillIcon,
    isAddToCart,
}: ProductInfoPropsType) => {
    const { title, price, category, discount, shipping, brand, subCategory } =
        product;
    return (
        <>
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl break-all">
                    {title}
                </h1>
            </div>
            {/* Reviews */}
            <AvgRating product={product} />
            {/* Options */}
            <div className="mt-4">
                <div>
                    <span className="text-3xl tracking-tight text-black font-semibold">
                        ${price - (price * discount) / 100}
                    </span>
                    <span className="text-2xl ml-4 line-through tracking-tight text-rose-500">
                        ${price}
                    </span>
                </div>

                <div className="mt-5">
                    <ProductDescriptionItem
                        isBorderClassName={true}
                        name="Brand"
                        value={brand?.name}
                    />
                    <ProductDescriptionItem
                        isBorderClassName={true}
                        name="Category"
                        value={category?.name}
                    />
                    <ProductDescriptionItem
                        isBorderClassName={true}
                        name="Sub Category"
                        value={subCategory}
                    />
                    <ProductDescriptionItem
                        isBorderClassName={true}
                        name="Shipping"
                        value={shipping}
                    />
                </div>

                <form className="mt-5">
                    {/* Colors */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-900">
                            Choose Color
                        </h3>

                        <RadioGroup
                            value={selectedColor}
                            onChange={(v: string) => setSelectedColor(v)}
                            className="mt-4"
                        >
                            <div className="flex items-center space-x-3">
                                {product?.colors.map((color: IColor) => (
                                    <RadioGroup.Option
                                        key={color._id}
                                        value={color.name}
                                        className={({ active, checked }) =>
                                            classNames(
                                                active && checked
                                                    ? "ring ring-green-300 ring-offset-green-300"
                                                    : "",
                                                !active && checked
                                                    ? "ring-2 ring-green-300 ring-offset-green-300"
                                                    : "",
                                                `-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none`
                                            )
                                        }
                                    >
                                        <span
                                            className={`${
                                                color.name === "Red"
                                                    ? "bg-red-600"
                                                    : color.name === "Green"
                                                    ? `bg-success`
                                                    : color.name === "Orange"
                                                    ? `bg-warning`
                                                    : `bg-${color.name.toLowerCase()}-600`
                                            } h-8 w-8 border border-black border-opacity-10 rounded-full`}
                                        />
                                    </RadioGroup.Option>
                                ))}
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Sizes */}
                    <div className="mt-5">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900">
                                Choose Size
                            </h3>
                        </div>

                        <RadioGroup
                            value={selectedSize}
                            onChange={(v: string) => setSelectedSize(v)}
                            className="mt-4"
                        >
                            <div className="grid grid-cols-4 gap-4 sm:grid-cols-2 md:grid-cols-3">
                                {product?.sizes.map((size: any) => (
                                    <RadioGroup.Option
                                        key={size._id}
                                        value={size.name}
                                        className={({ active }) =>
                                            classNames(
                                                "bg-white shadow-sm text-gray-900 cursor-pointer",
                                                active
                                                    ? "ring-2 ring-green-500"
                                                    : "",
                                                "group relative border rounded-md py-3 sm:py-2  px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1"
                                            )
                                        }
                                    >
                                        {({ active, checked }) => (
                                            <>
                                                <RadioGroup.Label as="span">
                                                    {size.name}
                                                </RadioGroup.Label>

                                                <span
                                                    className={classNames(
                                                        active
                                                            ? "border"
                                                            : "border-2",
                                                        checked
                                                            ? "border-green-500"
                                                            : "border-transparent",
                                                        "pointer-events-none absolute -inset-px rounded-md"
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </>
                                        )}
                                    </RadioGroup.Option>
                                ))}
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
                        <CustomButton
                            buttonType="button"
                            className="mt-10 sm:mt-5 w-full"
                            handleClick={handleAddCart}
                        >
                            <BsHandbagFill className="mr-1" />
                            {isAddToCart?.length > 0
                                ? "Added To Cart"
                                : "Add To Cart"}
                        </CustomButton>
                        {heartFillIcon ? (
                            <CustomButton
                                buttonType="button"
                                className="mt-10 sm:mt-0 w-full md:text-[12px]"
                                handleClick={handleAddToWishList}
                            >
                                <BsFillHeartFill className="mr-1" />
                                Removed To Wishlist
                            </CustomButton>
                        ) : (
                            <CustomButton
                                buttonType="button"
                                className="mt-10 sm:mt-0 w-full md:text-[12px]"
                                handleClick={handleAddToWishList}
                            >
                                <BsFillHeartFill className="mr-1" />
                                Add To WishList
                            </CustomButton>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
};

export default ProductInfo;
