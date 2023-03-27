import React, { useState } from "react";

type FilterMobileMenuItemType = {
    filterMenuItemName: string;
    filterMenuSubItems: () => JSX.Element[] | JSX.Element | 0 | false;
    isShowCloseOpenButton?: boolean;
};
const FilterMobileMenuItem = ({
    filterMenuItemName,
    filterMenuSubItems,
    isShowCloseOpenButton = false,
}: FilterMobileMenuItemType) => {
    const [openFilterMenuItem, setOpenFilterMenuItem] =
        useState<boolean>(false);
    return (
        <div className="border-b border-gray-200 py-6">
            <h3 className="-my-3 flow-root">
                <button
                    type="button"
                    className="flex w-full transition-all items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-green-500"
                    onClick={() => setOpenFilterMenuItem(!openFilterMenuItem)}
                >
                    <span className="font-medium text-gray-900">
                        {filterMenuItemName}
                    </span>

                    <span className="ml-6 flex items-center">
                        {!openFilterMenuItem ? (
                            <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                                onClick={() =>
                                    setOpenFilterMenuItem(!openFilterMenuItem)
                                }
                            >
                                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                            </svg>
                        ) : (
                            <svg
                                onClick={() =>
                                    setOpenFilterMenuItem(!openFilterMenuItem)
                                }
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        )}
                    </span>
                </button>
            </h3>
            {openFilterMenuItem && filterMenuSubItems()}
        </div>
    );
};

export default FilterMobileMenuItem;
