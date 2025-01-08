"use server";
import { signIn } from "auth";
import { redirect } from "next/navigation";

type FormState = {
  error: string;
};
export async function requestSignIn(formState: FormState, formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    await signIn("credentials", { email, password, redirect: true });
  } catch (error) {
    const err = error as Error;
    return { error: err.message };
  }

  redirect("/raport");
}
