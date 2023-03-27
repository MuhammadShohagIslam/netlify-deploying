import React from "react";

const CustomButton = ({ children, className, buttonType="button", handleClick }:{
    children:React.ReactNode,
    className?: string,
    buttonType?:"button" | "submit",
    handleClick?:() => void
}) => {
    return (
        <div>
            <button
                type={buttonType}
                className={`btn hover:bg-transparent hover:text-primary text-white btn-primary ${className}`}
                onClick={handleClick}
            >
                {children}
            </button>
        </div>
    );
};

export default CustomButton;
