import { useState, useEffect } from "react";
import Category from "./Category/Category";
import { ICategories } from "types/category.type";

const Categories = ({ categories }: { categories: ICategories[] }) => {
    const [categoriesData, setCategoriesData] = useState<ICategories[]>([]);

    useEffect(() => {
        setCategoriesData(categories);
    }, [categories]);

    return (
        <div data-aos="fade-up"
            data-aos-delay="1" className="grid grid-cols-4 gap-4 px-3 sm:grid-cols-1 md:grid-cols-2">
            {categoriesData?.length > 0 ? (
                <>
                    {categoriesData?.slice(0, 4).map((category: ICategories) => (
                        <Category key={category._id} category={category} />
                    ))}
                </>
            ) : (
                <h2 className="text-center text-xl text-primary">
                    There is no category
                </h2>
            )}
        </div>
    );
};

export default Categories;
