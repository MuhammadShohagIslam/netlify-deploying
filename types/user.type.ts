export interface ICurrentUser {
    username?: string;
    fullName?: string;
    image?: {
        public_id: string;
        url: string;
    };
    email?: string;
    about?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
    _id?: string;
}
