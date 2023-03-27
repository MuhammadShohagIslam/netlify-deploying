import axios from "axios";

export const createBrand = async (token: string, brandName: string) => {
    return await axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/brands`,
        {
            brandName,
        },
        {
            headers: {
                token,
            },
        }
    );
};
export const getListOfBrands = async () =>
    await axios.get(`${process.env.NEXT_PUBLIC_server_api}/brands`);

export const getSingleBrand = async (slug: string) =>
    await axios.get(`${process.env.NEXT_PUBLIC_server_api}/brands/${slug}`);

export const updateBrand = async (
    token: string,
    updateBrandName: string,
    slug: string
) => {
    return await axios.put(
        `${process.env.NEXT_PUBLIC_server_api}/brands/${slug}`,
        {
            updateBrandName,
        },
        {
            headers: {
                token,
            },
        }
    );
};

export const deleteBrand = async (token: string, slug: string) => {
    return await axios.delete(
        `${process.env.NEXT_PUBLIC_server_api}/brands/${slug}`,
        {
            headers: {
                token,
            },
        }
    );
};
