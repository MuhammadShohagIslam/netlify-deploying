import React from "react";

type FormGroupType = {
    labelName: string;
    inputName: string;
    register: any;
    errorField?: any;
    required?: any;
    isDefaultValue?: boolean;
    defaultValue?: string;
    dataArray: any[];
};
const SelectInput = ({
    labelName,
    inputName,
    register,
    errorField,
    required,
    isDefaultValue,
    defaultValue,
    dataArray,
}: FormGroupType) => {
    return (
        <>
       
            <label
                htmlFor="color"
                className="block mb-2 text-sm font-medium text-primary"
            >
                {labelName}
            </label>
            {isDefaultValue ? (
            <select
            defaultValue={defaultValue}
            className="select select-success w-full max-w-xs text-primary text-base"
            {...register(inputName, required)}
        >
            {dataArray.map((data: any) => (
                <option
                    className="text-sm"
                    key={data._id ? data._id : data}
                    value={data._id ? data._id : data}
                >
                    {data.name ? data.name : data}
                </option>
            ))}
        </select>
       
            ): (
                <select
            className="select select-success w-full max-w-xs text-primary text-base"
            {...register(inputName, required)}
            
        >
            <option value="">Select {labelName}</option>
            {dataArray.map((data: any) => (
                <option
                    className="text-sm"
                    key={data._id ? data._id : data}
                    value={data._id ? data._id : data}
                >
                    {data.name ? data.name : data}
                </option>
            ))}
        </select> 
            )}
            {errorField && (
                <p className="text-red-600">{errorField?.message}</p>
            )}  
        </>
    );
};

export default SelectInput;
