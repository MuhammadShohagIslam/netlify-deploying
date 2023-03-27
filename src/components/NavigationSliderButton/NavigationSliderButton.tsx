import React from "react";

const NavigationSliderButton = ({ swiperRef, isMobile }:any) => {

    return (
        <div
            className={`flex justify-end pb-2  ${
                isMobile
                    ? "hidden md:hidden sm:block sm:text-end"
                    : "sm:hidden"
            }`}
        >
            <button
                className="h-8 w-14 bg-success text-white rounded-sm border-2 border-success hover:bg-transparent hover:text-primary transition ease-out duration-300 mr-2"
                onClick={() => swiperRef.current?.slidePrev()}
            >
                Prev
            </button>
            <button
                className="h-8 w-14 bg-success text-white rounded-sm border-2 border-success hover:bg-transparent hover:text-primary transition ease-out duration-300"
                onClick={() => swiperRef.current?.slideNext()}
            >
                Next
            </button>
        </div>
    );
};

export default NavigationSliderButton;
