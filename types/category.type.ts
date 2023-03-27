export interface ICategories {
    name: string;
    slug: string;
    images: {
        url: string;
        public_id: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    _id: string;
}
