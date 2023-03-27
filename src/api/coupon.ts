import axios from "axios";

// creating new coupon
export const creatingCoupon = async (
    token:string,
    couponName:string,
    discount:string,
    expireDate:Date
) => {
    return await axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/coupon`,
        { couponName, discount, expireDate },
        {
            headers: {
                token,
            },
        }
    );
};

// getting list of coupon
export const getListOfCoupons = async (token:string) => {
    return await axios.get(`${process.env.NEXT_PUBLIC_server_api}/coupons`, {
        headers: {
            token,
        },
    });
};

// removing single coupon by couponId
export const removingCoupon = async (token:string, couponId:string) => {
    return await axios.delete(
        `${process.env.NEXT_PUBLIC_server_api}/coupons/${couponId}`,
        {
            headers: {
                token,
            },
        }
    );
};
