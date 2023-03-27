import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { updatePassword } from "firebase/auth";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import FormGroup from "@/components/Form/FormGroup";
import CheckInput from "@/components/Form/CheckInput";
import Link from "next/link";
import { createOrUpdateUser } from "@/api/auth";
import { StoreActionType } from "@/lib/states/storeReducer/storeReducer.type";
import { useRouter } from "next/router";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";

type FormValues = {
    email: string;
    fullName: string;
    password: string;
    profileImg: any;
};

const CompleteRegister = () => {
    const [loadingRegister, setLoadingRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [accepted, setAccepted] = useState(false);

    const url = `https://api.imgbb.com/1/upload?key=1a70c36c9c3fbf67a973f27648af9f7c`;
    const router = useRouter();
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<FormValues>();

    const { createUser, userProfileUpdate, setLoading, dispatch, auth } =
        useStoreContext();

    useEffect(() => {
        const email = localStorage.getItem("emailForSignIn");
        if (email) {
            setEmail(email);
        }
    }, []);

    const handleCompleteSignUp: SubmitHandler<FormValues> = (data) => {
        const profileURL = data.profileImg[0];
        const { fullName, password } = data;

        const formData = new FormData();
        formData.append("image", profileURL);
        setLoadingRegister(true);
        axios
            .post(url, formData)
            .then((imgData) => {
                const productImgUrl = imgData.data.data.url;
                createUser(email, window.location.href).then(async (result) => {
                    if (result.user.emailVerified) {
                        handleProfileUpdate(fullName, productImgUrl);
                        let user = auth.currentUser;
                        if (user) {
                            await updatePassword(user, password);
                            const currentUser = {
                                fullName: fullName || user?.displayName!,
                                email: email || user?.email!,
                                image: {
                                    url: productImgUrl || user?.photoURL,
                                    public_id: `${Date.now()}`,
                                },
                            };
                            const idTokenResult = await user.getIdTokenResult();
                            createOrUpdateUser(idTokenResult.token, currentUser)
                                .then((res) => {
                                    setLoadingRegister(false);
                                    // Clear email from storage.
                                    window.localStorage.removeItem(
                                        "emailForSignIn"
                                    );
                                    toast.success("Registered Successfully!");
                                    reset();
                                    dispatch({
                                        type: StoreActionType.LOGGED_IN_USER,
                                        payload: {
                                            fullName: res.data.fullName,
                                            email: res.data.email,
                                            token: idTokenResult.token,
                                            image: res.data.image?.url,
                                            _id: res.data._id,
                                        },
                                    });
                                    router.push("/");
                                    setLoading(false);
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        }
                    }
                });
            })
            .catch((error) => {
                setLoading(false);
                setLoadingRegister(false);
                console.log(error.message);
            })
            .finally(() => {
                setLoading(false);
                setLoadingRegister(false);
            });
    };

    const handleProfileUpdate = (fullName: string, photoURL: string) => {
        const profile = {
            displayName: fullName,
            photoURL,
        };
        userProfileUpdate(profile)
            .then((result) => {})
            .catch((error) => {
                toast.error(error.message);
            });
    };

    const toggleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccepted(e.target.checked);
    };

    return (
        <>
            <HeadSeo
                title="complete-register"
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />
            <div className="container my-14 sm:my-8">
                <div className="w-[560px] sm:w-[280px] m-auto p-8 sm:p-4 bg-secondary rounded-lg">
                    <h2 className="text-center font-medium text-primary text-2xl">
                        Complete Register Now!
                    </h2>
                    <form onSubmit={handleSubmit(handleCompleteSignUp)}>
                        <FormGroup
                            register={register}
                            inputName={"email"}
                            isReadOnly={true}
                            labelName={"Email"}
                            inputType={"email"}
                            isDefaultValue={true}
                            defaultValue={email}
                        />
                        <FormGroup
                            register={register}
                            inputName={"fullName"}
                            labelName={"FullName"}
                            errorField={errors.fullName}
                            inputType={"text"}
                            placeholder={"Enter Your FullName"}
                            required="Please Enter Your FullName"
                        />
                        <FormGroup
                            register={register}
                            inputName={"profileImg"}
                            labelName={"Profile Picture"}
                            errorField={errors.profileImg}
                            inputType={"file"}
                            required="Profile Picture Is Required!"
                        />
                        <FormGroup
                            register={register}
                            inputName={"password"}
                            labelName={"Password"}
                            isRequirePattern={true}
                            requirePattern={{
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password should be 6 characters or longer",
                                },
                            }}
                            errorField={errors.password}
                            inputType={"password"}
                            placeholder={"Please Enter Your Password"}
                            required="Password is required"
                        />
                        <CheckInput
                            accepted={accepted}
                            toggleCheck={toggleCheck}
                            checkInputLabel={
                                <>
                                    By Register, You agree to our
                                    <Link
                                        className="mx-1 text-decoration-underline"
                                        href="/term-condition"
                                    >
                                        Terms of Use
                                    </Link>
                                    and
                                    <Link
                                        className="ms-1 text-decoration-underline"
                                        href="/privacy-policy"
                                    >
                                        Privacy Policy
                                    </Link>
                                </>
                            }
                        />
                        <button
                            type="submit"
                            className="btn block hover:bg-transparent hover:text-primary text-white btn-primary disabled:opacity-75 disabled:border-2 disabled:border-primary disabled:text-primary mt-2"
                            disabled={!accepted}
                        >
                            {loadingRegister ? "Loading" : "Register"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CompleteRegister;
