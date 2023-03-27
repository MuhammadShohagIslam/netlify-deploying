import React, { useState } from "react";
import FormGroup from "@/components/Form/FormGroup";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { createSize } from "@/api/size";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";

interface IFormInputs {
    size: string;
}
const AddSize = () => {
    const [loading, setLoading] = useState(false);
    const { state } = useStoreContext();
    const { user } = state;
    const router = useRouter();
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<IFormInputs>();

    const handleSizeSubmit: SubmitHandler<IFormInputs> = async (data) => {
        setLoading(true);
        createSize(user!.token, data.size)
            .then((res) => {
                setLoading(false);
                toast.success(`${res.data.name} Size Created!`);
                reset();
                router.push("/dashboard/admin/sizes");
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    toast.error("Size Creating Failed!");
                    setLoading(false);
                }
                setLoading(false);
            });
    };
    return (
        <>
            <HeadSeo
                title={"Add Size"}
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />
            <DashboardLayout>
                <div>
                    <div className="bg-secondary p-6 rounded-lg w-3/4 sm:w-full md:w-full">
                        <h2 className="text-center font-semibold text-primary text-2xl sm:text-lg md:text-xl">
                            Add New Size
                        </h2>
                        <form
                            className="md:mt-2 sm:mt-2"
                            onSubmit={handleSubmit(handleSizeSubmit)}
                        >
                            <FormGroup
                                register={register}
                                inputName={"size"}
                                labelName={"Size"}
                                errorField={errors.size}
                                inputType={"text"}
                                placeholder={"Enter Your Size"}
                                required="Size Field Is Required!"
                            />

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
            </DashboardLayout>
        </>
    );
};

export default AddSize;
