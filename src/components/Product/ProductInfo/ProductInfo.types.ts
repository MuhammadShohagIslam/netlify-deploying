import { Dispatch, SetStateAction } from "react";
import { CartType } from "types/cart.types";
import { IProduct } from "types/product.type";

export interface ProductInfoPropsType {
    product: IProduct;
    selectedColor: string;
    setSelectedColor: Dispatch<SetStateAction<string>>;
    selectedSize: string;
    setSelectedSize: Dispatch<SetStateAction<string>>;
    handleAddCart: () => void;
    handleAddToWishList: () => void;
    heartFillIcon: boolean;
    isAddToCart: CartType[];
}
