import { Fragment } from "react";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import ShoppingCart from "./ShoppingCart";
import { StoreActionType } from "@/lib/states/storeReducer/storeReducer.type";

const ShoppingCarts = ({ openShoppingCart, setOpenShoppingCart }: any) => {
    const { state, dispatch } = useStoreContext();
    const { carts } = state;

    const getTotalPrice = () => {
        const totalPrice =
            carts &&
            carts.reduce((acc, cur: any, i) => {
                return acc + cur.price * cur.count;
            }, 0);
        return totalPrice;
    };
    const removeCartHandler = (productId: string) => {
        let carts = [];
        if (typeof window !== "undefined") {
            // checking already carts to the window localStorage
            let cartsFromLocalStorage: string | null =
                window.localStorage.getItem("carts");
            if (cartsFromLocalStorage !== null) {
                carts = JSON.parse(cartsFromLocalStorage);
            }
        }
        // delete carts
        for (let i = 0; i < carts.length; i++) {
            if (carts[i]._id === productId) {
                carts.splice(i, 1);
            }
        }
        // set undeleted carts into the window local storage
        window.localStorage.setItem("carts", JSON.stringify(carts));
        // store store context
        dispatch({
            type: StoreActionType.ADD_TO_CART,
            payload: carts,
        });
    };
    return (
        <Transition.Root show={openShoppingCart} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-50"
                onClose={setOpenShoppingCart}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">
                                                    Shopping cart
                                                </Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="-m-2 p-2 focus-visible:outline-none transition-all text-gray-400 hover:text-green-400"
                                                        onClick={() =>
                                                            setOpenShoppingCart(
                                                                false
                                                            )
                                                        }
                                                    >
                                                        <span className="sr-only">
                                                            Close panel
                                                        </span>
                                                        <svg
                                                            className="h-6 w-6"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M6 18L18 6M6 6l12 12"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            {carts.length < 1 ? (
                                                <div className="flex flex-col justify-center items-center h-96">
                                                    <h2 className="font-medium text-xl mb-2 text-green-600">
                                                        No Product Added into
                                                        Carts
                                                    </h2>
                                                    <Link href="/shop">
                                                        <button
                                                            type="button"
                                                            className="transition-all font-medium text-primary hover:text-green-600"
                                                            onClick={() =>
                                                                setOpenShoppingCart(
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            Continue Shopping
                                                            <span aria-hidden="true">
                                                                {" "}
                                                                &rarr;
                                                            </span>
                                                        </button>
                                                    </Link>
                                                </div>
                                            ) : (
                                                <div className="mt-8">
                                                    <div className="flow-root">
                                                        <ul
                                                            role="list"
                                                            className="-my-6 divide-y divide-gray-200"
                                                        >
                                                            {carts.map(
                                                                (cart: any) => (
                                                                    <ShoppingCart
                                                                        cart={
                                                                            cart
                                                                        }
                                                                        removeCartHandler={
                                                                            removeCartHandler
                                                                        }
                                                                        key={
                                                                            cart._id
                                                                        }
                                                                    />
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {carts.length > 0 && (
                                            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <p>Subtotal</p>
                                                    <p>{`$${getTotalPrice()}`}</p>
                                                </div>
                                                <div className="mt-6">
                                                    <Link
                                                        href="/cart"
                                                        className="flex transition-all items-center justify-center rounded-md border border-primary bg-primary px-6 py-3 sm:py-2 text-base font-medium text-white shadow-sm hover:bg-transparent hover:text-primary"
                                                    >
                                                        Checkout
                                                    </Link>
                                                </div>
                                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                    <p>
                                                        or{" "}
                                                        <Link href="/shop">
                                                            <button
                                                                type="button"
                                                                className="transition-all font-medium text-primary hover:text-green-600"
                                                                onClick={() =>
                                                                    setOpenShoppingCart(
                                                                        false
                                                                    )
                                                                }
                                                            >
                                                                Continue
                                                                Shopping
                                                                <span aria-hidden="true">
                                                                    {" "}
                                                                    &rarr;
                                                                </span>
                                                            </button>
                                                        </Link>
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default ShoppingCarts;
