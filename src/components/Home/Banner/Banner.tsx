import { Navigation, Pagination, Autoplay } from "swiper";
import Link from "next/link";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CustomButton from "../../UI/CustomButton/CustomButton";
import { Swiper, SwiperSlide } from "swiper/react";

const Banner = () => {
    return (
        <section className="mt-5">
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter:true
                }}
                navigation={true}
                modules={[Pagination, Navigation, Autoplay]}
                className="sm:h-[380px]"
            >
                <SwiperSlide>
                    <div
                        style={{
                            backgroundImage: `url(../../../../../banner/laptop.jpg)`,
                        }}
                        className="bg-contain md:bg-cover sm:bg-cover z-20 bg-no-repeat bg-left md:bg-center w-full h-[444px] sm:h-[380px] flex items-center justify-center"
                    >
                        <div className="text-center">
                            <span className="text-success text-xl sm:text-lg mb-3">
                                20% off Laptop and Desktop
                            </span>
                            <h2 className="text-5xl sm:text-3xl text-primary w-[34rem] sm:w-64 ">
                                Smartest and Affordable Devices
                            </h2>
                            <Link href="/shop">
                                <CustomButton className="mt-10 sm:mt-5">
                                    Shop Now
                                </CustomButton>
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        style={{
                            backgroundImage: `url(../../../../../banner/laptop1Banner.jpg)`,
                        }}
                        className="bg-contain md:bg-cover sm:bg-cover z-20 bg-no-repeat bg-left md:bg-center w-full h-[444px] sm:h-[380px] flex items-center justify-center"
                    >
                        <div className="text-center">
                            <span className="text-success text-xl sm:text-lg mb-3">
                                20% off Laptop and Desktop
                            </span>
                            <h2 className="text-5xl sm:text-3xl text-primary w-[34rem] sm:w-64">
                                Smartest and Affordable Devices
                            </h2>
                            <Link href="/shop">
                                <CustomButton className="mt-10 sm:mt-5">
                                    Shop Now
                                </CustomButton>
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Banner;
