import axios from "axios";

export const createSize = async (token: string, sizeName: string) => {
    return await axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/sizes`,
        {
            sizeName,
        },
        {
            headers: {
                token,
            },
        }
    );
};
export const getListOfSizes = async () =>
    await axios.get(`${process.env.NEXT_PUBLIC_server_api}/sizes`);

export const getSingleSize = async (slug: string) =>
    await axios.get(`${process.env.NEXT_PUBLIC_server_api}/sizes/${slug}`);

export const updateSize = async (
    token: string,
    updateSizeName: string,
    slug: string
) => {
    return await axios.put(
        `${process.env.NEXT_PUBLIC_server_api}/sizes/${slug}`,
        {
            updateSizeName,
        },
        {
            headers: {
                token,
            },
        }
    );
};

export const deleteSize = async (token: string, slug: string) => {
    return await axios.delete(
        `${process.env.NEXT_PUBLIC_server_api}/sizes/${slug}`,
        {
            headers: {
                token,
            },
        }
    );
};
