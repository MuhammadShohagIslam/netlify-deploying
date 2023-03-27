import React from "react";

type SortingMenuItemType = {
    sortingMenuItemName: string;
    sort: string;
    order: number | string;
    handleSortingProducts: (sort: string, order: number | string) => void;
};
const SortingMenuItem = ({
    sortingMenuItemName,
    sort,
    order,
    handleSortingProducts,
}: SortingMenuItemType) => {
    return (
        <li
            className="transition-all cursor-pointer  hover:text-green-500 text-gray-900 block px-4 py-2 text-sm"
            onClick={() => handleSortingProducts(sort, order)}
        >
            {sortingMenuItemName}
        </li>
    );
};

export default SortingMenuItem;
