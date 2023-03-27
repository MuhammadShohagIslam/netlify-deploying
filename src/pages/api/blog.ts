import axios from "axios";

export const getListOfBlogs = async () =>
    await axios.get(`${process.env.NEXT_PUBLIC_server_api}/blogs`);
