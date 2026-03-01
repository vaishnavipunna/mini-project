import useSWRMutation from "swr/mutation";
import { signIn } from "next-auth/react";

interface CreateUserParams {
  name: string;
  email: string;
  password: string;
}

interface CreateUserResult {
  success: boolean;
  message: string;
}

export const createUserAndLogin = async (
  url: string,
  { arg }: { arg: CreateUserParams }
): Promise<CreateUserResult> => {
  const { name, email, password } = arg;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    let errorData: any = {};
    try {
      // attempt to parse JSON response
      errorData = await res.json();
    } catch (e) {
      // fall back to text if response isn't JSON
      try {
        const text = await res.text();
        errorData = { message: text };
      } catch {
        errorData = { message: `HTTP ${res.status}` };
      }
    }

    console.error("Failed to create user. status:", res.status, "body:", errorData);

    return {
      success: false,
      message: errorData?.message || `Failed to create user (status ${res.status})`,
    };
  }

  const result = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  if (result?.error) {
    console.error("Login failed after sign-up", result.error);

    return {
      success: false,
      message: "Login failed after sign-up. Please try logging in manually.",
    };
  }

  return {
    success: true,
    message: "User created and logged in successfully",
  };
};

export function useSignup() {
  return useSWRMutation("/api/auth/signup", createUserAndLogin);
}
