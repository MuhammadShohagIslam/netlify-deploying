import React from "react";
import NavbarBottom from "./NavbarBottom/NavbarBottom";
import NavbarMiddle from "./NavbarMiddle/NavbarMiddle";
import NavbarTop from "./NavbarTop/NavbarTop";

const Navbar: React.FC = (): JSX.Element => {
    return (
        <header className="bg-header">
            <NavbarTop />
            <NavbarMiddle />
            <NavbarBottom />
        </header>
    );
};

export default Navbar;
