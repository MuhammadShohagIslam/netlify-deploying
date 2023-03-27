import React from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";

const DashboardFooter = () => {
    return (
        <>
            <footer className="p-4 mt-5 bg-white rounded-t-lg shadow-xl flex items-center justify-between md:p-6 md:flex-col sm:flex-col sm:space-y-3">
                <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500  sm:mt-0 space-x-2">
                    <Link href="">
                        <FaFacebookF className="text-md hover:text-green-400 transition ease-in-out delay-15" />
                    </Link>
                    <Link href="">
                        <BsTwitter className="text-md hover:text-green-400 transition ease-in-out delay-15" />
                    </Link>
                    <Link href="">
                        <FaInstagram className="text-md hover:text-green-400 transition ease-in-out delay-15" />
                    </Link>
                    <Link href="">
                        <FaLinkedinIn className="text-md hover:text-green-400 transition ease-in-out delay-15" />
                    </Link>
                </ul>
                <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 sm:mt-0">
                    <li>
                        <Link
                            href="#"
                            className="mr-4 hover:underline md:mr-6 hover:text-green-400 transition ease-in-out delay-15"
                        >
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className="mr-4 hover:underline md:mr-6 hover:text-green-400 transition ease-in-out delay-15"
                        >
                            Privacy Policy
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className="mr-4 hover:underline md:mr-6 hover:text-green-400 transition ease-in-out delay-15"
                        >
                            Licensing
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className="hover:underline hover:text-green-400 transition ease-in-out delay-15"
                        >
                            Contact
                        </Link>
                    </li>
                </ul>
            </footer>
            <div className="flex justify-center px-10 sm:px-5 py-4 border-t bg-white text-base-content border-base-300 text-center text-sm">
                <p className="text-primary">
                    Copyright © 2022 - All right reserved by Shohag
                </p>
            </div>
        </>
    );
};

export default DashboardFooter;
