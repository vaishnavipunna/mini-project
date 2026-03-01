"use client";

import FormSubmitButton from "@/components/forms/components/FormSubmitButton";
import PasswordField from "./shared/PasswordField";
import { useForm } from "react-hook-form";
import InputField from "@/components/forms/components/InputField";
import { useRouter, useSearchParams } from "next/navigation";
import useModalById from "@/hooks/useModalById";
import { ViewState } from "../AuthContent";
import EmailField from "@/components/forms/components/EmailField";
import toast from "react-hot-toast";
import { useSignup } from "@/lib/auth/createUserAndLogin";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

interface SignupFormProps {
  handleViewSwitch: (targetView: ViewState) => void;
}

const SignupForm = ({ handleViewSwitch }: SignupFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupFormData>();

  const { trigger, isMutating } = useSignup();

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("callbackUrl") ?? "/";
  const router = useRouter();

  const { closeModal } = useModalById("authModal");

  const handleSignup = async (data: SignupFormData) => {
    const result = await trigger(data);

    if (result.success) {
      reset();
      closeModal();
      router.push(redirectTo);
      toast.success("Login successful");
    } else {
      toast.error(result.message, { duration: 5000 });
      handleViewSwitch("login");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSignup)} className="space-y-6 bg-light">
      <InputField
        id="name"
        label="Name"
        type="text"
        registerProps={register("name", {
          required: "Name is required",
        })}
        error={errors?.name}
      />
      <EmailField register={register} error={errors?.email} />
      <PasswordField register={register} error={errors?.password} />

      <FormSubmitButton isFormSubmitting={isMutating} label="Sign up" />
    </form>
  );
};

export default SignupForm;
