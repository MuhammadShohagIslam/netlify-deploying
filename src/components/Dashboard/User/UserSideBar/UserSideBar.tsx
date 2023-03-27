import Image from "next/image";
import React from "react";
import { FaUserGraduate } from "react-icons/fa";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import SideBarItem from "../UserDashboardSideBar/SideBarItem";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";

const UserSideBar = () => {
    const { firebaseUser } = useStoreContext();
    return (
        <aside className="z-40 w-64 h-screen transition-transform">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
                <div className="flex items-center justify-center mb-4">
                    {firebaseUser?.photoURL ? (
                        <Image
                            src={firebaseUser.photoURL}
                            className="rounded-full h-auto"
                            alt="profile Logo"
                            width={100}
                            height={130}
                        />
                    ) : (
                        <FaUserGraduate className="w-28 h-28 text-gray-900 p-1 rounded-full ring-2 ring-green-300" />
                    )}
                </div>
                <ul>
                    <SideBarItem link="/dashboard/user/profile" name="Profile">
                        <AiOutlineUser className="flex-shrink-0 w-6 h-6 text-green-300 transition duration-75" />
                    </SideBarItem>
                    <SideBarItem link="/dashboard/user/address" name="Address">
                        <HiOutlineLocationMarker className="flex-shrink-0 w-6 h-6 text-green-300 transition duration-75" />
                    </SideBarItem>
                    <SideBarItem
                        link="/dashboard/user/user-wishlist"
                        name="Wish List"
                    >
                        <AiOutlineHeart className="flex-shrink-0 w-6 h-6 text-green-300 transition duration-75" />
                    </SideBarItem>
                    <SideBarItem
                        link="/dashboard/user/history"
                        name="Order History"
                    >
                        <MdOutlineProductionQuantityLimits className="flex-shrink-0 w-6 h-6 text-green-300 transition duration-75" />
                    </SideBarItem>
                </ul>
            </div>
        </aside>
    );
};

export default UserSideBar;
