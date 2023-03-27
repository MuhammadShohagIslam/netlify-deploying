import React from "react";
import Link from "next/link";
import { FaUserGraduate } from "react-icons/fa";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { useRouter } from "next/router";
import Image from "next/image";

type NavbarMiddlePropType = {
    openProfileSidebar?: boolean;
    setProfileSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
    isProfile?: boolean;
};
const NavbarMiddle = ({
    openProfileSidebar,
    setProfileSidebar,
    isProfile = false,
}: NavbarMiddlePropType) => {
    const { state, firebaseUser, logOut } = useStoreContext();
    const { user } = state;
    const router = useRouter();
    const handleLogOut = () => {
        logOut()
            .then(() => {
                // Clear email from storage.
                window.localStorage.removeItem("accountInfo");
            })
            .catch((error) => console.log(error));
    };
    const menuListItem = () => {
        return (
            <>
                <li>
                    <Link
                        className="text-primary hover:bg-transparent hover:text-success text-lg"
                        href="/"
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        className="text-primary hover:bg-transparent hover:text-success text-lg"
                        href={{
                            pathname: "/",
                            hash: "blog",
                        }}
                    >
                        Blogs
                    </Link>
                </li>
                <li>
                    <Link
                        className="text-primary hover:bg-transparent hover:text-success text-lg"
                        href="/shop"
                    >
                        Shop
                    </Link>
                </li>
            </>
        );
    };
    return (
        <div className="navbar container">
            <div className="navbar-start md:w-full md:justify-between sm:w-full sm:justify-between">
                <Link
                    href="/"
                    className="text-success italic font-bold text-4xl  cursor-pointer"
                >
                    Aladin
                </Link>
                <div className="dropdown flex">
                    <label
                        tabIndex={0}
                        className="btn btn-ghost text-primary hidden sm:flex md:flex"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                    {isProfile && (
                        <label
                            onClick={() =>
                                setProfileSidebar &&
                                setProfileSidebar(!openProfileSidebar)
                            }
                            className="btn btn-ghost btn-circle avatar hidden sm:flex md:flex"
                        >
                            <div className="w-10 rounded-full">
                                {firebaseUser !== null &&
                                firebaseUser?.photoURL ? (
                                    <Image
                                        src={firebaseUser?.photoURL}
                                        alt={"user profile logo"}
                                        width={100}
                                        height={100}
                                        priority
                                    />
                                ) : (
                                    <FaUserGraduate className="w-10 h-10 text-gray-900 p-1 rounded-full ring-2 ring-green-300" />
                                )}
                            </div>
                        </label>
                    )}
                    <ul
                        tabIndex={0}
                        className="menu menu-compact dropdown-content mt-12 p-2 shadow bg-base-100 rounded-box w-[692px] sm:w-[17.5rem] right-0 "
                    >
                        {menuListItem()}
                    </ul>
                </div>
            </div>
            <div className="navbar-center sm:hidden md:hidden flex">
                <ul className="menu menu-horizontal p-0">{menuListItem()}</ul>
            </div>
            <div className="navbar-end md:hidden sm:hidden">
                <ul className="menu flex flex-row">
                    {user !== null && user.email ? (
                        <li
                            onClick={handleLogOut}
                            className="text-primary hover:bg-transparent hover:text-success text-lg cursor-pointer"
                        >
                            LogOut
                        </li>
                    ) : (
                        <>
                            <li>
                                <label
                                    className="text-primary hover:bg-transparent hover:text-success text-lg"
                                    onClick={() => router.push("/auth/login")}
                                >
                                    Login
                                </label>{" "}
                            </li>
                            <li className="text-primary hover:bg-transparent flex items-center justify-center">
                                or
                            </li>
                            <li>
                                <label
                                    className="text-primary hover:bg-transparent hover:text-success text-lg"
                                    onClick={() =>
                                        router.push("/auth/register")
                                    }
                                >
                                    Register
                                </label>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default NavbarMiddle;
