import { ChangeEventHandler, FormEventHandler } from "react";

export interface CouponFormPropsType {
    couponValues: {
        couponName: string;
        discount: string;
    };
    handleCouponChange: ChangeEventHandler<HTMLInputElement>;
    expireDate: Date;
    setExpireDate: React.Dispatch<React.SetStateAction<Date>>;
    loading: boolean;
    handleCouponSubmit: FormEventHandler<HTMLFormElement>;
}
