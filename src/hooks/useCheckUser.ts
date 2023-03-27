import { useEffect } from "react";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { useRouter } from "next/router";

const useCheckUser = () => {
    const { state } = useStoreContext();
    const { user } = state;

    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/auth/login");
        } else if (user.role !== "user") {
            router.push("/");
        }
    }, [user, router]);
};

export default useCheckUser;
