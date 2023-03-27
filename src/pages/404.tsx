import React from "react";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { useRouter } from "next/router";
import Link from "next/link";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";

const DisplayError = () => {
    const { logOut } = useStoreContext();
    const router = useRouter();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                router.push("/auth/login");
            })
            .catch((error) => {
                console.log(error.message);
            });
    };
    return (
        <>
            <HeadSeo
                title="error"
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />
            <section className="w-10/12 pt-4 m-auto h-screen flex sm:block sm:pb-11 justify-center items-center">
                <div>
                    <img
                        className="w-96 h-96 rounded-full m-auto"
                        src={"../../../error/error.jpg"}
                        alt="error page"
                    />
                </div>
                <div className="text-center">
                    <h2 className="text-red-400 text-7xl mb-3">404</h2>

                    <p className="text-success mt-4">
                        Please{" "}
                        <button
                            className="text-white cursor-pointer btn btn-success"
                            onClick={handleLogOut}
                        >
                            LogOut
                        </button>{" "}
                        and{" "}
                        <Link href="/auth/login">
                            <button className="text-white cursor-pointer btn btn-success ">
                                Login
                            </button>
                        </Link>{" "}
                        Or Back In{" "}
                        <Link href="/">
                            <button className="text-red md:mt-3 sm:mt-3 cursor-pointer btn btn-success text-white">
                                Home
                            </button>
                        </Link>{" "}
                    </p>
                </div>
            </section>
        </>
    );
};

export default DisplayError;
