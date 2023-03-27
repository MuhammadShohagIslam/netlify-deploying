import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import FilterMobileMenuItem from "./FilterMobileMenuItem";

type FilterMenuType = {
    checkboxColor: () => 0 | JSX.Element[];
    checkboxShipping: () => 0 | JSX.Element[];
    checkboxBrands: () => 0 | JSX.Element[];
    checkboxSubCategories: () => false | JSX.Element[];
    starRatingFilter: () => JSX.Element;
    showCategories: () => 0 | JSX.Element[];
    showRange: () => JSX.Element;
    openFilterMobileMenu: boolean;
    setOpenFilterMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
};
const FilterMobileMenu = ({
    checkboxColor,
    checkboxShipping,
    checkboxBrands,
    checkboxSubCategories,
    starRatingFilter,
    showCategories,
    showRange,
    openFilterMobileMenu,
    setOpenFilterMobileMenu,
}: FilterMenuType) => {
    return (
        <Transition.Root show={openFilterMobileMenu} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-40 lg:hidden"
                onClose={setOpenFilterMobileMenu}
            >
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 z-40 flex">
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white p-4 pb-12 shadow-xl">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-medium text-gray-900">
                                    Filters
                                </h2>
                                <button
                                    type="button"
                                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:text-green-400"
                                    onClick={() =>
                                        setOpenFilterMobileMenu(false)
                                    }
                                >
                                    <span className="sr-only">Close menu</span>
                                    <svg
                                        className="h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <form className="mt-4 border-t border-gray-200">
                                <FilterMobileMenuItem
                                    filterMenuItemName={"Price Range"}
                                    filterMenuSubItems={showRange}
                                    isShowCloseOpenButton={true}
                                />
                                <FilterMobileMenuItem
                                    filterMenuItemName={"Categories"}
                                    filterMenuSubItems={showCategories}
                                />
                                <FilterMobileMenuItem
                                    filterMenuItemName={"Sub Categories"}
                                    filterMenuSubItems={checkboxSubCategories}
                                />
                                <FilterMobileMenuItem
                                    filterMenuItemName={"Rating"}
                                    filterMenuSubItems={starRatingFilter}
                                />

                                <FilterMobileMenuItem
                                    filterMenuItemName={"Color"}
                                    filterMenuSubItems={checkboxColor}
                                />
                                <FilterMobileMenuItem
                                    filterMenuItemName={"Brands"}
                                    filterMenuSubItems={checkboxBrands}
                                />
                                <FilterMobileMenuItem
                                    filterMenuItemName={"Shipping"}
                                    filterMenuSubItems={checkboxShipping}
                                />
                            </form>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default FilterMobileMenu;
