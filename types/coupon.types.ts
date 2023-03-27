export interface ICoupon {
    _id: string;
    name: string;
    discount: number;
    expiry: Date;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
