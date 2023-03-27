import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useCheckAdmin = () => {
    const { state } = useStoreContext();
    const { user } = state;

    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/auth/login");
        } else if (user.role !== "admin") {
            router.push("/");
        }
    }, [user, router]);
};

export default useCheckAdmin;
