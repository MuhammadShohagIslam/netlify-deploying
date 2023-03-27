import Link from "next/link";
import { useRouter } from "next/router";

type SideBarItemPropType = {
    link: string;
    name: string;
    children: React.ReactNode;
};
const SideBarItem = (props: SideBarItemPropType) => {
    const { link, name, children } = props;
    const router = useRouter();
    return (
        <li className={router.pathname == link ? "bg-gray-100 rounded-lg" : ""}>
            <Link
                href={link}
                className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100`}
            >
                {children}
                <span className="ml-3">{name}</span>
            </Link>
        </li>
    );
};

export default SideBarItem;
