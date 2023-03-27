/* eslint-disable react-hooks/exhaustive-deps */
import { currentUser } from "@/api/auth";
import FileUpload from "@/components/FileUpload/FileUpload";
import FormGroup from "@/components/Form/FormGroup";
import ProfileEditModal from "@/components/Modal/ProfileEditModal/ProfileEditModal";
import useCheckUser from "@/hooks/useCheckUser";
import UserDashboard from "@/layouts/DashboardLayout/UserDashboard";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import { IProfile } from "../../../../types/profile.types";

type FormValues = {
    newPassword: string;
};
const Profile = () => {
    useCheckUser();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [loadingForUpdateProfileImg, setLoadingForUpdateProfileImg] =
        useState<boolean>(false);
    const [values, setValues] = useState<IProfile>({
        username: "",
        fullName: "",
        image: {
            public_id: "",
            url: "",
        },
        email: "",
        about: "",
    });
    const { state, updateThePassword } = useStoreContext();
    const { user } = state;

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isDirty, isSubmitted },
    } = useForm<FormValues>({
        mode: "onChange",
    });

    useEffect(() => {
        loadingCurrentUser();
    }, []);

    const loadingCurrentUser = () => {
        if (user && user!.token) {
            currentUser(user.token)
                .then((res) => {
                    const data = res.data;
                    setValues({
                        ...values,
                        username: data.username,
                        fullName: data.fullName,
                        image: {
                            url: data.image?.url,
                            public_id: data.image?.public_id,
                        },
                        email: data.email,
                        about: data?.about,
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

    // update password
    const handlePasswordSubmit: SubmitHandler<FormValues> = (data) => {
        const { newPassword } = data;
        updateThePassword(newPassword!)!
            .then(() => {
                toast.success("Password Is Updated!");
                reset();
            })
            .catch((error) => {
                toast.error(
                    `Something wrong! for password updating like ${error.message}`
                );
            })
            .finally(() => {
                reset();
            });
    };

    const updatePasswordForm = () => (
        <form onSubmit={handleSubmit(handlePasswordSubmit)}>
            <FormGroup
                register={register}
                inputName={"newPassword"}
                labelName={"New Password"}
                isRequirePattern={true}
                requirePattern={{
                    required: "Password is required",
                    minLength: {
                        value: 6,
                        message: "Password should be 6 characters or longer",
                    },
                }}
                errorField={errors.newPassword}
                inputType={"password"}
                placeholder={"Please Enter Your New Password"}
                required="Password is required"
            />
            <button
                type="submit"
                className="btn block hover:bg-transparent hover:text-primary text-white btn-primary disabled:opacity-75 disabled:border-2 disabled:border-primary disabled:text-primary mt-2"
                disabled={isSubmitted || !isDirty}
            >
                {isSubmitted ? "Loading..." : "Submit"}
            </button>
        </form>
    );
    return (
        <>
            <HeadSeo
                title={"Profile"}
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />
            <UserDashboard>
                <h2 className="text-black text-md font-semibold mb-4">
                    My Profile
                </h2>
                <div className="grid grid-cols-8 md:grid-cols-1 sm:grid-cols-1 ">
                    <div className="col-span-2 md:flex md:flex-col md:items-center sm:flex sm:flex-col sm:items-center">
                        <FileUpload
                            values={values}
                            setValues={setValues}
                            setLoading={setLoadingForUpdateProfileImg}
                            loading={loadingForUpdateProfileImg}
                        />
                    </div>
                    <div className="col-span-6 m-auto p-4 md:m-0 sm:m-0">
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
                                    title="Profile Information Update"
                                />
                            )}
                        </div>

                        <div>
                            <ul>
                                <li>
                                    <p className="text-black text-md font-semibold mb-0">
                                        Full name:
                                    </p>
                                    <span className="text-black mt-1 inline-block">
                                        {values?.fullName}
                                    </span>
                                </li>
                                <li className="mt-2">
                                    <p className="text-black mb-0 text-md font-semibold">
                                        Email address:
                                    </p>
                                    <span className="text-black mt-1 inline-block break-all">
                                        {values?.email}
                                    </span>
                                </li>
                                <li className="mt-2">
                                    <p className="text-black mb-0 text-md font-semibold">
                                        About
                                    </p>
                                    <span className="text-black mt-1 inline-block">
                                        {values?.about}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <div className="">
                        {isSubmitted ? (
                            <h2 className="text-black text-md font-semibold text-center mt-4 mb-3">
                                Loading
                            </h2>
                        ) : (
                            <h4 className="text-black text-md font-semibold text-center mt-4 mb-3">
                                Update Password
                            </h4>
                        )}
                        {updatePasswordForm()}
                    </div>
                </div>
            </UserDashboard>
        </>
    );
};

export default dynamic(() => Promise.resolve(Profile), { ssr: false });
