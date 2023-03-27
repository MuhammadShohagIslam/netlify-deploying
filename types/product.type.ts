import { ISize } from "types/size.types";
import { IColor } from "types/color.types";
import { ICategories } from "types/category.type";
import { ISubCategories } from "types/sub-category.type";
import { IBrand } from "types/brand.types";
import { ICurrentUser } from "types/user.type";

export interface IProduct {
    _id: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    discount: number;
    category: ICategories;
    subCategory: ISubCategories[];
    quantity: number;
    sold: number;
    images: {
        public_id: string;
        url: string;
    }[];
    shipping: string;
    colors: IColor[];
    sizes: ISize[];
    brand: IBrand;
    ratings: {
        postedBy: ICurrentUser;
        star: number;
        comment: string;
        _id: string;
    }[];
    updatedAt: Date;
    __v: number;
}
