import React from "react";
import Image from "next/image";

const ShoppingCart = ({ cart, removeCartHandler }: any) => {
    const { _id, price, color, count, title, images } = cart;

    return (
        <li key={cart._id} className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <Image
                    src={images && images.length && images[0].url}
                    alt={title}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover object-center"
                />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{title}</h3>
                        <p className="ml-4">{price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{color}</p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty {count}</p>

                    <div className="flex">
                        <button
                            type="button"
                            className="transition-all font-medium text-primary hover:text-green-600"
                            onClick={() => removeCartHandler(_id)}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default ShoppingCart;
