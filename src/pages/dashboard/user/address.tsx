/* eslint-disable react-hooks/exhaustive-deps */
import { currentUser } from "@/api/auth";
import ProfileEditModal from "@/components/Modal/ProfileEditModal/ProfileEditModal";
import useCheckUser from "@/hooks/useCheckUser";
import UserDashboard from "@/layouts/DashboardLayout/UserDashboard";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";
import { UserType } from "@/lib/states/storeReducer/storeReducer.type";
import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { IProfile } from "../../../../types/profile.types";

const Address = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [values, setValues] = useState<IProfile>({
        username: "",
        fullName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
    });
    const { state } = useStoreContext();
    const { user } = state;

    useEffect(() => {
        if (user) {
            loadingCurrentUser(user);
        }
    }, [user]);

    const loadingCurrentUser = (user: UserType) => {
        if (user && user!.token) {
            currentUser(user.token)
                .then((res) => {
                    const data = res.data;
                    setValues({
                        ...values,
                        username: data.username,
                        address: data.address.address,
                        city: data.address.city,
                        postalCode: data.address.postalCode,
                        country: data.address.country,
                    });
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }
    };
    // show model for update profile
    const handleShowModal = () => {
        setShowModal((prev) => !prev);
    };
    return (
        <>
            <HeadSeo
                title={"Address"}
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />
            <UserDashboard>
                <h2 className="text-black text-md font-semibold mb-0 text-center">
                    My Address
                </h2>
                <div className="relative flex justify-end items-center">
                    <span
                        className="text-green-500 text-md hover:text-black transition-all cursor-pointer"
                        id="my-profile-update-modal"
                        onClick={handleShowModal}
                    >
                        <BiEdit />
                    </span>
                    {showModal && (
                        <ProfileEditModal
                            closeModal={handleShowModal}
                            values={values}
                            loadingCurrentUser={loadingCurrentUser}
                            title="Address Information Update"
                            isAddressProfile
                        />
                    )}
                </div>
                <div>
                    <ul>
                        <li className="flex gap-1">
                            <p className="text-black text-md font-semibold mb-0">
                                User Name:
                            </p>
                            <p className="text-black inline-block">
                                {values?.username}
                            </p>
                        </li>
                        <li className="mt-2 flex gap-1">
                            <p className="text-black mb-0 text-md font-semibold">
                                Address:
                            </p>
                            <p className="text-black inline-block">
                                {values?.address}
                            </p>
                        </li>
                        <li className="mt-2 flex gap-1">
                            <p className="text-black mb-0 text-md font-semibold">
                                City:
                            </p>
                            <p className="text-black inline-block">
                                {values?.city}
                            </p>
                        </li>
                        <li className="mt-2 flex gap-1">
                            <p className="text-black mb-0 text-md font-semibold">
                                Country:
                            </p>
                            <p className="text-black inline-block">
                                {values?.country}
                            </p>
                        </li>
                    </ul>
                </div>
            </UserDashboard>
        </>
    );
};

export default Address;
