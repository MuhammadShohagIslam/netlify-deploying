import { ICategories } from "./category.type";

export interface ISubCategories {
    name: string;
    slug: string;
    images: {
        url: string;
        public_id: string;
    }[];
    createdAt: Date;
    parent: ICategories;
    updatedAt: Date;
    __v: number;
    _id: string;
}
