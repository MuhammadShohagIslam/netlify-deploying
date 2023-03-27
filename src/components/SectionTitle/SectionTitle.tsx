import React from "react";

const SectionTitle = ({ title }: { title: string }) => {
    return (
        <div>
            <p className="text-2xl  relative text-primary font-bold before:content:[''] before:h-[1px] before:top-1/2 before:left-0 before:right-0 before:absolute before:bg-success sm:before:hidden">
                <span className="relative bg-white text-success pr-4 sm:block sm:pr-0 sm:text-xl sm:text-center sm:pb-5">
                    {title}
                </span>
            </p>
        </div>
    );
};

export default SectionTitle;
