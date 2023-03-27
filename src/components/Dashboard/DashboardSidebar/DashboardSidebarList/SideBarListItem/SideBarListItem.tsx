import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

type SideBarListItemPropType = {
    children: React.ReactNode;
    navigationLink?: string;
    icon?: JSX.Element;
    tooltipName?: string;
    dropdownMainMenuName?: string;
    isLabel?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
    open?: boolean;
    isDropdownList?: boolean;
};

const SideBarListItem = ({
    children,
    navigationLink,
    icon,
    dropdownMainMenuName,
    isLabel = false,
    setOpen,
    open,
    isDropdownList = false,
}: SideBarListItemPropType) => {
    const router = useRouter();
    return (
        <>
            {isDropdownList ? (
                <li>
                    <button
                        onClick={() => setOpen!(!open)}
                        type="button"
                        className={`flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 `}
                    >
                        {icon}

                        <span className="flex-1 ml-3 text-left whitespace-nowrap">
                            {dropdownMainMenuName}
                        </span>
                        <svg
                            className={`w-6 h-6 ${
                                open ? "rotate-180" : "rotate-0"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>

                    <ul
                        className={`${
                            open ? "block border-l-2 border-success" : "hidden"
                        } py-2 space-y-2`}
                    >
                        {children}
                    </ul>
                </li>
            ) : (
                <li className={router.pathname == navigationLink ? "bg-gray-100 rounded-lg" : ""}>
                    {!isLabel ? (
                        <Link
                            href={navigationLink!}
                            className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 `}
                        >
                            {children}
                        </Link>
                    ) : (
                        <label
                            className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg`}
                        >
                            {children}
                        </label>
                    )}
                </li>
            )}
        </>
    );
};

export default SideBarListItem;
