import axios from "axios";

export const createCategory = async (token: string, categoryObj: any) => {
    return await axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/category`,
        categoryObj,
        {
            headers: {
                token,
            },
        }
    );
};
export const getListOfCategory = async () =>
    await axios.get(`${process.env.NEXT_PUBLIC_server_api}/categories`);

export const getSingleCategory = async (slug: string) =>
    await axios.get(`${process.env.NEXT_PUBLIC_server_api}/categories/${slug}`);

export const updateCategory = async (
    token: string,
    updateCategoryObj: {
        name: string;
        images: {
            url:string;
            public_id:string;
        }[];
    },
    slug: string
) => {
    return await axios.put(
        `${process.env.NEXT_PUBLIC_server_api}/categories/${slug}`,
        updateCategoryObj,
        {
            headers: {
                token,
            },
        }
    );
};

export const deleteCategory = async (token: string, slug: string) => {
    return await axios.delete(
        `${process.env.NEXT_PUBLIC_server_api}/categories/${slug}`,
        {
            headers: {
                token,
            },
        }
    );
};
export const subCategoryOnCategory = async (token: string, _id: string) => {
    return await axios.get(
        `${process.env.NEXT_PUBLIC_server_api}/categories/sub-categories/${_id}`,
        {
            headers: {
                token,
            },
        }
    );
};

// export const productByCategory = async (_id) => {
//     return await axios.get(
//         `${process.env.NEXT_PUBLIC_server_api}/products/category/${_id}`
//     );
// };
