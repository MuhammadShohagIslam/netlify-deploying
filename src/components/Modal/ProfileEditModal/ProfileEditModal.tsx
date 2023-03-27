import { createOrUpdateUser } from "@/api/auth";
import FormGroup from "@/components/Form/FormGroup";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import {
    StoreActionType,
    UserType,
} from "@/lib/states/storeReducer/storeReducer.type";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IProfile } from "types/profile.types";

type ProfileEditModalPropType = {
    title: string;
    closeModal: () => void;
    values: IProfile;
    loadingCurrentUser: (user: UserType) => void;
    isAddressProfile?: boolean;
};
type FormProfileValues = {
    username?: string;
    fullName?: string;
    email?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
};

const ProfileEditModal = (props: ProfileEditModalPropType) => {
    const {
        closeModal,
        values,
        title,
        loadingCurrentUser,
        isAddressProfile = false,
    } = props;
    const { state, dispatch, userProfileUpdate } = useStoreContext();
    const { user } = state;
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitted },
    } = useForm<FormProfileValues>({
        mode: "onChange",
    });

    const handleEditSubmit: SubmitHandler<FormProfileValues> = (data) => {
        let userObject: any = null;
        if (!isAddressProfile) {
            userObject = {
                fullName: data.fullName!,
                email: data.email!,
            };
        } else {
            userObject = {
                address: {
                    email: user!.email,
                    username: data.username!,
                    address: data.address!,
                    city: data.city!,
                    postalCode: data.postalCode!,
                    country: data.country!,
                },
            };
        }
        if (userObject || userObject.address) {
            createOrUpdateUser(user!.token, userObject!)
                .then((res) => {
                    if (!isAddressProfile) {
                        toast.success("Profile Update Successfully!");
                    } else {
                        toast.success("Address Update Successfully!");
                    }
                    reset();
                    dispatch({
                        type: StoreActionType.LOGGED_IN_USER,
                        payload: {
                            fullName: res.data.fullName,
                            email: res.data.email,
                            token: user!.token,
                            image: res.data.image.url,
                            _id: res.data._id,
                        },
                    });
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    reset();
                });
            loadingCurrentUser(user!);
            if (!isAddressProfile) {
                updateTheProfileToFirebase(
                    values.fullName!,
                    values?.image?.url!
                );
            }
        }
    };

    // update the profile
    const updateTheProfileToFirebase = (
        fullName: string,
        photoImage: string
    ) => {
        const profile = {
            displayName: fullName,
            photoURL: photoImage,
        };
        userProfileUpdate(profile)
            .then((result) => {})
            .catch((error) => {
                toast.error(error);
            })
            .finally(() => {});
    };

    return (
        <>
            <div
                className={`fixed z-50 flex justify-center items-center w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-modal h-full`}
            >
                <div className="relative w-full h-full max-w-2xl md:h-auto">
                    <div className="relative bg-white rounded-lg drop-shadow-2xl">
                        <div className="flex items-start justify-between p-4 border-b rounded-t ">
                            <h3 className="text-xl sm:text-lg font-semibold text-gray-900">
                                {title}
                            </h3>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <form onSubmit={handleSubmit(handleEditSubmit)}>
                                {!isAddressProfile ? (
                                    <>
                                        <FormGroup
                                            register={register}
                                            inputName={"fullName"}
                                            labelName={"FullName"}
                                            errorField={errors.fullName}
                                            isDefaultValue
                                            defaultValue={values.fullName}
                                            inputType={"text"}
                                            placeholder={"Enter Your FullName"}
                                            required="Please Enter Your FullName"
                                        />
                                        <FormGroup
                                            register={register}
                                            inputName={"email"}
                                            labelName={"Email"}
                                            isDefaultValue
                                            defaultValue={values.email}
                                            errorField={errors.email}
                                            inputType={"text"}
                                            placeholder={"Enter Your Email"}
                                            required="Please Enter Your Email"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <FormGroup
                                            register={register}
                                            inputName={"username"}
                                            labelName={"Username"}
                                            errorField={errors.username}
                                            isDefaultValue
                                            defaultValue={values.username}
                                            inputType={"text"}
                                            placeholder={"Enter Your Username"}
                                            required="Please Enter Your Username"
                                        />
                                        <FormGroup
                                            register={register}
                                            inputName={"address"}
                                            labelName={"Address"}
                                            errorField={errors.address}
                                            isDefaultValue
                                            defaultValue={values.address}
                                            inputType={"text"}
                                            placeholder={"Enter Your Address"}
                                            required="Please Enter Your Address"
                                        />
                                        <FormGroup
                                            register={register}
                                            inputName={"country"}
                                            labelName={"Country"}
                                            isDefaultValue
                                            defaultValue={values.country}
                                            errorField={errors.country}
                                            inputType={"text"}
                                            placeholder={"Enter Your Country"}
                                            required="Please Enter Your Country"
                                        />
                                        <FormGroup
                                            register={register}
                                            inputName={"city"}
                                            labelName={"City"}
                                            isDefaultValue
                                            defaultValue={values.city}
                                            errorField={errors.city}
                                            inputType={"text"}
                                            placeholder={"Enter Your City"}
                                            required="Please Enter Your City"
                                        />
                                        <FormGroup
                                            register={register}
                                            inputName={"postalCode"}
                                            labelName={"Postal Code"}
                                            isDefaultValue
                                            defaultValue={values.postalCode}
                                            errorField={errors.postalCode}
                                            inputType={"text"}
                                            placeholder={
                                                "Enter Your Postal Code"
                                            }
                                            required="Please Enter Your Postal Code"
                                        />
                                    </>
                                )}

                                <button
                                    type="submit"
                                    className="btn block hover:bg-transparent hover:text-primary text-white btn-primary disabled:opacity-75 disabled:border-2 disabled:border-primary disabled:text-primary mt-2"
                                    disabled={isSubmitted}
                                >
                                    {isSubmitted ? "Loading" : "Submit"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileEditModal;
