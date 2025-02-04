"use server";

import { getErrorMessage } from "lib/utils";
import { createClient } from "utils/supabase/server";

export async function createAccountAction(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const registration_key = formData.get("registration_key") as string;
    const env_key = process.env.REGISTRATION_KEY;

    if (env_key) {
      if (registration_key !== env_key) {
        throw new Error("Wymagany jest poprawny klucz rejestracji.");
      }
    }

    const { auth } = await createClient();

    const { error } = await auth.signUp({
      email,
      password,
      options: {
        data: { role: "user" },
      },
    });
    if (error) {
      throw error;
    }

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
}

export async function loginAction(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { auth } = await createClient();

    const { error } = await auth.signInWithPassword({ email, password });
    if (error) {
      throw error;
    }

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
}

export async function signOutAction() {
  try {
    const { auth } = await createClient();

    const { error } = await auth.signOut();
    if (error) {
      throw error;
    }

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
}
