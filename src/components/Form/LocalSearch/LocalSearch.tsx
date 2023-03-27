const LocalSearch = ({ keyword, setKeyword, placeholder }: any) => {
    const handleKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
    };
    return (
        <input
            type="search"
            value={keyword}
            onChange={handleKeyword}
            placeholder={placeholder}
            className="bg-primary border-primary text-white text-sm rounded-lg  focus:border-primary block w-full pl-6 p-3 placeholder:text-white sm:placeholder:text-[9px]"
        />
    );
};

export default LocalSearch;
