import React from "react";

type FormGroupType = {
    labelName: string;
    inputName: string;
    register: any;
    errorField?: any;
    inputType?: string;
    placeholder?: string;
    required?: string;
    isReadOnly?: boolean;
    isDefaultValue?: boolean;
    defaultValue?: string | number;
    isRequirePattern?: boolean;
    requirePattern?: any;
    isTextArea?: boolean;
};

const FormGroup = ({
    labelName,
    inputName,
    register,
    errorField,
    inputType,
    placeholder,
    required,
    isReadOnly = false,
    isDefaultValue = false,
    defaultValue,
    isRequirePattern = false,
    requirePattern,
    isTextArea = false,
}: FormGroupType) => {
    return (
        <div className="mb-3">
            <label
                htmlFor={inputName}
                className="block mb-2 text-sm font-medium text-primary"
            >
                {labelName}
            </label>
            {isReadOnly ? (
                isDefaultValue ? (
                    <input
                        {...register(
                            inputName,
                            !isRequirePattern
                                ? {
                                      required: `${required}`,
                                  }
                                : requirePattern
                        )}
                        type={inputType}
                        readOnly
                        defaultValue={defaultValue}
                        placeholder={placeholder}
                        className="input input-bordered input-success w-full text-gray-700"
                    />
                ) : (
                    <input
                        {...register(
                            inputName,
                            !isRequirePattern
                                ? {
                                      required: `${required}`,
                                  }
                                : requirePattern
                        )}
                        type={inputType}
                        readOnly
                        placeholder={placeholder}
                        className="input input-bordered input-success w-full text-gray-700"
                    />
                )
            ) : isDefaultValue ? (
                <input
                    {...register(
                        inputName,
                        !isRequirePattern
                            ? {
                                  required: `${required}`,
                              }
                            : requirePattern
                    )}
                    defaultValue={defaultValue}
                    type={inputType}
                    placeholder={placeholder}
                    className="input input-bordered input-success w-full text-gray-700"
                />
            ) : (
                <input
                    {...register(
                        inputName,
                        !isRequirePattern
                            ? {
                                  required: `${required}`,
                              }
                            : requirePattern
                    )}
                    type={inputType}
                    placeholder={placeholder}
                    className="input input-bordered input-success w-full text-gray-700"
                />
            )}
            {isTextArea && (
                <textarea
                    {...register(inputName, {
                        required: `${required}`,
                    })}
                    className="textarea textarea-success w-full text-primary"
                    placeholder={placeholder}
                ></textarea>
            )}
            {errorField && (
                <p className="text-red-600 sm:text-sm md:text-sm">{errorField?.message}</p>
            )}
        </div>
    );
};

export default FormGroup;
