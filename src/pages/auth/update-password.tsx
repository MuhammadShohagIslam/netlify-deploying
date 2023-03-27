import FormGroup from "@/components/Form/FormGroup";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useStoreContext } from "../../lib/contexts/StoreContextProvider";

type FormValues = {
    password: string;
};

const UpdatePassword = () => {
    const [loading, setLoading] = useState(false);
    const { updateThePassword } = useStoreContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>();

    const submitHandler: SubmitHandler<FormValues> = async (data) => {
        const { password } = data;
        setLoading(true);
        updateThePassword(password)!
            .then(() => {
                toast.success("Password Is Updated!");
                setLoading(false);
                reset();
            })
            .catch((error) => {
                toast.error(
                    `Something wrong! for password updating like ${error.message}`
                );
                setLoading(false);
            });
    };

    return (
        <>
            <HeadSeo
                title="Update-Password"
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />
            <div className="container my-14 sm:my-8">
                <div className="w-[560px] sm:w-[280px] m-auto p-8 sm:p-4 bg-secondary rounded-lg">
                    <h2 className="text-center font-medium text-primary text-2xl">
                        Update Password!
                    </h2>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className="mb-3">
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
                        </div>
                        <button
                            disabled={loading}
                            type="submit"
                            className="btn block hover:bg-transparent hover:text-primary text-white btn-primary disabled:opacity-75 disabled:border-2 disabled:border-primary disabled:text-primary mt-2"
                        >
                            {loading ? "Loading" : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdatePassword;
