import axios from "axios";

// for creating product
export const createProduct = async (token: string, productObject: any) => {
    return await axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/product`,
        productObject,
        {
            headers: {
                token,
            },
        }
    );
};

// for getting products with number how many we want
export const getProductsByCount = async (count: any) =>
    await axios.get(
        `${process.env.NEXT_PUBLIC_server_api}/products/count/${count}`
    );

// for getting all products by sorting with pagination
export const getProductsBySort = async (sort: any, order: any, page?: any) => {
    return await axios.get(
        `${process.env.NEXT_PUBLIC_server_api}/products?sort=${sort}&order=${order}&page=${page}`
    );
};

// for getting all products
export const getTotalProducts = async () =>
    await axios.post(`${process.env.NEXT_PUBLIC_server_api}/products/total`);

// for getting single product
export const getProduct = async (slug: any) => {
    return await axios.get(
        `${process.env.NEXT_PUBLIC_server_api}/products/${slug}`
    );
};

// for update product
export const updateProduct = async (
    token: string,
    slug: any,
    updateProducts: any
) => {
    return await axios.put(
        `${process.env.NEXT_PUBLIC_server_api}/products/${slug}`,
        updateProducts,
        {
            headers: {
                token,
            },
        }
    );
};

// for removing product
export const deleteProduct = async (token: string, slug: any) => {
    return await axios.delete(
        `${process.env.NEXT_PUBLIC_server_api}/products/${slug}`,
        {
            headers: {
                token,
            },
        }
    );
};

// for ratings  product
export const productRating = async (
    token: string,
    productId: string,
    reviewObject: {
        star: number;
        comment: string;
    }
) => {
    return await axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/products/ratings/${productId}`,
        reviewObject,
        {
            headers: {
                token,
            },
        }
    );
};

// for getting related product
export const relatedProducts = async (productId: any) => {
    return await axios.get(
        `${process.env.NEXT_PUBLIC_server_api}/products/related/${productId}`
    );
};

// for getting filter related product
export const getFilterRelatedProducts = async (argument: any) => {
    return await axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/products/filter`,
        argument
    );
};
