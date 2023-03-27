import { isArray } from "lodash";
import React from "react";

type ProductDescriptionItemPropsType = {
    name: string;
    value?: string | any[];
    description?: string;
    isBorderClassName?: boolean;
};
const ProductDescriptionItem = ({
    name,
    value,
    description,
    isBorderClassName = false,
}: ProductDescriptionItemPropsType) => {
    return (
        <>
            {!description ? (
                <div
                    className={`grid grid-cols-2 ${
                        !isBorderClassName ? "border-b-2 p-2" : ""
                    } `}
                >
                    <span className="text-md tracking-tight text-gray-900 font-medium">
                        {name}
                    </span>
                    <div>
                        {isArray(value) ? (
                            value?.map((v) => (
                                <span
                                    key={v._id}
                                    className="text-md ml-4 cursor-pointer tracking-tight text-gray-500 break-all"
                                >
                                    {v.name}
                                </span>
                            ))
                        ) : (
                            <span className="text-md ml-4 tracking-tight text-gray-500 break-all">
                                {value}
                            </span>
                        )}
                    </div>
                </div>
            ) : (
                <div className="mt-3 p-2">
                    <h4 className="text-primary text-lg">{name}:</h4>
                    <p className="text-primary mt-1">{description}</p>
                </div>
            )}
        </>
    );
};

export default ProductDescriptionItem;
