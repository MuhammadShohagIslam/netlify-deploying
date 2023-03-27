import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

type SideBarDropdownListItemPropType = {
    dropdownNavigationLink: string;
    name: string;
};
const SideBarDropdownListItem = ({
    dropdownNavigationLink,
    name,
}: SideBarDropdownListItemPropType) => {
    const router = useRouter();
    return (
        <li className={router.pathname == dropdownNavigationLink ? "bg-gray-100 rounded-lg" : ""}>
            <Link
                href={dropdownNavigationLink}
                className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 "
            >
                {name}
            </Link>
        </li>
    );
};

export default SideBarDropdownListItem;
