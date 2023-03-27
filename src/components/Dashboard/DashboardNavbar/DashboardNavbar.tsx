import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { useRouter } from "next/router";
import { StoreActionType } from "@/lib/states/storeReducer/storeReducer.type";
import Link from "next/link";
import Image from "next/image";
import Notifications from "./Notifications/Notifications";

type DashboardNavbarPropsType = {
    openSideBar: boolean;
    setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
};
const DashboardNavbar = ({
    openSideBar,
    setOpenSideBar,
}: DashboardNavbarPropsType) => {
    const [showNotification, setShowNotification] = useState(false);
    const { state, logOut, dispatch, firebaseUser } = useStoreContext();
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
        <nav className="navbar bg-white fixed top-0 z-50 w-full border-b border-gray-200">
            <div className="container flex justify-between sm:justify-none">
                <div className="w-1/4 sm:w-2/3 flex">
                    <button
                        onClick={() => setOpenSideBar(!openSideBar)}
                        type="button"
                        className="items-center text-sm text-green-500 rounded-lg hidden md:inline-flex  sm:inline-flex  hover:bg-transparent focus:outline-none focus:ring-0 focus:ring-gray-200 mr-2 "
                    >
                        <span className="sr-only">Open sidebar</span>
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                clipRule="evenodd"
                                fillRule="evenodd"
                                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                            ></path>
                        </svg>
                    </button>
                    <Link
                        href="/dashboard/admin"
                        className="text-green-400 font-bold text-3xl sm:text-xl"
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
                            className="block w-full h-10 pl-10 pr-4 text-sm text-green-400 border border-green-400 rounded-lg bg-white focus:outline-offset-4 focus:outline-1 focus:outline-green-400 focus:ring-green-300"
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
                                className="h-7 w-7 text-gray-600"
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
                                {(firebaseUser !== null &&  firebaseUser?.photoURL )? (
                                    <Image
                                        src={firebaseUser.photoURL}
                                        alt={"admin profile logo"}
                                        width={100}
                                        height={100}
                                    />
                                ):(
                                    <FaUserGraduate className="w-10 h-10 text-gray-900 p-1 rounded-full ring-2 ring-green-400" />
                                )}
                            </div>
                        </label>
                        <ul
                            tabIndex={0}
                            className="mt-2 pb-2 shadow menu menu-compact dropdown-content bg-white drop-shadow-2xl rounded divide-y divide-gray-100 w-72"
                        >
                            <div className="py-3 w-72 px-4   ">
                                <div className="break-all text-md text-black font-semibold">
                                    {user?.fullName}
                                </div>
                                <div className="font-medium text-sm break-all text-gray-500">
                                    {user && user?.email}
                                </div>
                            </div>
                            <ul className="text-sm text-gray-700">
                                <li>
                                    <Link
                                        href="/dashboard/admin"
                                        className="flex  py-2 px-4 hover:bg-gray-100 text-gray-600  transition duration-75"
                                    >
                                        <AiFillDashboard className="text-green-300" />
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/dashboard/admin/setting/profile"
                                        className="flex  py-2 px-4 hover:bg-gray-100 text-gray-600 transition duration-75"
                                    >
                                        <FaUser className="text-green-300" />
                                        Profile
                                    </Link>
                                </li>
                            </ul>
                            <div>
                                <label
                                    onClick={handleLogOut}
                                    className="flex items-center justify-center py-2 px-4 hover:bg-gray-100 cursor-pointer text-gray-600 transition duration-75"
                                >
                                    <MdLogout className="mr-1 text-green-300" />
                                    Sign out
                                </label>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default DashboardNavbar;
