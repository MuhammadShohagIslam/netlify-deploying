import UserSideBar from "@/components/Dashboard/User/UserSideBar/UserSideBar";
import Footer from "@/components/Footer/Footer";
import NavbarMiddle from "@/components/Navbar/NavbarMiddle/NavbarMiddle";
import NavbarTop from "@/components/Navbar/NavbarTop/NavbarTop";
import React from "react";
import { useState } from "react";

const UserDashboard = ({ children }: React.PropsWithChildren<{}>) => {
    const [openProfileSidebar, setProfileSidebar] = useState<boolean>(false);
    return (
        <>
            <header>
                <NavbarTop />
                <NavbarMiddle
                    openProfileSidebar={openProfileSidebar}
                    setProfileSidebar={setProfileSidebar}
                    isProfile
                />
            </header>
            <main>
                <section className="container mt-8 sm:mt-4 md:mt-4">
                    <div className="grid grid-cols-12 sm:grid-cols-1 md:grid-cols-1">
                        <div
                            className={`col-span-3 md:col-auto sm:col-auto transition-all sm:absolute sm:left-0 sm:top-[35%] md:absolute md:left-0 duration-500 md:top-[35%] ${
                                openProfileSidebar
                                    ? "z-50 translate-x-0"
                                    : "sm:-translate-x-full md:-translate-x-full"
                            }`}
                        >
                            <UserSideBar />
                        </div>
                        <div className="col-span-8">{children}</div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default UserDashboard;
