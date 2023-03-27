import React from "react";
import { BsCalendarDate } from "react-icons/bs";
import { BiUserPlus } from "react-icons/bi";
import Link from "next/link";
import { IBlog } from "types/blog.types";

const Blog = ({ blog }: { blog: IBlog }) => {
    return (
        <div className="card min-h-[513px] sm:min-h-[465px] bg-base-100 shadow-lg mt-7 sm:mt-3 mx-2">
            <figure className="h-[250px] sm:h-[150px] md:h-[190px]">
                <img className="h-full" src={blog.image} alt={blog.title} />
            </figure>
            <div className="card-body sm:p-4 md:p-5">
                <h2 className="card-title text-primary">{blog.title}</h2>
                <div className="flex md:flex-col sm:flex-col">
                    <div className="flex items-center text-success text-sm">
                        <BsCalendarDate />
                        <span className="ml-1">
                            {new Date(blog?.createdAt)
                                .toDateString()
                                .substr(4, 11)}
                        </span>
                    </div>
                    <div className="flex items-center ml-3 md:ml-0 sm:ml-0 text-success">
                        <BiUserPlus />
                        <span className="ml-1 text-sm">
                            {blog?.publisherName}
                        </span>
                    </div>
                </div>
                <p className="text-primary">
                    {blog.description.length > 140
                        ? `${blog.description.slice(0, 140)} ...`
                        : blog.description}
                </p>
                <div className="card-actions justify-end text-gray-900 hover:text-green-400 transition-all">
                    <Link href={`${blog.link}`}>Read More</Link>
                </div>
            </div>
        </div>
    );
};

export default Blog;
