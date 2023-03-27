import React, { useState } from "react";
import { FaShoppingBag, FaUsers } from "react-icons/fa";
import { AiFillSetting, AiFillDashboard } from "react-icons/ai";
import { RiCoupon4Line } from "react-icons/ri";
import { BsCartCheck } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { MdOutlineProductionQuantityLimits, MdLogout } from "react-icons/md";
import SideBarListItem from "./SideBarListItem/SideBarListItem";
import SideBarDropdownListItem from "./SideBarDropdownListItem/SideBarDropdownListItem";
import { useRouter } from "next/router";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { StoreActionType } from "@/lib/states/storeReducer/storeReducer.type";

const SidebarList = () => {
    const [openProduct, setOpenProduct] = useState<boolean>(false);
    const [openCategories, setOpenCategories] = useState<boolean>(false);
    const [openBrands, setOpenBrands] = useState<boolean>(false);
    const [openColors, setOpenColors] = useState<boolean>(false);
    const [openSizes, setOpenSizes] = useState<boolean>(false);
    const [openSubCategories, setOpenSubCategories] = useState<boolean>(false);
    const [openAllUsers, setOpenAllUsers] = useState<boolean>(false);
    const [openSetting, setOpenSetting] = useState<boolean>(false);

    const { dispatch, logOut } = useStoreContext();

    const router = useRouter();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                router.push("/");
                dispatch({
                    type: StoreActionType.LOGOUT_USER,
                    payload: null,
                });
            })
            .catch((error: any) => {
                console.log(error.message);
            });
    };

    return (
        <ul className="space-y-2 px-3">
            <SideBarListItem navigationLink="/dashboard/admin">
                <AiFillDashboard className="h-[19px] w-[19px] text-green-400" />
                <span className="ml-3">Dashboard</span>
            </SideBarListItem>
            <SideBarListItem navigationLink="/dashboard/admin/orders">
                <BsCartCheck className="h-[19px] w-[19px] text-green-400" />
                <span className="flex-1 ml-3 whitespace-nowrap">Orders</span>
            </SideBarListItem>
            <SideBarListItem navigationLink="/dashboard/admin/customers">
                <FaShoppingBag className="h-[19px] w-[19px] text-green-400" />
                <span className="flex-1 ml-3 whitespace-nowrap">Customers</span>
            </SideBarListItem>
            <SideBarListItem navigationLink="/dashboard/admin/coupons">
                <RiCoupon4Line className="h-[19px] w-[19px] text-green-400" />
                <span className="flex-1 ml-3 whitespace-nowrap">Coupons</span>
            </SideBarListItem>
            <SideBarListItem
                open={openProduct}
                setOpen={setOpenProduct}
                icon={
                    <MdOutlineProductionQuantityLimits className="h-[19px] w-[19px] text-green-400" />
                }
                dropdownMainMenuName="Products"
                isDropdownList
            >
                <SideBarDropdownListItem
                    dropdownNavigationLink="/dashboard/admin/products"
                    name="My Products"
                />
                <SideBarDropdownListItem
                    dropdownNavigationLink="/dashboard/admin/products/addProduct"
                    name="Add Product"
                />
            </SideBarListItem>

            <SideBarListItem
                open={openCategories}
                setOpen={setOpenCategories}
                icon={
                    <BiCategory className="h-[19px] w-[19px] text-green-400" />
                }
                dropdownMainMenuName="Categories"
                isDropdownList
            >
                <SideBarDropdownListItem
                    dropdownNavigationLink="/dashboard/admin/categories"
                    name="All Categories"
                />
                <SideBarDropdownListItem
                    dropdownNavigationLink="/dashboard/admin/categories/addCategory"
                    name="Add Category"
                />
            </SideBarListItem>
            <SideBarListItem
                open={openBrands}
                setOpen={setOpenBrands}
                icon={
                    <BiCategory className="h-[19px] w-[19px] text-green-400" />
                }
                dropdownMainMenuName="Brands"
                isDropdownList
            >
                <SideBarDropdownListItem
                    dropdownNavigationLink="/dashboard/admin/brands"
                    name="All Brands"
                />
                <SideBarDropdownListItem
                    dropdownNavigationLink="/dashboard/admin/brands/addBrand"
                    name="Add Brand"
                />
            </SideBarListItem>
            <SideBarListItem
                open={openColors}
                setOpen={setOpenColors}
                icon={
                    <BiCategory className="h-[19px] w-[19px] text-green-400" />
                }
                dropdownMainMenuName="Colors"
                isDropdownList
            >
                <SideBarDropdownListItem
                    dropdownNavigationLink="/dashboard/admin/colors"
                    name="All Colors"
                />
                <SideBarDropdownListItem
                    dropdownNavigationLink="/dashboard/admin/colors/addColor"
                    name="Add Color"
                />
            </SideBarListItem>
            <SideBarListItem
                open={openSizes}
                setOpen={setOpenSizes}
                icon={
                    <BiCategory className="h-[19px] w-[19px] text-green-400" />
                }
                dropdownMainMenuName="Sizes"
                isDropdownList
            >
                <SideBarDropdownListItem
                    dropdownNavigationLink="/dashboard/admin/sizes"
                    name="All Sizes"
                />
                <SideBarDropdownListItem
                    dropdownNavigationLink="/dashboard/admin/sizes/addSize"
                    name="Add Size"
                />
            </SideBarListItem>
            <SideBarListItem
                open={openSubCategories}
                setOpen={setOpenSubCategories}
                icon={
                    <BiCategory className="h-[19px] w-[19px] text-green-400" />
                }
                dropdownMainMenuName="SubCategories"
                isDropdownList
            >
                <SideBarDropdownListItem
                    dropdownNavigationLink="/dashboard/admin/subCategories"
                    name="All SubCategory"
                />
                <SideBarDropdownListItem
                    dropdownNavigationLink="/dashboard/admin/subCategories/addSubCategory"
                    name="Add SubCategory"
                />
            </SideBarListItem>
            <SideBarListItem
                open={openSetting}
                setOpen={setOpenSetting}
                icon={
                    <AiFillSetting className="h-[19px] w-[19px] text-green-400" />
                }
                dropdownMainMenuName="Profile Settings"
                isDropdownList
            >
                <SideBarDropdownListItem
                    dropdownNavigationLink="/dashboard/admin/setting/profile"
                    name="Profile"
                />
                <SideBarDropdownListItem
                    dropdownNavigationLink="/dashboard/admin/setting/address"
                    name="Address"
                />
            </SideBarListItem>
            <SideBarListItem
                open={openAllUsers}
                setOpen={setOpenAllUsers}
                icon={<FaUsers className="h-[19px] w-[19px] text-green-400" />}
                dropdownMainMenuName="All Users"
                isDropdownList
            >
                <SideBarDropdownListItem
                    dropdownNavigationLink="/dashboard/admin/allSellers"
                    name="All Sellers"
                />
                <SideBarDropdownListItem
                    dropdownNavigationLink="/dashboard/admin/allBuyers"
                    name="All Buyers"
                />
            </SideBarListItem>
            <SideBarListItem isLabel>
                <MdLogout className="h-[19px] w-[19px] text-green-400" />

                <span
                    onClick={handleLogOut}
                    className="flex-1 ml-3 cursor-pointer whitespace-nowrap"
                >
                    LogOut
                </span>
            </SideBarListItem>
        </ul>
    );
};

export default SidebarList;
