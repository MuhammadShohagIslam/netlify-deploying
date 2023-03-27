/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";
import Blog from "@/components/Blog/Blog";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { IBlog } from "types/blog.types";

const Blogs = ({ blogs }: { blogs: IBlog[] }) => {
    const [blogsData, setBlogsData] = useState<IBlog[]>([]);

    useEffect(() => {
        setBlogsData(blogs);
    }, []);

    return (
        <div data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="1"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out" className="container py-12 sm:py-8" id="blog">
            <SectionTitle title="Popular Blogs" />
            <Swiper
                slidesPerView={1}
                navigation={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                modules={[Navigation, Autoplay]}
                className="h-[610px] sm:h-[570px] blog_swiper"
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1200: {
                        slidesPerView: 3,
                        spaceBetween: 25,
                    },
                }}
            >
                {blogsData?.map((blog) => (
                    <SwiperSlide key={blog._id}>
                        <Blog key={blog._id} blog={blog} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Blogs;
