import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ICategories } from "types/category.type";

const Category = ({ category }: { category: ICategories }) => {
    const { slug, name, images } = category;
    return (
        <Link href={`/category/${slug}`} className="group transition-all">
            <div className="max-w-sm cursor-pointer bg-white border border-gray-200 rounded-lg drop-shadow-xl p-4 h-[420px]">
                <div className="flex justify-between mb-3">
                    <h3 className="text-2xl text-primary font-semibold">
                        {name}
                    </h3>
                    <span
                        className="text-sm transition-all text-primary font-normal mt-2 group-hover:text-green-400"
                    >
                        See More
                    </span>
                </div>
                <div className="grid grid-cols-2 gap-1 mt-5">
                    {images?.length &&
                        images?.map((image) => (
                            <div
                                key={image.public_id}
                                className="shadow-lg relative"
                            >
                                <Image
                                    src={image.url}
                                    alt={name}
                                    width={100}
                                    height={100}
                                    className="h-[164px] w-full bg-no-repeat bg-center after:content-[''] after:bg-black after:h-full after:opacity-40 after:absolute after:top-0 after:left-0 after:w-full"
                                />
                            </div>
                        ))}
                </div>
            </div>
        </Link>
    );
};

export default Category;
