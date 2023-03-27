import React from "react";
import { FaSearch } from "react-icons/fa";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { StoreActionType } from "@/lib/states/storeReducer/storeReducer.type";
import { useRouter } from "next/router";

type SearchFormPropType = {
    className: string;
    placeholder: string;
};
const SearchForm = ({ className, placeholder }: SearchFormPropType) => {
    const { state, dispatch } = useStoreContext();
    const { text } = state;
    const router = useRouter();

    const changeSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: StoreActionType.SEARCH_FILTER_VALUE,
            payload: e.target.value,
        });
    };
    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/shop?${text}`);
    };
    return (
        <form
            className={`items-center ${className} sm:w-11/12 relative`}
            onSubmit={handleSearchSubmit}
        >
            <input
                type="text"
                name="search"
                value={text}
                className="bg-primary border-primary text-white text-sm rounded-lg  focus:border-primary block w-full pl-6 p-3 placeholder:text-white sm:placeholder:text-[9px]"
                placeholder={placeholder}
                onChange={changeSearchHandler}
                required
            />
            <button
                type="submit"
                className="inline-flex absolute top-0 right-0 items-center py-[13px] px-3 ml-2 text-sm font-medium text-white bg-primary rounded-lg border-2 border-primary focus:outline-none"
            >
                <FaSearch />
            </button>
        </form>
    );
};

export default SearchForm;
