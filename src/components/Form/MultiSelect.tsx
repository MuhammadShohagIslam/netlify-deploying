import Select,{OnChangeValue,ActionMeta} from "react-select";
import React,{useState, useEffect} from "react";
import { Control, Controller } from "react-hook-form";
import makeAnimated from "react-select/animated";
import { IFormInput } from "./CreateProduct/FormInput.types";
const animatedComponents = makeAnimated();

const customStyles = {
    option: (provided: any, state: any) => ({
        ...provided,
        borderBottom: "1px solid transparent",
        color: state.isSelected ? "#fff" : "text-gray-700",
    }),
    placeholder: (defaultStyles:any) => {
        return {
            ...defaultStyles,
            color: '#9ca3af',
        }
    }
};

interface IOptionData {
    value: string;
    label: string;
}

type MultiSelectType = {
    multiLabel: string;
    dataArray: any[];
    valueData: any;
    placeholder: string;
    multiName: "sizes" | "colors" | "subCategory";
    required?: string;
    errorFields?: any;
    control: Control<IFormInput, any>;
    errors?: any;
    setValueRef?: any;
    isUpdateImage?: boolean;
    multiSelectValues?: IOptionData,
    setMultiSelectValues?: React.Dispatch<React.SetStateAction<readonly IOptionData[]>>
};

const MultiSelect = ({
    dataArray,
    valueData,
    placeholder,
    multiLabel,
    multiName,
    required,
    errorFields,
    control,
    setValueRef,
    isUpdateImage = false,
    multiSelectValues,
    setMultiSelectValues
}: MultiSelectType) => {

    const onChangeHandler = (newValue: OnChangeValue<any, true>) => {
        if(setMultiSelectValues){
            setMultiSelectValues(newValue);
        }
      };

    return (
        <>
            <label
                htmlFor="subCategory"
                className="block mb-2 text-sm font-medium text-primary"
            >
                {multiLabel}
            </label>

            {!isUpdateImage && (
                <Controller
                    name={multiName}
                    control={control}
                    rules={{ required: `${required}` }}
                    render={({ field: { onChange, value, ref, ...rest } }) => (
                        <Select
                            {...rest}
                            className="react-select-container bg-white border border-green-300 text-sm rounded-md block  text-gray-700 font-semibold"
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            defaultValue=""
                            options={dataArray.map((sc) => {
                                const modifyObject = {

                                    label: sc.name,
                                    value: sc._id,
                                };
                                return modifyObject;
                            })}
                            ref={(ref) => {
                                setValueRef(ref);
                            }}
                            value={valueData?.find(
                                (c: IOptionData) => c.value === value
                            )}
                            onChange={onChange}
                            classNamePrefix="react-select"
                            placeholder={placeholder}
                            theme={(theme: any) => ({
                                ...theme,
                                borderRadius: 0,
                                colors: {
                                    ...theme.colors,
                                    primary25: "#d4d4d8",
                                    primary: "#d4d4d8",
                                },
                            })}
                            styles={customStyles}
                            isClearable
                        />
                    )}
                />
            )}
            {isUpdateImage && (
                <Controller
                    name={multiName}
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { onChange, value, ...rest } }) => (
                        <Select
                            {...rest}
                            className="react-select-container bg-white border border-green-300 text-sm rounded-md block  text-gray-700 font-semibold"
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            value={multiSelectValues}
                            options={dataArray}
                            onChange={onChangeHandler}
                            classNamePrefix="react-select"
                            placeholder={<div className="select-placeholder-text">{placeholder}</div>}
                            theme={(theme: any) => ({
                                ...theme,
                                borderRadius: 0,
                                colors: {
                                    ...theme.colors,
                                    primary25: "#d4d4d8",
                                    primary: "#d4d4d8",
                                },
                            })}
                            styles={customStyles}
                            isClearable
                        />
                    )}
                />
            )}
            {(!isUpdateImage && errorFields) && (
                <p className="text-red-600 sm:text-sm md:text-sm">{errorFields?.message}</p>
            )}
            {(isUpdateImage && errorFields) && (
                <p className="text-red-600 sm:text-sm md:text-sm">{errorFields}</p>
            )}
        </>
    );
};

export default MultiSelect;
