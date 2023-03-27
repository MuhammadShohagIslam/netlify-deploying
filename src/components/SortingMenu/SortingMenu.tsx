import React from "react";
import SortingMenuItem from "./SortingMenuItem";

type SortingMenuType = {
    openSortingMenu: boolean;
    setOpenSortingMenu: React.Dispatch<React.SetStateAction<boolean>>;
    setGridColumn: React.Dispatch<React.SetStateAction<boolean>>;
    gridColumn: boolean;
    handleSortingProducts: (sort: string, order: number | string) => void;
    openFilterMobileMenu: boolean;
    setOpenFilterMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
};
const SortingMenu = ({
    openSortingMenu,
    setGridColumn,
    gridColumn,
    setOpenSortingMenu,
    handleSortingProducts,
    openFilterMobileMenu,
    setOpenFilterMobileMenu,
}: SortingMenuType) => {
    return (
        <div className="flex items-center">
            <div className="relative inline-block text-left">
                <div>
                    <button
                        type="button"
                        className="group inline-flex justify-center text-sm transition-all font-medium text-gray-700 hover:text-green-500"
                        onClick={() => setOpenSortingMenu(!openSortingMenu)}
                    >
                        Sort
                        <svg
                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 transition-all text-gray-400 group-hover:text-green-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>

                {openSortingMenu && (
                    <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1" role="none">
                            <SortingMenuItem
                                sortingMenuItemName={"Most Popular"}
                                handleSortingProducts={handleSortingProducts}
                                sort={"sold"}
                                order={"desc"}
                            />
                            <SortingMenuItem
                                sortingMenuItemName={"Newest"}
                                handleSortingProducts={handleSortingProducts}
                                sort={"createdAt"}
                                order={"desc"}
                            />
                            <SortingMenuItem
                                sortingMenuItemName={"Price: Low to High"}
                                handleSortingProducts={handleSortingProducts}
                                sort={"price"}
                                order={1}
                            />
                            <SortingMenuItem
                                sortingMenuItemName={"Price: High to Low"}
                                handleSortingProducts={handleSortingProducts}
                                sort={"price"}
                                order={-1}
                            />
                        </div>
                    </div>
                )}
            </div>

            <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 transition-all hover:text-green-500 sm:ml-7"
                onClick={() => setGridColumn(!gridColumn)}
            >
                <span className="sr-only">View grid</span>

                <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 hidden md:block sm:block"
                onClick={() => setOpenFilterMobileMenu(!openFilterMobileMenu)}
            >
                <span className="sr-only">Filters</span>

                <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    );
};

export default SortingMenu;
