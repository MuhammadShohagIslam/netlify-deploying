/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import FormGroup from "@/components/Form/FormGroup";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { toast } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";
type FormValues = {
    email: string;
    password: string;
};

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const { forgotPassword, state } = useStoreContext();
    const router = useRouter();
    const { user } = state;
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>();

    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user]);

    const submitHandler: SubmitHandler<FormValues> = async (data) => {
        const { email } = data;
        const actionCodeSettings = {
            url: process.env.NEXT_PUBLIC_FORGOT_PASSWORD_REDIRECT_URL!,
            handleCodeInApp: true,
        };
        setLoading(true);
        forgotPassword(email, actionCodeSettings)
            .then(() => {
                toast.success(
                    `Email is sent to the ${email}.Click the link to complete to the password reset process`
                );
                // set loading false
                setLoading(false);
                //clear state
                reset();
            })
            .catch((error: any) => {
                toast.error(error.message.split("Firebase: ").join(""));
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return (
        <>
            <HeadSeo
                title="forgot-password"
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />
            <div className="container my-14 sm:my-8">
                <div className="w-[560px] sm:w-[280px] m-auto p-8 sm:p-4 bg-secondary rounded-lg">
                    <h2 className="text-center font-medium text-primary text-2xl">
                        Forgot Password!
                    </h2>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className="mb-3">
                            <FormGroup
                                register={register}
                                inputName={"email"}
                                labelName={"Email"}
                                errorField={errors.email}
                                inputType={"email"}
                                placeholder={"Enter Your Email"}
                                required="Please Enter Your Email"
                            />
                        </div>
                        <button
                            disabled={loading}
                            type="submit"
                            className="btn block hover:bg-transparent hover:text-primary text-white btn-primary disabled:opacity-75 disabled:border-2 disabled:border-primary disabled:text-primary mt-2"
                        >
                            {loading ? "Loading" : "Submit"}
                        </button>
                    </form>
                    <hr className="my-4"></hr>
                    <p className="text-primary">
                        If You Right Know Remember Your Account Password?{" "}
                        <label
                            className="text-success cursor-pointer"
                            onClick={() => router.push("/auth/login")}
                        >
                            Back Login
                        </label>
                    </p>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
