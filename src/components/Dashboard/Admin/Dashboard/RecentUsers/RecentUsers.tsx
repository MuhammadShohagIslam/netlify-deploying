import React from "react";
import { RecentUsersType } from "./RecentUsers.types";
import RecentUserRow from "./RecentUserRow";
import Link from "next/link";

const RecentUsers = (props: RecentUsersType) => {
    const { users } = props;
    return (
        <div className="relative flex flex-col w-full min-w-0 mb-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl shadow-md  rounded-2xl bg-clip-border ">
            <div className="flex justify-between px-4 py-3">
                <div>
                    <h6 className="text-gray-900 text-lg font-bold">
                        Recent Users
                    </h6>
                </div>
                <div className="text-gray-500 text-sm font-bold hover:text-green-500 transition-all cursor-pointer">
                    <Link href="/dashboard/admin/customers">View All</Link>
                </div>
            </div>
            <div className="relative overflow-x-auto sm:rounded-lg scrollbar-thin scrollbar-thumb-gray-300  scrollbar-track-gray-100">
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length &&
                            users
                                .slice(0, 6)
                                .map((user) => (
                                    <RecentUserRow key={user._id} user={user} />
                                ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentUsers;
