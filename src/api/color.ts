import axios from "axios";

export const createColor = async (token: string, colorName: string) => {
    return await axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/colors`,
        {
            colorName,
        },
        {
            headers: {
                token,
            },
        }
    );
};
export const getListOfColor = async () =>
    await axios.get(`${process.env.NEXT_PUBLIC_server_api}/colors`);

export const getSingleColor = async (slug: string) =>
    await axios.get(`${process.env.NEXT_PUBLIC_server_api}/colors/${slug}`);

export const updateColor = async (
    token: string,
    updateColorName: string,
    slug: string
) => {
    return await axios.put(
        `${process.env.NEXT_PUBLIC_server_api}/colors/${slug}`,
        {
            updateColorName,
        },
        {
            headers: {
                token,
            },
        }
    );
};

export const deleteColor = async (token: string, slug: string) => {
    return await axios.delete(
        `${process.env.NEXT_PUBLIC_server_api}/colors/${slug}`,
        {
            headers: {
                token,
            },
        }
    );
};
