import React from "react";
import Image from "next/image";
import Link from "next/link";
import { NotificationType } from "./Notification.types";

const Notification = ({ notification }: { notification: NotificationType }) => {
    const { image, message, user, date } = notification;
    return (
        <Link href="#" className="flex sm:flex-col sm:items-center px-4 py-3 border-b hover:bg-gray-100">
            <div className="flex-shrink-0">
                <Image
                    className="rounded-full w-11 h-11"
                    src={image}
                    alt={user}
                    width={100}
                    height={100}
                />
            </div>
            <div className="w-full pl-3">
                <div className="text-gray-500 font-normal text-sm mb-1.5 ">
                    New message from{" "}
                    <span className="font-semibold text-gray-900">{user}</span>{" "}
                    {message}
                </div>
                <div className="text-xs font-medium text-green-400 ">
                    {date}
                </div>
            </div>
        </Link>
    );
};

export default Notification;
