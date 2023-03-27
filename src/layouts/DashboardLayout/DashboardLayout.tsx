import React, { useState } from "react";
import DashboardNavbar from "@/components/Dashboard/DashboardNavbar/DashboardNavbar";
import SidebarList from "@/components/Dashboard/DashboardSidebar/DashboardSidebarList/SidebarList";
import DashboardFooter from "@/components/Footer/DashboardFooter";

const DashboardLayout = ({ children }: React.PropsWithChildren<{}>) => {
    const [openSideBar, setOpenSideBar] = useState<boolean>(false);

    return (
        <>
            <DashboardNavbar
                openSideBar={openSideBar}
                setOpenSideBar={setOpenSideBar}
            />
            <aside
                className={`w-72 fixed top-0 left-0 z-40  h-screen pt-[65px] duration-500 transition-all bg-white border-r border-gray-200 ${
                    openSideBar
                        ? "translate-x-0"
                        : "sm:-translate-x-full md:-translate-x-full"
                }`}
            >
                <div className="h-full px-3 pt-4 pb-4 overflow-y-auto bg-white">
                    <SidebarList />
                </div>
            </aside>

            <section
                className={`pr-4 pl-12 md:pl-4 sm:pl-4 pt-20 ml-64 md:ml-0 sm:ml-0 md:pt-20 sm:pt-20`}
            >
                {children}
                <DashboardFooter />
            </section>
           
        </>
    );
};

export default DashboardLayout;
