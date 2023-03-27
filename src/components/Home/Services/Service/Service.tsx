import React from "react";

interface ServiceProps {
    children: React.ReactNode;
    name: string;
    info: string;
}

const Service = ({ children, name, info }: ServiceProps) => {
    return (
        <div  className="flex justify-center mb-8 sm:justify-start sm:ml-6">
            <div className="flex items-center border-r-2 pr-3">
                {children}
            </div>
            <div className="pl-3">
                <h4 className="text-primary">{name}</h4>
                <p className="text-">{info}</p>
            </div>
        </div>
    );
};

export default Service;
