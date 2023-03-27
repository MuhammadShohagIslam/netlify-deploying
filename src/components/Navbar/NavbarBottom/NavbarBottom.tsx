import ShoppingCarts from "@/components/Carts/ShoppingCarts/ShoppingCarts";
import SearchForm from "@/components/UI/SearchForm/SearchForm";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import React, { useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";

const NavbarBottom: React.FC = (): JSX.Element => {
    const [openShoppingCart, setOpenShoppingCart] = useState(false);
    const { state } = useStoreContext();
    const { carts, user } = state;

    const handleShoppingCart = () => {
        setTimeout(() => setOpenShoppingCart(!openShoppingCart), 200);
    };
    return (
        <>
            <div className="container grid grid-cols-3 pt-2 gap-3 sm:gap-0">
                <div className="col-span-2 flex justify-end">
                    <SearchForm
                        className={"w-2/3 "}
                        placeholder={"What are you looking for?"}
                    />
                </div>
                <div className="flex justify-start">
                    <ul className="flex items-center">
                        {(user && user.email) && (
                            <Link href="/products/wish-lists">
                                <li className="py-3 ml-[5px] px-3 rounded-lg border-2 border-secondary hover:bg-transparent hover:text-primary text-white bg-success transition ease-in-out delay-15 cursor-pointer">
                                    <FaHeart />
                                </li>
                            </Link>
                        )}

                        <li
                            onMouseOver={handleShoppingCart}
                            className="relative py-3 px-3 rounded-lg ml-[5px] border-2 border-secondary hover:bg-transparent hover:text-primary  text-white bg-success transition ease-in-out delay-15 cursor-pointer"
                        >
                            <FaShoppingCart />
                            <div
                                suppressHydrationWarning
                                className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2"
                            >
                                {carts?.length}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <ShoppingCarts
                openShoppingCart={openShoppingCart}
                setOpenShoppingCart={setOpenShoppingCart}
            />
        </>
    );
};

export default NavbarBottom;
