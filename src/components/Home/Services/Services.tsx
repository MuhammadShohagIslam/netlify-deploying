import React from "react";
import { MdOutlineFreeCancellation } from "react-icons/md";
import { AiOutlineFileProtect } from "react-icons/ai";
import { FaMoneyBillAlt, FaGift } from "react-icons/fa";
import Service from "./Service/Service";

const Services = () => {
    return (
        <div className="container grid grid-cols-4 md:grid-cols-3 sm:grid-cols-1 py-14 md:py-10 sm:py-8 sm:pb-1 md:pb-5">
            <Service name="Free Delivery" info="On Order Over $100">
                <MdOutlineFreeCancellation className="text-3xl text-success" />
            </Service>
            <Service name="Order Protection" info="Secured Information">
                <AiOutlineFileProtect className="text-3xl text-success" />
            </Service>
            <Service name="Promotion Gift" info="Special Offers!">
                <FaGift className="text-3xl text-success" />
            </Service>
            <Service name="Money Back" info="Return Over 30 days">
                <FaMoneyBillAlt className="text-3xl text-success" />
            </Service>
        </div>
    );
};

export default Services;
