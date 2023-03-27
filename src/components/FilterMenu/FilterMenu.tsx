import React from "react";
import FilterMenuItem from "./FilterMenuItem";
type FilterMenuType = {
    checkboxColor: () => 0 | JSX.Element[];
    checkboxShipping: () => 0 | JSX.Element[];
    checkboxBrands: () => 0 | JSX.Element[];
    checkboxSubCategories: () => false | JSX.Element[];
    starRatingFilter: () => JSX.Element;
    showCategories: () => 0 | JSX.Element[];
    showRange: () => JSX.Element;
    openFilterMobileMenu:boolean;
};
const FilterMenu = ({
    checkboxColor,
    checkboxShipping,
    checkboxBrands,
    checkboxSubCategories,
    starRatingFilter,
    showCategories,
    showRange,
    openFilterMobileMenu
}: FilterMenuType) => {
    return (
        <form className="sm:hidden md:hidden block">
            <FilterMenuItem
                filterMenuItemName={"Price Range"}
                filterMenuSubItems={showRange}
                isShowCloseOpenButton={true}
            />
            <FilterMenuItem
                filterMenuItemName={"Categories"}
                filterMenuSubItems={showCategories}
            />
            <FilterMenuItem
                filterMenuItemName={"Sub Categories"}
                filterMenuSubItems={checkboxSubCategories}
            />
            <FilterMenuItem
                filterMenuItemName={"Rating"}
                filterMenuSubItems={starRatingFilter}
            />

            <FilterMenuItem
                filterMenuItemName={"Color"}
                filterMenuSubItems={checkboxColor}
            />
            <FilterMenuItem
                filterMenuItemName={"Brands"}
                filterMenuSubItems={checkboxBrands}
            />
            <FilterMenuItem
                filterMenuItemName={"Shipping"}
                filterMenuSubItems={checkboxShipping}
            />
        </form>
    );
};

export default FilterMenu;
