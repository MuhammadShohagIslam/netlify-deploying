import React from "react";
import CountUp from "react-countup";
import { DashWidgetTypes } from "./DashWidget.types";

const DashWidget = (props: DashWidgetTypes) => {
    const { icon, title, account } = props;
    return (
        <div className="bg-white shadow-lg transition-all border-2 hover:border-green-400 shadow-gray-200 rounded-2xl p-4 cursor-pointer">
            <div className="flex items-center md:justify-evenly sm:justify-evenly">
                <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-green-500 to-voilet-500 rounded-lg">
                    {icon}
                </div>
                <div className="flex-shrink-0 ml-3">
                    <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">
                        <>
                            +<CountUp start={0} end={account!} />
                        </>
                    </span>
                    <h3 className="text-base font-normal text-gray-500">
                        {title}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default DashWidget;
