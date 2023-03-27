import React from "react";
import DatePicker from "react-datepicker";
import { CouponFormPropsType } from "./CouponForm.types";

const CouponForm = ({
    couponValues,
    handleCouponChange,
    expireDate,
    setExpireDate,
    loading,
    handleCouponSubmit,
}: CouponFormPropsType) => {
    const { couponName, discount } = couponValues;
    return (
        <form onSubmit={handleCouponSubmit}>
            <div className="mb-3">
                <label
                    className="block mb-2 text-sm font-medium text-primary"
                    htmlFor="coupon"
                >
                    Coupon:
                </label>
                <input
                    type="text"
                    name="couponName"
                    value={couponName}
                    onChange={handleCouponChange}
                    className="input input-bordered input-success w-full text-primary"
                    id="coupon"
                    placeholder="Enter Coupon"
                    autoFocus
                />
            </div>
            <div className="mb-3">
                <label
                    className="block mb-2 text-sm font-medium text-primary"
                    htmlFor="discount"
                >
                    Discount:
                </label>
                <input
                    type="text"
                    name="discount"
                    value={discount}
                    onChange={handleCouponChange}
                    className="input input-bordered input-success w-full text-primary"
                    id="discount"
                    placeholder="Enter Discount"
                />
            </div>
            <div className="mb-3">
                <label
                    className="block mb-2 text-sm font-medium text-primary"
                    htmlFor="expireDate"
                >
                    Expire Date:
                </label>
                <DatePicker
                className="input input-bordered input-success w-1/4 sm:w-1/2 text-primary"
                    selected={expireDate}
                    onChange={(date: Date) => setExpireDate(date)}
                    id="expireDate"
                />
            </div>
            <button className="btn block hover:bg-transparent hover:text-primary text-white btn-primary disabled:opacity-75 disabled:border-2 disabled:border-primary disabled:text-primary mt-2">
                {loading ? "Saving" : "Save"}
            </button>
        </form>
    );
};

export default CouponForm;
