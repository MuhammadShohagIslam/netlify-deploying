import { ReactElement, ReactNode, useState, useEffect } from "react";
import type { NextPage } from "next";
import ScrollToTop from "react-scroll-to-top";
import "@/styles/globals.css";
import 'aos/dist/aos.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "swiper/swiper.min.css";
import "react-datepicker/dist/react-datepicker.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import StoreContextProvider from "./../lib/contexts/StoreContextProvider";
import { useRouter } from "next/router";
import Preloader from "@/components/UI/Preloader/Preloader";

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const start = () => {
            setLoading(true);
        };
        const end = () => {
            setLoading(false);
        };
        router.events.on("routeChangeStart", start);
        router.events.on("routeChangeComplete", end);
        router.events.on("routeChangeError", end);
        return () => {
            router.events.off("routeChangeStart", start);
            router.events.off("routeChangeComplete", end);
            router.events.off("routeChangeError", end);
        };
    }, [router]);

    const getLayout = Component.getLayout ?? ((page) => page);

    return getLayout(
        <StoreContextProvider>
            <ScrollToTop smooth color="#000" />
            <Toaster position="top-right" reverseOrder={false} />
            {loading ? <Preloader /> : <Component {...pageProps} />}
        </StoreContextProvider>
    );
}
