import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { useRouter } from "next/router";
import { StoreActionType } from "@/lib/states/storeReducer/storeReducer.type";
import Link from "next/link";
import Image from "next/image";
import Notifications from "./Notifications/Notifications";

const UserDashboardNavbar = () => {
    const [showNotification, setShowNotification] = useState(false);
    const { state, logOut, dispatch } = useStoreContext();
    const { user } = state;
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
        <div className="navbar bg-gray-800">
            <div className="container flex justify-between sm:justify-none">
                <div className="w-1/4 sm:w-2/3">
                    <Link
                        href="/dashboard"
                        className="text-white font-bold text-3xl sm:text-xl"
                    >
                        Aladin
                    </Link>
                </div>

                <form className="w-1/2 sm:hidden">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5 text-primary"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                ></path>
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            className="block w-full h-10 pl-10 pr-4 text-sm text-primary border border-white rounded-lg bg-white focus:ring-primary focus:border-primary"
                            placeholder="Search Anything"
                            required
                        />
                    </div>
                </form>

                <div className="flex items-center justify-end w-1/4">
                    <div
                        className="relative"
                        onMouseOver={() => setShowNotification(true)}
                        onMouseLeave={() => setShowNotification(false)}
                    >
                        <button className="btn btn-ghost btn-circle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-7 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>
                            <span className="h-3 w-3 absolute top-1">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                            </span>
                        </button>
                        <Notifications showNotification={showNotification} />
                    </div>

                    <div className="dropdown dropdown-end">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full">
                                {user !== null && (
                                    <Image
                                        src={"/doc"}
                                        alt={user?.fullName}
                                        width={100}
                                        height={100}
                                    />
                                )}
                            </div>
                        </label>
                        <ul
                            tabIndex={0}
                            className="mt-3 pb-2 shadow menu menu-compact dropdown-content bg-gray-800 rounded divide-y divide-gray-100"
                        >
                            <div className="py-3 px-4 w-60 text-sm text-gray-900 dark:text-white">
                                <div>{user?.fullName}</div>
                                <div className="font-medium truncate">
                                    {user && user?.email}
                                </div>
                            </div>
                            <ul className="text-sm text-gray-700 dark:text-gray-200">
                                <li>
                                    <Link
                                        href="/dashboard/profile"
                                        className="flex  py-2 px-4 hover:bg-gray-600 text-white"
                                    >
                                        <FaUser />
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/dashboard/accountSetting"
                                        className="flex py-2 px-4 hover:bg-gray-600 text-white"
                                    >
                                        <AiFillSetting />
                                        Setting
                                    </Link>
                                </li>
                            </ul>
                            <div>
                                <label
                                    onClick={handleLogOut}
                                    className="flex items-center justify-center py-2 px-4 hover:bg-gray-600 cursor-pointer text-white"
                                >
                                    <MdLogout className="mr-1" />
                                    Sign out
                                </label>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboardNavbar;
