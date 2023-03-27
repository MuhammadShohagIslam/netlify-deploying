import React from "react";
import Link from 'next/link';

type DropdownListItemProps = {
    children: string;
    link: string;
    className?: string;
};

const DropdownListItem = ({
    children,
    link,
    className,
}: DropdownListItemProps): JSX.Element => {
    return (
        <li>
            <Link href={link} className={className}>
                {children}
            </Link>
        </li>
    );
};

export default DropdownListItem;
